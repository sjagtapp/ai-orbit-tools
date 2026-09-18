# AI Orbit — AI Tools Explorer

A full-stack AI tools discovery platform inspired by the visual language and user experience of AI Orbit.

The application allows users to discover, search, filter, sort, save, and explore AI tools through a responsive and premium dark-themed interface.

## Overview

AI Orbit — AI Tools Explorer is a complete full-stack module built to demonstrate a production-oriented AI tools directory experience.

The application includes:

* AI tools discovery
* Search
* Category filtering
* Pricing filtering
* Rating filtering
* Sorting
* Pagination
* Grid/List views
* Tool detail pages
* Favorites
* Reviews and ratings
* Related tools
* Responsive design
* Loading, empty and error states

The frontend communicates with a REST API powered by Express and MongoDB.

---

## Features

### AI Tools Directory

* Browse AI tools through a responsive grid
* Switch between Grid and List views
* Search tools with debounced input
* Filter by category
* Filter by pricing model
* Filter by minimum rating
* Sort by popularity, rating, newest and name
* Server-side pagination

### Tool Details

Each tool has a dedicated detail page containing:

* Tool name
* Company
* Description
* Overview
* Features
* Categories
* Pricing plans
* Rating
* Review count
* Website link
* Related tools

### Favorites

Users can save tools for later.

Favorites are persisted using browser `localStorage`, so no authentication is required for the current implementation.

### Reviews

Users can submit reviews with:

* Display name
* Rating
* Review text

Reviews are stored in MongoDB and the tool's rating and review count are updated based on the stored reviews.

### Responsive Design

The interface is optimized for:

* Desktop
* Tablet
* Mobile

The mobile experience includes a dedicated filter drawer and responsive tool cards.

### UI States

The application includes:

* Loading skeletons
* Empty search results
* API error states
* Retry actions
* 404 tool-not-found page
* Form validation
* Toast feedback

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB Atlas

### Development

* Git
* GitHub
* ESLint
* Nodemon

---

## Architecture

```text
┌─────────────────────┐
│     React + Vite    │
│    Tailwind CSS     │
└──────────┬──────────┘
           │
           │ Axios / REST API
           ▼
┌─────────────────────┐
│   Express + Node.js │
└──────────┬──────────┘
           │
           │ Mongoose
           ▼
┌─────────────────────┐
│       MongoDB       │
│       Atlas         │
└─────────────────────┘
```

Search, filtering, sorting and pagination are handled server-side through the API.

---

## Project Structure

```text
ai-orbit-tools/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── utils/
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas account or a local MongoDB installation
* Git

---

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-orbit-tools.git
cd ai-orbit-tools
```

---

# Backend Setup

Navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

### Seed the database

```bash
npm run seed
```

This populates the database with sample AI tools and reviews.

### Start the backend

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

---

# Frontend Setup

Open another terminal.

Navigate to:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The application will run at:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173/tools
```

---

# Environment Variables

## Server

```env
MONGO_URI=
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

## Client

```env
VITE_API_URL=http://localhost:5000/api
```

Never commit `.env` files or database credentials to the repository.

---

# API Endpoints

| Method | Endpoint                   | Description                                              |
| ------ | -------------------------- | -------------------------------------------------------- |
| GET    | `/api/health`              | API health check                                         |
| GET    | `/api/tools`               | Get tools with search, filtering, sorting and pagination |
| GET    | `/api/tools/:slug`         | Get a tool by slug                                       |
| GET    | `/api/categories`          | Get available categories                                 |
| GET    | `/api/tools/related/:slug` | Get related tools                                        |
| GET    | `/api/tools/:id/reviews`   | Get reviews for a tool                                   |
| POST   | `/api/tools/:id/reviews`   | Submit a review                                          |

### Tool Query Parameters

The tools endpoint supports:

```text
q
category
pricing
minRating
sort
page
limit
```

Example:

```text
/api/tools?q=coding&category=Coding&pricing=Free&minRating=4.5&sort=rating&page=1&limit=12
```

---

# Database Models

## Tool

A tool contains:

* Name
* Slug
* Company
* Description
* Long description
* Website
* Categories
* Tags
* Pricing
* Features
* Rating
* Review count
* Popularity
* Pricing plans
* Platform information

## Review

A review contains:

* Tool reference
* User name
* Rating
* Comment
* Created date

---

# Available Routes

### Tools

```text
/tools
```

AI tools directory.

### Tool Details

```text
/tools/:slug
```

Individual tool information.

### Favorites

```text
/favorites
```

Saved tools.

### Not Found

```text
/*
```

Application 404 state.

---

# Development Scripts

## Client

```bash
npm run dev
```

Start the Vite development server.

```bash
npm run build
```

Create a production build.

```bash
npm run lint
```

Run ESLint.

## Server

```bash
npm run dev
```

Start the Express development server with Nodemon.

```bash
npm run seed
```

Populate MongoDB with sample tools and reviews.

---

# Design Direction

The interface follows a dark, minimal and premium visual direction inspired by AI Orbit.

Key design principles include:

* Dark backgrounds
* White primary typography
* Muted secondary text
* Subtle borders
* Consistent spacing
* Minimal card styling
* Restrained animations
* Responsive layouts
* Clear visual hierarchy

The goal is to maintain a cohesive product experience rather than introducing an unrelated design system.

---

# Current Scope

This project focuses on the AI Tools module.

Authentication is intentionally outside the current scope. Favorites are stored locally in the browser, while reviews are stored through the backend API and MongoDB.

The project uses sample data for demonstration purposes.

---

# Future Improvements

Potential improvements include:

* User authentication
* Server-side user favorites
* User profiles
* Tool submission workflow
* Admin moderation
* Tool logo and screenshot uploads
* Advanced search ranking
* Caching for frequently requested queries
* More detailed tool comparison functionality
* Analytics and usage insights

---

# License

This project was created as a development and portfolio assignment.
