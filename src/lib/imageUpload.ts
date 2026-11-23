export type UploadedIconKind = 'svg' | 'png' | 'jpg';

export interface ProcessedUpload {
  src: string;
  kind: UploadedIconKind;
  name: string;
  width?: number;
  height?: number;
  originalWidth?: number;
  originalHeight?: number;
  wasResized: boolean;
  byteSize: number;
}

export const MAX_SVG_BYTES = 100 * 1024; // 100 KB
export const MAX_RASTER_BYTES = 5 * 1024 * 1024; // 5 MB safety limit before resize
export const MAX_STORED_DIM = 128; // crisp at 40x40 @ 2x-3x Retina while keeping sync lean

const DANGEROUS_TAGS = new Set([
  'script',
  'foreignobject',
  'iframe',
  'object',
  'embed',
  'link',
  'meta',
  'base',
]);

export function detectKind(fileName: string, mimeType: string): UploadedIconKind | null {
  const mime = (mimeType || '').toLowerCase().trim();
  const ext = fileName.toLowerCase().split('.').pop() || '';
  if (mime === 'image/svg+xml' || ext === 'svg') return 'svg';
  if (mime === 'image/png' || ext === 'png') return 'png';
  if (mime === 'image/jpeg' || mime === 'image/jpg' || ext === 'jpg' || ext === 'jpeg') return 'jpg';
  return null;
}

export function stripExtension(fileName: string): string {
  const clean = fileName.replace(/\.[^/.]+$/, '').trim();
  return clean.slice(0, 40) || 'Icon';
}

export function computeTargetDimensions(
  width: number,
  height: number,
  maxDim = MAX_STORED_DIM
): { width: number; height: number; wasResized: boolean } {
  if (width <= 0 || height <= 0) {
    throw new Error('Invalid image dimensions.');
  }
  if (width <= maxDim && height <= maxDim) {
    return { width: Math.round(width), height: Math.round(height), wasResized: false };
  }
  const scale = maxDim / Math.max(width, height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    wasResized: true,
  };
}

function parseSvgLength(raw: string | null): number | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed.endsWith('%')) return null;
  const match = /^([0-9]+(?:\.[0-9]+)?)(?:px)?$/i.exec(trimmed);
  if (!match) return null;
  const n = parseFloat(match[1]);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function isDangerousUri(val: string): boolean {
  const normalized = val.replace(/[\s\u0000-\u001F]+/g, '').toLowerCase();
  return (
    normalized.startsWith('javascript:') ||
    normalized.startsWith('vbscript:') ||
    normalized.startsWith('data:text/html')
  );
}

/**
 * Sanitizes an SVG string and guarantees xmlns + viewBox so it scales cleanly
 * inside CSS background-size: contain containers (18x18 sidebar & 40x40 header).
 */
export function normalizeAndSanitizeSvg(rawSvg: string): {
  dataUrl: string;
  width?: number;
  height?: number;
} {
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawSvg, 'image/svg+xml');
  const parserError = doc.querySelector('parsererror');
  const root = doc.documentElement;

  if (parserError || !root || root.tagName.toLowerCase() !== 'svg') {
    throw new Error('Invalid or corrupted SVG file.');
  }

  // Walk tree and strip dangerous tags and attributes
  const toRemove: Element[] = [];
  const all = [root, ...Array.from(root.querySelectorAll('*'))];
  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (DANGEROUS_TAGS.has(tag)) {
      toRemove.push(el);
      continue;
    }
    for (const attr of Array.from(el.attributes)) {
      const name = attr.name.toLowerCase();
      const val = attr.value;
      if (name.startsWith('on')) {
        el.removeAttribute(attr.name);
      } else if (
        (name === 'href' || name === 'xlink:href' || name === 'src') &&
        isDangerousUri(val)
      ) {
        el.removeAttribute(attr.name);
      } else if (name === 'style' && /javascript:|expression\s*\(/i.test(val)) {
        el.removeAttribute(attr.name);
      }
    }
    if (tag === 'style' && el.textContent && /javascript:|expression\s*\(|@import/i.test(el.textContent)) {
      toRemove.push(el);
    }
  }
  for (const el of toRemove) el.remove();

  // Guarantee xmlns for data URI rendering
  if (!root.getAttribute('xmlns')) {
    root.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }

  const w = parseSvgLength(root.getAttribute('width'));
  const h = parseSvgLength(root.getAttribute('height'));
  let width = w ?? undefined;
  let height = h ?? undefined;

  // Guarantee viewBox when missing so small or large SVGs scale to fill their slot
  const existingViewBox = root.getAttribute('viewBox');
  if (!existingViewBox && w && h) {
    root.setAttribute('viewBox', `0 0 ${w} ${h}`);
  } else if (existingViewBox) {
    const parts = existingViewBox
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      width = Math.round(parts[2]);
      height = Math.round(parts[3]);
    }
  }

  // Removing hardcoded width/height when viewBox exists avoids clipping in CSS background rendering
  if (root.getAttribute('viewBox')) {
    root.removeAttribute('width');
    root.removeAttribute('height');
    if (!root.getAttribute('preserveAspectRatio')) {
      root.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  }

  const serialized = new XMLSerializer().serializeToString(root);
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;
  return { dataUrl, width, height };
}

function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Could not read image. Please check that the file is valid.'));
    };
    img.src = objectUrl;
  });
}

/**
 * Step-down canvas resizing produces noticeably sharper icons when shrinking
 * large images (e.g. 1024x1024 -> 128x128) compared to a single-pass drawImage.
 */
function resizeRasterToDataUrl(
  img: HTMLImageElement,
  kind: 'png' | 'jpg',
  targetW: number,
  targetH: number
): string {
  let curSource: HTMLImageElement | HTMLCanvasElement = img;
  let curW = img.naturalWidth;
  let curH = img.naturalHeight;

  while (curW / 2 > targetW && curH / 2 > targetH) {
    const nextW = Math.max(targetW, Math.round(curW / 2));
    const nextH = Math.max(targetH, Math.round(curH / 2));
    const stepCanvas = document.createElement('canvas');
    stepCanvas.width = nextW;
    stepCanvas.height = nextH;
    const stepCtx = stepCanvas.getContext('2d');
    if (!stepCtx) break;
    stepCtx.imageSmoothingEnabled = true;
    stepCtx.imageSmoothingQuality = 'high';
    stepCtx.drawImage(curSource, 0, 0, nextW, nextH);
    curSource = stepCanvas;
    curW = nextW;
    curH = nextH;
  }

  const out = document.createElement('canvas');
  out.width = targetW;
  out.height = targetH;
  const ctx = out.getContext('2d');
  if (!ctx) throw new Error('Failed to process image in browser.');

  if (kind === 'jpg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(curSource, 0, 0, targetW, targetH);

  return kind === 'png' ? out.toDataURL('image/png') : out.toDataURL('image/jpeg', 0.88);
}

/**
 * Processes a user-uploaded icon file (SVG, PNG, or JPG):
 * - Validates format and file size
 * - Sanitizes and normalizes SVG viewBox
 * - Automatically resizes PNG/JPG down to <= 128x128 preserving aspect ratio & transparency
 */
export async function processUploadedFile(file: File): Promise<ProcessedUpload> {
  const kind = detectKind(file.name, file.type);
  if (!kind) {
    throw new Error('Unsupported format. Please upload an SVG, PNG, or JPG file.');
  }

  const name = stripExtension(file.name);

  if (kind === 'svg') {
    if (file.size > MAX_SVG_BYTES) {
      throw new Error('SVG file must be at most 100 KB.');
    }
    const text = await file.text();
    const { dataUrl, width, height } = normalizeAndSanitizeSvg(text);
    return {
      src: dataUrl,
      kind: 'svg',
      name,
      width,
      height,
      originalWidth: width,
      originalHeight: height,
      wasResized: false,
      byteSize: dataUrl.length,
    };
  }

  if (file.size > MAX_RASTER_BYTES) {
    throw new Error('File must be at most 5 MB.');
  }

  const img = await loadHtmlImage(file);
  const originalWidth = img.naturalWidth;
  const originalHeight = img.naturalHeight;
  const target = computeTargetDimensions(originalWidth, originalHeight, MAX_STORED_DIM);
  const src = resizeRasterToDataUrl(img, kind, target.width, target.height);

  return {
    src,
    kind,
    name,
    width: target.width,
    height: target.height,
    originalWidth,
    originalHeight,
    wasResized: target.wasResized,
    byteSize: src.length,
  };
}
