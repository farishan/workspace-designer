## Context

See proposal.md Why. Current state: `components/product-picker.tsx` is an empty stub; `app/page.tsx` has a canvas panel (`KonvaTest`) plus placeholder right panels ("Two"/"Three"); catalog is static `data/products.jsonc` (11 items with id, slug, name, category, price, currency, description, image, dimensions, material, color, inStock, optional url). Remote images live on strapi.monis.rent, so Next.js Image remote patterns are required. No product types exist yet.

## Goals / Non-Goals

**Goals:**
- Client-side picker with category tabs + search, no backend
- Detail view with Add-to-canvas callback contract the Konva canvas can consume later
- Left sidebar placement per user choice, responsive inside resizable panel

**Non-Goals:**
- Canvas rendering/drag-drop of products (canvas consumes the event in a later change)
- Cart, checkout, pricing logic, stock mutation
- Catalog editing or CMS sync

## Decisions

- **Static import of products.jsonc with a `Product` TS type** in `lib/products.ts` (or colocated types): simplest source of truth, zero fetch latency; alternative (route handler fetch) adds nothing for 11 static items.
- **Controlled component: `ProductPicker({ onAdd })`** where `onAdd(product)` delivers id + footprint. Keeps picker decoupled from Konva state; page wires it to canvas later. Alternative (global store/context) is overkill for one handoff.
- **Category tabs + search input from shadcn/ui + Tailwind**, cards in scrollable grid. Follows existing shadcn setup; no new deps. Alternative (command palette/modal) rejected per user placement choice (left sidebar).
- **Next.js `Image` with `remotePatterns: [strapi.monis.rent]`** in next.config.ts for optimized remote images; fallback to plain `<img>` only if config change is blocked.
- **Out-of-stock: disabled card + disabled Add button**, no event emitted. Simple, matches spec.

## Risks / Trade-offs

- [Risk] Remote strapi images slow/unavailable → Mitigation: fixed-size thumbnails with loading placeholder, `alt` text always present
- [Risk] Sidebar width too narrow for cards on small screens → Mitigation: single-column grid that collapses gracefully; panel is resizable
- [Risk] Canvas integration contract drifts → Mitigation: `onAdd` payload fixed now as `{ id, name, w, d }`; documented in spec
