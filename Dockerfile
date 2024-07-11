FROM --platform=linux/amd64 node:18-alpine

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Set environment variables
ENV DB_HOST=host.docker.internal
ENV DB_PORT=55006
ENV DB_USER=root
ENV DB_PASSWORD=root
ENV DB_NAME=cricket

# Run the application
CMD [ "npm", "start" ]