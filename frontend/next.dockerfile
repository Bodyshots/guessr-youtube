# Use Node.js as the base image
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

RUN pnpm clean --lockfile

# Install dependencies
RUN pnpm install --dangerously-allow-all-builds

# Copy the rest of your application code into the container
COPY . .

# Build the application
RUN pnpm run build

# Run the application
CMD ["pnpm", "run", "dev"]
