# GlobeTrotter

GlobeTrotter is a full-stack travel planning platform that lets users build detailed itineraries, discover new destinations, share trips with a community, and track their travel activity through an admin analytics dashboard.

Built with React (Vite) on the frontend and Express.js + Prisma ORM on the backend, GlobeTrotter combines a clean, premium UI with a robust trip-management system.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [License](#license)

---

## Features

### Authentication & Security
- Custom JWT-based authentication (no third-party auth provider)
- Secure registration and login flows
- Role-based access control for standard users and admins
- Protected frontend routes that restrict access to authenticated users

### Trip Planning & Management
- Interactive dashboard summarizing a user's active trips, stats, and quick actions
- End-to-end trip creation with titles, budgets, dates, and destinations
- Itinerary builder with a timeline view for stops and daily activities
- Activity tracking with duration, cost, and custom descriptions
- Destination and activity imagery sourced dynamically from Unsplash

### AI-Powered Suggestions
- AI-suggested activities based on selected destinations and trip preferences
- AI-recommended stops to fill out an itinerary automatically
- One-click add from suggestions directly into the trip timeline

### Explore & Discovery
- Dedicated Explore hub highlighting trending destinations and top-rated activities
- Dynamic search and filtering across activities
- Cover photos with hover-zoom animations for a more immersive browsing experience

### Social Community
- Global community feed for browsing public trips shared by other users
- One-click trip publishing to the community
- Rich posts with custom text and images
- Real-time interactions, including a like system and threaded comments

### Admin Dashboard & Analytics
- Dedicated admin panel restricted to `ADMIN` role users
- Tabular user management view with roles and trip counts
- Trending leaderboards for most popular cities and highest-booked activities
- Data visualization with Recharts:
  - Line charts for trip-creation trends over time
  - Pie charts for trip budget distribution

### Calendar View
- Monthly calendar interface built with `date-fns`
- Trips rendered as color-coded blocks spanning their active date ranges
- Click-through navigation from calendar blocks directly into trip itineraries

### Design
- Custom HSL-based color palette (sage greens, off-whites)
- Glassmorphism accents and modern typography
- Fully responsive layout built with Tailwind CSS

---

## Tech Stack

| Layer          | Technology                     |
|----------------|---------------------------------|
| Frontend       | React (Vite), Tailwind CSS      |
| Backend        | Node.js, Express.js             |
| Database / ORM | Prisma ORM                      |
| Auth           | Custom JWT                      |
| Charts         | Recharts                        |
| Calendar       | date-fns                        |
| Images         | Unsplash API                    |

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- A running PostgreSQL (or your configured Prisma-supported) database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Joy-Chauhan11/GlobeTrotter.git
   cd globetrotter
   ```

2. Install dependencies for both client and server
   ```bash
   # from the project root
   npm install

   # if client/server are separate packages
   cd client && npm install
   cd ../server && npm install
   ```

3. Configure environment variables (see [Environment Variables](#environment-variables))

4. Run Prisma migrations
   ```bash
   npx prisma migrate dev
   ```

5. Start the development servers
   ```bash
   # backend
   npm run dev

   # frontend (in a separate terminal)
   cd client && npm run dev
   ```

6. Open the app at `http://localhost:5173` (or whichever port Vite assigns)

---

## Environment Variables

Create a `.env` file in the server directory with the following:

```env
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_jwt_secret
UNSPLASH_ACCESS_KEY=your_unsplash_api_key
PORT=5000
```

Adjust variable names as needed to match your actual configuration.

---

## Project Structure

```
globetrotter/
├── client/          # React (Vite) frontend
│   ├── src/
│   └── ...
├── server/          # Express.js backend
│   ├── prisma/      # Prisma schema and migrations
│   ├── routes/
│   ├── controllers/
│   └── ...
└── README.md
```

---

## Roadmap

- [ ] Trip collaboration (multi-user editing)
- [ ] Expense splitting between travelers
- [ ] Offline itinerary access
- [ ] Push notifications for upcoming trips

