# Instructions

A "-dle" website, but for videos!

## Requirements

- Docker
- Node JS (22+)

## Setup

### Backend

#### Development

1. `cd ./backend`
2. `pnpm install`
3. `pnpm run dev`
4. In a new terminal, run `pnpm run db:migrations`
5. Navigate to <http://localhost:3001/status>

Notes:

- Step 4 is necessary to create the backend's tables. These will be empty. Therefore, ensure you call the `/initialize/` route to populate them with sample entries (see `routes/initializer/initializer.route.ts` for more details)
- As the backend is dockerized, the Express server will be running on port 3001. Similarly, the PostgreSQL DB will be running on port 5433

#### Production

##### .env

For production, we'll be directly interacting with the DB hosted by Supabase via Sequelize. Ensure you have the following variables defined in a `.env` file for the backend:

- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`

##### Running Steps

1. `cd ./backend`
2. `pnpm install`
3. `pnpm run prod`

Notes:

- For production, the backend will be running on port 4000 if a port has not been provided.

### Frontend

TODO
