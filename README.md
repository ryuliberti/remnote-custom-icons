# Custom Icons

A RemNote plugin to replace default document and folder icons with custom images (SVG, PNG, or JPG), a built-in offline icon library, or online Iconify search.

## Features

- **Hybrid Icon Library:**
  - **Built-in offline library:** 86 curated icons — including customizable solid **Folder** and **Document** shapes at the top, Lucide icons, and Devicon logos — with instant search, category filters, and a color palette + custom HEX color picker.
  - **Optional online search (Iconify):** search across 200,000+ open-source icons with pagination and mixed minimal/colored results. Picked SVGs are sanitized and saved locally in RemNote synced storage so they work offline.
- **File Uploads (SVG, PNG, JPG):** automatic multi-step downscaling up to 128×128 px (preserving aspect ratio and PNG transparency), plus SVG sanitization and `viewBox` normalization.
- **Deduplicated Synced Storage:** each unique icon is stored once and reused across documents via CSS variables.
- **UI Coverage:** left sidebar, open document/folder title, subfolders inside folders, *Documents & Folders* (auto-updating on rename), and search results.

## How to Open

- **Button below title:** hover the document or folder header and click **Change icon** *(can be toggled off in plugin settings)*.
- **Document `...` menu:** select **Custom Icon**.
- **Keyboard shortcut:** `Ctrl+Alt+I` (`Cmd+Option+I` on macOS) — customizable in RemNote keyboard settings.
- **Omnibar (`Ctrl+K` / `Ctrl+P`):** **Custom Icon: Choose icon** or **Custom Icon: Remove icon**.

## Privacy & External APIs

- When you use the **Search Online** tab, the plugin sends only your search query to the public [Iconify API](https://api.iconify.design) (with automatic fallback to official Iconify mirrors `api.simplesvg.com` and `api.unisvg.com`) to list and download the selected SVG. No notes or RemNote account data are ever sent.
- The **Library** and **Upload** tabs work 100% offline.
