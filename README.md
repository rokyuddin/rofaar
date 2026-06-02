# Rofaar

Premium fashion e-commerce platform built with Next.js 16, featuring Cache Components, shadcn/ui, and a full API integration.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router, Cache Components)
- **UI:** shadcn/ui + Tailwind CSS v4
- **Language:** TypeScript 5
- **Auth:** NextAuth v5 (phone + password)
- **Data Fetching:** TanStack Query v5
- **Forms:** @tanstack/react-form + Zod
- **Linting:** Biome

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run Biome linter |
| `pnpm format` | Format with Biome |

## Docker

```bash
docker compose up --build
```

## Environment Variables

Copy `.env.example` to `.env.local`:

```
AUTH_SECRET=your_secret
AUTH_URL=http://localhost:3000
BACKEND_URL=https://api.rofaar.com
NEXT_PUBLIC_API_URL=/api/v1
```

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login, register, forgot password
│   ├── (main)/          # Public pages (products, cart, account)
│   ├── (legal)/         # Terms, privacy, shipping, help
│   └── api/auth/        # NextAuth route
├── components/
│   ├── atoms/           # shadcn/ui + shared UI components
│   ├── molecules/       # Composed components (product-error)
│   └── organisms/       # Navbar, footer, header
├── features/            # Feature modules (landing, product, shipping, help)
├── hooks/               # TanStack Query hooks (21 API sections)
├── lib/                 # API client, auth config, utils
├── providers/           # QueryProvider, SessionProvider
└── types/               # TypeScript interfaces
```

## Pages

- `/` — Homepage with hero, products, categories, testimonials
- `/products` — Product listing with filters and sort
- `/products/[slug]` — Product detail with gallery, reviews, Q&A
- `/cart` — Shopping cart with coupon support
- `/checkout` — Multi-step checkout (address, shipping, payment)
- `/account` — Profile, orders, addresses, wishlist
- `/categories` — Category grid
- `/login`, `/register`, `/forgot-password` — Authentication
- `/about`, `/contact`, `/help`, `/terms`, `/privacy`, `/shipping` — Info pages

## Backend API

All requests to `/api/v1/*` are proxied to `https://api.rofaar.com` via the root `proxy.ts`.
