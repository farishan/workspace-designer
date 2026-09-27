## Why

The workspace designer has a 2D canvas (`KonvaTest`) and a product catalog in `data/products.jsonc` (desks, chairs, accessories), but no way to browse or add products to the design. `components/product-picker.tsx` exists as an empty stub. Users need a picker to browse the catalog and place items on the canvas.

## What Changes

- Implement `ProductPicker` component reading from `data/products.jsonc` (11 items: 3 desks, 3 chairs, 5 accessories)
- Category tabs for desks / chairs / accessories plus text search by name
- Product cards showing image, name, price (EUR), dimensions, stock state; out-of-stock items (e.g. executive-leather-chair) are visibly disabled
- Selecting a product shows a detail view (image, description, material, color, dimensions, price, external monis.rent link where present) with an Add-to-canvas action
- Add-to-canvas emits the selected product (id, footprint w×d) for the Konva canvas to consume
- Place picker as a left sidebar next to the canvas in `app/page.tsx` resizable layout

## Capabilities

### New Capabilities
- `product-picker`: browsing the product catalog (categories, search, cards, stock states), viewing product details, and adding a product to the canvas

### Modified Capabilities

## Impact

- `components/product-picker.tsx`: implemented (currently empty stub)
- `app/page.tsx`: layout gains a left sidebar panel hosting the picker alongside the existing canvas panel
- `data/products.jsonc`: read-only source; no schema changes
- No new dependencies; uses existing shadcn/ui, Tailwind, Next.js Image for remote strapi.monis.rent images
