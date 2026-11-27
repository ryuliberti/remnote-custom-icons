import { useEffect, useMemo, useRef, useState } from 'react';
import { renderWidget, usePlugin, WidgetLocation } from '@remnote/plugin-sdk';
import {
  BUILTIN_CATALOG,
  CATALOG_CATEGORIES,
  type CatalogCategory,
  type CatalogIcon,
  ICON_COLORS,
  renderCatalogSvgDataUrl,
} from '../lib/builtinCatalog';
import {
  loadOnlinePage,
  ONLINE_FILTERS,
  ONLINE_PAGE_SIZE,
  type OnlineFilter,
  type OnlineIconItem,
  type OnlineIconStub,
  prepareOnlineIconForSave,
  renderOnlineSvgDataUrl,
  searchOnlineIndex,
} from '../lib/iconify';
import {
  addRecentCustomColor,
  assignIcon,
  assignLibraryIcon,
  clearRemIcon,
  deleteLibraryIcon,
  getColorPrefs,
  getStore,
  type IconStore,
  saveColorPrefs,
  type StoredIcon,
} from '../lib/icons';
import { processUploadedFile } from '../lib/imageUpload';

interface Ctx {
  remId: string;
  name: string;
}

type Tab = 'library' | 'online' | 'upload';

const ONLINE_SUGGESTIONS = ['react', 'python', 'docker', 'book', 'brain', 'folder', 'music', 'rocket'];
const PRESET_HEXES = ICON_COLORS.map((c) => c.hex.toLowerCase());

function foldText(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function normalizeHexColor(raw: string): string | null {
  const clean = raw.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{6}$/.test(clean)) return `#${clean.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(clean)) {
    return `#${clean[0]}${clean[0]}${clean[1]}${clean[1]}${clean[2]}${clean[2]}`.toLowerCase();
  }
  return null;
}

// Scoped exclusively to the isolated icon_picker iframe.
const PICKER_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; width: 100%; overflow: hidden; }

  .ci-root {
    width: 100%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 11px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    user-select: none;
  }

  .ci-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .ci-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .ci-title {
    font-size: 14.5px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ci-close {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    border: none;
    background: transparent;
    color: inherit;
    opacity: 0.65;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background-color 0.14s, opacity 0.14s;
  }
  .ci-close:hover {
    background: rgba(127, 127, 127, 0.2);
    opacity: 1;
  }

  .ci-tabs {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
    padding: 3px;
    border-radius: 9px;
    background: rgba(127, 127, 127, 0.14);
  }
  .ci-tab {
    border: none;
    border-radius: 6.5px;
    padding: 6px 8px;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: inherit;
    opacity: 0.72;
    transition: background-color 0.14s, opacity 0.14s, color 0.14s;
  }
  .ci-tab:hover:not(.is-active) {
    background: rgba(127, 127, 127, 0.12);
    opacity: 0.95;
  }
  .ci-tab.is-active {
    background: rgba(59, 130, 246, 0.22);
    opacity: 1;
    font-weight: 600;
  }

  .ci-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-height: 360px;
  }

  .ci-input {
    width: 100%;
    border: 1px solid rgba(127, 127, 127, 0.35);
    border-radius: 8px;
    padding: 7px 10px;
    font-size: 13px;
    background: rgba(127, 127, 127, 0.06);
    color: inherit;
    outline: none;
    transition: border-color 0.14s, box-shadow 0.14s, background-color 0.14s;
  }
  .ci-input:focus {
    border-color: #3b82f6;
    background: rgba(127, 127, 127, 0.09);
    box-shadow: 0 0 0 2.5px rgba(59, 130, 246, 0.22);
  }

  .ci-pills {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .ci-pill {
    border: 1px solid rgba(127, 127, 127, 0.3);
    border-radius: 999px;
    padding: 3.5px 10px;
    font-size: 11.5px;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: inherit;
    opacity: 0.85;
    transition: background-color 0.14s, border-color 0.14s, opacity 0.14s;
  }
  .ci-pill:hover:not(.is-active) {
    background: rgba(127, 127, 127, 0.14);
    opacity: 1;
  }
  .ci-pill.is-active {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.2);
    opacity: 1;
    font-weight: 600;
  }

  .ci-colors {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-wrap: wrap;
  }
  .ci-color-label {
    font-size: 11.5px;
    opacity: 0.68;
    margin-right: 1px;
  }
  .ci-swatch {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.22);
    cursor: pointer;
    padding: 0;
    transition: transform 0.12s, box-shadow 0.12s;
  }
  .ci-swatch:hover {
    transform: scale(1.16);
  }
  .ci-swatch.is-active {
    transform: scale(1.1);
    box-shadow: 0 0 0 2px rgba(24, 24, 28, 0.9), 0 0 0 3.8px #3b82f6;
  }
  .ci-swatch-custom {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1.5px solid rgba(255, 255, 255, 0.35);
    background: conic-gradient(#ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7, #ec4899, #ef4444);
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.65);
    transition: transform 0.12s, box-shadow 0.12s;
  }
  .ci-swatch-custom:hover {
    transform: scale(1.14);
  }
  .ci-swatch-custom.is-active {
    transform: scale(1.08);
    box-shadow: 0 0 0 2px rgba(24, 24, 28, 0.9), 0 0 0 3.8px #3b82f6;
  }
  .ci-color-menu {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 8px 9px;
    border-radius: 8px;
    border: 1px solid rgba(127, 127, 127, 0.3);
    background: rgba(127, 127, 127, 0.1);
  }
  .ci-color-menu-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ci-recent-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding-top: 6px;
    border-top: 1px solid rgba(127, 127, 127, 0.2);
    flex-wrap: wrap;
  }
  .ci-color-native {
    width: 34px;
    height: 26px;
    padding: 0;
    border: 1px solid rgba(127, 127, 127, 0.45);
    border-radius: 6px;
    background: transparent;
    cursor: pointer;
    flex-shrink: 0;
  }
  .ci-color-native::-webkit-color-swatch-wrapper { padding: 2px; }
  .ci-color-native::-webkit-color-swatch { border: none; border-radius: 4px; }
  .ci-hex-input {
    width: 108px;
    border: 1px solid rgba(127, 127, 127, 0.38);
    border-radius: 6px;
    padding: 4px 8px;
    font-size: 12.5px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    background: rgba(127, 127, 127, 0.08);
    color: inherit;
    outline: none;
  }
  .ci-hex-input:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.22);
  }

  .ci-grid-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }
  .ci-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 6px;
    max-height: 248px;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2px 4px 2px 1px;
  }
  .ci-grid::-webkit-scrollbar { width: 6px; }
  .ci-grid::-webkit-scrollbar-track { background: transparent; }
  .ci-grid::-webkit-scrollbar-thumb {
    background: rgba(127, 127, 127, 0.35);
    border-radius: 999px;
  }
  .ci-grid::-webkit-scrollbar-thumb:hover {
    background: rgba(127, 127, 127, 0.55);
  }

  .ci-tile-wrap {
    position: relative;
    min-width: 0;
  }
  .ci-tile {
    width: 100%;
    min-width: 0;
    padding: 8px 4px 6px;
    border-radius: 8px;
    border: 1px solid rgba(127, 127, 127, 0.22);
    background: rgba(127, 127, 127, 0.04);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    color: inherit;
    transition: background-color 0.13s, border-color 0.13s, transform 0.12s;
  }
  .ci-tile:hover:not(:disabled) {
    background: rgba(127, 127, 127, 0.14);
    border-color: rgba(127, 127, 127, 0.45);
    transform: translateY(-1px);
  }
  .ci-tile:active:not(:disabled) {
    transform: translateY(0);
  }
  .ci-tile.is-selected {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.16);
    box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.4);
  }
  .ci-tile-name {
    font-size: 10.5px;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0.82;
  }

  .ci-del {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.22);
    background: rgba(24, 24, 30, 0.94);
    color: #fff;
    font-size: 11.5px;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.13s, background-color 0.13s;
  }
  .ci-tile-wrap:hover .ci-del,
  .ci-del:focus-visible {
    opacity: 1;
  }
  .ci-del:hover {
    background: #ef4444;
    border-color: #ef4444;
  }

  .ci-dropzone {
    border: 1.5px dashed rgba(127, 127, 127, 0.45);
    border-radius: 10px;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    text-align: center;
    background: rgba(127, 127, 127, 0.04);
    transition: border-color 0.15s, background-color 0.15s;
  }
  .ci-dropzone:hover, .ci-dropzone.is-drag {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }

  .ci-row { display: flex; gap: 6px; }
  .ci-primary {
    padding: 7px 14px;
    border-radius: 8px;
    border: none;
    background: #3b82f6;
    color: #fff;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.14s, opacity 0.14s;
  }
  .ci-primary:hover:not(:disabled) { background: #2563eb; }
  .ci-primary:disabled { opacity: 0.45; cursor: not-allowed; }

  .ci-secondary {
    width: 100%;
    padding: 7.5px 10px;
    border-radius: 8px;
    border: 1px solid rgba(59, 130, 246, 0.4);
    background: rgba(59, 130, 246, 0.12);
    color: inherit;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.14s, border-color 0.14s;
  }
  .ci-secondary:hover {
    background: rgba(59, 130, 246, 0.22);
    border-color: #3b82f6;
  }

  .ci-pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    margin-top: auto;
    padding-top: 6px;
  }
  .ci-page-btn {
    border: 1px solid rgba(127, 127, 127, 0.35);
    border-radius: 7px;
    padding: 4.5px 10px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: inherit;
    transition: background-color 0.13s, opacity 0.13s;
  }
  .ci-page-btn:hover:not(:disabled) { background: rgba(127, 127, 127, 0.15); }
  .ci-page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

  .ci-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(127, 127, 127, 0.2);
  }
  .ci-reset-btn {
    border: 1px solid rgba(127, 127, 127, 0.3);
    border-radius: 7px;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    background: transparent;
    color: inherit;
    opacity: 0.85;
    transition: background-color 0.14s, border-color 0.14s, color 0.14s, opacity 0.14s;
  }
  .ci-reset-btn:hover:not(:disabled) {
    background: rgba(239, 68, 68, 0.14);
    border-color: rgba(239, 68, 68, 0.45);
    color: #f87171;
    opacity: 1;
  }
  .ci-reset-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .ci-status {
    font-size: 12px;
    padding: 6px 9px;
    border-radius: 7px;
    background: rgba(59, 130, 246, 0.15);
  }
  .ci-error {
    font-size: 12px;
    padding: 6px 9px;
    border-radius: 7px;
    background: rgba(239, 68, 68, 0.16);
    color: #f87171;
  }
  .ci-section-label {
    font-size: 11px;
    font-weight: 600;
    opacity: 0.68;
    text-transform: uppercase;
    letter-spacing: 0.45px;
  }
  .ci-muted {
    font-size: 12px;
    opacity: 0.68;
    text-align: center;
    padding: 20px 8px;
  }
`;

export const IconPicker = () => {
  const plugin = usePlugin();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onlineGridRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const colorSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [ctx, setCtx] = useState<Ctx | null>(null);
  const [store, setStore] = useState<IconStore>({ library: {}, assignments: {} });
  const [tab, setTab] = useState<Tab>('library');

  const [color, setColor] = useState<string>(ICON_COLORS[0].hex);
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const [hexDraft, setHexDraft] = useState<string>(ICON_COLORS[0].hex);
  const [recentCustomColors, setRecentCustomColors] = useState<string[]>([]);

  // Offline library state
  const [libQuery, setLibQuery] = useState('');
  const [category, setCategory] = useState<CatalogCategory>('all');

  // Online Iconify state (client-side paginated 40 at a time from up to 128/256 stubs)
  const [onlineQuery, setOnlineQuery] = useState('');
  const [onlineFilter, setOnlineFilter] = useState<OnlineFilter>('all');
  const [onlineStubs, setOnlineStubs] = useState<OnlineIconStub[]>([]);
  const [onlinePage, setOnlinePage] = useState(0);
  const [onlineItems, setOnlineItems] = useState<OnlineIconItem[]>([]);
  const [onlineLoading, setOnlineLoading] = useState(false);
  const [onlineSearched, setOnlineSearched] = useState(false);

  // Upload & URL state
  const [url, setUrl] = useState('');
  const [dragging, setDragging] = useState(false);

  // Feedback
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      const [w, loadedStore, prefs] = await Promise.all([
        plugin.widget.getWidgetContext<WidgetLocation.Popup>(),
        getStore(plugin),
        getColorPrefs(plugin, ICON_COLORS[0].hex),
      ]);
      const c = w?.contextData as Ctx | undefined;
      if (c) setCtx(c);
      setStore(loadedStore);
      setColor(prefs.lastColor);
      setHexDraft(prefs.lastColor);
      setRecentCustomColors(prefs.recentCustomColors);
    })();
    return () => {
      abortRef.current?.abort();
      if (colorSaveTimerRef.current) clearTimeout(colorSaveTimerRef.current);
    };
  }, []);

  const persistColorPrefs = (nextColor: string, nextRecent: string[], immediate = false) => {
    if (colorSaveTimerRef.current) {
      clearTimeout(colorSaveTimerRef.current);
      colorSaveTimerRef.current = null;
    }
    const run = () => {
      saveColorPrefs(plugin, { lastColor: nextColor, recentCustomColors: nextRecent }).catch(() => {});
    };
    if (immediate) run();
    else colorSaveTimerRef.current = setTimeout(run, 250);
  };

  const chooseColor = (hex: string, closeMenu = false, immediate = false) => {
    const normalized = hex.toLowerCase();
    setColor(normalized);
    setHexDraft(normalized);
    if (closeMenu) setColorMenuOpen(false);
    persistColorPrefs(normalized, recentCustomColors, immediate);
  };

  const commitCurrentCustomColor = (closeMenu = false) => {
    const nextRecent = addRecentCustomColor(recentCustomColors, color, PRESET_HEXES);
    setRecentCustomColors(nextRecent);
    setHexDraft(color);
    if (closeMenu) setColorMenuOpen(false);
    persistColorPrefs(color, nextRecent, true);
  };

  const handleHexChange = (val: string) => {
    setHexDraft(val);
    const parsed = normalizeHexColor(val);
    if (parsed) {
      setColor(parsed);
      persistColorPrefs(parsed, recentCustomColors, false);
    }
  };

  useEffect(() => {
    if (tab !== 'online') return;
    const q = onlineQuery.trim();
    if (!q) {
      abortRef.current?.abort();
      setOnlineStubs([]);
      setOnlineItems([]);
      setOnlinePage(0);
      setOnlineSearched(false);
      setOnlineLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const ctrl = new AbortController();
      abortRef.current = ctrl;
      setOnlineLoading(true);
      setOnlinePage(0);
      setError('');

      (async () => {
        try {
          const idx = await searchOnlineIndex(q, onlineFilter, ctrl.signal);
          setOnlineStubs(idx.stubs);
          if (idx.stubs.length === 0) {
            setOnlineItems([]);
            setOnlineSearched(true);
            if (idx.rateLimited) {
              setError('Iconify servers temporarily rate-limited requests. Wait a few seconds and try again.');
            }
            return;
          }
          const pageRes = await loadOnlinePage(idx.stubs, 0, ONLINE_PAGE_SIZE, ctrl.signal);
          setOnlineItems(pageRes.items);
          setOnlineSearched(true);
          if (pageRes.rateLimited && pageRes.items.length === 0) {
            setError('Iconify servers temporarily rate-limited requests. Wait a few seconds and try again.');
          }
        } catch (e: any) {
          if (e?.name === 'AbortError') return;
          setError(e?.message || 'Failed to search online icons. Check your connection.');
          setOnlineStubs([]);
          setOnlineItems([]);
        } finally {
          if (abortRef.current === ctrl) setOnlineLoading(false);
        }
      })();
    }, 350);

    return () => clearTimeout(timer);
  }, [tab, onlineQuery, onlineFilter]);

  const goToOnlinePage = async (nextPage: number) => {
    const totalPages = Math.max(1, Math.ceil(onlineStubs.length / ONLINE_PAGE_SIZE));
    if (nextPage < 0 || nextPage >= totalPages || nextPage === onlinePage) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setOnlinePage(nextPage);
    setOnlineLoading(true);
    setError('');
    try {
      const pageRes = await loadOnlinePage(onlineStubs, nextPage, ONLINE_PAGE_SIZE, ctrl.signal);
      setOnlineItems(pageRes.items);
      if (onlineGridRef.current) onlineGridRef.current.scrollTop = 0;
      if (pageRes.rateLimited && pageRes.items.length === 0) {
        setError('Iconify servers temporarily rate-limited requests. Wait a few seconds and try again.');
      }
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      setError(e?.message || 'Failed to load page.');
    } finally {
      if (abortRef.current === ctrl) setOnlineLoading(false);
    }
  };

  const refreshCss = async () => {
    await plugin.messaging.broadcast({ type: 'refresh-icons' });
  };

  const currentIconId = ctx ? store.assignments[ctx.remId] : undefined;
  const currentSrc = currentIconId ? store.library[currentIconId]?.src : undefined;

  const userIcons: StoredIcon[] = useMemo(
    () =>
      Object.values(store.library)
        .filter((ic) => ic.kind !== 'sample' && ic.kind !== 'catalog')
        .sort((a, b) => b.createdAt - a.createdAt),
    [store.library]
  );

  const filteredCatalog = useMemo(() => {
    const q = foldText(libQuery.trim());
    return BUILTIN_CATALOG.filter((ic) => {
      if (category !== 'all' && ic.category !== category) return false;
      if (!q) return true;
      return foldText(ic.keywords).includes(q);
    });
  }, [libQuery, category]);

  const applyCatalogIcon = async (ic: CatalogIcon) => {
    if (!ctx || busy) return;
    setError('');
    if (ic.monochrome) commitCurrentCustomColor(false);
    const dataUrl = renderCatalogSvgDataUrl(ic, color);
    const res = await assignIcon(plugin, ctx.remId, {
      src: dataUrl,
      name: ic.name,
      kind: 'catalog',
    });
    setStore(res.store);
    await refreshCss();
    setStatus(`Applied “${ic.name}”.`);
  };

  const applyOnlineIcon = async (item: OnlineIconItem) => {
    if (!ctx || busy) return;
    setError('');
    setStatus('');
    setBusy(true);
    try {
      if (item.monochrome) commitCurrentCustomColor(false);
      const { dataUrl, width, height } = prepareOnlineIconForSave(item, color);
      const res = await assignIcon(plugin, ctx.remId, {
        src: dataUrl,
        name: item.name,
        kind: 'online',
        width,
        height,
      });
      setStore(res.store);
      await refreshCss();
      setStatus(`Saved “${item.name}” offline and applied.`);
    } catch (e: any) {
      setError(e?.message || 'Could not apply icon.');
    } finally {
      setBusy(false);
    }
  };

  const handleFile = async (file: File) => {
    if (!ctx) return;
    setError('');
    setStatus('');
    setBusy(true);
    try {
      const processed = await processUploadedFile(file);
      const res = await assignIcon(plugin, ctx.remId, {
        src: processed.src,
        name: processed.name,
        kind: processed.kind,
        width: processed.width,
        height: processed.height,
      });
      setStore(res.store);
      await refreshCss();

      const kb = Math.max(1, Math.round(processed.byteSize / 1024));
      if (processed.wasResized && processed.originalWidth && processed.originalHeight) {
        setStatus(
          `Applied! Resized from ${processed.originalWidth}×${processed.originalHeight} to ${processed.width}×${processed.height} (${kb} KB).`
        );
      } else if (processed.kind === 'svg') {
        setStatus(`Applied! Normalized SVG (${kb} KB).`);
      } else {
        setStatus(`Applied! (${processed.width}×${processed.height}, ${kb} KB).`);
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to process file.');
    } finally {
      setBusy(false);
    }
  };

  const applySaved = async (icon: StoredIcon) => {
    if (!ctx || busy) return;
    setError('');
    const next = await assignLibraryIcon(plugin, ctx.remId, icon.id);
    setStore(next);
    await refreshCss();
    setStatus(`Applied “${icon.name}”.`);
  };

  const removeSaved = async (icon: StoredIcon) => {
    setError('');
    const next = await deleteLibraryIcon(plugin, icon.id);
    setStore(next);
    await refreshCss();
    setStatus(`Removed “${icon.name}” from library.`);
  };

  const applyUrl = async () => {
    if (!ctx || !url.trim()) return;
    const trimmed = url.trim();
    if (!/^https?:\/\/|^data:image\//i.test(trimmed)) {
      setError('Enter a valid URL starting with http:// or https://.');
      return;
    }
    setError('');
    const res = await assignIcon(plugin, ctx.remId, {
      src: trimmed,
      name: 'Link',
      kind: 'url',
    });
    setStore(res.store);
    setUrl('');
    await refreshCss();
    setStatus('Applied icon from URL.');
  };

  const resetIcon = async () => {
    if (!ctx) return;
    setError('');
    const next = await clearRemIcon(plugin, ctx.remId);
    setStore(next);
    await refreshCss();
    setStatus('Restored default icon.');
  };

  const jumpToOnlineSearch = (q: string) => {
    setOnlineQuery(q);
    setTab('online');
  };

  const isCustomColor = !ICON_COLORS.some((c) => c.hex.toLowerCase() === color.toLowerCase());

  const renderColorPalette = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div className="ci-colors" aria-label="Monochrome icon color">
        <span className="ci-color-label">Color:</span>
        {ICON_COLORS.map((c) => (
          <button
            key={c.hex}
            title={c.name}
            onClick={() => chooseColor(c.hex, true, true)}
            className={`ci-swatch${color.toLowerCase() === c.hex.toLowerCase() ? ' is-active' : ''}`}
            style={{ backgroundColor: c.hex }}
          />
        ))}
        <button
          title={`Custom color (${color.toUpperCase()})`}
          aria-label="Custom color"
          aria-expanded={colorMenuOpen}
          onClick={() => {
            setHexDraft(color);
            setColorMenuOpen((v) => !v);
          }}
          className={`ci-swatch-custom${isCustomColor || colorMenuOpen ? ' is-active' : ''}`}
        >
          +
        </button>
      </div>

      {colorMenuOpen && (
        <div className="ci-color-menu">
          <div className="ci-color-menu-row">
            <input
              type="color"
              className="ci-color-native"
              aria-label="Pick custom color"
              value={color}
              onChange={(e) => chooseColor(e.target.value, false, false)}
            />
            <input
              className="ci-hex-input"
              aria-label="HEX color code"
              placeholder="#3b82f6"
              maxLength={7}
              value={hexDraft}
              onChange={(e) => handleHexChange(e.target.value)}
              onBlur={() => setHexDraft(color)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Escape') {
                  commitCurrentCustomColor(true);
                }
              }}
            />
            <span style={{ fontSize: 11.5, opacity: 0.65, flex: 1 }}>Pick or enter HEX</span>
            <button className="ci-page-btn" onClick={() => commitCurrentCustomColor(true)}>
              Done
            </button>
          </div>

          {recentCustomColors.length > 0 && (
            <div className="ci-recent-row" aria-label="Recent custom colors">
              <span className="ci-color-label">Recent:</span>
              {recentCustomColors.map((hex) => (
                <button
                  key={hex}
                  title={hex.toUpperCase()}
                  onClick={() => chooseColor(hex, false, true)}
                  className={`ci-swatch${color.toLowerCase() === hex.toLowerCase() ? ' is-active' : ''}`}
                  style={{ backgroundColor: hex }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (!ctx) {
    return (
      <>
        <style>{PICKER_STYLES}</style>
        <div className="ci-root">Loading…</div>
      </>
    );
  }

  const assignedCount = Object.keys(store.assignments).length;

  return (
    <>
      <style>{PICKER_STYLES}</style>
      <div className="ci-root">
        {/* Header */}
        <div className="ci-header">
          <div className="ci-header-left">
            {currentSrc && (
              <img
                src={currentSrc}
                alt=""
                style={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }}
              />
            )}
            <div className="ci-title">Icon for “{ctx.name || 'Document'}”</div>
          </div>
          <button
            className="ci-close"
            aria-label="Close"
            title="Close (Esc)"
            onClick={() => plugin.widget.closePopup()}
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="ci-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={tab === 'library'}
            className={`ci-tab${tab === 'library' ? ' is-active' : ''}`}
            onClick={() => {
              setError('');
              setTab('library');
            }}
          >
            Library
          </button>
          <button
            role="tab"
            aria-selected={tab === 'online'}
            className={`ci-tab${tab === 'online' ? ' is-active' : ''}`}
            onClick={() => {
              setError('');
              setTab('online');
            }}
          >
            Search Online
          </button>
          <button
            role="tab"
            aria-selected={tab === 'upload'}
            className={`ci-tab${tab === 'upload' ? ' is-active' : ''}`}
            onClick={() => {
              setError('');
              setTab('upload');
            }}
          >
            Upload{userIcons.length > 0 ? ` (${userIcons.length})` : ''}
          </button>
        </div>

        {error && <div className="ci-error">{error}</div>}
        {status && <div className="ci-status">{status}</div>}

        <div className="ci-body">
          {/* TAB 1: Offline curated library */}
          {tab === 'library' && (
            <>
              <input
                className="ci-input"
                placeholder="Search offline (e.g. book, folder, html, code)…"
                value={libQuery}
                onChange={(e) => setLibQuery(e.target.value)}
                autoFocus
              />

              <div className="ci-pills">
                {CATALOG_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className={`ci-pill${category === cat.id ? ' is-active' : ''}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {renderColorPalette()}

              <div className="ci-grid-area">
                {filteredCatalog.length > 0 ? (
                  <div className="ci-grid">
                    {filteredCatalog.map((ic) => {
                      const src = renderCatalogSvgDataUrl(ic, color);
                      const selected = currentSrc === src;
                      return (
                        <button
                          key={ic.id}
                          title={ic.name}
                          onClick={() => applyCatalogIcon(ic)}
                          className={`ci-tile${selected ? ' is-selected' : ''}`}
                        >
                          <img src={src} alt={ic.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                          <span className="ci-tile-name">{ic.name}</span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="ci-muted">No icons found in the offline library.</div>
                )}

                {libQuery.trim() && (
                  <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                    <button className="ci-secondary" onClick={() => jumpToOnlineSearch(libQuery.trim())}>
                      Search “{libQuery.trim()}” online (200k+ icons) →
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* TAB 2: Online Iconify search */}
          {tab === 'online' && (
            <>
              <input
                className="ci-input"
                placeholder="Search icons (e.g. react, biology, folder, cat)…"
                value={onlineQuery}
                onChange={(e) => setOnlineQuery(e.target.value)}
                autoFocus
              />

              <div className="ci-pills">
                {ONLINE_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setOnlineFilter(f.id)}
                    className={`ci-pill${onlineFilter === f.id ? ' is-active' : ''}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {renderColorPalette()}

              <div className="ci-grid-area">
                {!onlineQuery.trim() && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 4 }}>
                    <div className="ci-section-label">Quick suggestions</div>
                    <div className="ci-pills">
                      {ONLINE_SUGGESTIONS.map((term) => (
                        <button key={term} className="ci-pill" onClick={() => setOnlineQuery(term)}>
                          {term}
                        </button>
                      ))}
                    </div>
                    <div className="ci-muted" style={{ paddingTop: 12 }}>
                      Iconify catalog (200k+ icons). Picked SVGs are saved to RemNote and work offline.
                    </div>
                  </div>
                )}

                {onlineLoading && <div className="ci-muted">Searching online icons…</div>}

                {!onlineLoading && onlineSearched && onlineItems.length === 0 && (
                  <div className="ci-muted">
                    No results for “{onlineQuery.trim()}”. Try another search term.
                  </div>
                )}

                {!onlineLoading && onlineItems.length > 0 && (() => {
                  const totalPages = Math.max(1, Math.ceil(onlineStubs.length / ONLINE_PAGE_SIZE));
                  const rangeStart = onlinePage * ONLINE_PAGE_SIZE + 1;
                  const rangeEnd = Math.min(onlineStubs.length, (onlinePage + 1) * ONLINE_PAGE_SIZE);
                  return (
                    <>
                      <div style={{ fontSize: 11.5, opacity: 0.7, marginBottom: 6 }}>
                        Showing {rangeStart}–{rangeEnd} of {onlineStubs.length} icons
                        {busy ? ' • saving…' : ''}
                      </div>
                      <div ref={onlineGridRef} className="ci-grid" style={{ maxHeight: 205 }}>
                        {onlineItems.map((item) => {
                          const preview = renderOnlineSvgDataUrl(item, color);
                          const selected = currentSrc === preview;
                          return (
                            <button
                              key={item.id}
                              disabled={busy}
                              title={`${item.name} (${item.collectionName})`}
                              onClick={() => applyOnlineIcon(item)}
                              className={`ci-tile${selected ? ' is-selected' : ''}`}
                            >
                              <img
                                src={preview}
                                alt={item.name}
                                style={{ width: 24, height: 24, objectFit: 'contain' }}
                              />
                              <span className="ci-tile-name">{item.name}</span>
                            </button>
                          );
                        })}
                      </div>
                      {totalPages > 1 && (
                        <div className="ci-pager">
                          <button
                            className="ci-page-btn"
                            disabled={onlinePage === 0}
                            onClick={() => goToOnlinePage(onlinePage - 1)}
                          >
                            ← Previous
                          </button>
                          <span style={{ opacity: 0.75 }}>
                            Page {onlinePage + 1} of {totalPages}
                          </span>
                          <button
                            className="ci-page-btn"
                            disabled={onlinePage + 1 >= totalPages}
                            onClick={() => goToOnlinePage(onlinePage + 1)}
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </>
          )}

          {/* TAB 3: Upload + Saved user icons + URL */}
          {tab === 'upload' && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".svg,.png,.jpg,.jpeg,image/svg+xml,image/png,image/jpeg"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  e.target.value = '';
                  if (file) handleFile(file);
                }}
              />
              <div
                role="button"
                tabIndex={0}
                onClick={() => !busy && fileInputRef.current?.click()}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ' ') && !busy) {
                    e.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragging(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragging(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file && !busy) handleFile(file);
                }}
                className={`ci-dropzone${dragging ? ' is-drag' : ''}`}
              >
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  {busy ? 'Processing image…' : 'Upload file (click or drag & drop)'}
                </div>
                <div style={{ fontSize: 11.5, opacity: 0.72 }}>
                  SVG (up to 100 KB), PNG, or JPG • auto-resized
                </div>
              </div>

              <div className="ci-grid-area" style={{ gap: 6 }}>
                {userIcons.length > 0 ? (
                  <>
                    <div className="ci-section-label">Your saved icons ({userIcons.length})</div>
                    <div className="ci-grid" style={{ maxHeight: 168 }}>
                      {userIcons.map((ic) => (
                        <div key={ic.id} className="ci-tile-wrap">
                          <button
                            title={`${ic.name} (${ic.kind.toUpperCase()})`}
                            onClick={() => applySaved(ic)}
                            className={`ci-tile${currentIconId === ic.id ? ' is-selected' : ''}`}
                          >
                            <img src={ic.src} alt={ic.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                            <span className="ci-tile-name">{ic.name}</span>
                          </button>
                          <button
                            title="Remove from library"
                            aria-label={`Remove ${ic.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSaved(ic);
                            }}
                            className="ci-del"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="ci-muted">
                    Icons you upload or download online appear here for 1-click reuse.
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <label style={{ fontSize: 11.5, opacity: 0.75 }}>Or paste an image URL:</label>
                <div className="ci-row">
                  <input
                    className="ci-input"
                    placeholder="https://…/icon.png"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyUrl()}
                  />
                  <button className="ci-primary" disabled={!url.trim()} onClick={applyUrl}>
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="ci-footer">
          <button
            className="ci-reset-btn"
            disabled={!currentIconId}
            onClick={resetIcon}
          >
            Remove icon
          </button>
          <span style={{ fontSize: 11.5, opacity: 0.55 }}>
            {assignedCount} customized {assignedCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </>
  );
};

renderWidget(IconPicker);
