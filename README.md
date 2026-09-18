# AI Orbit — AI Tools Explorer

## Overview

A full-stack AI tools discovery module inspired by AI Orbit's visual language: a dark,
minimal, premium interface for searching, filtering, sorting and reviewing AI tools.
Built as a complete **React → Express → MongoDB** application — not a frontend mockup.

## Features

- `/tools` — searchable, filterable, sortable, paginated tool directory with Grid/List views
- Debounced search (300ms) across name, company, description, categories and tags
- Server-side filtering by category, pricing model and minimum rating
- Server-side sorting: Most Popular, Highest Rated, Newest, A→Z, Z→A
- Server-side pagination (12 per page)
- Filter state encoded in the URL (`/tools?q=...&category=...&pricing=...&sort=...&page=...`)
- Grid/List view preference persisted in `localStorage`
- `/tools/:slug` — detail page with overview, features, pricing plans, tool info panel,
  reviews with rating breakdown, a review form, and related tools (by shared category)
- `/favorites` — saved tools stored in `localStorage`, no auth required
- Loading skeletons, empty states, error states with retry, and a 404 page
- Toast feedback (save/remove/review submitted) — no `alert()`
- Responsive layout (1/2/3–4 column grid), mobile filter drawer, keyboard/aria support

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Axios, Lucide React icons
**Backend:** Node.js, Express, MongoDB, Mongoose
**Dev:** ESLint, nodemon

## Architecture

```
React (Vite, Tailwind)
       │  Axios
       ▼
Express REST API  (/api/tools, /api/categories, /api/tools/:id/reviews)
       │  Mongoose
       ▼
MongoDB  (tools, reviews collections)
```

Filtering, sorting, searching and pagination are all done server-side via Mongoose
queries — the frontend never filters an already-loaded array.

## Project Structure

```
ai-orbit-tools/
  client/            React app (Vite + Tailwind)
    src/
      components/    Reusable UI components
      pages/         Tools, ToolDetails, Favorites, NotFound
      services/      api.js — centralized Axios client
      hooks/         useTools, useDebounce, useFavorites
      context/       FavoritesContext, ToastContext
      utils/         formatters + shared constants
  server/            Express API
    config/db.js
    controllers/     toolController.js, reviewController.js
    models/          Tool.js, Review.js
    routes/          toolRoutes.js, reviewRoutes.js
    middleware/errorHandler.js
    seed/            tools.js (41 dummy tools), reviews.js, index.js
```

## Setup

### Backend

```bash
cd server
npm install
cp .env.example .env   # set MONGO_URI to your MongoDB instance
npm run seed            # populates ~41 tools and generated reviews
npm run dev              # starts API on http://localhost:5000
```

### Frontend

```bash
cd client
npm install
cp .env.example .env    # VITE_API_URL defaults to http://localhost:5000/api
npm run dev              # starts app on http://localhost:5173
```

### Database

Requires a running MongoDB instance (local `mongod`, Docker, or Atlas). Set
`MONGO_URI` in `server/.env` accordingly, e.g.:

```
MONGO_URI=mongodb://127.0.0.1:27017/ai-orbit-tools
```

## Environment Variables

**server/.env**
```
MONGO_URI=mongodb://127.0.0.1:27017/ai-orbit-tools
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

| Method | Endpoint                          | Description                                  |
|--------|------------------------------------|-----------------------------------------------|
| GET    | `/api/tools`                       | List tools — `q, category, pricing, minRating, sort, page, limit` |
| GET    | `/api/tools/:slug`                 | Single tool by slug                          |
| GET    | `/api/categories`                  | Distinct category list                       |
| GET    | `/api/tools/related/:slug`         | Up to 4 related tools by shared category     |
| GET    | `/api/tools/:id/reviews`           | Reviews for a tool (id or slug)              |
| POST   | `/api/tools/:id/reviews`           | Submit a review `{ userName, rating, comment }` |
| GET    | `/api/health`                      | Health check                                 |

Responses use `{ success, ... }` JSON with standard status codes (200/201/400/404/500).
Submitting a review recomputes the tool's `rating` and `reviewCount` from all reviews.

## Database Models

**Tool** — name, slug, companyName, logo, description, longDescription, website,
categories[], tags[], pricing `{ type, startingPrice, currency }`, features[],
rating, reviewCount, popularity, pricingPlans[], platform[], timestamps.

**Review** — toolId (ref Tool), userName, rating (1–5), comment (min 10 chars), timestamps.

## Verification performed

- `npm run build` (client) completes with no errors — production bundle generated.
- `npm run lint` (client) passes with zero errors on the application source.
- All server files pass `node --check` (syntax validation).
- Starting the server without MongoDB fails cleanly with a clear connection error
  and non-zero exit, rather than crashing silently — confirming the startup/error
  path works as intended.

## Known Limitations

- **No live MongoDB instance was available in the environment this was built in**,
  so the seed script and API were not exercised against a running database end-to-end.
  The query logic (search regex, category/pricing/rating filters, sort whitelisting,
  pagination math, review aggregation) was written and reviewed carefully against the
  Mongoose/MongoDB API, but you should run `npm run seed` and hit the endpoints
  yourself (or via the frontend) as a final check once you have MongoDB running locally
  or via Atlas.
- Tool logos are omitted in the dummy dataset (a monogram fallback is used); swap in
  real image URLs via the `logo` field if desired.
- No authentication — favorites use `localStorage`, reviews use a free-text display name,
  per the assignment scope.

## Future Improvements

- Real authentication and per-user favorites/reviews stored server-side
- Image upload for tool logos and screenshots
- Full-text search ranking (MongoDB `$text` score) instead of regex-based `$or`
- Admin flow for `/submit-tool`
- Caching layer (e.g. Redis) for category counts and popular queries

## Screenshots

_Add screenshots here after running the app locally._
