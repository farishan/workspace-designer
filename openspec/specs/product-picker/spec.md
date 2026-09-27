# product-picker Specification

## Purpose

Lets users browse the workspace product catalog and place items onto the 2D design canvas. This covers listing, filtering, detail display, and the add-to-canvas handoff.

## Requirements

### Requirement: Category browsing
The system SHALL display products grouped by category (desks, chairs, accessories) with one category visible at a time.

#### Scenario: Switching categories
- **WHEN** user selects the "chairs" tab
- **THEN** only products with category "chairs" are shown

#### Scenario: Default category
- **WHEN** the picker first renders
- **THEN** the desks category is shown with its 3 products

### Requirement: Text search
The system SHALL filter the visible category by product name, case-insensitively.

#### Scenario: Matching search
- **WHEN** user types "electric" while on desks
- **THEN** only desks whose name contains "electric" remain visible

#### Scenario: Empty result
- **WHEN** no product in the category matches the query
- **THEN** an empty state ("No products found") is shown

### Requirement: Product card information
Each product card SHALL show a fixed-size square thumbnail, name, price with currency, dimensions (w×d×h), and stock state in a row layout.

#### Scenario: Out-of-stock card
- **WHEN** a product has inStock false (e.g. executive-leather-chair)
- **THEN** its card is visibly marked out of stock and cannot be added to the canvas

### Requirement: Product detail view
The system SHALL show a compact detail view for the selected product with a small square thumbnail, name, description, dimensions, price, and external link when the product defines a url.

#### Scenario: Detail with link
- **WHEN** user selects a product that has a url
- **THEN** the detail shows a link opening the product page in a new tab

#### Scenario: Detail without link
- **WHEN** user selects a product without a url (e.g. comfort-task-chair)
- **THEN** no external link is shown but all other details render

### Requirement: Add to canvas
The system SHALL emit an add-to-canvas event carrying the selected in-stock product's id, name, image, price, currency, and footprint (w, d). The canvas SHALL render the product image sized by its footprint as a draggable item.

#### Scenario: Successful add
- **WHEN** user triggers Add on an in-stock product detail
- **THEN** the picker emits the product payload exactly once per trigger and the canvas shows the product image

#### Scenario: Out-of-stock blocked
- **WHEN** the selected product is out of stock
- **THEN** no add-to-canvas event is emitted

### Requirement: Canvas summary
The system SHALL show a summary panel listing items placed on the canvas with per-item thumbnail, name, and price, plus the item count, total price, and a Checkout button disabled when the canvas is empty.

#### Scenario: Items listed
- **WHEN** one or more products have been added to the canvas
- **THEN** the summary shows the count, each item with thumbnail and price, and the total

#### Scenario: Empty canvas
- **WHEN** no items are on the canvas
- **THEN** the summary shows an empty state and Checkout is disabled
