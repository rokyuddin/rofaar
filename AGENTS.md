# OpenCode Agent Instructions for rofaar

## Commands
- `pnpm dev` — dev server (Next.js 16, port 3000)
- `pnpm lint` — runs `biome check`
- `pnpm format` — runs `biome format --write`
- `pnpm build` — production build (`next build`, outputs standalone)
- `pnpm start` — production server
- `docker compose up --build` — containerized production build

## Architecture
- **Next.js 16 App Router** with `cacheComponents: true` and `reactCompiler: true` enabled in `next.config.ts`
- **Standalone output** (`output: "standalone"`) — production build is self-contained
- **API proxy**: All `/api/v1/*` requests proxy to `https://api.rofaar.com`. The README mentions a `proxy.ts` but it doesn't exist in `src/app/`; the proxy is handled via Next.js config or middleware. Check `next.config.ts` and `next.config` rewrites if modifying proxy behavior.
- **Path alias**: `@/*` maps to `./src/*` (tsconfig paths)

## Source Layout
```
src/
├── app/(auth)/        # Login, register, forgot-password
├── app/(main)/        # Public pages (products, cart, account)
├── app/(legal)/       # Terms, privacy, shipping, help
├── app/api/auth/      # NextAuth route handler
├── components/atoms/  # shadcn/ui primitives + shared UI
├── components/molecules/  # Composed components
├── components/organisms/  # Navbar, footer, header
├── features/          # Feature modules (landing, product, shipping, help)
├── hooks/             # TanStack Query hooks (one per API section)
├── lib/api-client.ts  # Axios client with auth interceptor + 5xx retry
├── lib/auth.ts        # NextAuth v5 config (phone+password credentials)
├── providers/         # QueryProvider, SessionProvider
└── types/api.ts       # Shared API response types
```

## Key Conventions
- **Biome only** — no ESLint/Prettier. `noUnknownAtRules` is off (allows `@tailwind` directives). Organize imports via Biome assist.
- **shadcn/ui v4** — components registered in `components.json`. Use `npx shadcn@latest add <component>` to add. MCP server enabled in `opencode.json`.
- **TanStack Query v5** for all server state. Hooks live in `src/hooks/`, one per API domain.
- **@tanstack/react-form** with `@tanstack/zod-form-adapter` and **Zod v4** for validation.
- **Auth**: NextAuth v5 beta (`5.0.0-beta.31`). Phone+password credentials provider. JWT-based. Session includes `accessToken`. Custom sign-in page at `/login`.
- **nuqs** for URL search params state management.
- **framer-motion** for animations.

## Environment
- `.env.local` (not committed) with `AUTH_SECRET`, `AUTH_URL`, `BACKEND_URL`, `NEXT_PUBLIC_API_URL=/api/v1`
- `.env.example` referenced in README but doesn't exist — create it if adding new env vars

## Gotchas
- React 19.2.3 + `babel-plugin-react-compiler` in devDeps — the React Compiler is active. Components may behave differently than expected with manual memoization.
- `shadcn` is both a dependency (runtime) and dev tool — version `^4.8.3` is the CLI/registry version.
- `ignoreScripts` and `trustedDependencies` in package.json include `sharp` and `unrs-resolver` — these have native binaries that may need special handling in CI/Docker.
- No test framework is configured. If adding tests, check for existing patterns first.