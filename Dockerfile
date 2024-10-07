# Use the official Node.js 22 Alpine image as the base
FROM node:22-alpine

# Set the maintainer label
LABEL maintainer="RaptorReign"

# Copy all files from the current directory to the container
COPY . .

# Install dependencies using npm ci for a clean install
RUN npm ci

# Expose ports 80 and 443 for the application
EXPOSE 80 443

# Set the command to run the production script
CMD ["npm", "run", "prod"]