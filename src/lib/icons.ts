import type { ReactRNPlugin, RNPlugin } from '@remnote/plugin-sdk';
import type { UploadedIconKind } from './imageUpload';

type AnyPlugin = ReactRNPlugin | RNPlugin;

export const CSS_ID = 'custom-icons';
export const LEGACY_ICONS_KEY = 'icons'; // v1: Record<remId, url>
export const STORE_KEY = 'icons_store_v2';
export const LOCAL_CSS_CACHE_KEY = 'cached_css_v2';

export type StoredIconKind = UploadedIconKind | 'url' | 'sample' | 'catalog' | 'online';

export interface StoredIcon {
  id: string;
  name: string;
  src: string;
  kind: StoredIconKind;
  width?: number;
  height?: number;
  createdAt: number;
}

export interface IconStore {
  /** Deduplicated icon catalog keyed by deterministic content id. */
  library: Record<string, StoredIcon>;
  /** Mapping of remId -> iconId. */
  assignments: Record<string, string>;
}

const svg = (body: string) =>
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${body}</svg>`
  );

export const SAMPLE_ICONS: { name: string; url: string }[] = [
  {
    name: 'Star',
    url: svg('<path fill="#f5b301" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z"/>'),
  },
  {
    name: 'Book',
    url: svg('<path fill="#2f7de1" d="M4 3h7a3 3 0 0 1 1 .2V21a3 3 0 0 0-1-.2H4z"/><path fill="#1c5fb8" d="M20 3h-7a3 3 0 0 0-1 .2V21a3 3 0 0 1 1-.2h7z"/>'),
  },
  {
    name: 'Chemistry',
    url: svg('<path fill="#8e44ad" d="M9 2h6v2h-1v5.2l5.6 9.7A2 2 0 0 1 17.9 22H6.1a2 2 0 0 1-1.7-3.1L10 9.2V4H9z"/><circle cx="10" cy="17" r="1.4" fill="#fff"/><circle cx="14" cy="15" r="1" fill="#fff"/>'),
  },
  {
    name: 'Code',
    url: svg('<rect width="24" height="24" rx="5" fill="#27ae60"/><path fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M9 8l-4 4 4 4M15 8l4 4-4 4"/>'),
  },
  {
    name: 'Heart',
    url: svg('<path fill="#e74c3c" d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>'),
  },
  {
    name: 'Folder',
    url: svg('<path fill="#f39c12" d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>'),
  },
  {
    name: 'Globe',
    url: svg('<circle cx="12" cy="12" r="10" fill="#16a085"/><path fill="none" stroke="#fff" stroke-width="1.5" d="M2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20"/>'),
  },
  {
    name: 'Idea',
    url: svg('<path fill="#f1c40f" d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/><rect x="8.5" y="18" width="7" height="2" rx="1" fill="#7f8c8d"/><rect x="9.5" y="21" width="5" height="1.6" rx=".8" fill="#7f8c8d"/>'),
  },
];

/** Fast deterministic 64-bit hex hash (two FNV-1a passes) for content deduplication. */
export function hashIconSource(src: string): string {
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < src.length; i++) {
    const c = src.charCodeAt(i);
    h1 ^= c;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= c + (i & 0xff);
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  const a = (h1 >>> 0).toString(16).padStart(8, '0');
  const b = (h2 >>> 0).toString(16).padStart(8, '0');
  return `ic_${a}${b}`;
}

export function emptyStore(): IconStore {
  return { library: {}, assignments: {} };
}

/** Loads the v2 store, transparently migrating any v1 assignments if present. */
export async function getStore(plugin: AnyPlugin): Promise<IconStore> {
  const existing = await plugin.storage.getSynced<IconStore>(STORE_KEY);
  if (existing && typeof existing === 'object' && existing.library && existing.assignments) {
    return {
      library: { ...existing.library },
      assignments: { ...existing.assignments },
    };
  }

  const store = emptyStore();
  const legacy = await plugin.storage.getSynced<Record<string, string>>(LEGACY_ICONS_KEY);
  if (legacy && typeof legacy === 'object') {
    let migrated = false;
    const now = Date.now();
    for (const [remId, src] of Object.entries(legacy)) {
      if (!remId || typeof src !== 'string' || !src) continue;
      const sample = SAMPLE_ICONS.find((s) => s.url === src);
      const id = hashIconSource(src);
      if (!store.library[id]) {
        store.library[id] = {
          id,
          name: sample ? sample.name : 'Saved icon',
          src,
          kind: sample ? 'sample' : 'url',
          createdAt: now,
        };
      }
      store.assignments[remId] = id;
      migrated = true;
    }
    if (migrated) {
      await plugin.storage.setSynced(STORE_KEY, store);
    }
  }

  return store;
}

export async function saveStore(plugin: AnyPlugin, store: IconStore): Promise<void> {
  await plugin.storage.setSynced(STORE_KEY, store);
}

/**
 * Adds (or deduplicates) an icon in the library and assigns it to `remId`.
 * Returns the stored icon entry and whether it was already present in the library.
 */
export async function assignIcon(
  plugin: AnyPlugin,
  remId: string,
  icon: {
    src: string;
    name: string;
    kind: StoredIconKind;
    width?: number;
    height?: number;
  }
): Promise<{ store: IconStore; icon: StoredIcon; deduplicated: boolean }> {
  const store = await getStore(plugin);
  const id = hashIconSource(icon.src);
  const deduplicated = Boolean(store.library[id]);

  if (!deduplicated) {
    store.library[id] = {
      id,
      name: icon.name,
      src: icon.src,
      kind: icon.kind,
      width: icon.width,
      height: icon.height,
      createdAt: Date.now(),
    };
  }

  store.assignments[remId] = id;
  await saveStore(plugin, store);
  return { store, icon: store.library[id], deduplicated };
}

/** Assigns an already-saved library icon to `remId`. */
export async function assignLibraryIcon(
  plugin: AnyPlugin,
  remId: string,
  iconId: string
): Promise<IconStore> {
  const store = await getStore(plugin);
  if (!store.library[iconId]) return store;
  store.assignments[remId] = iconId;
  await saveStore(plugin, store);
  return store;
}

/** Clears the custom icon of `remId` without deleting the icon from the saved library. */
export async function clearRemIcon(plugin: AnyPlugin, remId: string): Promise<IconStore> {
  const store = await getStore(plugin);
  if (remId in store.assignments) {
    delete store.assignments[remId];
    await saveStore(plugin, store);
  }
  return store;
}

/** Deletes an icon from the saved library and clears any assignments referencing it. */
export async function deleteLibraryIcon(plugin: AnyPlugin, iconId: string): Promise<IconStore> {
  const store = await getStore(plugin);
  delete store.library[iconId];
  for (const [remId, assignedId] of Object.entries(store.assignments)) {
    if (assignedId === iconId) {
      delete store.assignments[remId];
    }
  }
  await saveStore(plugin, store);
  return store;
}

/** Resolves `{ remId, name }` for an explicit remId. */
export async function getDocById(plugin: AnyPlugin, remId: string) {
  const rem = await plugin.rem.findOne(remId);
  const name = rem?.text ? (await plugin.richText.toString(rem.text)).trim() : '';
  return { remId, name };
}

/** Returns the document currently open in the focused pane (falls back to the focused rem). */
export async function getCurrentDoc(plugin: AnyPlugin) {
  let remId: string | undefined;
  try {
    const paneId = await plugin.window.getFocusedPaneId();
    remId = await plugin.window.getOpenPaneRemId(paneId);
  } catch (_) {}
  if (!remId) remId = (await plugin.focus.getFocusedRem())?._id;
  if (!remId) return undefined;
  return getDocById(plugin, remId);
}

/** Returns the currently focused Rem (for Rem context menus), falling back to the open document. */
export async function getFocusedOrCurrentDoc(plugin: AnyPlugin) {
  try {
    const focused = await plugin.focus.getFocusedRem();
    if (focused?._id) return getDocById(plugin, focused._id);
  } catch (_) {}
  return getCurrentDoc(plugin);
}

function escapeCssUrl(url: string): string {
  return url.replace(/["\\\n\r]/g, (c) => encodeURIComponent(c));
}

function escapeCssAttrValue(val: string): string {
  return val.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\n\r]/g, ' ');
}

/**
 * Generates CSS targeting:
 *  - Left sidebar rows (`Document Sidebar Row <id>`)
 *  - Subfolders / child documents inside folders (`[data-rem-id="<id>"] [data-test="Rem Bullet Container"]`)
 *  - Open document / folder title header (`[data-document-id="<id>"] #doc-title`)
 *  - Documents & Folders screen (`[data-test="All Notes Document: <name>"]`)
 * Uses CSS custom properties in :root so each unique icon image is emitted only once.
 * Selectors verified against RemNote Desktop 1.30.3 DOM.
 */
export function buildCss(store: IconStore, remNames: Record<string, string> = {}): string {
  const usedIconIds = new Set<string>();
  const activeAssignments: [string, string][] = [];

  for (const [remId, iconId] of Object.entries(store.assignments)) {
    const safeId = remId.replace(/[^a-zA-Z0-9_-]/g, '');
    const icon = store.library[iconId];
    if (!safeId || !icon || !icon.src) continue;
    usedIconIds.add(iconId);
    activeAssignments.push([safeId, iconId]);
  }

  if (activeAssignments.length === 0) return '';

  const varDecls: string[] = [];
  for (const iconId of Array.from(usedIconIds)) {
    const icon = store.library[iconId];
    const safeVar = iconId.replace(/[^a-zA-Z0-9_-]/g, '');
    varDecls.push(`  --ci-${safeVar}: url("${escapeCssUrl(icon.src)}");`);
  }

  const rules: string[] = [`:root {\n${varDecls.join('\n')}\n}`];

  for (const [safeId, iconId] of activeAssignments) {
    const safeVar = iconId.replace(/[^a-zA-Z0-9_-]/g, '');
    const bgVar = `var(--ci-${safeVar})`;
    const sidebarRow = `[data-test="Document Sidebar Row ${safeId}"]`;
    const docHeader = `[data-document-id="${safeId}"] #doc-title`;
    const remBullet = `[data-rem-id="${safeId}"] [data-test="Rem Bullet Container"]`;

    rules.push(
      // 1. Sidebar: folder/emoji <img> icon (padding-left hides original src; contain scales small & large icons)
      `${sidebarRow} img[data-test="rem-emoji"] {
        box-sizing: border-box !important;
        width: 18px !important;
        height: 18px !important;
        padding-left: 18px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 2. Sidebar: text/Unicode emoji fallback
      `${sidebarRow} [data-test="rem-emoji"]:not(img) {
        color: transparent !important;
        font-size: 0 !important;
        display: inline-block !important;
        width: 18px !important;
        height: 18px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 3. Sidebar: default document icon (masked span, excluding folder chevron & hover "+" button)
      `${sidebarRow} > div:first-child span[data-icon]:not([data-icon^="chevron"]) {
        background-color: transparent !important;
        -webkit-mask-image: none !important;
        mask-image: none !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 4. Inside folder / hierarchy editor: subfolder or child document <img> icon (16x16)
      `${remBullet} img[data-test="rem-emoji"] {
        box-sizing: border-box !important;
        width: 16px !important;
        height: 16px !important;
        padding-left: 16px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 5. Inside folder / hierarchy editor: text/Unicode emoji fallback
      `${remBullet} [data-test="rem-emoji"]:not(img) {
        color: transparent !important;
        font-size: 0 !important;
        display: inline-block !important;
        width: 16px !important;
        height: 16px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 6. Inside folder / hierarchy editor: default document icon (masked span)
      `${remBullet} span[data-icon]:not([data-icon^="chevron"]) {
        background-color: transparent !important;
        -webkit-mask-image: none !important;
        mask-image: none !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 7. Document / folder title header: folder/emoji <img> icon
      `${docHeader} img[data-test="rem-emoji"] {
        box-sizing: border-box !important;
        width: 40px !important;
        height: 40px !important;
        padding-left: 40px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 8. Document / folder title header: text/Unicode emoji fallback
      `${docHeader} [data-test="rem-emoji"]:not(img) {
        color: transparent !important;
        font-size: 0 !important;
        display: inline-block !important;
        width: 36px !important;
        height: 36px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`,

      // 9. Document title header when the document has NO emoji/icon yet
      `${docHeader}:not(:has([data-test="rem-emoji"]))::before {
        content: "" !important;
        display: inline-block !important;
        flex-shrink: 0 !important;
        width: 36px !important;
        height: 36px !important;
        margin-right: 8px !important;
        background-color: transparent !important;
        background-image: ${bgVar} !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
      }`
    );

    // 10. Documents & Folders ("All Notes") + Search results (`data-remopt-title`) — matched by live document title.
    // Scoped strictly to `> div:first-child > :first-child` (the left icon box) so right-side action buttons (`...`) are never touched.
    const rawName = remNames[safeId]?.trim();
    if (rawName) {
      const escapedName = escapeCssAttrValue(rawName);
      const allNotesIconBox = `[data-test="All Notes Document: ${escapedName}"] > div:first-child > :first-child`;
      const searchIconBox = `[data-remopt-title="${escapedName}"] > div:first-child > :first-child`;
      rules.push(
        `${allNotesIconBox} img[data-test="rem-emoji"],
        ${searchIconBox} img[data-test="rem-emoji"] {
          box-sizing: border-box !important;
          width: 20px !important;
          height: 20px !important;
          padding-left: 20px !important;
          background-color: transparent !important;
          background-image: ${bgVar} !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: contain !important;
        }`,
        `${allNotesIconBox} [data-test="rem-emoji"]:not(img),
        ${searchIconBox} [data-test="rem-emoji"]:not(img) {
          color: transparent !important;
          font-size: 0 !important;
          display: inline-block !important;
          width: 20px !important;
          height: 20px !important;
          background-color: transparent !important;
          background-image: ${bgVar} !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: contain !important;
        }`,
        `${allNotesIconBox} span[data-icon]:not([data-icon^="chevron"]),
        ${searchIconBox} span[data-icon]:not([data-icon^="chevron"]) {
          background-color: transparent !important;
          -webkit-mask-image: none !important;
          mask-image: none !important;
          background-image: ${bgVar} !important;
          background-position: center !important;
          background-repeat: no-repeat !important;
          background-size: contain !important;
        }`
      );
    }
  }

  return rules.join('\n');
}

async function resolveRemNames(plugin: AnyPlugin, remIds: string[]): Promise<Record<string, string>> {
  const names: Record<string, string> = {};
  await Promise.all(
    remIds.map(async (remId) => {
      try {
        const rem = await plugin.rem.findOne(remId);
        if (rem?.text) {
          const text = (await plugin.richText.toString(rem.text)).trim();
          if (text) names[remId] = text;
        }
      } catch (_) {}
    })
  );
  return names;
}

let lastAppliedCss: string | null = null;

/**
 * Applies the last locally cached CSS immediately on cold start before cloud/initial sync finishes,
 * preventing default RemNote icons from flashing or staying visible until the user navigates.
 */
export async function applyCachedCss(plugin: AnyPlugin): Promise<boolean> {
  try {
    const cached = await plugin.storage.getLocal<string>(LOCAL_CSS_CACHE_KEY);
    if (typeof cached === 'string' && cached.length > 0) {
      await plugin.app.registerCSS(CSS_ID, cached);
      lastAppliedCss = cached;
      return true;
    }
  } catch (_) {}
  return false;
}

export async function applyIcons(
  plugin: AnyPlugin,
  force = false,
  preserveCacheIfEmpty = false
) {
  const store = await getStore(plugin);
  const remIds = Object.keys(store.assignments);
  if (preserveCacheIfEmpty && remIds.length === 0 && lastAppliedCss) {
    return { count: 0, remIds };
  }
  const remNames = await resolveRemNames(plugin, remIds);
  const css = buildCss(store, remNames);
  if (force || css !== lastAppliedCss) {
    await plugin.app.registerCSS(CSS_ID, css);
    lastAppliedCss = css;
    try {
      await plugin.storage.setLocal(LOCAL_CSS_CACHE_KEY, css);
    } catch (_) {}
  }
  return { count: remIds.length, remIds };
}
