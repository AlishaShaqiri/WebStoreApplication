# Use Node.js base image
FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port
EXPOSE 5000

# Start API server
CMD ["npm", "start"]
