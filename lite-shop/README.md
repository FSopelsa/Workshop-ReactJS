# LITE.SHOP

A static product-listing page for a fictional online shop, built with React, Vite, TypeScript, Tailwind CSS and `lucide-react`. It recreates the layout of the reference `index.html` as small, reusable components (Workshop 1: Components & Props).

## Quick start

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run lint     # run oxlint
```

## Project structure

```
src/
├── App.tsx              # page layout, composes the top-level components
├── types.ts             # Product and Filters types
├── data/products.ts     # product data and the highest price
└── components/          # all UI components
```

## Components and props

| Component | Purpose | Props |
| --- | --- | --- |
| `App` | Page layout: header, sidebar + product list, newsletter, footer. Holds the search text and a `filters` object (categories, max price, in stock, on sale) in `useState` and filters the products. | – |
| `Header` | Sticky top bar with logo, nav links, controlled search field and icon buttons. | `search`, `onSearchChange` |
| `Logo` | Brand logo, used in the header and the footer. | `variant` (`'light'` or `'dark'`) |
| `IconButton` | Square icon button (cart, account, mobile menu). | `label`, `children` (the icon), `className?` |
| `Panel` | Rounded, bordered card container shared by the sidebar and the product list. | `children` |
| `Sidebar` | Filter column: categories, price range, availability and promo card. Category names, counts and the slider's maximum are computed from the product data. | `products`, `filters`, `onFiltersChange` |
| `FilterSection` | Titled group inside the sidebar. | `title`, `action?`, `spacing?`, `children` |
| `CheckboxOption` | One labelled checkbox with an optional item count. | `label`, `count?`, `checked?`, `onChange?`, `medium?` |
| `PromoCard` | Gradient "Summer Sale" call-to-action. | `title`, `text`, `buttonLabel` |
| `ProductList` | Main panel: heading with product count, sort dropdown, product grid (or an empty-state message) and pagination. | `title`, `products` |
| `ProductCard` | One product: image, badge, rating, stock text, prices and buttons. Switches to a sold-out look when `stockStatus` is `'sold-out'`. | `product` |
| `Pagination` | Previous/next buttons and page numbers. | `currentPage`, `pages`, `lastPage` |
| `Newsletter` | Dark sign-up banner with email form. | – |
| `Footer` | Brand blurb, social links, link columns and legal links. | – |
| `FooterLinks` | One titled column of footer links. | `title`, `links` |

## Why props

- **Reuse:** `Logo`, `Panel`, `IconButton`, `CheckboxOption` and `FooterLinks` appear several times with different content, so the differences are passed in instead of copying markup.
- **Data in, markup out:** `ProductCard` receives a single `Product` object. Adding a product means adding an entry to `data/products.ts`; the card decides how to render badges, stock state and discounted prices.
- **Typed contracts:** every component declares an `interface` for its props, so TypeScript flags missing or wrong values.

## How the components work together

State lives in `App`, the closest common parent of the components that use it. `Header` and `Sidebar` receive the current values plus callbacks to change them; `ProductList` only receives the filtered `products` array.

`App` renders `Header`, then a two-column grid with `Sidebar` and `ProductList`, followed by `Newsletter` and `Footer`. `Sidebar` is built from `Panel`, `FilterSection`, `CheckboxOption` and `PromoCard`. `ProductList` is a `Panel` that maps the `products` array to `ProductCard`s and ends with `Pagination`. `Logo` is shared by `Header` and `Footer`.

## Notes

- Search (by product name), categories, maximum price, In Stock and On Sale filter the grid; all active filters must match. Sorting and pagination are still layout only.
- The price slider goes up to the most expensive product, so every product is visible by default.
- Twitter and Instagram icons in the footer are inline SVG because `lucide-react` no longer ships brand icons.
- Product images load from Unsplash.
