# Are You Ready To Work?

Are You Ready To Work? is a student-focused application experience for identifying students who are ready for real-world work experience. It explains the selection criteria, collects work interests and readiness information, and gives applicants a shareable referral link after submission.

## Features

- Responsive landing page with value proposition, selection criteria, FAQ, and calls to action
- Multi-step application flow for work interests and readiness
- Client-side application tracking with `localStorage`
- One registration per browser device
- Generic site sharing without individual referral links
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

Applications and the registration count are stored in the current browser's `localStorage`. One browser device can register once. This is suitable for demos and prototypes, not production data collection; a shared count across all students still requires a backend database.
