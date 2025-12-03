# syntax=docker.io/docker/dockerfile:1

FROM node:24.11.1-bookworm AS base

FROM base AS deps

RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

COPY package.json pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
RUN pnpm install --frozen-lockfile

# Build the application
RUN pnpm run build


FROM base AS dev

WORKDIR /app
USER root

RUN corepack enable && corepack install --global pnpm@10.24.0

ENV \
  COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  NODE_ENV=development

# Install dependencies
COPY package.json pnpm-lock.yaml* ./
RUN pnpm i --frozen-lockfile

# Now copy the rest of the source code
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]

# Production Image with Nginx
FROM nginx:1.27.4-alpine AS prod

ARG NODE_ENV=production

ENV \
    NODE_ENV=production \
    PORT=${PORT}

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
