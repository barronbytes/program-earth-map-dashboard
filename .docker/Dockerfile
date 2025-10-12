# Step 1: Base Image
FROM node:20-alpine

# Step 2: Set Working Directory & Tooling
# Allow the workdir to be overridden at build time, default is /app
ARG WORKDIR=/app
WORKDIR ${WORKDIR}

# Bash is optional but helpful for debugging, git for development
RUN apk add --no-cache bash git

# Step 3: Copy Package Manifest (for caching)
COPY package.json pnpm-lock.yaml ${WORKDIR}/

# Step 4: Install Dependencies
RUN corepack enable \
    && corepack prepare pnpm@* --activate \
    && pnpm install --frozen-lockfile

# Step 5: Copy Source Code
COPY . ${WORKDIR}/

# Step 6: Define the Command to Run the App
# Expose Vite's default dev server port
EXPOSE 5173
# Run the Vite dev server in shell form so it listens on all interfaces
CMD ["pnpm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
