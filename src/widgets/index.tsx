import {
  AppEvents,
  declareIndexPlugin,
  PluginCommandMenuLocation,
  type ReactRNPlugin,
  WidgetLocation,
} from '@remnote/plugin-sdk';
// No global CSS imports on purpose.
import {
  applyCachedCss,
  applyIcons,
  clearRemIcon,
  getCurrentDoc,
  getDocById,
  getFocusedOrCurrentDoc,
  LEGACY_ICONS_KEY,
  STORE_KEY,
} from '../lib/icons';

const SHOW_DOC_BUTTON_SETTING = 'show-doc-button';
const watchedRems = new Map<string, () => void>();
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

async function onActivate(plugin: ReactRNPlugin) {
  // Apply locally cached CSS immediately on cold start (before synced storage / initial sync finishes).
  await applyCachedCss(plugin);

  await plugin.settings.registerBooleanSetting({
    id: SHOW_DOC_BUTTON_SETTING,
    title: 'Show "Change icon" button below title',
    description: 'Displays a subtle button below document and folder titles to open the icon picker in 1 click.',
    defaultValue: true,
  });

  await plugin.app.registerWidget('icon_picker', WidgetLocation.Popup, {
    dimensions: { height: 'auto', width: 444 },
  });

  await plugin.app.registerWidget('doc_icon_button', WidgetLocation.DocumentBelowTitle, {
    dimensions: { height: 'auto', width: '100%' },
  });

  const scheduleRefresh = (delayMs = 250) => {
    if (refreshTimer) clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => {
      refreshTimer = null;
      refreshAndWatch(false).catch(() => {});
    }, delayMs);
  };

  const syncRemWatchers = (remIds: string[]) => {
    const nextSet = new Set(remIds);
    for (const [id, fn] of Array.from(watchedRems.entries())) {
      if (!nextSet.has(id)) {
        plugin.event.removeListener(AppEvents.RemChanged, id, fn);
        watchedRems.delete(id);
      }
    }
    for (const id of remIds) {
      if (!watchedRems.has(id)) {
        const fn = () => scheduleRefresh(250);
        watchedRems.set(id, fn);
        plugin.event.addListener(AppEvents.RemChanged, id, fn);
      }
    }
  };

  const refreshAndWatch = async (force = false, preserveCacheIfEmpty = false) => {
    const { remIds } = await applyIcons(plugin, force, preserveCacheIfEmpty);
    syncRemWatchers(remIds);
  };

  const openPickerForDoc = async (explicitRemId?: string) => {
    const doc = explicitRemId ? await getDocById(plugin, explicitRemId) : await getCurrentDoc(plugin);
    if (!doc) {
      await plugin.app.toast('Open a document or folder first.');
      return;
    }
    await plugin.widget.openPopup('icon_picker', doc);
  };

  // Only the index widget is allowed to call registerCSS.
  plugin.event.addListener(AppEvents.MessageBroadcast, undefined, async () => {
    await refreshAndWatch(true);
  });

  // React automatically when synced storage finishes loading on startup or syncs from another device.
  plugin.event.addListener(AppEvents.StorageSyncedChange, STORE_KEY, () => scheduleRefresh(100));
  plugin.event.addListener(AppEvents.StorageSyncedChange, LEGACY_ICONS_KEY, () => scheduleRefresh(100));

  // Also refresh name-based selectors (Documents & Folders / Search) on navigation.
  plugin.event.addListener(AppEvents.URLChange, undefined, () => scheduleRefresh(150));
  plugin.event.addListener(AppEvents.CurrentWindowTreeChange, undefined, () => scheduleRefresh(150));

  // 1. Omnibar command + customizable keyboard shortcut (Ctrl+Alt+I / Cmd+Option+I)
  await plugin.app.registerCommand({
    id: 'custom-icons-pick',
    name: 'Custom Icon: Choose icon',
    description: 'Pick or upload a custom icon (SVG, PNG, or JPG) for the open document or folder.',
    keywords: 'icon emoji image upload svg png jpg custom change',
    keyboardShortcut: 'mod+alt+i',
    action: async () => {
      await openPickerForDoc();
    },
  });

  await plugin.app.registerCommand({
    id: 'custom-icons-remove',
    name: 'Custom Icon: Remove icon',
    keywords: 'icon remove reset default clear',
    action: async () => {
      const doc = await getCurrentDoc(plugin);
      if (!doc) return;
      await clearRemIcon(plugin, doc.remId);
      await refreshAndWatch(true);
      await plugin.app.toast(`Restored default icon for "${doc.name}".`);
    },
  });

  // 2. Document "..." menu
  await plugin.app.registerMenuItem({
    id: 'custom-icons-doc-menu',
    name: 'Custom Icon',
    location: PluginCommandMenuLocation.DocumentMenu,
    action: async (args: any) => {
      const id =
        typeof args?.remId === 'string'
          ? args.remId
          : typeof args?.documentId === 'string'
            ? args.documentId
            : undefined;
      await openPickerForDoc(id);
    },
  });

  // 3. Per-Rem / subfolder menu
  await plugin.app.registerRemMenuItem({
    id: 'custom-icons-rem-menu',
    name: 'Custom Icon',
    keywords: 'icon custom',
    action: async () => {
      const doc = await getFocusedOrCurrentDoc(plugin);
      if (!doc) {
        await plugin.app.toast('Select a document, folder, or Rem first.');
        return;
      }
      await plugin.widget.openPopup('icon_picker', doc);
    },
  });

  // Initial pass: preserve locally cached CSS if synced storage isn't hydrated yet.
  await refreshAndWatch(false, true);

  // Authoritative refresh once RemNote finishes its initial sync on cold start.
  plugin.app
    .waitForInitialSync()
    .then(() => refreshAndWatch(true, false))
    .catch(() => {});
}

async function onDeactivate(plugin: ReactRNPlugin) {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  for (const [id, fn] of Array.from(watchedRems.entries())) {
    plugin.event.removeListener(AppEvents.RemChanged, id, fn);
  }
  watchedRems.clear();
}

declareIndexPlugin(onActivate, onDeactivate);
