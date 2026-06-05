# OpenCode Agent Instructions for rofaar

## Developer Commands
- `pnpm dev` — Start the Next.js 16 development server (port 3000)
- `pnpm lint` — Run Biome check (linter rules + import organizing)
- `pnpm format` — Format code with Biome (`biome format --write`)
- `pnpm build` — Build production application (`next build`, standalone output)
- `pnpm start` — Start the production server
- `docker compose up --build` — Run containerized production build (pins Node `24.15.0-alpine` and pnpm `10.30.3`)

## Architecture & Data Flow
- **Next.js 16 App Router**: Uses `cacheComponents: true` and `reactCompiler: true` in `next.config.ts`.
- **Direct API Configuration**: There is no Next.js-level proxy middleware or `proxy.ts`. Client and server make direct calls to `process.env.NEXT_PUBLIC_API_URL` (locally set in `.env.local` to a direct backend like `http://localhost:4000/api/v1`).
- **Auth**: NextAuth v5 beta (`5.0.0-beta.31`) Credentials provider (phone + password). Configured in `src/lib/auth.ts`.
- **Client State**: Zustand with local storage persistence manages cart (`src/stores/cart-store.ts`) and wishlist (`src/stores/wishlist-store.ts`).
- **Path Alias**: `@/*` points to `./src/*`.

## Source Layout
```
src/
├── app/(auth)/        # Login, registration, forgot-password
├── app/(main)/        # Shop features (landing page, products, cart, checkout, account)
├── app/(legal)/       # Policy, terms, help pages
├── app/api/auth/      # NextAuth route handler
├── components/atoms/  # shadcn/ui base primitives (aliased via components.json)
├── components/molecules/ # Shared composed components (e.g., error fallback)
├── components/organisms/ # Layout shell components (Navbar, Header, Footer)
├── features/          # Feature widgets and domain-specific views (e.g., landing page features)
├── hooks/             # TanStack Query v5 hooks (one file per API resource)
├── lib/               # Shared clients (api-client for client, api-server for cached fetch actions)
├── providers/         # Global provider wrappers
└── stores/            # Zustand state stores
```

## Tooling & Conventions
- **Biome Linter/Formatter**: No ESLint or Prettier. Organized imports are handled on-save/format via Biome assist. Tailwind `@tailwind` directives are allowed because `noUnknownAtRules` is disabled.
- **shadcn/ui v4**: Components are registered in `components.json` with style `radix-lyra` and base color `mist`. Added via `npx shadcn@latest add <component>`. Primitives reside in `@/components/atoms` (aliased to `@/components/atoms` in components.json).
- **Forms & Validation**: Built with `@tanstack/react-form`, Zod v4, and `@tanstack/zod-form-adapter`.
- **Server Cache**: Server-side fetches in `api-server.ts` utilize `"use cache"` and `cacheTag(...)` for granular Next.js cache invalidations.

## Operational Gotchas
- **Auth Env Var Mapping**: NextAuth config uses `NEXTAUTH_SECRET` but NextAuth v5 beta automatically maps `AUTH_SECRET` from `.env.local` to it. Keep them consistent.
- **React Compiler**: React 19.2.3 + `babel-plugin-react-compiler` are active. Avoid standard memoization optimization overrides unless necessary.
- **No Tests**: There is currently no local unit, integration, or E2E test suite configured.
- **PNPM Native Hoisting**: `.npmrc` has `shamefully-hoist=true` and `auto-install-peers=true` enabled to ensure compatibility with native binaries like `sharp`.
