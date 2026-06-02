# OpenCode Agent Instructions for rofaar

## Development Commands
- Start dev server: `pnpm dev` (or `npm run dev`, `yarn dev`, `bun dev`)
- Lint code: `pnpm lint` (runs `biome check`)
- Format code: `pnpm format` (runs `biome format --write`)
- Build for production: `pnpm build` (runs `next build`)
- Start production server: `pnpm start` (runs `next start`)

## Project Specifics
- Framework: Next.js 16.1.6 with App Router
- UI Components: Uses shadcn/ui (dependency `shadcn@^4.8.3`)
- Styling: Tailwind CSS v4
- Form Library: @tanstack/react-form with zod adapter
- Data Fetching: @tanstack/react-query
- Authentication: next-auth (beta)
- Linting/Formatting: Biome (configured via `biome.json`)
- Entry point for homepage: `src/app/page.tsx`
- Components are typically placed in `src/components/`

## Important Notes
- The project uses React 19.2.3 and TypeScript 5
- Tailwind CSS is configured via `tailwindcss` and `@tailwindcss/postcss` in devDependencies
- Biome handles both linting and formatting; no separate ESLint/Prettier needed
- The `next.config.ts` file contains custom Next.js configuration
- Environment variables are loaded from `.env.local` (see example)