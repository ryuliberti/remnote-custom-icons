import { useEffect, useState } from 'react';
import { AppEvents, renderWidget, usePlugin, WidgetLocation } from '@remnote/plugin-sdk';
import { getCurrentDoc, getDocById } from '../lib/icons';

export const SHOW_DOC_BUTTON_SETTING = 'show-doc-button';

const BTN_STYLES = `
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: transparent; overflow: hidden; }
  .ci-bar {
    display: flex;
    align-items: center;
    padding: 0 0 6px 0;
  }
  .ci-trigger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 9px;
    border-radius: 6px;
    border: 1px solid rgba(127, 127, 127, 0.25);
    background: transparent;
    color: inherit;
    opacity: 0.68;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    cursor: pointer;
    transition: opacity 0.14s, background-color 0.14s, border-color 0.14s;
  }
  .ci-trigger:hover {
    opacity: 1;
    background: rgba(127, 127, 127, 0.14);
    border-color: rgba(127, 127, 127, 0.42);
  }
`;

export const DocIconButton = () => {
  const plugin = usePlugin();
  const [showButton, setShowButton] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    const syncSetting = async () => {
      const val = await plugin.settings.getSetting<boolean>(SHOW_DOC_BUTTON_SETTING);
      if (active) setShowButton(val !== false);
    };

    syncSetting().catch(() => {});

    const onSettingChange = () => {
      syncSetting().catch(() => {});
    };
    plugin.event.addListener(AppEvents.SettingChanged, SHOW_DOC_BUTTON_SETTING, onSettingChange);
    return () => {
      active = false;
      plugin.event.removeListener(AppEvents.SettingChanged, SHOW_DOC_BUTTON_SETTING, onSettingChange);
    };
  }, []);

  if (!showButton) return null;

  const openPicker = async () => {
    // Resolve the currently open document at click time: RemNote may reuse the mounted
    // DocumentBelowTitle widget when navigating between documents/folders in the same pane.
    const liveDoc = await getCurrentDoc(plugin);
    if (liveDoc) {
      await plugin.widget.openPopup('icon_picker', liveDoc);
      return;
    }
    const ctx = await plugin.widget.getWidgetContext<WidgetLocation.DocumentBelowTitle>();
    if (ctx?.documentId) {
      const doc = await getDocById(plugin, ctx.documentId);
      await plugin.widget.openPopup('icon_picker', doc);
    }
  };

  return (
    <>
      <style>{BTN_STYLES}</style>
      <div className="ci-bar">
        <button className="ci-trigger" onClick={openPicker} title="Choose custom icon (Ctrl+Alt+I)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <span>Change icon</span>
        </button>
      </div>
    </>
  );
};

renderWidget(DocIconButton);
