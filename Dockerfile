# syntax=docker.io/docker/dockerfile:1

# Use Debian-based Node image
FROM node:24.11.1-bookworm AS base

# Install dependencies only when needed
FROM base AS deps
# Install libc6-compat equivalent on Debian
RUN apt-get update && apt-get install -y --no-install-recommends \
    libc6 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Setup pnpm
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
RUN pnpm install --frozen-lockfile

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./


# Production Image
FROM base AS prod

ARG PORT=3000
ARG HOSTNAME="0.0.0.0"
ARG NODE_ENV=production

WORKDIR /app

ENV \
  NODE_ENV=production \
  HOSTNAME=${HOSTNAME} \
  PORT=${PORT}

# Create non-root user similar to Alpine version
RUN groupadd -g 1001 runner && \
    useradd -m -u 1001 -g runner runner

COPY --from=builder /app/public ./public
COPY --from=builder --chown=runner:runner /app/dist /app

USER runner

EXPOSE 3000

CMD ["pnpm", "dev"]


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
