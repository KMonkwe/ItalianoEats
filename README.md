# Italiano Restaurant

A modern, mobile-first web app for Italiano Restaurant — browse the menu, order dishes, track your order live, explore events on a calendar, and stay up to date with notifications.

## Features

- **Home** — chef's specials, signature classics, and a preview of upcoming events.
- **Menu & ordering** — category filters (Antipasti, Primi, Secondi, Dolci), quantity controls, and a persistent cart saved to local storage.
- **Live order tracking** — vertical stepper with ETA that progresses through confirmation, kitchen, quality check, and delivery.
- **Events calendar** — interactive month view for wine tastings, jazz nights, masterclasses, and truffle dinners.
- **Notifications** — order updates, reservation confirmations, and specials with mark-all-read.
- **Responsive layout** — bottom tab bar on mobile, top navigation on desktop.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server functions)
- Vite 7
- TypeScript
- Tailwind CSS v4 with a semantic OKLCH design-token theme
- shadcn/ui components

## Getting started

```sh
npm install
npm run dev
```

The dev server runs at `http://localhost:8080`.

```sh
npm run build   # production build
```

## Project structure

```
src/
  assets/                 dish and hero imagery
  components/
    AppShell.tsx          responsive navigation shell
    OrderTracker.tsx      live order progress logic
  lib/
    cart.tsx              cart context + order placement
    restaurant-data.ts    menu, events, notification data
  routes/
    __root.tsx            app shell / root layout
    index.tsx             home
    menu.tsx              menu & ordering
    orders.tsx            order tracking
    calendar.tsx          events calendar
    notifications.tsx     alerts
  styles.css              design tokens and theme
```

Routes are file-based — add a file in `src/routes/` to add a page. `src/routeTree.gen.ts` is generated; don't edit it by hand.

## Design system

All colors, gradients, and shadows are semantic tokens defined in `src/styles.css`. The palette is a warm "Modern Enoteca" direction: terracotta brand (`#A63A26`), champagne accents, and stone-dark text on a soft off-white surface. Use the tokens rather than hardcoded color utilities so theming stays consistent.

## Deployment

Built and hosted with [Lovable](https://lovable.dev) — publish from the editor, or deploy the standard Vite build output anywhere that supports edge/Node hosting.
