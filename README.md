# ToFoot 火光足球

A bilingual (Traditional Chinese / English) football content & prediction platform built by a French creator living in Taiwan. Covering European football analysis, 2026 FIFA World Cup predictions, and daily football trivia.

**Live:** Deployed on Vercel

## Features

### World Cup Prediction Game
Predict match scores for the 2026 FIFA World Cup. Scoring system awards 10 points for exact score, 5 for correct goal difference, 3 for correct result. Server-rendered leaderboard and personal dashboard with streak tracking.

### Daily Guess Game ("誰是我？")
Wordle-style daily football player guessing game. 5 progressive career clues (nationality, clubs, league), 6 guesses max, type-ahead search from a 100-player pool. Shareable emoji results.

### Blog
Markdown-powered blog with react-markdown + GFM support. Cursor-based pagination, PostgreSQL full-text search, dynamic SEO metadata.

### Video Library
YouTube-integrated video catalog with category filtering (analysis, news, prediction, culture).

### Idea Box
User suggestion form on the About page. Admin can view all submissions.

### Admin CMS
Full CRUD for videos, blog posts, matches, fantasy users. Match score updates auto-recalculate all prediction points. Zod-validated forms with toast feedback.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, Server Components) |
| Language | TypeScript 5 (strict mode) |
| Database | Neon PostgreSQL (serverless) |
| ORM | Drizzle ORM |
| Styling | Tailwind CSS 4 |
| Auth | bcryptjs + JWT (jose) |
| Validation | Zod v4 |
| Testing | Vitest |
| Hosting | Vercel |

## Getting Started

### Prerequisites

- Node.js 20+
- A [Neon](https://neon.tech) PostgreSQL database

### Setup

```bash
git clone https://github.com/ikigaiwif606-acc/tofoot-web.git
cd tofoot-web
npm install
```

Create `.env.local`:

```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
SESSION_SECRET=your-base64-secret-here
ADMIN_PASSWORD_HASH=$2a$12$your-bcrypt-hash
```

Generate a bcrypt hash for your admin password:

```bash
node -e "require('bcryptjs').hash('your-password', 12).then(h => console.log(h))"
```

### Database Setup

Seed the database with initial data:

```bash
npx tsx scripts/seed.ts
npx tsx scripts/seed-daily-players.ts
```

Or push the Drizzle schema directly:

```bash
npm run db:push
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |

## Project Structure

```
src/
  app/
    (public)/           # Public pages
      page.tsx          # Homepage
      daily/            # Daily guess game
      blog/             # Blog listing + [slug] detail
      videos/           # Video library
      world-cup/        # Prediction game, leaderboard, dashboard
      about/            # About + Idea Box
    admin/              # Protected admin CMS
      videos/           # Video management
      blog/             # Blog management
      matches/          # Match management
      leaderboard/      # User management
      suggestions/      # Idea Box submissions
    layout.tsx          # Root layout (fonts, toaster)
    globals.css         # Design system (cyberpunk theme)
    sitemap.ts          # Dynamic sitemap
    robots.ts           # Robots.txt
  components/
    ui/                 # Base components (Button, Card, Input, Badge)
    world-cup/          # Prediction game components
    Header.tsx          # Navigation
    Footer.tsx          # Site footer
    MobileBottomNav.tsx # Mobile bottom tabs
  lib/
    db/
      schema.ts         # Drizzle table definitions (8 tables)
      queries.ts        # Type-safe query functions
      index.ts          # Database client
    validations.ts      # Zod schemas
    scoring.ts          # Prediction scoring logic
    session.ts          # JWT session management
    auth.ts             # Admin auth guard
    fantasy-session.ts  # Game user session (cookies)
```

## Database Schema

8 tables: `videos`, `blog_posts`, `matches`, `fantasy_users`, `predictions`, `daily_players`, `daily_challenges`, `suggestions`.

See `src/lib/db/schema.ts` for full definitions.

## Design System

Cyberpunk dark theme with violet (`#8B5CF6`) and pink (`#EC4899`) accents on a `#0a0e14` background. Typography uses Plus Jakarta Sans (headings), Inter (body), and JetBrains Mono (data/scores).

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Base64 key for JWT signing |
| `ADMIN_PASSWORD_HASH` | Yes | bcrypt hash for admin login |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL (defaults to Vercel URL) |

## License

Private project.
