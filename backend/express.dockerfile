FROM node:22-alpine AS base

RUN adduser -D runner
USER runner

WORKDIR /app/backend

COPY --chown=runner:runner ./backend/. ./backend

CMD ["npm",  "run", "app:dev"]
