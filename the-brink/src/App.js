FROM node:18-alpine

# Use a single working directory
WORKDIR /app

# Copy package.json and lock files first to cache layer
COPY package.json package-lock.json* ./
RUN npm install --force

# Copy in the specific directories and files
COPY public/ ./public
COPY src/ ./src
COPY server.js ./

# Expose ports if needed
EXPOSE 3000
EXPOSE 3001

# Run the server
CMD ["node", "server.js"]
