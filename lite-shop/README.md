# LITE.SHOP

A static product-listing page for a fictional online shop, built with React, Vite, TypeScript, Tailwind CSS and `lucide-react`. It recreates the layout of the reference `index.html` as small, reusable components (Workshop 1: Components & Props).

## Quick start

Requires Node.js 20.19+ or 22.12+ (needed by Vite 8).

```bash
npm install
```

### Develop: `npm run dev`

Starts the Vite dev server and prints a local address, by default <http://localhost:5173/>. Open it in a browser to view the app. Changes you save in `src/` show up immediately without a reload. Stop the server with `Ctrl+C`.

### Build: `npm run build`

Type-checks the project with TypeScript (`tsc -b`), then bundles it into the `dist/` folder as plain HTML, CSS and JavaScript ready to host on any static web server. The build stops if there are type errors.

To view the built app, run `npm run preview` and open the address it prints, by default <http://localhost:4173/>. Opening `dist/index.html` directly from the file system does not work, because the page loads its scripts from absolute `/assets/...` paths.

### Lint: `npm run lint`

Runs [oxlint](https://oxc.rs/docs/guide/usage/linter.html), a fast linter that scans the source code for likely bugs and bad patterns without running the app. Besides its default correctness checks, `.oxlintrc.json` enables two React rules:

- `react/rules-of-hooks`: hooks such as `useState` must be called at the top level of a component or hook, never inside conditions or loops (reported as an error).
- `react/only-export-components`: component files should only export components so Vite's fast refresh keeps working (reported as a warning).

Lint only reports problems and never changes files. It does not check types; `npm run build` does that.

## Project structure

```
src/
├── App.tsx              # page layout, composes the top-level components
├── theme.ts             # ThemeContext and the useTheme hook
├── types.ts             # Product and Filters types
├── data/products.ts     # product data and the highest price
└── components/          # all UI components
```

## Components and props

| Component | Purpose | Props |
| --- | --- | --- |
| `App` | Page layout: header, sidebar + product list, newsletter, footer. Holds the search text and a `filters` object (categories, max price, in stock, on sale) in `useState` and filters the products. A `useEffect` keeps the browser tab title in sync with the number of matching products. | – |
| `Header` | Sticky top bar with logo, nav links, controlled search field, dark/light toggle (reads `useTheme()`) and icon buttons. Below the `md` breakpoint the Menu button opens a panel with the nav links, plus the search field on phones where the top-bar one is hidden (`menuOpen` state). | `search`, `onSearchChange` |
| `Logo` | Brand logo, used in the header and the footer. | `variant` (`'light'` or `'dark'`) |
| `IconButton` | Square icon button (theme toggle, cart, account, mobile menu). | `label`, `children` (the icon), `className?`, `onClick?`, `expanded?` |
| `ThemeProvider` | Holds the current theme in `useState`, shares it through `ThemeContext`, and toggles the `dark` class on `<html>` in a `useEffect`. | `children` |
| `Panel` | Rounded, bordered card container shared by the sidebar and the product list. | `children` |
| `Sidebar` | Filter column: categories, price range, availability and promo card. Category names, counts and the slider's maximum are computed from the product data. | `products`, `filters`, `onFiltersChange` |
| `FilterSection` | Titled group inside the sidebar. | `title`, `action?`, `spacing?`, `children` |
| `CheckboxOption` | One labelled checkbox with an optional item count. | `label`, `count?`, `checked?`, `onChange?`, `medium?` |
| `PromoCard` | Gradient "Summer Sale" call-to-action. | `title`, `text`, `buttonLabel` |
| `ProductList` | Main panel: heading with product count, sort dropdown (its own `useState`, since no other component needs it), product grid (or an empty-state message) and pagination. | `title`, `products` |
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

## Dark mode with useContext

`main.tsx` wraps `App` in `ThemeProvider`. Any component can call `useTheme()` to read `theme` and `toggleTheme` without props being passed through every level; today only `Header` does, for its toggle button. Components style themselves with Tailwind `dark:` classes, which apply when `<html>` has the `dark` class. The chosen theme is saved in `localStorage`, so it survives a reload; with nothing saved, the first theme follows the operating system setting.

## Notes

- Search (by product name), categories, maximum price, In Stock and On Sale filter the grid; all active filters must match. The sort dropdown orders the visible products by data order (Newest), price or rating ("Best Selling" uses rating, since the data has no sales numbers). Pagination is still layout only.
- The price slider goes up to the most expensive product, so every product is visible by default.
- Twitter and Instagram icons in the footer are inline SVG because `lucide-react` no longer ships brand icons.
- Product images load from Unsplash.
