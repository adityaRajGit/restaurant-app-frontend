# Restaurant App Frontend

A responsive cafe/bakery menu UI built with React, Vite, and Tailwind CSS.

## Features

- Live menu loaded from the restaurant API, grouped by whatever categories the kitchen has available (Beverages, Cakes, Pastries, Breads, ...), with search and category filtering
- Per-item quantity stepper (add / increment / decrement) with a persistent cart
- Dedicated cart page with per-item details, a note-to-chef field, and order placement
- Skeleton loading states (via `react-loading-skeleton`) matching the exact dimensions of the menu grid, category tabs, and cart rows
- Fully responsive layout (2-column mobile grid, 3-column tablet, 4-column desktop)

## Architecture

The app follows a container/component pattern:

- `src/api/` — HTTP layer: `httpClient.js` unwraps the backend's `{ status, data }` envelope, `menuApi.js` calls the menu endpoints and normalizes `MenuItem` documents into the shape the components render
- `src/hooks/useMenu.js` — loads the menu once for the whole app (loading / error / retry) so the grid and the cart share one copy
- `src/containers/` — own state and business logic (filtering, cart derivation) and pass data down as props
- `src/components/` — presentational, render props/state handed to them
- `src/data/categoryVisuals.js` — emoji fallback per category, used when an item has no `image_url`

## Backend API

The menu comes from the `restaurantapp` Express server:

| Call | Endpoint | Used for |
| --- | --- | --- |
| `fetchGroupedMenu()` | `GET /api/v1/menu/grouped` | The customer menu — available items grouped by category, in `display_order` |

`GET /menu/grouped` already filters out deleted and unavailable items, so the
frontend renders exactly what the kitchen is serving. Search and category tabs
filter the loaded menu client-side — no refetch per tab.

## Getting started

Point the app at the backend (defaults to `http://localhost:8080/api/v1`):

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

Start the API (`npm start` in the `restaurantapp` repo), then:

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```
