# Use Node.js as the base image
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package manager files
COPY package.json pnpm-lock.yaml ./

# Allow native dependency build scripts
RUN printf "onlyBuiltDependencies[]=esbuild\nonlyBuiltDependencies[]=sharp\n" >> .npmrc

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your application code into the container
COPY . .

# Build the application
RUN pnpm run build

# Run the application
CMD ["pnpm", "run", "dev"]
