# Restaurant App Frontend

A responsive cafe/bakery menu UI built with React, Vite, and Tailwind CSS.

## Features

- Browsable menu grouped by category (Coffee, Tea, Pastries & Bakes, Sandwiches & Toasts, Cakes & Desserts, Cold Beverages) with search and category filtering
- Per-item quantity stepper (add / increment / decrement) with a persistent cart
- Dedicated cart page with per-item details, a note-to-chef field, and order placement
- Skeleton loading states (via `react-loading-skeleton`) matching the exact dimensions of the menu grid, category tabs, and cart rows
- Fully responsive layout (2-column mobile grid, 3-column tablet, 4-column desktop)

## Architecture

The app follows a container/component pattern:

- `src/containers/` — own state and business logic (filtering, cart derivation, loading simulation) and pass data down as props
- `src/components/` — presentational, render props/state handed to them
- `src/data/menuData.js` — menu categories and items

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build
npm run preview  # preview the production build
```
