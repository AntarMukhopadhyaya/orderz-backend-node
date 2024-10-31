# Use an official Node.js image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Set environment variables (optional)
ENV PORT=3000
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
