# Workspace Designer

Interactive tool to visually design a rental workspace and rent it.

![Screenshot](./screenshot.png?raw=true)

## Approach

After reading the brief, somehow Shadcn's resizable panel popped out in my mind for the layout, so I just started by installing it, together with Konva.js as well for the 2D visualization since Three.js or AI-generated visuals might be overkill for the MVP, and I'm afraid the time budget won't make it.

Then I mapped the products into a local JSON file. I think this approach is best for the MVP, allowing for fast product updates.

## Improvement Ideas

With more time, here are some areas that I'd like to improve:

- Proper product browser for easier search
- Add to canvas using a drag-and-drop mechanism
- Canvas: rotate, flip and resize images; zoom & pan; "X" icon button/"Delete" key to remove image
- Z-index reorder on summary panel
- Encode-decode canvas data as URL params for easy share/export-import distribution
- Alternative layout for smaller viewport

---

## What it does

- **Layout:** resizable 3-column workspace (picker / canvas / summary), contextual hint in top bar, desktop-only (`>=1024px`)
- **Pick products:** desks / chairs / accessories from left panel, with search, real images, prices, dimensions, and stock status from `data/products.jsonc`
- **Design visually:** add to canvas, drag to arrange. Item size scales from real dimensions (`PX_PER_CM = 3`)
- **Summary + Rent:** right panel lists placed items, live total, remove per item, Rent downloads a purchase-order `.txt`
- **Export:** Export PNG snapshot of the canvas (2x)

## Stack

- Next.js 16 (React 19, TypeScript 7)
- Shadcn (Tailwind 4, BaseUI)
- Biome for lint/format
- Konva / react-konva for canvas

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run format
npm run lint
npm run build
npm start
```

## Project structure

- `app/page.tsx` — loads `data/products.jsonc`, renders picker + designer panels
- `components/product-picker.tsx` — category tabs, search, select, detail, Add to canvas
- `components/workspace-canvas.tsx` — Konva Stage, draggable items, PNG export
- `components/canvas-summary.tsx` — placed items list, total, Rent order export
- `components/designer-panels.tsx`, `picker-panel.tsx`, `top-bar-hint.tsx`
- `lib/products.ts` — `Product`, `PlacedItem`, JSONC parsing, canvas payload
- `lib/file-identity.ts` — timestamped `workspace` / `order` filenames
- `data/products.jsonc` — 12 products with image URLs and product URLs

## How it works

Panels communicate via window events to keep components decoupled:

- `workspace:add-product` — picker → canvas
- `workspace:remove-product` — summary → canvas
- `workspace:items-change` — canvas → summary + top-bar hint
- `workspace:export-png` — export button → canvas
