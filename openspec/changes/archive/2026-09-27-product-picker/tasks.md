## 1. Types & Data

- [x] 1.1 Add `Product` type and static import helper for `data/products.jsonc`
- [x] 1.2 Add `strapi.monis.rent` to Next.js image remote patterns

## 2. Picker UI

- [x] 2.1 Implement category tabs (desks/chairs/accessories, default desks)
- [x] 2.2 Implement case-insensitive name search with empty state
- [x] 2.3 Implement product cards (image, name, price, dimensions, stock state; out-of-stock disabled)
- [x] 2.4 Implement detail view (description, material, color, dimensions, price, optional external link, Add button)

## 3. Canvas Handoff & Layout

- [x] 3.1 Add `onAdd(product)` callback emitting id + w×d footprint once per trigger; blocked when out of stock
- [x] 3.2 Place picker as left sidebar in `app/page.tsx` resizable layout next to canvas
- [x] 3.3 Verify with `npm run lint` and manual browse/search/select/add pass
