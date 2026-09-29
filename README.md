# Are You Ready To Work?

Are You Ready To Work? is a student-focused application experience for identifying students who are ready for real-world work experience. It explains the selection criteria, collects work interests and readiness information, and gives applicants one shareable site link after registration.

## Features

- Responsive landing page with value proposition, selection criteria, FAQ, and calls to action
- Multi-step application flow for work interests and readiness
- Client-side application tracking with `localStorage`
- One registration per browser device
- Generic site sharing without individual tracking links
- Lightweight analytics events for page views, registrations, and sharing

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server on port 3000 |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run the TypeScript compiler without emitting files |
| `npm run clean` | Remove generated build/server files |

## Data and Privacy

Registrations are submitted to the Netlify Function at `/.netlify/functions/registrations` and stored in Neon Postgres. The browser keeps a device identifier in `localStorage` so one browser device is counted once. The database enforces the same rule with a unique `device_id`.

## Neon and Netlify Setup

The repository includes [db/schema.sql](db/schema.sql), [neon.ts](neon.ts), and a server-side Netlify Function. To connect the provided Neon project:

```bash
npm i -g neon@latest
neon login
neon skills -y
neon mcp -y
neon link --project-id weathered-dream-73192753 --branch production -y
neon config init
neon deploy
```

Run the SQL in `db/schema.sql` once in the linked Neon project's SQL Editor. Then add the Neon connection string as a Netlify environment variable named `DATABASE_URL`. Do not put this value in frontend code or commit it to git. Trigger a new Netlify deploy after setting the variable.

## Admin Registrations

The protected admin page is available at `/admin`. Add these server-only Netlify environment variables:

```text
ADMIN_USERNAME=<your-admin-username>
ADMIN_PASSWORD=<your-admin-password>
```

Then open `https://your-site.netlify.app/admin` and sign in. Keep these values only in Netlify environment variables. The admin page loads registrations through an authenticated Netlify Function and does not expose the Neon connection string to the browser.
