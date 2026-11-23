import { normalizeAndSanitizeSvg } from './imageUpload';

export type OnlineFilter = 'all' | 'minimal' | 'color';

export interface OnlineIconStub {
  id: string; // e.g. "devicon:html5"
  prefix: string;
  name: string;
  collectionName: string;
  palette?: boolean;
}

export interface OnlineIconItem {
  id: string;
  prefix: string;
  name: string;
  collectionName: string;
  monochrome: boolean;
  viewBox: string;
  body: string;
}

export interface OnlineIndexResult {
  stubs: OnlineIconStub[];
  rateLimited: boolean;
}

export interface OnlinePageResult {
  items: OnlineIconItem[];
  rateLimited: boolean;
}

export const ONLINE_PAGE_SIZE = 40;

const API_HOSTS = [
  'https://api.iconify.design',
  'https://api.simplesvg.com',
  'https://api.unisvg.com',
];

let activeHostIdx = 0;

const MINIMAL_PREFIXES = 'lucide,tabler,ph,material-symbols,mdi,mingcute,bi';
const COLOR_PREFIXES = 'devicon,logos,skill-icons,material-icon-theme,fluent-emoji-flat,noto,catppuccin';

export const ONLINE_FILTERS: { id: OnlineFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'minimal', label: 'Minimal' },
  { id: 'color', label: 'Color & Logos' },
];

// Session cache for fetched icon bodies (prefix:name -> { viewBox, body })
const iconCache = new Map<string, { viewBox: string; body: string }>();

interface IconifySearchResponse {
  icons?: string[];
  total?: number;
  collections?: Record<string, { name?: string; palette?: boolean }>;
}

interface IconifyJsonResponse {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  icons?: Record<string, { body: string; width?: number; height?: number; left?: number; top?: number }>;
  aliases?: Record<string, { parent: string }>;
}

/**
 * Fetches a path across the 3 official Iconify API mirror hosts, automatically rotating
 * to the next mirror if a host returns 429 or a network/5xx error.
 */
async function fetchFromMirrors(
  path: string,
  signal?: AbortSignal
): Promise<{ res: Response | null; rateLimited: boolean }> {
  let sawRateLimit = false;
  const startIdx = activeHostIdx;

  for (let offset = 0; offset < API_HOSTS.length; offset++) {
    const idx = (startIdx + offset) % API_HOSTS.length;
    const url = `${API_HOSTS[idx]}${path}`;
    try {
      const res = await fetch(url, { signal });
      if (res.ok) {
        activeHostIdx = idx;
        return { res, rateLimited: false };
      }
      if (res.status === 429) {
        sawRateLimit = true;
        continue;
      }
      if (res.status >= 500) {
        continue;
      }
      // 4xx (other than 429) won't succeed on other mirrors
      return { res, rateLimited: false };
    } catch (e: any) {
      if (e?.name === 'AbortError') throw e;
      // Network error -> try next mirror
    }
  }

  return { res: null, rateLimited: sawRateLimit };
}

/** Builds a clean data URI from an already-fetched online icon, tinting monochrome SVGs locally in 0ms. */
export function renderOnlineSvgDataUrl(item: OnlineIconItem, color: string): string {
  const body = item.monochrome ? item.body.replace(/currentColor/g, color) : item.body;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${item.viewBox}" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/** Sanitizes and normalizes an online icon before saving it permanently into RemNote synced storage. */
export function prepareOnlineIconForSave(
  item: OnlineIconItem,
  color: string
): { dataUrl: string; width?: number; height?: number } {
  const body = item.monochrome ? item.body.replace(/currentColor/g, color) : item.body;
  const rawSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${item.viewBox}">${body}</svg>`;
  return normalizeAndSanitizeSvg(rawSvg);
}

async function queryStubsForPrefixes(
  query: string,
  prefixes: string,
  signal?: AbortSignal
): Promise<OnlineIndexResult> {
  const params = new URLSearchParams({
    query,
    limit: '128',
    prefixes,
  });

  const { res, rateLimited } = await fetchFromMirrors(`/search?${params.toString()}`, signal);
  if (!res) return { stubs: [], rateLimited };
  if (!res.ok) {
    throw new Error(`Online search failed (HTTP ${res.status}).`);
  }

  const data = (await res.json()) as IconifySearchResponse;
  const collections = data.collections ?? {};
  const stubs: OnlineIconStub[] = [];

  for (const full of data.icons ?? []) {
    const idx = full.indexOf(':');
    if (idx <= 0) continue;
    const prefix = full.slice(0, idx);
    const name = full.slice(idx + 1);
    const col = collections[prefix];
    stubs.push({
      id: full,
      prefix,
      name,
      collectionName: col?.name || prefix,
      palette: col?.palette,
    });
  }

  return { stubs, rateLimited: false };
}

/** Interleaves two stub arrays (deduplicating by id) so both color and minimal icons appear on page 1. */
export function interleaveStubs(a: OnlineIconStub[], b: OnlineIconStub[]): OnlineIconStub[] {
  const seen = new Set<string>();
  const out: OnlineIconStub[] = [];
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < a.length && !seen.has(a[i].id)) {
      seen.add(a[i].id);
      out.push(a[i]);
    }
    if (i < b.length && !seen.has(b[i].id)) {
      seen.add(b[i].id);
      out.push(b[i]);
    }
  }
  return out;
}

/**
 * Step 1: Fetches matching icon names (up to 128 per group; up to 256 interleaved on "Todos").
 * Does NOT download SVG bodies yet — pages of 40 are loaded on demand via `loadOnlinePage`.
 */
export async function searchOnlineIndex(
  query: string,
  filter: OnlineFilter = 'all',
  signal?: AbortSignal
): Promise<OnlineIndexResult> {
  const q = query.trim();
  if (!q) return { stubs: [], rateLimited: false };

  if (filter === 'minimal') {
    return queryStubsForPrefixes(q, MINIMAL_PREFIXES, signal);
  }
  if (filter === 'color') {
    return queryStubsForPrefixes(q, COLOR_PREFIXES, signal);
  }

  // "all": fetch color + minimal in parallel and interleave so page 1 shows both
  const [colorRes, minRes] = await Promise.all([
    queryStubsForPrefixes(q, COLOR_PREFIXES, signal),
    queryStubsForPrefixes(q, MINIMAL_PREFIXES, signal),
  ]);

  return {
    stubs: interleaveStubs(colorRes.stubs, minRes.stubs),
    rateLimited: colorRes.rateLimited || minRes.rateLimited,
  };
}

async function fetchPrefixBatch(
  prefix: string,
  names: string[],
  signal?: AbortSignal
): Promise<{ rateLimited: boolean }> {
  const missing = names.filter((n) => !iconCache.has(`${prefix}:${n}`));
  if (missing.length === 0) return { rateLimited: false };

  const path = `/${encodeURIComponent(prefix)}.json?icons=${missing
    .map((n) => encodeURIComponent(n))
    .join(',')}`;

  const { res, rateLimited } = await fetchFromMirrors(path, signal);
  if (!res || !res.ok) return { rateLimited };

  const data = (await res.json()) as IconifyJsonResponse;
  const defW = data.width ?? 24;
  const defH = data.height ?? 24;
  const defL = data.left ?? 0;
  const defT = data.top ?? 0;
  const icons = data.icons ?? {};
  const aliases = data.aliases ?? {};

  for (const name of missing) {
    let entry = icons[name];
    if (!entry && aliases[name]?.parent) {
      entry = icons[aliases[name].parent];
    }
    if (!entry?.body) continue;
    const l = entry.left ?? defL;
    const t = entry.top ?? defT;
    const w = entry.width ?? defW;
    const h = entry.height ?? defH;
    iconCache.set(`${prefix}:${name}`, {
      viewBox: `${l} ${t} ${w} ${h}`,
      body: entry.body,
    });
  }

  return { rateLimited: false };
}

/**
 * Step 2: Loads only the SVGs for one page (default 40 items), batched by collection prefix
 * with session caching and automatic mirror fallback.
 */
export async function loadOnlinePage(
  stubs: OnlineIconStub[],
  pageIndex: number,
  pageSize = ONLINE_PAGE_SIZE,
  signal?: AbortSignal
): Promise<OnlinePageResult> {
  const start = pageIndex * pageSize;
  const slice = stubs.slice(start, start + pageSize);
  if (slice.length === 0) return { items: [], rateLimited: false };

  const byPrefix = new Map<string, string[]>();
  for (const stub of slice) {
    const list = byPrefix.get(stub.prefix) ?? [];
    list.push(stub.name);
    byPrefix.set(stub.prefix, list);
  }

  const prefixEntries = Array.from(byPrefix.entries());
  let rateLimited = false;
  const CONCURRENCY = 4;
  for (let i = 0; i < prefixEntries.length; i += CONCURRENCY) {
    const chunk = prefixEntries.slice(i, i + CONCURRENCY);
    const results = await Promise.all(
      chunk.map(([prefix, names]) => fetchPrefixBatch(prefix, names, signal))
    );
    if (results.some((r) => r.rateLimited)) rateLimited = true;
  }

  const items: OnlineIconItem[] = [];
  for (const stub of slice) {
    const cached = iconCache.get(stub.id);
    if (!cached) continue;
    const hasCurrentColor = cached.body.includes('currentColor');
    items.push({
      id: stub.id,
      prefix: stub.prefix,
      name: stub.name,
      collectionName: stub.collectionName,
      monochrome: hasCurrentColor || stub.palette === false,
      viewBox: cached.viewBox,
      body: cached.body,
    });
  }

  return { items, rateLimited };
}
