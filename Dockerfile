# syntax=docker.io/docker/dockerfile:1

FROM node:24.11.1-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
RUN corepack enable && corepack prepare pnpm@10.24.0 --activate

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN corepack enable && corepack prepare pnpm@10.24.0 --activate
RUN pnpm i --frozen-lockfile

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./


FROM base AS prod
ARG PORT=3000
ARG HOSTNAME="0.0.0.0"
ARG NODE_ENV=production

WORKDIR /app

ENV \
  NODE_ENV=production \
  HOSTNAME=${HOSTNAME} \
  PORT=${PORT}

RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 runner

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=runner:runner /app/dist /app

USER runner

EXPOSE 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["pnpm", "dev"]


FROM prod AS dev

USER root
RUN corepack enable && corepack install --global pnpm@10.24.0


ENV  \
  COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
  NODE_ENV=development


COPY --from=builder /app/node_modules /app/node_modules
COPY . /app
RUN pnpm i --frozen-lockfile --dev

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "3000"]
