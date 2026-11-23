// Offline curated catalog: Lucide (ISC) + Devicon (MIT).
// Monochrome icons use currentColor and are tinted dynamically with the user's chosen color.

export type CatalogCategory = 'all' | 'study' | 'folders' | 'life' | 'tech';

export interface CatalogIcon {
  id: string;
  name: string;
  category: Exclude<CatalogCategory, 'all'>;
  keywords: string;
  monochrome: boolean;
  viewBox: string;
  body: string;
}

export const ICON_COLORS: { name: string; hex: string }[] = [
  { name: 'Light neutral', hex: '#cbd5e1' },
  { name: 'Slate', hex: '#64748b' },
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Purple', hex: '#a855f7' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Yellow', hex: '#eab308' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Teal', hex: '#14b8a6' },
];

export const CATALOG_CATEGORIES: { id: CatalogCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'study', label: 'Study' },
  { id: 'folders', label: 'Folders' },
  { id: 'life', label: 'Life' },
  { id: 'tech', label: 'Tech' },
];

export function renderCatalogSvgDataUrl(icon: CatalogIcon, color: string): string {
  const body = icon.monochrome ? icon.body.replace(/currentColor/g, color) : icon.body;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${icon.viewBox}" preserveAspectRatio="xMidYMid meet">${body}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

export const BUILTIN_CATALOG: CatalogIcon[] = [
  {
    "id": "lucide:book-open",
    "name": "Book",
    "category": "study",
    "keywords": "book book-open book study reading notes textbook",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 5v16m8.001-2A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2a5 5 0 0 1 4-2z\"/>"
  },
  {
    "id": "lucide:graduation-cap",
    "name": "Graduation",
    "category": "study",
    "keywords": "graduation graduation-cap graduation school college university class",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0zM22 10v6\"/><path d=\"M6 12.5V16a6 3 0 0 0 12 0v-3.5\"/></g>"
  },
  {
    "id": "lucide:brain",
    "name": "Brain",
    "category": "study",
    "keywords": "brain brain brain memory mind flashcards psychology",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 18V5m3 8a4.17 4.17 0 0 1-3-4a4.17 4.17 0 0 1-3 4m8.707-6.706A3 3 0 1 0 12 5a3 3 0 1 0-5.707 1.294\"/><path d=\"M17.996 5.125a4 4 0 0 1 2.526 5.77\"/><path d=\"M18 18a4 4 0 0 0 2-7.465\"/><path d=\"M19.967 17.482a4 4 0 1 1-7.967.517a4 4 0 1 1-7.967-.517\"/><path d=\"M6 18a4 4 0 0 1-2-7.465\"/><path d=\"M6.004 5.125a4 4 0 0 0-2.526 5.77\"/></g>"
  },
  {
    "id": "lucide:flask-conical",
    "name": "Chemistry",
    "category": "study",
    "keywords": "chemistry flask-conical chemistry lab science experiment flask",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7\"/>"
  },
  {
    "id": "lucide:atom",
    "name": "Atom",
    "category": "study",
    "keywords": "atom atom atom physics science quantum",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><path d=\"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9c-4.54-4.52-9.87-6.54-11.9-4.5c-2.04 2.03-.02 7.36 4.5 11.9c4.54 4.52 9.87 6.54 11.9 4.5\"/><path d=\"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9c-2.03-2.04-7.36-.02-11.9 4.5c-4.52 4.54-6.54 9.87-4.5 11.9c2.03 2.04 7.36.02 11.9-4.5\"/></g>"
  },
  {
    "id": "lucide:calculator",
    "name": "Math",
    "category": "study",
    "keywords": "math calculator math calculator numbers algebra",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"16\" height=\"20\" x=\"4\" y=\"2\" rx=\"2\"/><path d=\"M8 6h8m0 8v4m0-8h.01M12 10h.01M8 10h.01M12 14h.01M8 14h.01M12 18h.01M8 18h.01\"/></g>"
  },
  {
    "id": "lucide:languages",
    "name": "Languages",
    "category": "study",
    "keywords": "languages languages language english translate linguistics",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m5 8l6 6m-7 0l6-6l2-3M2 5h12M7 2h1m14 20l-5-10l-5 10m2-4h6\"/>"
  },
  {
    "id": "lucide:notebook-pen",
    "name": "Notebook",
    "category": "study",
    "keywords": "notebook notebook-pen notebook notes journal writing",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4M2 6h4m-4 4h4m-4 4h4m-4 4h4\"/><path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\"/></g>"
  },
  {
    "id": "lucide:pencil",
    "name": "Pencil",
    "category": "study",
    "keywords": "pencil pencil pencil write edit draft",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4\"/>"
  },
  {
    "id": "lucide:lightbulb",
    "name": "Idea",
    "category": "study",
    "keywords": "idea lightbulb idea lightbulb insight brainstorm",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 14c.2-1 .7-1.7 1.5-2.5c1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5c.7.7 1.3 1.5 1.5 2.5m0 4h6m-5 4h4\"/>"
  },
  {
    "id": "lucide:microscope",
    "name": "Biology",
    "category": "study",
    "keywords": "biology microscope biology microscope lab science",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 18h8M3 22h18m-7 0a7 7 0 1 0 0-14h-1m-4 6h2m-2-2a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Zm3-6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3\"/>"
  },
  {
    "id": "lucide:dna",
    "name": "Genetics",
    "category": "study",
    "keywords": "genetics dna dna genetics biology medicine",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m10 16l1.5 1.5M14 8l-1.5-1.5M15 2c-1.798 1.998-2.518 3.995-2.807 5.993M16.5 10.5l1 1M17 6l-2.891-2.891M2 15c6.667-6 13.333 0 20-6m-2 0l.891.891M3.109 14.109L4 15m2.5-2.5l1 1M7 18l2.891 2.891M9 22c1.798-1.998 2.518-3.995 2.807-5.993\"/>"
  },
  {
    "id": "lucide:compass",
    "name": "Compass",
    "category": "study",
    "keywords": "compass compass compass geography explore guide",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m16.24 7.76l-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z\"/></g>"
  },
  {
    "id": "lucide:globe",
    "name": "Globe",
    "category": "study",
    "keywords": "globe globe globe world history geography web",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g>"
  },
  {
    "id": "lucide:library",
    "name": "Library",
    "category": "study",
    "keywords": "library library library books shelf reading",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m16 6l4 14M12 6v14M8 8v12M4 4v16\"/>"
  },
  {
    "id": "lucide:scale",
    "name": "Law",
    "category": "study",
    "keywords": "law scale law justice scale legal ethics",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 3v18m7-13l3 8a5 5 0 0 1-6 0zV7\"/><path d=\"M3 7h1a17 17 0 0 0 8-2a17 17 0 0 0 8 2h1M5 8l3 8a5 5 0 0 1-6 0zV7m2 14h10\"/></g>"
  },
  {
    "id": "lucide:folder",
    "name": "Folder",
    "category": "folders",
    "keywords": "folder folder folder directory group",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/>"
  },
  {
    "id": "lucide:folder-open",
    "name": "Open Folder",
    "category": "folders",
    "keywords": "open folder folder-open folder open directory",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/>"
  },
  {
    "id": "lucide:file-text",
    "name": "Document",
    "category": "folders",
    "keywords": "document file-text document note page text",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5M10 9H8m8 4H8m8 4H8\"/></g>"
  },
  {
    "id": "lucide:files",
    "name": "Files",
    "category": "folders",
    "keywords": "files files files documents pages",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8\"/><path d=\"M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706zM5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1\"/></g>"
  },
  {
    "id": "lucide:inbox",
    "name": "Inbox",
    "category": "folders",
    "keywords": "inbox inbox inbox capture triage",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M22 12h-6l-2 3h-4l-2-3H2\"/><path d=\"M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11\"/></g>"
  },
  {
    "id": "lucide:archive",
    "name": "Archive",
    "category": "folders",
    "keywords": "archive archive archive storage box",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"20\" height=\"5\" x=\"2\" y=\"3\" rx=\"1\"/><path d=\"M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8m-10 4h4\"/></g>"
  },
  {
    "id": "lucide:tag",
    "name": "Tag",
    "category": "folders",
    "keywords": "tag tag tag label category",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z\"/><circle cx=\"7.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/></g>"
  },
  {
    "id": "lucide:bookmark",
    "name": "Bookmark",
    "category": "folders",
    "keywords": "bookmark bookmark bookmark saved favorite",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z\"/>"
  },
  {
    "id": "lucide:star",
    "name": "Star",
    "category": "folders",
    "keywords": "star star star favorite highlight",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z\"/>"
  },
  {
    "id": "lucide:pin",
    "name": "Pin",
    "category": "folders",
    "keywords": "pin pin pin pinned important",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4a1 1 0 0 1 1 1z\"/>"
  },
  {
    "id": "lucide:calendar",
    "name": "Calendar",
    "category": "folders",
    "keywords": "calendar calendar calendar schedule date daily",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M8 2v3m8-3v3\"/><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M3 9h18\"/></g>"
  },
  {
    "id": "lucide:clock",
    "name": "Clock",
    "category": "folders",
    "keywords": "clock clock clock time routine timer",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/></g>"
  },
  {
    "id": "lucide:list-todo",
    "name": "Tasks",
    "category": "folders",
    "keywords": "tasks list-todo tasks todo checklist plan",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M13 5h8m-8 7h8m-8 7h8M3 17l2 2l4-4\"/><rect width=\"6\" height=\"6\" x=\"3\" y=\"4\" rx=\"1\"/></g>"
  },
  {
    "id": "lucide:target",
    "name": "Goal",
    "category": "folders",
    "keywords": "goal target goal target focus objective",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"12\" r=\"6\"/><circle cx=\"12\" cy=\"12\" r=\"2\"/></g>"
  },
  {
    "id": "lucide:zap",
    "name": "Zap",
    "category": "folders",
    "keywords": "zap zap zap energy quick lightning",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z\"/>"
  },
  {
    "id": "lucide:flag",
    "name": "Flag",
    "category": "folders",
    "keywords": "flag flag flag milestone project",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528\"/>"
  },
  {
    "id": "lucide:house",
    "name": "Home",
    "category": "life",
    "keywords": "home house home house personal dashboard",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\"/><path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/></g>"
  },
  {
    "id": "lucide:briefcase",
    "name": "Work",
    "category": "life",
    "keywords": "work briefcase work job career business",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16\"/><rect width=\"20\" height=\"14\" x=\"2\" y=\"6\" rx=\"2\"/></g>"
  },
  {
    "id": "lucide:wallet",
    "name": "Finance",
    "category": "life",
    "keywords": "finance wallet finance money wallet budget",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1\"/><path d=\"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4\"/></g>"
  },
  {
    "id": "lucide:chart-line",
    "name": "Chart",
    "category": "life",
    "keywords": "chart chart-line chart graph analytics economics",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M3 3v16a2 2 0 0 0 2 2h16\"/><path d=\"m19 9l-5 5l-4-4l-3 3\"/></g>"
  },
  {
    "id": "lucide:heart",
    "name": "Heart",
    "category": "life",
    "keywords": "heart heart heart health favorite wellness",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\"/>"
  },
  {
    "id": "lucide:stethoscope",
    "name": "Medicine",
    "category": "life",
    "keywords": "medicine stethoscope medicine medical doctor health",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M11 2v2M5 2v2m0-1H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1\"/><path d=\"M8 15a6 6 0 0 0 12 0v-3\"/><circle cx=\"20\" cy=\"10\" r=\"2\"/></g>"
  },
  {
    "id": "lucide:dumbbell",
    "name": "Fitness",
    "category": "life",
    "keywords": "fitness dumbbell fitness gym workout exercise",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829zM2.5 21.5l1.4-1.4M20.1 3.9l1.4-1.4M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829zM9.6 14.4l4.8-4.8\"/>"
  },
  {
    "id": "lucide:music",
    "name": "Music",
    "category": "life",
    "keywords": "music music music audio song sound",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/></g>"
  },
  {
    "id": "lucide:film",
    "name": "Film",
    "category": "life",
    "keywords": "film film film movie video cinema",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"/><path d=\"M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4\"/></g>"
  },
  {
    "id": "lucide:camera",
    "name": "Camera",
    "category": "life",
    "keywords": "camera camera camera photo photography image",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/></g>"
  },
  {
    "id": "lucide:palette",
    "name": "Art",
    "category": "life",
    "keywords": "art palette art design drawing colors",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 22a1 1 0 0 1 0-20a10 9 0 0 1 10 9a5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z\"/><circle cx=\"13.5\" cy=\"6.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\".5\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\"/></g>"
  },
  {
    "id": "lucide:gamepad-2",
    "name": "Games",
    "category": "life",
    "keywords": "games gamepad-2 game gaming controller",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M6 11h4M8 9v4m7-1h.01M18 10h.01m-.69-5H6.68a4 4 0 0 0-3.978 3.59l-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258q-.01-.075-.017-.151A4 4 0 0 0 17.32 5\"/>"
  },
  {
    "id": "lucide:plane",
    "name": "Travel",
    "category": "life",
    "keywords": "travel plane travel plane trip flight",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8L4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1l3 2l2 3l1-1v-3l3-2l3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2\"/>"
  },
  {
    "id": "lucide:coffee",
    "name": "Coffee",
    "category": "life",
    "keywords": "coffee coffee coffee break routine cafe",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M10 2v2m4-2v2m2 4a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1M6 2v2\"/>"
  },
  {
    "id": "lucide:leaf",
    "name": "Nature",
    "category": "life",
    "keywords": "nature leaf leaf nature plant ecology",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M11 20a10 10 0 0 0 10-10a25.9 25.9 0 0 0-1.04-7.281a1 1 0 0 0-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0 0 11 20\"/><path d=\"M2 21a5 5 0 0 1 2.911-4.544C7.613 15.212 8.351 15.24 11 13\"/></g>"
  },
  {
    "id": "lucide:trophy",
    "name": "Trophy",
    "category": "life",
    "keywords": "trophy trophy trophy award achievement",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 14.66V17a1 1 0 0 1-1 1a2 2 0 0 0-2 2v2m7-7.34V17a1 1 0 0 0 1 1a2 2 0 0 1 2 2v2m.916-12H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3M4 22h16\"/><path d=\"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z\"/><path d=\"M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3\"/></g>"
  },
  {
    "id": "lucide:code-xml",
    "name": "Code",
    "category": "tech",
    "keywords": "code code-xml code programming dev software",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m18 16l4-4l-4-4M6 8l-4 4l4 4m8.5-12l-5 16\"/>"
  },
  {
    "id": "lucide:terminal",
    "name": "Terminal",
    "category": "tech",
    "keywords": "terminal terminal terminal cli bash shell",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 19h8M4 17l6-6l-6-6\"/>"
  },
  {
    "id": "lucide:database",
    "name": "Database",
    "category": "tech",
    "keywords": "database database database sql db data",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><ellipse cx=\"12\" cy=\"5\" rx=\"9\" ry=\"3\"/><path d=\"M3 5v14a9 3 0 0 0 18 0V5\"/><path d=\"M3 12a9 3 0 0 0 18 0\"/></g>"
  },
  {
    "id": "lucide:cpu",
    "name": "Hardware",
    "category": "tech",
    "keywords": "hardware cpu cpu hardware processor computer",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 20v2m0-20v2m5 16v2m0-20v2M2 12h2m-2 5h2M2 7h2m16 5h2m-2 5h2M20 7h2M7 20v2M7 2v2\"/><rect width=\"16\" height=\"16\" x=\"4\" y=\"4\" rx=\"2\"/><rect width=\"8\" height=\"8\" x=\"8\" y=\"8\" rx=\"1\"/></g>"
  },
  {
    "id": "lucide:cloud",
    "name": "Cloud",
    "category": "tech",
    "keywords": "cloud cloud cloud aws server infra",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9\"/>"
  },
  {
    "id": "lucide:lock",
    "name": "Security",
    "category": "tech",
    "keywords": "security lock lock security password privacy",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"18\" height=\"11\" x=\"3\" y=\"11\" rx=\"2\" ry=\"2\"/><path d=\"M7 11V7a5 5 0 0 1 10 0v4\"/></g>"
  },
  {
    "id": "lucide:wrench",
    "name": "Tools",
    "category": "tech",
    "keywords": "tools wrench wrench tools config settings",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z\"/>"
  },
  {
    "id": "lucide:bug",
    "name": "Bug",
    "category": "tech",
    "keywords": "bug bug bug debug error issue",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 20v-9m2-4a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4zm.12-3.12L16 2\"/><path d=\"M21 21a4 4 0 0 0-3.81-4M21 5a4 4 0 0 1-3.55 3.97M22 13h-4M3 21a4 4 0 0 1 3.81-4M3 5a4 4 0 0 0 3.55 3.97M6 13H2M8 2l1.88 1.88M9 7.13V6a3 3 0 1 1 6 0v1.13\"/></g>"
  },
  {
    "id": "lucide:rocket",
    "name": "Rocket",
    "category": "tech",
    "keywords": "rocket rocket rocket launch deploy startup",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09\"/><path d=\"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z\"/><path d=\"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05\"/></g>"
  },
  {
    "id": "lucide:git-branch",
    "name": "Git",
    "category": "tech",
    "keywords": "git git-branch git branch version control",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 6a9 9 0 0 0-9 9V3\"/><circle cx=\"18\" cy=\"6\" r=\"3\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/></g>"
  },
  {
    "id": "lucide:layout-grid",
    "name": "Dashboard",
    "category": "tech",
    "keywords": "dashboard layout-grid grid dashboard layout overview",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"/><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"/></g>"
  },
  {
    "id": "lucide:sparkles",
    "name": "AI",
    "category": "tech",
    "keywords": "ai sparkles ai sparkles magic assistant",
    "monochrome": true,
    "viewBox": "0 0 24 24",
    "body": "<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4\"/><circle cx=\"4\" cy=\"20\" r=\"2\"/></g>"
  },
  {
    "id": "devicon:html5",
    "name": "HTML5",
    "category": "tech",
    "keywords": "html5 html5 html web frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#e44d26\" d=\"M19.037 113.876L9.032 1.661h109.936l-10.016 112.198l-45.019 12.48z\"/><path fill=\"#f16529\" d=\"m64 116.8l36.378-10.086l8.559-95.878H64z\"/><path fill=\"#ebebeb\" d=\"M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692l3.382 37.927H64zm0 35.743l-.061.017l-15.327-4.14l-.979-10.975H33.816l1.928 21.609l28.193 7.826l.063-.017z\"/><path fill=\"#fff\" d=\"M63.952 52.455v13.763h16.947l-1.597 17.849l-15.35 4.143v14.319l28.215-7.82l.207-2.325l3.234-36.233l.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092l.628-6.978l.329-3.692z\"/>"
  },
  {
    "id": "devicon:css3",
    "name": "CSS3",
    "category": "tech",
    "keywords": "css3 css3 css style frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#1572b6\" d=\"M18.814 114.123L8.76 1.352h110.48l-10.064 112.754l-45.243 12.543z\"/><path fill=\"#33a9dc\" d=\"m64.001 117.062l36.559-10.136l8.601-96.354h-45.16z\"/><path fill=\"#fff\" d=\"M64.001 51.429h18.302l1.264-14.163H64.001V23.435h34.682l-.332 3.711l-3.4 38.114h-30.95z\"/><path fill=\"#ebebeb\" d=\"m64.083 87.349l-.061.018l-15.403-4.159l-.985-11.031H33.752l1.937 21.717l28.331 7.863l.063-.018z\"/><path fill=\"#fff\" d=\"m81.127 64.675l-1.666 18.522l-15.426 4.164v14.39l28.354-7.858l.208-2.337l2.406-26.881z\"/><path fill=\"#ebebeb\" d=\"M64.048 23.435v13.831H30.64l-.277-3.108l-.63-7.012l-.331-3.711zm-.047 27.996v13.831H48.792l-.277-3.108l-.631-7.012l-.33-3.711z\"/>"
  },
  {
    "id": "devicon:javascript",
    "name": "JavaScript",
    "category": "tech",
    "keywords": "javascript javascript js javascript frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#f0db4f\" d=\"M1.408 1.408h125.184v125.185H1.408z\"/><path fill=\"#323330\" d=\"M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981c-3.832-1.761-8.104-3.022-9.377-5.926c-.452-1.69-.512-2.642-.226-3.665c.821-3.32 4.784-4.355 7.925-3.403c2.023.678 3.938 2.237 5.093 4.724c5.402-3.498 5.391-3.475 9.163-5.879c-1.381-2.141-2.118-3.129-3.022-4.045c-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235c-5.926 6.724-4.236 18.492 2.975 23.335c7.104 5.332 17.54 6.545 18.873 11.531c1.297 6.104-4.486 8.08-10.234 7.378c-4.236-.881-6.592-3.034-9.139-6.949c-4.688 2.713-4.688 2.713-9.508 5.485c1.143 2.499 2.344 3.63 4.26 5.795c9.068 9.198 31.76 8.746 35.83-5.176c.165-.478 1.261-3.666.38-8.581M69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149c-1.713 3.558-6.152 3.117-8.175 2.427c-2.059-1.012-3.106-2.451-4.319-4.485c-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901c4.462 2.678 10.459 3.499 16.731 2.059c4.082-1.189 7.604-3.652 9.448-7.401c2.666-4.915 2.094-10.864 2.07-17.444c.06-10.735.001-21.468.001-32.237\"/>"
  },
  {
    "id": "devicon:typescript",
    "name": "TypeScript",
    "category": "tech",
    "keywords": "typescript typescript ts typescript frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#fff\" d=\"M22.67 47h99.67v73.67H22.67z\"/><path fill=\"#007acc\" d=\"M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 0 1 7.82 4.5a20.6 20.6 0 0 1 3 4c0 .16-5.4 3.81-8.69 5.85c-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 0 0-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.6 4.6 0 0 0 .54 2.34c.83 1.73 2.38 2.76 7.24 4.86c8.95 3.85 12.78 6.39 15.16 10c2.66 4 3.25 10.46 1.45 15.24c-2 5.2-6.9 8.73-13.83 9.9a38.3 38.3 0 0 1-9.52-.1a23 23 0 0 1-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9 9 0 0 1 1.15-.73L82 101l3.59-2.08l.75 1.11a16.8 16.8 0 0 0 4.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 0 0 .69-6.92c-1-1.39-3-2.56-8.59-5c-6.45-2.78-9.23-4.5-11.77-7.24a16.5 16.5 0 0 1-3.43-6.25a25 25 0 0 1-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.7 31.7 0 0 1 9.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49 49 0 0 1 .12-5.17C29.08 59 39 59 51 59h21.83z\"/>"
  },
  {
    "id": "devicon:react",
    "name": "React",
    "category": "tech",
    "keywords": "react react react jsx frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<g fill=\"#61dafb\"><circle cx=\"64\" cy=\"64\" r=\"11.4\"/><path d=\"M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3c.6-2.4 1.1-4.8 1.5-7.1c2.1-13.2-.2-22.5-6.6-26.1c-1.9-1.1-4-1.6-6.4-1.6c-7 0-15.9 5.2-24.9 13.9c-9-8.7-17.9-13.9-24.9-13.9c-2.4 0-4.5.5-6.4 1.6c-6.4 3.7-8.7 13-6.6 26.1c.4 2.3.9 4.7 1.5 7.1c-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3c-.6 2.4-1.1 4.8-1.5 7.1c-2.1 13.2.2 22.5 6.6 26.1c1.9 1.1 4 1.6 6.4 1.6c7.1 0 16-5.2 24.9-13.9c9 8.7 17.9 13.9 24.9 13.9c2.4 0 4.5-.5 6.4-1.6c6.4-3.7 8.7-13 6.6-26.1c-.4-2.3-.9-4.7-1.5-7.1c2.4-.7 4.7-1.4 6.9-2.3c12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8M92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3c-.3 2.1-.8 4.3-1.4 6.6c-5.2-1.2-10.7-2-16.5-2.5c-3.4-4.8-6.9-9.1-10.4-13c7.4-7.3 14.9-12.3 21-12.3c1.3 0 2.5.3 3.5.9M81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6c-3.7.3-7.4.4-11.2.4c-3.9 0-7.6-.1-11.2-.4q-3.3-4.8-6-9.6c-1.9-3.3-3.7-6.7-5.3-10c1.6-3.3 3.4-6.7 5.3-10c1.8-3.2 3.9-6.4 6.1-9.6c3.7-.3 7.4-.4 11.2-.4c3.9 0 7.6.1 11.2.4q3.3 4.8 6 9.6c1.9 3.3 3.7 6.7 5.3 10c-1.7 3.3-3.4 6.6-5.3 10m8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3c-3.4.8-7 1.4-10.8 1.9c1.2-1.9 2.5-3.9 3.6-6c1.2-2.1 2.3-4.2 3.4-6.2M64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3c2.3.1 4.6.2 6.9.2s4.6-.1 6.9-.2c-2.2 2.9-4.5 5.7-6.9 8.3m-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9c1.1-3.3 2.3-6.8 3.8-10.3c1.1 2 2.2 4.1 3.4 6.1c1.2 2.2 2.4 4.1 3.6 6.1m-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3c3.4-.8 7-1.4 10.8-1.9c-1.2 1.9-2.5 3.9-3.6 6c-1.2 2.1-2.3 4.2-3.4 6.2M64 30.2c2.4 2.6 4.7 5.4 6.9 8.3c-2.3-.1-4.6-.2-6.9-.2s-4.6.1-6.9.2c2.2-2.9 4.5-5.7 6.9-8.3m22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9c-1.1 3.3-2.3 6.8-3.8 10.3c-1.1-2.1-2.2-4.2-3.4-6.2M31.7 35c-1.7-10.5-.3-17.9 3.8-20.3c1-.6 2.2-.9 3.5-.9c6 0 13.5 4.9 21 12.3c-3.5 3.8-7 8.2-10.4 13c-5.8.5-11.3 1.4-16.5 2.5c-.6-2.3-1-4.5-1.4-6.6M7 64c0-4.7 5.7-9.7 15.7-13.4c2-.8 4.2-1.5 6.4-2.1c1.6 5 3.6 10.3 6 15.6c-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64m28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3c.3-2.1.8-4.3 1.4-6.6c5.2 1.2 10.7 2 16.5 2.5c3.4 4.8 6.9 9.1 10.4 13c-7.4 7.3-14.9 12.3-21 12.3c-1.3 0-2.5-.3-3.5-.9M96.3 93c1.7 10.5.3 17.9-3.8 20.3c-1 .6-2.2.9-3.5.9c-6 0-13.5-4.9-21-12.3c3.5-3.8 7-8.2 10.4-13c5.8-.5 11.3-1.4 16.5-2.5c.6 2.3 1 4.5 1.4 6.6m9-15.6c-2 .8-4.2 1.5-6.4 2.1c-1.6-5-3.6-10.3-6-15.6c2.4-5.3 4.5-10.5 6-15.5c13.8 4 22.1 10 22.1 15.6c0 4.7-5.8 9.7-15.7 13.4\"/></g>"
  },
  {
    "id": "devicon:vuejs",
    "name": "Vue",
    "category": "tech",
    "keywords": "vue vuejs vue frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"none\" d=\"m0 8.934l49.854.158l14.167 24.47l14.432-24.47L128 8.935l-63.834 110.14zm126.98.637l-24.36.02l-38.476 66.053L25.691 9.592L.942 9.572l63.211 107.89zm-25.149-.008l-22.745.168l-15.053 24.647L49.216 9.73l-22.794-.168l37.731 64.476zm-75.834-.17l23.002.009m-23.002-.01l23.002.01\"/><path fill=\"#35495e\" d=\"m25.997 9.393l23.002.009L64.035 34.36L79.018 9.404L102 9.398L64.15 75.053z\"/><path fill=\"#41b883\" d=\"m.91 9.569l25.067-.172l38.15 65.659L101.98 9.401l25.11.026l-62.966 108.06z\"/>"
  },
  {
    "id": "devicon:nextjs",
    "name": "Next.js",
    "category": "tech",
    "keywords": "next.js nextjs next react frontend",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<circle cx=\"64\" cy=\"64\" r=\"64\"/><path fill=\"url(#SVGt8hikeFb)\" d=\"M106.317 112.014L49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64 64 0 0 0 6.763-5.209\"/><path fill=\"url(#SVGffgZzcDK)\" d=\"M81.778 38.4h8.533v51.2h-8.533z\"/><defs><linearGradient id=\"SVGt8hikeFb\" x1=\"109\" x2=\"144.5\" y1=\"116.5\" y2=\"160.5\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient><linearGradient id=\"SVGffgZzcDK\" x1=\"121\" x2=\"120.799\" y1=\"54\" y2=\"106.875\" gradientTransform=\"scale(.71111)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs>"
  },
  {
    "id": "devicon:tailwindcss",
    "name": "Tailwind",
    "category": "tech",
    "keywords": "tailwind tailwindcss tailwind css",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#38bdf8\" d=\"M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0\"/>"
  },
  {
    "id": "devicon:nodejs",
    "name": "Node.js",
    "category": "tech",
    "keywords": "node.js nodejs node backend js",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"url(#SVGfJo5KBID)\" d=\"M66.958.825a6.07 6.07 0 0 0-6.035 0L11.103 29.76c-1.895 1.072-2.96 3.095-2.96 5.24v57.988c0 2.143 1.183 4.167 2.958 5.24l49.82 28.934a6.07 6.07 0 0 0 6.036 0l49.82-28.935c1.894-1.072 2.958-3.096 2.958-5.24V35c0-2.144-1.183-4.167-2.958-5.24z\"/><path fill=\"url(#SVGO7R9ibnx)\" d=\"M116.897 29.76L66.841.825A8 8 0 0 0 65.302.23L9.21 96.798a6.3 6.3 0 0 0 1.657 1.43l50.057 28.934c1.42.833 3.076 1.072 4.615.595l52.66-96.925a3.7 3.7 0 0 0-1.302-1.072\"/><path fill=\"url(#SVGXTTu2b3u)\" d=\"M116.898 98.225c1.42-.833 2.485-2.262 2.958-3.81L65.066.108c-1.42-.238-2.959-.119-4.26.715L11.104 29.639l53.606 98.355c.71-.12 1.54-.358 2.25-.715z\"/><defs><linearGradient id=\"SVGfJo5KBID\" x1=\"34.513\" x2=\"27.157\" y1=\"15.535\" y2=\"30.448\" gradientTransform=\"translate(-129.242 -73.715)scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#3f873f\"/><stop offset=\".33\" stop-color=\"#3f8b3d\"/><stop offset=\".637\" stop-color=\"#3e9638\"/><stop offset=\".934\" stop-color=\"#3da92e\"/><stop offset=\"1\" stop-color=\"#3dae2b\"/></linearGradient><linearGradient id=\"SVGO7R9ibnx\" x1=\"30.009\" x2=\"50.533\" y1=\"23.359\" y2=\"8.288\" gradientTransform=\"translate(-129.242 -73.715)scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".138\" stop-color=\"#3f873f\"/><stop offset=\".402\" stop-color=\"#52a044\"/><stop offset=\".713\" stop-color=\"#64b749\"/><stop offset=\".908\" stop-color=\"#6abf4b\"/></linearGradient><linearGradient id=\"SVGXTTu2b3u\" x1=\"21.917\" x2=\"40.555\" y1=\"22.261\" y2=\"22.261\" gradientTransform=\"translate(-129.242 -73.715)scale(6.18523)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\".092\" stop-color=\"#6abf4b\"/><stop offset=\".287\" stop-color=\"#64b749\"/><stop offset=\".598\" stop-color=\"#52a044\"/><stop offset=\".862\" stop-color=\"#3f873f\"/></linearGradient></defs>"
  },
  {
    "id": "devicon:python",
    "name": "Python",
    "category": "tech",
    "keywords": "python python python py data ia",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<linearGradient id=\"SVGtryZab8W\" x1=\"70.252\" x2=\"170.659\" y1=\"1237.476\" y2=\"1151.089\" gradientTransform=\"matrix(.563 0 0 -.568 -29.215 707.817)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#5a9fd4\"/><stop offset=\"1\" stop-color=\"#306998\"/></linearGradient><linearGradient id=\"SVGe9yX9dAA\" x1=\"209.474\" x2=\"173.62\" y1=\"1098.811\" y2=\"1149.537\" gradientTransform=\"matrix(.563 0 0 -.568 -29.215 707.817)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#ffd43b\"/><stop offset=\"1\" stop-color=\"#ffe873\"/></linearGradient><path fill=\"url(#SVGtryZab8W)\" d=\"M63.391 1.988c-4.222.02-8.252.379-11.8 1.007c-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521c-2.268 9.405-2.368 15.275 0 25.096c1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837c-4.244-.706-8.645-1.027-12.866-1.008M50.037 9.557c2.55 0 4.634 2.117 4.634 4.721c0 2.593-2.083 4.69-4.634 4.69c-2.56 0-4.633-2.097-4.633-4.69c-.001-2.604 2.073-4.721 4.633-4.721\" transform=\"translate(0 10.26)\"/><path fill=\"url(#SVGe9yX9dAA)\" d=\"M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547c7.816 2.297 15.312 2.713 24.665 0c6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519c2.578-7.735 2.467-15.174 0-25.096c-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692c0 2.602-2.074 4.719-4.634 4.719c-2.55 0-4.633-2.117-4.633-4.719c0-2.595 2.083-4.692 4.633-4.692\" transform=\"translate(0 10.26)\"/><radialGradient id=\"SVGda693d3X\" cx=\"1825.678\" cy=\"444.45\" r=\"26.743\" gradientTransform=\"matrix(0 -.24 -1.055 0 532.979 557.576)\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0\" stop-color=\"#b8b8b8\" stop-opacity=\".498\"/><stop offset=\"1\" stop-color=\"#7f7f7f\" stop-opacity=\"0\"/></radialGradient><path fill=\"url(#SVGda693d3X)\" d=\"M97.309 119.597c0 3.543-14.816 6.416-33.091 6.416c-18.276 0-33.092-2.873-33.092-6.416s14.815-6.417 33.092-6.417c18.275 0 33.091 2.872 33.091 6.417\" opacity=\".444\"/>"
  },
  {
    "id": "devicon:java",
    "name": "Java",
    "category": "tech",
    "keywords": "java java java jvm",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#0074bd\" d=\"M47.617 98.12s-4.767 2.774 3.397 3.71c9.892 1.13 14.947.968 25.845-1.092c0 0 2.871 1.795 6.873 3.351c-24.439 10.47-55.308-.607-36.115-5.969m-2.988-13.665s-5.348 3.959 2.823 4.805c10.567 1.091 18.91 1.18 33.354-1.6c0 0 1.993 2.025 5.132 3.131c-29.542 8.64-62.446.68-41.309-6.336\"/><path fill=\"#ea2d2e\" d=\"M69.802 61.271c6.025 6.935-1.58 13.17-1.58 13.17s15.289-7.891 8.269-17.777c-6.559-9.215-11.587-13.792 15.635-29.58c0 .001-42.731 10.67-22.324 34.187\"/><path fill=\"#0074bd\" d=\"M102.123 108.229s3.529 2.91-3.888 5.159c-14.102 4.272-58.706 5.56-71.094.171c-4.451-1.938 3.899-4.625 6.526-5.192c2.739-.593 4.303-.485 4.303-.485c-4.953-3.487-32.013 6.85-13.743 9.815c49.821 8.076 90.817-3.637 77.896-9.468M49.912 70.294s-22.686 5.389-8.033 7.348c6.188.828 18.518.638 30.011-.326c9.39-.789 18.813-2.474 18.813-2.474s-3.308 1.419-5.704 3.053c-23.042 6.061-67.544 3.238-54.731-2.958c10.832-5.239 19.644-4.643 19.644-4.643m40.697 22.747c23.421-12.167 12.591-23.86 5.032-22.285c-1.848.385-2.677.72-2.677.72s.688-1.079 2-1.543c14.953-5.255 26.451 15.503-4.823 23.725c0-.002.359-.327.468-.617\"/><path fill=\"#ea2d2e\" d=\"M76.491 1.587S89.459 14.563 64.188 34.51c-20.266 16.006-4.621 25.13-.007 35.559c-11.831-10.673-20.509-20.07-14.688-28.815C58.041 28.42 81.722 22.195 76.491 1.587\"/><path fill=\"#0074bd\" d=\"M52.214 126.021c22.476 1.437 57-.8 57.817-11.436c0 0-1.571 4.032-18.577 7.231c-19.186 3.612-42.854 3.191-56.887.874c0 .001 2.875 2.381 17.647 3.331\"/>"
  },
  {
    "id": "devicon:cplusplus",
    "name": "C++",
    "category": "tech",
    "keywords": "c++ cplusplus cpp c++",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#00599c\" d=\"M118.766 95.82c.89-1.543 1.441-3.28 1.441-4.843V36.78c0-1.558-.55-3.297-1.441-4.84l-55.32 31.94Zm0 0\"/><path fill=\"#004482\" d=\"m68.36 126.586l46.933-27.094c1.352-.781 2.582-2.129 3.473-3.672l-55.32-31.94L8.12 95.82c.89 1.543 2.121 2.89 3.473 3.672l46.933 27.094c2.703 1.562 7.13 1.562 9.832 0Zm0 0\"/><path fill=\"#659ad2\" d=\"M118.766 31.941c-.891-1.546-2.121-2.894-3.473-3.671L68.359 1.172c-2.703-1.563-7.129-1.563-9.832 0L11.594 28.27C8.89 29.828 6.68 33.66 6.68 36.78v54.196c0 1.562.55 3.3 1.441 4.843L63.445 63.88Zm0 0\"/><path fill=\"#fff\" d=\"M63.445 26.035c-20.867 0-37.843 16.977-37.843 37.844s16.976 37.844 37.843 37.844c13.465 0 26.024-7.247 32.77-18.91L79.84 73.335c-3.38 5.84-9.66 9.465-16.395 9.465c-10.433 0-18.922-8.488-18.922-18.922s8.49-18.922 18.922-18.922c6.73 0 13.017 3.629 16.39 9.465l16.38-9.477c-6.75-11.664-19.305-18.91-32.77-18.91zM92.88 57.57v4.207h-4.207v4.203h4.207v4.207h4.203V65.98h4.203v-4.203h-4.203V57.57zm15.766 0v4.207h-4.204v4.203h4.204v4.207h4.207V65.98h4.203v-4.203h-4.203V57.57z\"/>"
  },
  {
    "id": "devicon:csharp",
    "name": "C#",
    "category": "tech",
    "keywords": "c# csharp csharp dotnet",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#9b4f96\" d=\"M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7s-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7\"/><path fill=\"#68217a\" d=\"M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7s2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8z\"/><path fill=\"#fff\" d=\"M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20c-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8z\"/>"
  },
  {
    "id": "devicon:go",
    "name": "Go",
    "category": "tech",
    "keywords": "go go golang go",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<defs><path id=\"SVG6cHe2bmf\" d=\"M18.8 1h90.5v126H18.8z\"/></defs><clipPath id=\"SVGi4y60Qoi\"><use href=\"#SVG6cHe2bmf\"/></clipPath><path fill=\"#f6d2a2\" fill-rule=\"evenodd\" d=\"M21.1 68.7c.2 3.5 3.7 1.9 5.3.8c1.5-1.1 2-.2 2.1-2.3c.1-1.4.2-2.7.2-4.1c-2.3-.2-4.8.3-6.7 1.7c-.9.7-2.8 3-.9 3.9\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M23 71.2c-.7 0-2-.3-2.2-2.3c-.6-.4-.8-.9-.8-1.2c-.1-1.2 1.2-2.6 1.9-3.1c1.6-1.2 3.7-1.8 5.9-1.8h1.3v.3c.1 1.1 0 2.2-.1 3.2c0 .3 0 .6-.1.9c-.1 1.5-.4 1.7-1.1 2c-.3.1-.6.2-1.1.6c-.5.3-2.2 1.4-3.7 1.4m4.8-7.8c-2.1 0-4 .6-5.5 1.7c-.7.5-1.7 1.7-1.6 2.5c0 .3.2.6.6.8l.2.1v.2c.1 1.6.9 1.8 1.5 1.8c1 0 2.4-.7 3.3-1.3c.6-.4 1-.5 1.3-.6c.5-.2.6-.2.7-1.4c0-.3 0-.6.1-.9c.1-.9.1-1.9.1-2.8c-.3-.1-.5-.1-.7-.1\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#c6b198\" fill-rule=\"evenodd\" d=\"M21.1 68.7c.5-.2 1.1-.3 1.4-.8\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M21.1 69c-.1 0-.3-.1-.3-.2c-.1-.2 0-.4.2-.4c.1 0 .2-.1.2-.1c.4-.2.8-.3 1-.6c.1-.1.3-.2.5-.1c.1.1.2.3.1.5c-.4.5-.9.7-1.3.8l-.2.1z\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#6ad7e5\" fill-rule=\"evenodd\" d=\"M29.3 26.4c-13.6-3.8-3.5-21.1 7.4-14z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"m29.5 26.8l-.3-.1c-7-2-6.9-7-6.7-8.5c.5-3.8 4.1-7.8 8.9-7.8c1.9 0 3.7.6 5.5 1.8l.3.2zm1.9-15.7c-4.5 0-7.8 3.7-8.3 7.2c-.5 3.6 1.7 6.4 6 7.7l7.1-13.5c-1.5-.9-3.1-1.4-4.8-1.4\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#6ad7e5\" fill-rule=\"evenodd\" d=\"M89.6 11.1c10.7-7.5 20.5 9.5 8 13.8z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M97.5 25.3L89.2 11l.3-.2c1.9-1.3 3.8-2 5.7-2c4.6 0 7.9 3.8 8.6 7.5c.3 1.5.6 6.6-6 8.8zm-7.4-14l7.7 13.3c3.9-1.4 5.9-4.4 5.3-8c-.6-3.4-3.7-6.9-7.9-6.9c-1.7-.1-3.4.4-5.1 1.6\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#f6d2a2\" fill-rule=\"evenodd\" d=\"M92 112.3c2.7 1.7 7.7 6.8 3.6 9.3c-3.9 3.6-6.1-4-9.6-5c1.5-2 3.4-3.9 6-4.3\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M93.5 122.9c-1.6 0-3-1.6-4.2-3.1c-1.1-1.2-2.2-2.5-3.4-2.9l-.5-.1l.3-.4c1.2-1.7 3.2-3.9 6.2-4.4h.1l.1.1c1.7 1.1 5.4 4.2 5.3 7.1c0 1.1-.6 2-1.7 2.7c-.7.7-1.4 1-2.2 1m-7-6.5c1.2.5 2.2 1.8 3.2 2.9c1.2 1.5 2.4 2.8 3.7 2.8q.9 0 1.8-.9h.1c.9-.6 1.4-1.3 1.4-2.2c0-2.3-2.9-5.2-4.9-6.5c-1.8.5-3.6 1.7-5.3 3.9m9.1 5.5c-.1 0-.2-.1-.3-.2c-.2-.4-.4-.9-.5-1.3c-.3-.8-.6-1.6-1.2-2.2c-.1-.1-.1-.3 0-.5c.1-.1.3-.1.5 0c.7.7 1.1 1.6 1.4 2.5l.5 1.2c.1.2 0 .4-.1.5z\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#f6d2a2\" fill-rule=\"evenodd\" d=\"M43.2 118.1c-3.2.5-5 3.4-7.7 4.9c-2.5 1.5-3.5-.5-3.7-.9c-.4-.2-.4.2-1-.4c-2.3-3.7 2.4-6.4 4.9-8.2c3.5-.8 5.7 2.2 7.5 4.6\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M33.8 123.8c-1.3 0-2-1.1-2.2-1.5h-.1c-.3 0-.5-.1-.9-.5v-.1c-2.2-3.5 1.6-6.2 4.1-8l.9-.6h.2c.4-.1.7-.1 1.1-.1c3 0 4.9 2.6 6.5 4.7l.5.7l-.6.1c-1.9.3-3.3 1.5-4.7 2.7c-.9.8-1.8 1.5-2.8 2.1c-.8.3-1.4.5-2 .5m-2.2-2.1c.1 0 .2 0 .4.1h.1l.1.1c.2.3.7 1.2 1.7 1.2c.5 0 1-.2 1.5-.5c1-.5 1.9-1.3 2.7-2c1.3-1.1 2.7-2.3 4.5-2.8c-1.5-2-3.3-4.2-5.8-4.2c-.3 0-.6 0-.9.1l-.8.6c-2.6 1.8-5.8 4.1-3.9 7.1c.1.2.2.3.4.3m.2.7c-.2 0-.4-.2-.3-.4c.1-1 .6-1.7 1.1-2.5c.3-.4.5-.8.7-1.2c.1-.2.3-.2.4-.2c.2.1.2.3.2.4c-.2.5-.5.9-.8 1.3c-.5.7-.9 1.3-1 2.1c0 .4-.1.5-.3.5\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill-rule=\"evenodd\" d=\"M29.9 21.7c-1.8-.9-3.1-2.2-2-4.3c1-1.9 2.9-1.7 4.7-.8zm64.9-1.8c1.8-.9 3.1-2.2 2-4.3c-1-1.9-2.9-1.7-4.7-.8z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path fill=\"#f6d2a2\" fill-rule=\"evenodd\" d=\"M107.1 68.2c-.2 3.5-3.7 1.9-5.3.8c-1.5-1.1-2-.2-2.1-2.3c-.1-1.4-.2-2.7-.2-4.1c2.3-.2 4.8.3 6.7 1.7c1 .8 2.8 3 .9 3.9\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M105.3 70.7c-1.5 0-3.2-1.1-3.7-1.4s-.8-.5-1.1-.6c-.8-.3-1-.5-1.1-2c0-.3 0-.6-.1-.9c-.1-1-.2-2.1-.1-3.2v-.3h1.3c2.2 0 4.3.6 5.9 1.8c.7.5 2 1.9 1.9 3.1c0 .4-.2.9-.8 1.2c-.2 2-1.5 2.3-2.2 2.3M99.8 63c0 .9 0 1.9.1 2.8c0 .3 0 .6.1.9c.1 1.2.2 1.2.7 1.4c.3.1.7.3 1.3.6c.9.6 2.3 1.3 3.3 1.3c.6 0 1.4-.2 1.5-1.8V68l.2-.1c.4-.2.6-.4.6-.8c.1-.8-.9-2-1.6-2.5c-1.5-1.1-3.5-1.7-5.5-1.7c-.2.1-.4.1-.7.1\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#c6b198\" fill-rule=\"evenodd\" d=\"M107.1 68.2c-.5-.2-1.1-.3-1.4-.8\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M107.1 68.6h-.1l-.2-.1c-.5-.2-1-.3-1.3-.8c-.1-.1-.1-.4.1-.5c.1-.1.4-.1.5.1c.2.3.6.4 1 .6c.1 0 .2.1.2.1c.2.1.3.3.2.4s-.3.2-.4.2\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#6ad7e5\" fill-rule=\"evenodd\" d=\"M62.8 4c13.6 0 26.3 1.9 33 15c6 14.6 3.8 30.4 4.8 45.9c.8 13.3 2.5 28.6-3.6 40.9c-6.5 12.9-22.7 16.2-36 15.7c-10.5-.4-23.1-3.8-29.1-13.4c-6.9-11.2-3.7-27.9-3.2-40.4c.6-14.8-4-29.7.9-44.1C34.5 8.5 48.1 5.1 62.8 4\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M63.3 121.9h-2.5c-4.1-.1-10.3-.8-16.4-3.3c-5.9-2.4-10.2-5.8-13-10.3c-5.6-9.1-4.6-21.6-3.7-32.7c.2-2.8.4-5.4.5-7.9c.2-5.2-.2-10.6-.7-15.7c-.8-9.4-1.6-19.1 1.5-28.5c2.4-7 6.7-12 13.2-15.2c5.1-2.5 11.4-3.9 20.4-4.6C76 3.6 89.3 5.5 96 18.8c4.4 10.7 4.4 22.2 4.5 33.3c0 4.2 0 8.5.3 12.7c.1 1.3.2 2.6.2 3.9c.8 12.2 1.7 26-3.9 37.2c-2.8 5.7-7.7 9.9-14.4 12.6c-5.4 2.2-12.2 3.4-19.4 3.4M62.8 4.3c-14.1 1.1-27.9 4.2-33 19.4c-3.1 9.3-2.3 18.9-1.5 28.2c.4 5.2.9 10.5.7 15.8c-.1 2.5-.3 5.1-.5 7.9c-.9 11-1.9 23.4 3.6 32.3c2.3 3.7 9.7 12.5 28.8 13.2h2.5c22.1 0 30.3-9.8 33.3-15.6c5.5-11 4.6-24.8 3.9-36.9c-.1-1.3-.2-2.6-.2-3.9c-.2-4.2-.3-8.5-.3-12.7c-.1-11-.1-22.5-4.4-33.1C92.7 13 88.2 9 82 6.7c-6.4-2.1-13.6-2.4-19.2-2.4\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M65.2 22.2c2.4 14.2 25.6 10.4 22.3-3.9c-3-12.8-23.1-9.2-22.3 3.9\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M76.2 31.5c-4.5 0-10.2-2.4-11.4-9.2c-.2-3.2.8-6.1 2.9-8.3c2.3-2.5 5.8-3.9 9.4-3.9c4.2 0 9.2 2.2 10.6 8.3c.8 3.4.2 6.4-1.7 8.8c-2.1 2.6-5.8 4.3-9.8 4.3m-10.7-9.3q.75 4.2 3.9 6.6c1.8 1.4 4.3 2.1 6.8 2.1c3.7 0 7.3-1.6 9.3-4.1c1.8-2.2 2.3-5.1 1.6-8.3c-1.3-5.7-6-7.7-10-7.7c-3.4 0-6.7 1.4-8.9 3.7c-1.9 2-2.9 4.7-2.7 7.7\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M37.5 24.5c3.2 12.3 22.9 9.2 22.2-3.2c-.9-14.8-25.3-12-22.2 3.2\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M48 32.7c-4.3 0-9.3-2.1-10.9-8.1c-.7-3.5 0-6.7 2-9.1c2.2-2.7 5.8-4.3 9.7-4.3c5.2 0 10.7 3.1 11.1 10.1c.2 2.9-.7 5.5-2.7 7.6c-2.1 2.3-5.6 3.8-9.2 3.8m.8-20.8c-3.7 0-7.1 1.5-9.2 4c-1.9 2.3-2.5 5.2-1.8 8.5C39.2 30 44 32 48 32c3.4 0 6.7-1.3 8.8-3.6c1.8-1.9 2.7-4.4 2.5-7.1c-.2-4.3-3.1-9.4-10.5-9.4\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M68 39.2c0 1.8.4 3.9.1 5.9c-.5.9-1.4 1-2.2 1.3c-1.1-.2-2-.9-2.5-1.9c-.3-2.2.1-4.4.2-6.6z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M65.9 46.8c-1.3-.2-2.3-1-2.8-2.1c-.2-1.6-.1-3.1 0-4.6c.1-.7.1-1.4.1-2.1v-.4l5.1 1.6v.2c0 .6.1 1.2.1 1.9c.1 1.3.2 2.7 0 4v.1c-.4.8-1.1 1-1.8 1.3c-.2-.1-.4 0-.7.1m-2.2-2.4c.4.9 1.2 1.5 2.1 1.7c.2-.1.4-.1.5-.2c.6-.2 1.1-.4 1.4-.9c.2-1.2.1-2.5 0-3.8c0-.6-.1-1.2-.1-1.7l-3.8-1.2c0 .6-.1 1.2-.1 1.7c-.1 1.6-.2 3 0 4.4\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill-rule=\"evenodd\" d=\"M46.3 22.5c0 2-1.5 3.6-3.3 3.6s-3.3-1.6-3.3-3.6s1.5-3.6 3.3-3.6s3.3 1.6 3.3 3.6\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M45.2 23.3c0 .5-.4.9-.8.9s-.8-.4-.8-.9s.4-.9.8-.9c.5 0 .8.4.8.9\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path fill-rule=\"evenodd\" d=\"M74.2 21.6c0 2-1.5 3.6-3.3 3.6s-3.3-1.6-3.3-3.6s1.5-3.6 3.3-3.6s3.3 1.6 3.3 3.6\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M73.2 22.4c0 .5-.3.9-.8.9c-.4 0-.8-.4-.8-.9s.3-.9.8-.9c.4 0 .8.4.8.9M58.4 39c-1.5 3.5.8 10.6 4.8 5.4c-.3-2.2.1-4.4.2-6.6z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path d=\"M60.5 46.6c-.7 0-1.4-.4-1.9-1.2c-1.1-1.6-1.3-4.6-.5-6.5l.1-.2l5.5-1.4v.4l-.1 2.2c-.1 1.5-.2 2.9 0 4.4v.1l-.1.1q-1.5 2.1-3 2.1m-1.8-7.3c-.6 1.7-.4 4.4.5 5.7c.4.6.8.9 1.3.9c.7 0 1.5-.6 2.3-1.6c-.2-1.5-.1-3 .1-4.4l.1-1.7z\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill=\"#f6d2a2\" fill-rule=\"evenodd\" d=\"M58.9 32.2c-2.7.2-4.9 3.5-3.5 6c1.9 3.4 6-.3 8.6 0c3 .1 5.4 3.2 7.8.6c2.7-2.9-1.2-5.7-4.1-7z\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/><path fill=\"#231f20\" d=\"M69.7 40.2c-.9 0-1.8-.4-2.7-.8s-1.9-.8-3-.8h-.3c-.8 0-1.7.3-2.7.7c-1.1.4-2.2.7-3.2.7c-1.2 0-2.1-.5-2.7-1.6c-.7-1.2-.6-2.6.1-3.9c.8-1.5 2.2-2.4 3.7-2.6l8.9-.4h.1c2.2.9 4.7 2.6 5.2 4.6c.2 1-.1 2-.9 2.9s-1.6 1.2-2.5 1.2M64.1 38c1.1 0 2.2.5 3.2.9c.9.4 1.7.7 2.5.7c.7 0 1.3-.3 1.9-.9c.7-.7.9-1.5.8-2.3c-.4-1.7-2.8-3.3-4.7-4.1l-8.7.4c-1.3.1-2.5 1-3.2 2.2c-.6 1.1-.6 2.3-.1 3.3c.5.9 1.1 1.3 2.1 1.3c.9 0 1.9-.4 2.9-.7c1.1-.4 2-.7 3-.7c0-.2.1-.2.3-.1\" clip-path=\"url(#SVGi4y60Qoi)\"/><path fill-rule=\"evenodd\" d=\"M58.6 32.1c-.2-4.7 8.8-5.3 9.8-1.4c1.1 4-9.4 4.9-9.8 1.4\" clip-path=\"url(#SVGi4y60Qoi)\" clip-rule=\"evenodd\"/>"
  },
  {
    "id": "devicon:rust",
    "name": "Rust",
    "category": "tech",
    "keywords": "rust rust rust",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path d=\"M62.96.242c-.232.135-1.203 1.528-2.16 3.097c-2.4 3.94-2.426 3.942-5.65.55c-2.098-2.208-2.605-2.612-3.28-2.607c-.44.002-.995.152-1.235.332s-.916 1.612-1.504 3.183c-1.346 3.6-1.41 3.715-2.156 3.86c-.46.086-1.343-.407-3.463-1.929c-1.565-1.125-3.1-2.045-3.411-2.045c-1.291 0-1.655.706-2.27 4.4c-.78 4.697-.754 4.681-4.988 2.758c-1.71-.776-3.33-1.41-3.603-1.41s-.792.293-1.15.652c-.652.652-.653.655-.475 4.246l.178 3.595l-.68.364c-.602.322-1.017.283-3.684-.348c-3.48-.822-4.216-.8-4.92.15l-.516.693l.692 2.964c.38 1.63.745 3.2.814 3.487c.067.287-.05.746-.26 1.02c-.348.448-.717.49-3.94.44c-5.452-.086-5.761.382-3.51 5.3c.718 1.56 1.305 2.98 1.305 3.15c0 .898-.717 1.224-3.794 1.727c-1.722.28-3.218.51-3.326.51c-.107 0-.43.235-.717.522c-.937.936-.671 1.816 1.453 4.814c2.646 3.735 2.642 3.75-1.73 5.421c-4.971 1.902-5.072 2.37-1.287 5.96c3.525 3.344 3.53 3.295-.461 5.804C.208 62.8.162 62.846.085 63.876c-.093 1.253-.071 1.275 3.538 3.48c3.57 2.18 3.57 2.246.067 5.56C-.078 76.48.038 77 5.013 78.877c4.347 1.64 4.353 1.66 1.702 5.394c-1.502 2.117-1.981 3-1.981 3.653c0 1.223.637 1.535 4.44 2.174c3.206.54 3.92.857 3.92 1.741c0 .182-.588 1.612-1.307 3.177c-2.236 4.87-1.981 5.275 3.31 5.275c4.93 0 4.799-.15 3.737 4.294c-.8 3.35-.813 3.992-.088 4.715c.554.556 1.6.494 4.87-.289c2.499-.596 2.937-.637 3.516-.328l.66.354l-.177 3.594c-.178 3.593-.177 3.595.475 4.248c.358.36.884.652 1.165.652s1.903-.63 3.604-1.404c4.22-1.916 4.194-1.932 4.973 2.75c.617 3.711.977 4.4 2.294 4.4c.327 0 1.83-.88 3.34-1.958c2.654-1.893 3.342-2.19 4.049-1.74c.182.115.89 1.67 1.572 3.455c1.003 2.625 1.37 3.31 1.929 3.576c1.062.51 1.72.1 4.218-2.62c3.016-3.286 3.14-3.27 5.602.72c2.72 4.406 3.424 4.396 6.212-.089c2.402-3.864 2.374-3.862 5.621-.47c2.157 2.25 2.616 2.61 3.343 2.61c.464 0 1.019-.175 1.23-.388c.214-.213.92-1.786 1.568-3.496c.649-1.71 1.321-3.2 1.495-3.31c.687-.436 1.398-.13 4.048 1.752c1.56 1.108 3.028 1.96 3.377 1.96c1.296 0 1.764-.92 2.302-4.535c.46-3.082.554-3.378 1.16-3.685c.596-.302.954-.2 3.75 1.07c1.701.77 3.323 1.402 3.604 1.402s.816-.302 1.184-.672l.672-.67l-.184-3.448c-.177-3.29-.16-3.468.364-3.943c.54-.488.596-.486 3.615.204c3.656.835 4.338.857 5.025.17c.671-.67.664-.818-.254-4.69c-1.03-4.346-1.168-4.19 3.78-4.19c3.374 0 3.75-.049 4.18-.523c.718-.793.547-1.702-.896-4.779c-.729-1.55-1.32-2.96-1.315-3.135c.024-.914.743-1.227 4.065-1.767c2.033-.329 3.553-.71 3.829-.96c.923-.833.584-1.918-1.523-4.873c-2.642-3.703-2.63-3.738 1.599-5.297c5.064-1.866 5.209-2.488 1.419-6.09c-3.51-3.335-3.512-3.317.333-5.677c4.648-2.853 4.655-3.496.082-6.335c-3.933-2.44-3.93-2.406-.405-5.753c3.78-3.593 3.678-4.063-1.295-5.965c-4.388-1.679-4.402-1.72-1.735-5.38c1.588-2.18 1.982-2.903 1.982-3.65c0-1.306-.586-1.598-4.436-2.22c-3.216-.52-3.924-.835-3.924-1.75c0-.174.588-1.574 1.307-3.113c1.406-3.013 1.604-4.22.808-4.94c-.428-.387-1-.443-4.067-.392c-3.208.054-3.618.008-4.063-.439c-.486-.488-.48-.557.278-3.725c.931-3.88.935-3.975.17-4.694c-.777-.73-1.262-.718-4.826.121c-2.597.612-3.027.653-3.617.337l-.67-.36l.185-3.582l.186-3.58l-.67-.67c-.369-.37-.891-.67-1.163-.67c-.27 0-1.884.64-3.583 1.421c-2.838 1.306-3.143 1.393-3.757 1.072c-.612-.32-.714-.637-1.237-3.829c-.603-3.693-.977-4.412-2.288-4.412c-.311 0-1.853.925-3.426 2.055c-2.584 1.856-2.93 2.032-3.574 1.807c-.533-.186-.843-.59-1.221-1.599c-.28-.742-.817-2.172-1.194-3.177c-.762-2.028-1.187-2.482-2.328-2.482c-.637 0-1.213.458-3.28 2.604c-3.25 3.375-3.261 3.374-5.65-.545C66.073 1.78 65.075.382 64.81.24c-.597-.32-1.3-.32-1.85.002m2.96 11.798c2.83 2.014 1.326 6.75-2.144 6.75c-3.368 0-5.064-4.057-2.66-6.36c1.358-1.3 3.304-1.459 4.805-.39m-3.558 12.507c1.855.705 2.616.282 6.852-3.8l3.182-3.07l1.347.18c4.225.56 12.627 4.25 17.455 7.666c4.436 3.14 10.332 9.534 12.845 13.93l.537.942l-2.38 5.364c-1.31 2.95-2.382 5.673-2.382 6.053c0 .878.576 2.267 1.13 2.726c.234.195 2.457 1.265 4.939 2.378l4.51 2.025l.178 1.148c.23 1.495.26 5.167.052 6.21l-.163.816h-2.575c-2.987 0-2.756-.267-2.918 3.396c-.118 2.656-.76 4.124-2.22 5.075c-2.377 1.551-6.304 1.27-7.97-.57c-.255-.284-.752-1.705-1.105-3.16c-1.03-4.254-2.413-6.64-5.193-8.965c-.878-.733-1.595-1.418-1.595-1.522c0-.102.965-.915 2.145-1.803c4.298-3.24 6.77-7.012 7.04-10.747c.519-7.126-5.158-13.767-13.602-15.92c-2.002-.51-2.857-.526-27.624-.526c-14.057 0-25.56-.092-25.56-.204c0-.263 3.125-3.295 4.965-4.816c5.054-4.178 11.618-7.465 18.417-9.22l2.35-.61l3.34 3.387c1.839 1.863 3.64 3.5 4.003 3.637M20.3 46.34c1.539 1.008 2.17 3.54 1.26 5.062c-1.405 2.356-4.966 2.455-6.373.178c-2.046-3.309 1.895-7.349 5.113-5.24m90.672.13c4.026 2.454.906 8.493-3.404 6.586c-2.877-1.273-2.97-5.206-.155-6.64c1.174-.6 2.523-.579 3.56.053M32.163 61.5v15.02h-13.28l-.526-2.285c-1.036-4.5-1.472-9.156-1.211-12.969l.182-2.679l4.565-2.047c2.864-1.283 4.706-2.262 4.943-2.625c1.038-1.584.94-2.715-.518-5.933l-.68-1.502h6.523V61.5M70.39 47.132c2.843.74 4.345 2.245 4.349 4.355c.002 1.55-.765 2.52-2.67 3.38c-1.348.61-1.562.625-10.063.708l-8.686.084v-8.92h7.782c6.078 0 8.112.086 9.288.393m-2.934 21.554c1.41.392 3.076 1.616 3.93 2.888c.898 1.337 1.423 3.076 2.667 8.836c1.05 4.87 1.727 6.46 3.62 8.532c2.345 2.566 1.8 2.466 13.514 2.466c5.61 0 10.198.09 10.198.2c0 .197-3.863 4.764-4.03 4.764c-.048 0-2.066-.422-4.484-.939c-6.829-1.458-7.075-1.287-8.642 6.032l-1.008 4.702l-.91.448c-1.518.75-6.453 2.292-9.01 2.82c-4.228.87-8.828 1.162-12.871.821c-6.893-.585-16.02-3.259-16.377-4.8c-.075-.327-.535-2.443-1.018-4.704c-.485-2.26-1.074-4.404-1.31-4.764c-1.13-1.724-2.318-1.83-7.547-.674c-1.98.44-3.708.796-3.84.796c-.248 0-3.923-4.249-3.923-4.535c0-.09 8.728-.194 19.396-.23l19.395-.066l.07-6.89c.05-4.865-.018-6.997-.23-7.25c-.234-.284-1.485-.358-6.011-.358H53.32v-8.36l6.597.001c3.626.002 7.02.12 7.539.264M37.57 100.02c3.084 1.88 1.605 6.804-2.043 6.8c-3.74 0-5.127-4.88-1.94-6.826c1.055-.643 2.908-.63 3.983.026m56.48.206c1.512 1.108 2.015 3.413 1.079 4.95c-2.46 4.034-8.612.827-6.557-3.419c1.01-2.085 3.695-2.837 5.478-1.53\"/>"
  },
  {
    "id": "devicon:php",
    "name": "PHP",
    "category": "tech",
    "keywords": "php php php web",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"url(#SVGC9rnueOH)\" d=\"M0 64c0 18.593 28.654 33.667 64 33.667S128 82.593 128 64S99.345 30.333 64 30.333S0 45.407 0 64\"/><path fill=\"#777bb3\" d=\"M64 95.167c33.965 0 61.5-13.955 61.5-31.167c0-17.214-27.535-31.167-61.5-31.167S2.5 46.786 2.5 64c0 17.212 27.535 31.167 61.5 31.167\"/><path d=\"M34.772 67.864c2.793 0 4.877-.515 6.196-1.53c1.306-1.006 2.207-2.747 2.68-5.175c.44-2.27.272-3.854-.5-4.71c-.788-.874-2.493-1.317-5.067-1.317h-4.464l-2.473 12.732zM20.173 83.547a.694.694 0 0 1-.68-.828l6.557-33.738a.695.695 0 0 1 .68-.561h14.134c4.442 0 7.748 1.206 9.827 3.585c2.088 2.39 2.734 5.734 1.917 9.935c-.333 1.711-.905 3.3-1.7 4.724a15.8 15.8 0 0 1-3.128 3.92c-1.531 1.432-3.264 2.472-5.147 3.083c-1.852.604-4.232.91-7.07.91h-5.724l-1.634 8.408a.695.695 0 0 1-.682.562z\"/><path fill=\"#fff\" d=\"M34.19 55.826h3.891c3.107 0 4.186.682 4.553 1.089c.607.674.723 2.097.331 4.112c-.439 2.257-1.253 3.858-2.42 4.756c-1.194.92-3.138 1.386-5.773 1.386h-2.786zm6.674-8.1H26.731a1.39 1.39 0 0 0-1.364 1.123L18.81 82.588a1.39 1.39 0 0 0 1.363 1.653h7.35a1.39 1.39 0 0 0 1.363-1.124l1.525-7.846h5.151c2.912 0 5.364-.318 7.287-.944c1.977-.642 3.796-1.731 5.406-3.237a16.5 16.5 0 0 0 3.259-4.087c.831-1.487 1.429-3.147 1.775-4.931c.86-4.423.161-7.964-2.076-10.524c-2.216-2.537-5.698-3.823-10.349-3.823zM30.301 68.557h4.471q4.445.001 6.62-1.675q2.175-1.674 2.938-5.591q.728-3.762-.665-5.308q-1.395-1.546-5.584-1.546h-5.036l-2.743 14.12m10.563-19.445q6.378 0 9.303 3.348t1.76 9.346q-.482 2.472-1.625 4.518q-1.145 2.048-2.991 3.747q-2.2 2.06-4.892 2.935q-2.691.876-6.857.875h-6.296l-1.743 8.97h-7.35l6.558-33.739z\"/><path d=\"M69.459 74.577a.694.694 0 0 1-.682-.827l2.9-14.928c.277-1.42.209-2.438-.19-2.87c-.245-.263-.979-.704-3.15-.704h-5.256l-3.646 18.768a.695.695 0 0 1-.683.56h-7.29a.695.695 0 0 1-.683-.826l6.558-33.739a.695.695 0 0 1 .682-.561h7.29a.695.695 0 0 1 .683.826L64.41 48.42h5.653c4.307 0 7.227.758 8.928 2.321c1.733 1.593 2.275 4.14 1.608 7.573l-3.051 15.702a.695.695 0 0 1-.682.56z\"/><path fill=\"#fff\" d=\"M65.31 38.755h-7.291a1.39 1.39 0 0 0-1.364 1.124l-6.557 33.738a1.39 1.39 0 0 0 1.363 1.654h7.291a1.39 1.39 0 0 0 1.364-1.124l3.537-18.205h4.682c2.168 0 2.624.463 2.641.484c.132.14.305.795.019 2.264l-2.9 14.927a1.39 1.39 0 0 0 1.364 1.654h7.408a1.39 1.39 0 0 0 1.363-1.124l3.051-15.7c.715-3.686.103-6.45-1.82-8.217c-1.836-1.686-4.91-2.505-9.398-2.505h-4.81l1.421-7.315a1.39 1.39 0 0 0-1.364-1.655m0 1.39l-1.743 8.968h6.496q6.131 0 8.457 2.14q2.328 2.138 1.398 6.93l-3.052 15.699h-7.407l2.901-14.928q.495-2.547-.365-3.474q-.86-.926-3.658-.926h-5.829l-3.756 19.327H51.46l6.558-33.739h7.292z\"/><path d=\"M92.136 67.864c2.793 0 4.878-.515 6.198-1.53c1.304-1.006 2.206-2.747 2.679-5.175c.44-2.27.273-3.854-.5-4.71c-.788-.874-2.493-1.317-5.067-1.317h-4.463l-2.475 12.732zM77.54 83.547a.694.694 0 0 1-.682-.828l6.557-33.738a.695.695 0 0 1 .682-.561H98.23c4.442 0 7.748 1.206 9.826 3.585c2.089 2.39 2.734 5.734 1.917 9.935a15.9 15.9 0 0 1-1.699 4.724a15.8 15.8 0 0 1-3.128 3.92c-1.53 1.432-3.265 2.472-5.147 3.083c-1.852.604-4.232.91-7.071.91h-5.723l-1.633 8.408a.695.695 0 0 1-.683.562z\"/><path fill=\"#fff\" d=\"M91.555 55.826h3.891c3.107 0 4.186.682 4.552 1.089c.61.674.724 2.097.333 4.112c-.44 2.257-1.254 3.858-2.421 4.756c-1.195.92-3.139 1.386-5.773 1.386h-2.786zm6.674-8.1H84.096a1.39 1.39 0 0 0-1.363 1.123l-6.558 33.739a1.39 1.39 0 0 0 1.364 1.653h7.35a1.39 1.39 0 0 0 1.363-1.124l1.525-7.846h5.15c2.911 0 5.364-.318 7.286-.944c1.978-.642 3.797-1.731 5.408-3.238a16.5 16.5 0 0 0 3.258-4.086c.832-1.487 1.428-3.147 1.775-4.931c.86-4.423.162-7.964-2.076-10.524c-2.216-2.537-5.697-3.823-10.35-3.823zM87.666 68.557h4.47q4.445.001 6.622-1.675q2.175-1.674 2.936-5.591q.731-3.762-.665-5.308t-5.583-1.546h-5.035Zm10.563-19.445q6.378 0 9.303 3.348t1.759 9.346q-.48 2.472-1.624 4.518q-1.144 2.048-2.992 3.747q-2.2 2.06-4.892 2.935q-2.69.876-6.856.875h-6.295l-1.745 8.97h-7.35l6.558-33.739h14.133\"/><defs><radialGradient id=\"SVGC9rnueOH\" cx=\"0\" cy=\"0\" r=\"1\" gradientTransform=\"translate(38.426 42.169)scale(84.04136)\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#aeb2d5\"/><stop offset=\".3\" stop-color=\"#aeb2d5\"/><stop offset=\".75\" stop-color=\"#484c89\"/><stop offset=\"1\" stop-color=\"#484c89\"/></radialGradient></defs>"
  },
  {
    "id": "devicon:postgresql",
    "name": "PostgreSQL",
    "category": "tech",
    "keywords": "postgresql postgresql postgres sql database",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path d=\"M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938c6.191-2.873 9.861-7.668 3.758-6.409c-13.924 2.873-14.881-1.842-14.881-1.842c14.703-21.815 20.849-49.508 15.543-56.287c-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968c-6.301-.104-11.082 1.652-14.709 4.402c0 0-44.683-18.409-42.604 23.151c.442 8.841 12.672 66.898 27.26 49.362c5.332-6.412 10.484-11.834 10.484-11.834c2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497c-3.757 4.199-2.653 4.936-10.166 6.482c-7.602 1.566-3.136 4.355-.221 5.084c3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69c.209 5.214.558 10.079 1.621 12.948s2.317 10.256 12.191 8.14c8.252-1.764 14.561-4.309 15.136-27.985\"/><path d=\"M75.458 125.256c-4.367 0-7.211-1.689-8.938-3.32c-2.607-2.46-3.641-5.629-4.259-7.522l-.267-.79c-1.244-3.358-1.666-8.193-1.916-14.419c-.038-.935-.064-1.898-.093-2.919c-.021-.747-.047-1.684-.085-2.664a18.8 18.8 0 0 1-4.962 1.568c-3.079.526-6.389.356-9.84-.507c-2.435-.609-4.965-1.871-6.407-3.82c-4.203 3.681-8.212 3.182-10.396 2.453c-3.853-1.285-7.301-4.896-10.542-11.037c-2.309-4.375-4.542-10.075-6.638-16.943c-3.65-11.96-5.969-24.557-6.175-28.693C4.292 23.698 7.777 14.44 15.296 9.129C27.157.751 45.128 5.678 51.68 7.915c4.402-2.653 9.581-3.944 15.433-3.851c3.143.051 6.136.327 8.916.823c2.9-.912 8.628-2.221 15.185-2.139c12.081.144 22.092 4.852 28.949 13.615c4.894 6.252 2.474 19.381.597 26.651c-2.642 10.226-7.271 21.102-12.957 30.57c1.544.011 3.781-.174 6.961-.831c6.274-1.295 8.109 2.069 8.607 3.575c1.995 6.042-6.677 10.608-9.382 11.864c-3.466 1.609-9.117 2.589-13.745 2.377l-.202-.013l-1.216-.107l-.12 1.014l-.116.991c-.311 11.999-2.025 19.598-5.552 24.619c-3.697 5.264-8.835 6.739-13.361 7.709c-1.544.33-2.947.474-4.219.474m-9.19-43.671c2.819 2.256 3.066 6.501 3.287 14.434c.028.99.054 1.927.089 2.802c.106 2.65.355 8.855 1.327 11.477c.137.371.26.747.39 1.146c1.083 3.316 1.626 4.979 6.309 3.978c3.931-.843 5.952-1.599 7.534-3.851c2.299-3.274 3.585-9.86 3.821-19.575l4.783.116l-4.75-.57l.14-1.186c.455-3.91.783-6.734 3.396-8.602c2.097-1.498 4.486-1.353 6.389-1.01c-2.091-1.58-2.669-3.433-2.823-4.193l-.399-1.965l1.121-1.663c6.457-9.58 11.781-21.354 14.609-32.304c2.906-11.251 2.02-17.226 1.134-18.356c-11.729-14.987-32.068-8.799-34.192-8.097l-.359.194l-1.8.335l-.922-.191c-2.542-.528-5.366-.82-8.393-.869c-4.756-.08-8.593 1.044-11.739 3.431l-2.183 1.655l-2.533-1.043c-5.412-2.213-21.308-6.662-29.696-.721c-4.656 3.298-6.777 9.76-6.305 19.207c.156 3.119 2.275 14.926 5.771 26.377c4.831 15.825 9.221 21.082 11.054 21.693c.32.108 1.15-.537 1.976-1.529a271 271 0 0 1 10.694-12.07l2.77-2.915l3.349 2.225c1.35.897 2.839 1.406 4.368 1.502l7.987-6.812l-1.157 11.808c-.026.265-.039.626.065 1.296l.348 2.238l-1.51 1.688l-.174.196l4.388 2.025z\"/><path fill=\"#336791\" d=\"M115.731 77.44c-13.925 2.873-14.882-1.842-14.882-1.842c14.703-21.816 20.849-49.51 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967c-6.301-.103-11.08 1.652-14.707 4.402c0 0-44.684-18.408-42.606 23.151c.442 8.842 12.672 66.899 27.26 49.363c5.332-6.412 10.483-11.834 10.483-11.834c2.559 1.699 5.622 2.567 8.833 2.255l.25-.212c-.078.796-.042 1.575.1 2.497c-3.758 4.199-2.654 4.936-10.167 6.482c-7.602 1.566-3.136 4.355-.22 5.084c3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.18 2.507 7.672 2.334 13.557s-.29 9.926.871 13.082c1.16 3.156 2.316 10.256 12.192 8.14c8.252-1.768 12.528-6.351 13.124-13.995c.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.639-.602 11.514-1.938c6.19-2.871 9.861-7.667 3.758-6.408\"/><path fill=\"#fff\" d=\"M75.957 122.307c-8.232 0-10.84-6.519-11.907-9.185c-1.562-3.907-1.899-19.069-1.551-31.503a1.59 1.59 0 0 1 1.64-1.55a1.594 1.594 0 0 1 1.55 1.639c-.401 14.341.168 27.337 1.324 30.229c1.804 4.509 4.54 8.453 12.275 6.796c7.343-1.575 10.093-4.359 11.318-11.46c.94-5.449 2.799-20.951 3.028-24.01a1.593 1.593 0 0 1 1.71-1.472a1.597 1.597 0 0 1 1.472 1.71c-.239 3.185-2.089 18.657-3.065 24.315c-1.446 8.387-5.185 12.191-13.794 14.037c-1.463.313-2.792.453-4 .454M31.321 90.466a6.7 6.7 0 0 1-2.116-.35c-5.347-1.784-10.44-10.492-15.138-25.885c-3.576-11.717-5.842-23.947-6.041-27.922c-.589-11.784 2.445-20.121 9.02-24.778c13.007-9.216 34.888-.44 35.813-.062a1.596 1.596 0 0 1-1.207 2.955c-.211-.086-21.193-8.492-32.768-.285c-5.622 3.986-8.203 11.392-7.672 22.011c.167 3.349 2.284 15.285 5.906 27.149c4.194 13.742 8.967 22.413 13.096 23.79c.648.216 2.62.873 5.439-2.517A245 245 0 0 1 45.88 73.046a1.596 1.596 0 0 1 2.304 2.208c-.048.05-4.847 5.067-10.077 11.359c-2.477 2.979-4.851 3.853-6.786 3.853m69.429-13.445a1.596 1.596 0 0 1-1.322-2.487c14.863-22.055 20.08-48.704 15.612-54.414c-5.624-7.186-13.565-10.939-23.604-11.156c-7.433-.16-13.341 1.738-14.307 2.069l-.243.099c-.971.305-1.716-.227-1.997-.849a1.6 1.6 0 0 1 .631-2.025c.046-.027.192-.089.429-.176l-.021.006l.021-.007c1.641-.601 7.639-2.4 15.068-2.315c11.108.118 20.284 4.401 26.534 12.388c2.957 3.779 2.964 12.485.019 23.887c-3.002 11.625-8.651 24.118-15.497 34.277c-.306.457-.81.703-1.323.703m.76 10.21c-2.538 0-4.813-.358-6.175-1.174c-1.4-.839-1.667-1.979-1.702-2.584c-.382-6.71 3.32-7.878 5.208-8.411c-.263-.398-.637-.866-1.024-1.349c-1.101-1.376-2.609-3.26-3.771-6.078c-.182-.44-.752-1.463-1.412-2.648c-3.579-6.418-11.026-19.773-6.242-26.612c2.214-3.165 6.623-4.411 13.119-3.716C97.6 28.837 88.5 10.625 66.907 10.271c-6.494-.108-11.82 1.889-15.822 5.93c-8.96 9.049-8.636 25.422-8.631 25.586a1.595 1.595 0 1 1-3.19.084c-.02-.727-.354-17.909 9.554-27.916C53.455 9.272 59.559 6.96 66.96 7.081c13.814.227 22.706 7.25 27.732 13.101c5.479 6.377 8.165 13.411 8.386 15.759c.165 1.746-1.088 2.095-1.341 2.147l-.576.013c-6.375-1.021-10.465-.312-12.156 2.104c-3.639 5.201 3.406 17.834 6.414 23.229c.768 1.376 1.322 2.371 1.576 2.985c.988 2.396 2.277 4.006 3.312 5.3c.911 1.138 1.7 2.125 1.982 3.283c.131.23 1.99 2.98 13.021.703c2.765-.57 4.423-.083 4.93 1.45c.997 3.015-4.597 6.532-7.694 7.97c-2.775 1.29-7.204 2.106-11.036 2.106m-4.696-4.021c.35.353 2.101.962 5.727.806c3.224-.138 6.624-.839 8.664-1.786c2.609-1.212 4.351-2.567 5.253-3.492l-.5.092c-7.053 1.456-12.042 1.262-14.828-.577a6 6 0 0 1-.54-.401c-.302.119-.581.197-.78.253c-1.58.443-3.214.902-2.996 5.105m-45.562 8.915c-1.752 0-3.596-.239-5.479-.71c-1.951-.488-5.24-1.957-5.19-4.37c.057-2.707 3.994-3.519 5.476-3.824c5.354-1.103 5.703-1.545 7.376-3.67c.488-.619 1.095-1.39 1.923-2.314c1.229-1.376 2.572-2.073 3.992-2.073c.989 0 1.8.335 2.336.558c1.708.708 3.133 2.42 3.719 4.467c.529 1.847.276 3.625-.71 5.006c-3.237 4.533-7.886 6.93-13.443 6.93m-7.222-4.943c.481.372 1.445.869 2.518 1.137c1.631.408 3.213.615 4.705.615c4.546 0 8.196-1.882 10.847-5.594c.553-.774.387-1.757.239-2.274c-.31-1.083-1.08-2.068-1.873-2.397c-.43-.178-.787-.314-1.115-.314c-.176 0-.712 0-1.614 1.009a41 41 0 0 0-1.794 2.162c-2.084 2.646-3.039 3.544-9.239 4.821c-1.513.31-2.289.626-2.674.835m12.269-7.36a1.596 1.596 0 0 1-1.575-1.354a8 8 0 0 1-.08-.799c-4.064-.076-7.985-1.82-10.962-4.926c-3.764-3.927-5.477-9.368-4.699-14.927c.845-6.037.529-11.366.359-14.229c-.047-.796-.081-1.371-.079-1.769c.003-.505.013-1.844 4.489-4.113c1.592-.807 4.784-2.215 8.271-2.576c5.777-.597 9.585 1.976 10.725 7.246c3.077 14.228.244 20.521-1.825 25.117c-.385.856-.749 1.664-1.04 2.447l-.257.69c-1.093 2.931-2.038 5.463-1.748 7.354a1.595 1.595 0 0 1-1.335 1.819zM42.464 42.26l.062 1.139c.176 2.974.504 8.508-.384 14.86c-.641 4.585.759 9.06 3.843 12.276c2.437 2.542 5.644 3.945 8.94 3.945h.068c.369-1.555.982-3.197 1.642-4.966l.255-.686c.329-.884.714-1.74 1.122-2.646c1.991-4.424 4.47-9.931 1.615-23.132c-.565-2.615-1.936-4.128-4.189-4.627c-4.628-1.022-11.525 2.459-12.974 3.837m9.63-.677c-.08.564 1.033 2.07 2.485 2.271c1.449.203 2.689-.975 2.768-1.539s-1.033-1.186-2.485-1.388s-2.691.092-2.768.656m2.818 2.826l-.407-.028c-.9-.125-1.81-.692-2.433-1.518c-.219-.29-.576-.852-.505-1.354c.101-.736.999-1.177 2.4-1.177c.313 0 .639.023.967.069c.766.106 1.477.327 2.002.62c.91.508.977 1.075.936 1.368c-.112.813-1.405 2.02-2.96 2.02m-2.289-2.732c.045.348.907 1.496 2.029 1.651l.261.018c1.036 0 1.81-.815 1.901-1.082c-.096-.182-.762-.634-2.025-.81a6 6 0 0 0-.821-.059c-.812 0-1.243.183-1.345.282m43.605-1.245c.079.564-1.033 2.07-2.484 2.272c-1.45.202-2.691-.975-2.771-1.539c-.076-.564 1.036-1.187 2.486-1.388c1.45-.203 2.689.092 2.769.655m-2.819 2.56c-1.396 0-2.601-1.086-2.7-1.791c-.115-.846 1.278-1.489 2.712-1.688c.316-.044.629-.066.93-.066c1.238 0 2.058.363 2.14.949c.053.379-.238.964-.739 1.492c-.331.347-1.026.948-1.973 1.079zm.943-3.013q-.416 0-.856.061c-1.441.201-2.301.779-2.259 1.089c.048.341.968 1.332 2.173 1.332l.297-.021c.787-.109 1.378-.623 1.66-.919c.443-.465.619-.903.598-1.052c-.028-.198-.56-.49-1.613-.49m3.965 32.843a1.594 1.594 0 0 1-1.324-2.483c3.398-5.075 2.776-10.25 2.175-15.255c-.257-2.132-.521-4.337-.453-6.453c.07-2.177.347-3.973.614-5.71c.317-2.058.617-4.002.493-6.31a1.595 1.595 0 1 1 3.186-.172c.142 2.638-.197 4.838-.525 6.967c-.253 1.643-.515 3.342-.578 5.327c-.061 1.874.178 3.864.431 5.97c.64 5.322 1.365 11.354-2.691 17.411a1.6 1.6 0 0 1-1.328.708\"/>"
  },
  {
    "id": "devicon:mysql",
    "name": "MySQL",
    "category": "tech",
    "keywords": "mysql mysql mysql sql database",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#00618a\" d=\"M117.688 98.242c-6.973-.191-12.297.461-16.852 2.379c-1.293.547-3.355.559-3.566 2.18c.711.746.82 1.859 1.387 2.777c1.086 1.754 2.922 4.113 4.559 5.352c1.789 1.348 3.633 2.793 5.551 3.961c3.414 2.082 7.223 3.27 10.504 5.352c1.938 1.23 3.859 2.777 5.75 4.164c.934.684 1.563 1.75 2.773 2.18v-.195c-.637-.812-.801-1.93-1.387-2.777l-2.578-2.578c-2.52-3.344-5.719-6.281-9.117-8.719c-2.711-1.949-8.781-4.578-9.91-7.73l-.199-.199c1.922-.219 4.172-.914 5.949-1.391c2.98-.797 5.645-.59 8.719-1.387l4.164-1.187v-.793c-1.555-1.594-2.664-3.707-4.359-5.152c-4.441-3.781-9.285-7.555-14.273-10.703c-2.766-1.746-6.184-2.883-9.117-4.363c-.988-.496-2.719-.758-3.371-1.586c-1.539-1.961-2.379-4.449-3.566-6.738c-2.488-4.793-4.93-10.023-7.137-15.066c-1.504-3.437-2.484-6.828-4.359-9.91c-9-14.797-18.687-23.73-33.695-32.508c-3.195-1.867-7.039-2.605-11.102-3.57l-6.543-.395c-1.332-.555-2.715-2.184-3.965-2.977C16.977 3.52 4.223-3.312.539 5.672C-1.785 11.34 4.016 16.871 6.09 19.746c1.457 2.012 3.32 4.273 4.359 6.539c.688 1.492.805 2.984 1.391 4.559c1.438 3.883 2.695 8.109 4.559 11.695c.941 1.816 1.98 3.727 3.172 5.352c.727.996 1.98 1.438 2.18 2.973c-1.227 1.715-1.297 4.375-1.984 6.543c-3.098 9.77-1.926 21.91 2.578 29.137c1.383 2.223 4.641 6.98 9.117 5.156c3.918-1.598 3.043-6.539 4.164-10.902c.254-.988.098-1.715.594-2.379v.199l3.57 7.133c2.641 4.254 7.324 8.699 11.297 11.699c2.059 1.555 3.68 4.242 6.344 5.152v-.199h-.199c-.516-.805-1.324-1.137-1.98-1.781c-1.551-1.523-3.277-3.414-4.559-5.156c-3.613-4.902-6.805-10.27-9.711-15.855c-1.391-2.668-2.598-5.609-3.77-8.324c-.453-1.047-.445-2.633-1.387-3.172c-1.281 1.988-3.172 3.598-4.164 5.945c-1.582 3.754-1.789 8.336-2.375 13.082c-.348.125-.195.039-.398.199c-2.762-.668-3.73-3.508-4.758-5.949c-2.594-6.164-3.078-16.09-.793-23.191c.59-1.836 3.262-7.617 2.18-9.316c-.516-1.691-2.219-2.672-3.172-3.965c-1.18-1.598-2.355-3.703-3.172-5.551c-2.125-4.805-3.113-10.203-5.352-15.062c-1.07-2.324-2.875-4.676-4.359-6.738c-1.645-2.289-3.484-3.977-4.758-6.742c-.453-.984-1.066-2.559-.398-3.566c.215-.684.516-.969 1.191-1.191c1.148-.887 4.352.297 5.547.793c3.18 1.32 5.832 2.578 8.527 4.363c1.289.855 2.598 2.512 4.16 2.973h1.785c2.789.641 5.914.195 8.523.988c4.609 1.402 8.738 3.582 12.488 5.949c11.422 7.215 20.766 17.48 27.156 29.734c1.027 1.973 1.473 3.852 2.379 5.945c1.824 4.219 4.125 8.559 5.941 12.688c1.816 4.113 3.582 8.27 6.148 11.695c1.348 1.801 6.551 2.766 8.918 3.766c1.66.699 4.379 1.43 5.949 2.379c3 1.809 5.906 3.965 8.723 5.945c1.402.992 5.73 3.168 5.945 4.957zm-88.605-75.52c-1.453-.027-2.48.156-3.566.395v.199h.195c.695 1.422 1.918 2.34 2.777 3.566l1.98 4.164l.199-.195c1.227-.867 1.789-2.25 1.781-4.363c-.492-.52-.562-1.164-.992-1.785c-.562-.824-1.66-1.289-2.375-1.98zm0 0\"/>"
  },
  {
    "id": "devicon:mongodb",
    "name": "MongoDB",
    "category": "tech",
    "keywords": "mongodb mongodb mongo nosql database",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#00ed64\" d=\"m67.74 112.713l-.44.348C66.91 119.236 65.933 128 65.933 128h-3.911s-.978-8.814-1.37-14.939l-.44-.299s-52.46-39.687-7.138-98.496C58.353 7.893 62.901 1.42 63.83.075a.234.234 0 0 1 .342 0c.929 1.344 5.476 7.818 10.756 14.191c45.323 58.81-7.138 98.497-7.187 98.447m-3.764-.847s2.347-2.042 2.983-3.087v-.1l-2.836-64.037c0-.2-.293-.2-.293 0l-2.836 64.037v.1c.635 1.045 2.982 3.087 2.982 3.087\"/>"
  },
  {
    "id": "devicon:git",
    "name": "Git",
    "category": "tech",
    "keywords": "git git git version control",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#f34f29\" d=\"M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314c2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295c3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 0 1-13.683 0a9.68 9.68 0 0 1-2.105-10.521L68.574 47.933l-.002 34.341a9.7 9.7 0 0 1 2.559 1.828c3.778 3.777 3.778 9.898 0 13.683c-3.779 3.777-9.904 3.777-13.679 0c-3.778-3.784-3.778-9.905 0-13.683a9.7 9.7 0 0 1 3.167-2.11V47.333a9.6 9.6 0 0 1-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333L3.264 58.123a8.133 8.133 0 0 0 0 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 0 0-.001-11.501\"/>"
  },
  {
    "id": "devicon:github",
    "name": "GitHub",
    "category": "tech",
    "keywords": "github github github repo",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<g fill=\"#181616\"><path fill-rule=\"evenodd\" d=\"M64 5.103c-33.347 0-60.388 27.035-60.388 60.388c0 26.682 17.303 49.317 41.297 57.303c3.017.56 4.125-1.31 4.125-2.905c0-1.44-.056-6.197-.082-11.243c-16.8 3.653-20.345-7.125-20.345-7.125c-2.747-6.98-6.705-8.836-6.705-8.836c-5.48-3.748.413-3.67.413-3.67c6.063.425 9.257 6.223 9.257 6.223c5.386 9.23 14.127 6.562 17.573 5.02c.542-3.903 2.107-6.568 3.834-8.076c-13.413-1.525-27.514-6.704-27.514-29.843c0-6.593 2.36-11.98 6.223-16.21c-.628-1.52-2.695-7.662.584-15.98c0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033c11.526-7.813 16.59-6.19 16.59-6.19c3.287 8.317 1.22 14.46.593 15.98c3.872 4.23 6.215 9.617 6.215 16.21c0 23.194-14.127 28.3-27.574 29.796c2.167 1.874 4.097 5.55 4.097 11.183c0 8.08-.07 14.583-.07 16.572c0 1.607 1.088 3.49 4.148 2.897c23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z\" clip-rule=\"evenodd\"/><path d=\"M26.484 91.806c-.133.3-.605.39-1.035.185c-.44-.196-.685-.605-.543-.906c.13-.31.603-.395 1.04-.188c.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28c-.396-.42-.47-.983-.177-1.254c.298-.266.844-.14 1.24.28c.394.426.472.984.17 1.255zm2.382 3.477c-.37.258-.976.017-1.35-.52c-.37-.538-.37-1.183.01-1.44c.373-.258.97-.025 1.35.507c.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23c-.527-.487-.674-1.18-.343-1.544c.336-.366 1.045-.264 1.564.23c.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486c-.683-.207-1.13-.76-.99-1.238c.14-.477.823-.7 1.512-.485c.683.206 1.13.756.988 1.237m4.943.361c.017.498-.563.91-1.28.92c-.723.017-1.308-.387-1.315-.877c0-.503.568-.91 1.29-.924c.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117c-.7.13-1.35-.172-1.44-.653c-.086-.498.422-.997 1.122-1.126c.714-.123 1.354.17 1.444.663zm0 0\"/></g>"
  },
  {
    "id": "devicon:docker",
    "name": "Docker",
    "category": "tech",
    "keywords": "docker docker docker container devops",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#3a4d54\" fill-rule=\"evenodd\" d=\"M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3c1.2-.4 2.6-1 3.8-1.7c-1.6-2.1-2.4-4.7-2.6-7.3c-.3-3.5.4-8.1 2.8-10.8l1.2-1.4l1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4c4.3-1.3 9.3-1 13.1 1.2l1.5.9l-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8c-9.8 24.3-31 35.8-56.8 35.8c-13.3 0-25.5-5-32.5-16.8l-.1-.2l-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5z\" clip-rule=\"evenodd\"/><path fill=\"#00aada\" d=\"M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7c-3.1 3.6-3.6 13.2 1.3 17.2c-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6c3 .2 5.7.3 8.2.2c4.9-.1 8.9-.7 12-1.7c.5-.2.9.1 1.1.5c.2.5-.1.9-.5 1.1c-.4.1-.8.3-1.3.4c-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1c-1.6 0-3.1 0-4.9-.1c6 6.8 15.4 10.8 27.2 10.8c25 0 46.2-11.1 55.5-35.9c6.7.7 13.1-1 16-6.7c-4.5-2.7-10.5-1.8-13.9-.1\"/><path fill=\"#28b8eb\" d=\"M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7c-3.1 3.6-3.6 13.2 1.3 17.2c-2.8 2.4-8.5 4.7-14.5 4.7h-68c-.3 9.5 3.2 16.7 9.5 21c4.9-.1 8.9-.7 12-1.7c.5-.2.9.1 1.1.5c.2.5-.1.9-.5 1.1c-.4.1-.8.3-1.3.4c-2.4.7-5.2 1.2-8.5 1.4l-.1-.1c8.5 4.4 20.8 4.3 35-1.1c15.8-6.1 30.6-17.7 40.9-30.9c-.2.1-.4.1-.5.2\"/><path fill=\"#028bb8\" d=\"M18.7 71.8c.4 3.3 1.4 6.4 2.9 9.3l.8 1.5c.5.9 1.1 1.7 1.7 2.6c3 .2 5.7.3 8.2.2c4.9-.1 8.9-.7 12-1.7c.5-.2.9.1 1.1.5c.2.5-.1.9-.5 1.1c-.4.1-.8.3-1.3.4c-2.4.7-5.2 1.2-8.5 1.4h-.4c-1.3.1-2.7.1-4.1.1c-1.6 0-3.2 0-4.9-.1c6 6.8 15.5 10.8 27.3 10.8c21.4 0 40-8.1 50.8-26H18.7z\"/><path fill=\"#019bc6\" d=\"M23.5 71.8c1.3 5.8 4.3 10.4 8.8 13.5c4.9-.1 8.9-.7 12-1.7c.5-.2.9.1 1.1.5c.2.5-.1.9-.5 1.1c-.4.1-.8.3-1.3.4c-2.4.7-5.2 1.2-8.6 1.4c8.5 4.4 20.8 4.3 34.9-1.1c8.5-3.3 16.8-8.2 24.2-14.1z\"/><path fill=\"#00acd3\" fill-rule=\"evenodd\" d=\"M28.4 52.7h9.8v9.8h-9.8zm.8.8h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm3-12h9.8v9.8h-9.8zm.9.8h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#23c2ee\" fill-rule=\"evenodd\" d=\"M39.6 52.7h9.8v9.8h-9.8zm.9.8h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#00acd3\" fill-rule=\"evenodd\" d=\"M50.9 52.7h9.8v9.8h-9.8zm.8.8h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#23c2ee\" fill-rule=\"evenodd\" d=\"M50.9 41.5h9.8v9.8h-9.8zm.8.8h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm3.1 10.4H72v9.8h-9.8zm.8.8h.8v8.1H63zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#00acd3\" fill-rule=\"evenodd\" d=\"M62.2 41.5H72v9.8h-9.8zm.8.8h.8v8.1H63zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#23c2ee\" fill-rule=\"evenodd\" d=\"M62.2 30.2H72V40h-9.8zm.8.8h.8v8.1H63zm1.5 0h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#00acd3\" fill-rule=\"evenodd\" d=\"M73.5 52.7h9.8v9.8h-9.8zm.8.8h.8v8.1h-.8zm1.4 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8zm1.5 0h.8v8.1h-.8z\" clip-rule=\"evenodd\"/><path fill=\"#d4eef1\" fill-rule=\"evenodd\" d=\"M48.8 78.3c1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7s1.2-2.7 2.7-2.7\" clip-rule=\"evenodd\"/><path fill=\"#3a4d54\" fill-rule=\"evenodd\" d=\"M48.8 79.1c.2 0 .5 0 .7.1c-.2.1-.4.4-.4.7c0 .4.4.8.8.8c.3 0 .6-.2.7-.4c.1.2.1.5.1.7c0 1.1-.9 1.9-1.9 1.9c-1.1 0-1.9-.9-1.9-1.9s.8-1.9 1.9-1.9M1.1 72.8h125.4c-2.7-.7-8.6-1.6-7.7-5.2c-5 5.7-16.9 4-20 1.2c-3.4 4.9-23 3-24.3-.8c-4.2 5-17.3 5-21.5 0c-1.4 3.8-21 5.7-24.3.8c-3 2.8-15 4.5-20-1.2c1.1 3.5-4.9 4.5-7.6 5.2\" clip-rule=\"evenodd\"/><path fill=\"#bfdbe0\" d=\"M56 97.8c-6.7-3.2-10.3-7.5-12.4-12.2c-2.5.7-5.5 1.2-8.9 1.4c-1.3.1-2.7.1-4.1.1c-1.7 0-3.4 0-5.2-.1c6 6 13.6 10.7 27.5 10.8z\"/><path fill=\"#d4eef1\" d=\"M46.1 89.9c-.9-1.3-1.8-2.8-2.5-4.3c-2.5.7-5.5 1.2-8.9 1.4c2.3 1.2 5.7 2.4 11.4 2.9\"/>"
  },
  {
    "id": "devicon:vscode",
    "name": "VS Code",
    "category": "tech",
    "keywords": "vs code vscode vscode editor ide",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<mask id=\"SVGescYAbDI\" width=\"128\" height=\"128\" x=\"0\" y=\"0\" maskUnits=\"userSpaceOnUse\" style=\"mask-type:alpha\"><path fill=\"#fff\" fill-rule=\"evenodd\" d=\"M90.767 127.126a7.97 7.97 0 0 0 6.35-.244l26.353-12.681a8 8 0 0 0 4.53-7.209V21.009a8 8 0 0 0-4.53-7.21L97.117 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026L15.6 32.013a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.335 5.335 0 0 0-.006 7.888L20.796 64L1.74 81.387a5.336 5.336 0 0 0 .006 7.887l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.974-16.68l50.45 46.025a8 8 0 0 0 2.743 1.793Zm5.252-92.183L57.74 64l38.28 29.058V34.943Z\" clip-rule=\"evenodd\"/></mask><g mask=\"url(#SVGescYAbDI)\"><path fill=\"#0065a9\" d=\"M123.471 13.82L97.097 1.12A7.97 7.97 0 0 0 88 2.668L1.662 81.387a5.333 5.333 0 0 0 .006 7.887l7.052 6.411a5.33 5.33 0 0 0 6.811.303l103.971-78.875c3.488-2.646 8.498-.158 8.498 4.22v-.306a8 8 0 0 0-4.529-7.208Z\"/><g filter=\"url(#SVGUBw6ic8w)\"><path fill=\"#007acc\" d=\"m123.471 114.181l-26.374 12.698A7.97 7.97 0 0 1 88 125.333L1.662 46.613a5.333 5.333 0 0 1 .006-7.887l7.052-6.411a5.33 5.33 0 0 1 6.811-.303l103.971 78.874c3.488 2.647 8.498.159 8.498-4.219v.306a8 8 0 0 1-4.529 7.208\"/></g><g filter=\"url(#SVGg9RgH3Uo)\"><path fill=\"#1f9cf0\" d=\"M97.098 126.882A7.98 7.98 0 0 1 88 125.333c2.952 2.952 8 .861 8-3.314V5.98c0-4.175-5.048-6.266-8-3.313a7.98 7.98 0 0 1 9.098-1.549L123.467 13.8A8 8 0 0 1 128 21.01v85.982a8 8 0 0 1-4.533 7.21z\"/></g><path fill=\"url(#SVGpqCa3cMW)\" fill-rule=\"evenodd\" d=\"M90.69 127.126a7.97 7.97 0 0 0 6.349-.244l26.353-12.681a8 8 0 0 0 4.53-7.21V21.009a8 8 0 0 0-4.53-7.21L97.039 1.12a7.97 7.97 0 0 0-9.093 1.548l-50.45 46.026l-21.974-16.68a5.33 5.33 0 0 0-6.807.302l-7.048 6.411a5.336 5.336 0 0 0-.006 7.888L20.718 64L1.662 81.386a5.335 5.335 0 0 0 .006 7.888l7.048 6.411a5.33 5.33 0 0 0 6.807.303l21.975-16.681l50.45 46.026a8 8 0 0 0 2.742 1.793m5.252-92.184L57.662 64l38.28 29.057z\" clip-rule=\"evenodd\" opacity=\".25\"/></g><defs><filter id=\"SVGUBw6ic8w\" width=\"144.744\" height=\"113.408\" x=\"-8.411\" y=\"22.594\" color-interpolation-filters=\"sRGB\" filterUnits=\"userSpaceOnUse\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/><feColorMatrix in=\"SourceAlpha\" result=\"hardAlpha\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"/><feOffset/><feGaussianBlur stdDeviation=\"4.167\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/><feBlend in2=\"BackgroundImageFix\" mode=\"overlay\" result=\"effect1_dropShadow_1_36\"/><feBlend in=\"SourceGraphic\" in2=\"effect1_dropShadow_1_36\" result=\"shape\"/></filter><filter id=\"SVGg9RgH3Uo\" width=\"56.667\" height=\"144.007\" x=\"79.667\" y=\"-8.004\" color-interpolation-filters=\"sRGB\" filterUnits=\"userSpaceOnUse\"><feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"/><feColorMatrix in=\"SourceAlpha\" result=\"hardAlpha\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\"/><feOffset/><feGaussianBlur stdDeviation=\"4.167\"/><feColorMatrix values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"/><feBlend in2=\"BackgroundImageFix\" mode=\"overlay\" result=\"effect1_dropShadow_1_36\"/><feBlend in=\"SourceGraphic\" in2=\"effect1_dropShadow_1_36\" result=\"shape\"/></filter><linearGradient id=\"SVGpqCa3cMW\" x1=\"63.922\" x2=\"63.922\" y1=\".33\" y2=\"127.67\" gradientUnits=\"userSpaceOnUse\"><stop stop-color=\"#fff\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient></defs>"
  },
  {
    "id": "devicon:figma",
    "name": "Figma",
    "category": "tech",
    "keywords": "figma figma figma ui ux design",
    "monochrome": false,
    "viewBox": "0 0 128 128",
    "body": "<path fill=\"#0acf83\" d=\"M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129m0 0\"/><path fill=\"#a259ff\" d=\"M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5m0 0\"/><path fill=\"#f24e1e\" d=\"M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5m0 0\"/><path fill=\"#ff7262\" d=\"M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67zm0 0\"/><path fill=\"#1abcfe\" d=\"M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5S76.6 43 88.5 43S110 52.6 110 64.5m0 0\"/>"
  }
];
