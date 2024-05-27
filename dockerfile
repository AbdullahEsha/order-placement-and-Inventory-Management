# Use an official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the code
COPY . .

# Expose the port
EXPOSE 8000

# Run the command to start the server
CMD ["npm", "start"]

