FROM node:24.15.0-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml .npmrc ./

RUN corepack enable && corepack prepare pnpm@10.30.3 --activate && pnpm install --frozen-lockfile

COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN pnpm run build

# Runner Stage
FROM node:24.15.0-alpine

WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
