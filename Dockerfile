# Use Node.js 18 LTS as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port the React app runs on (typically 3000)
EXPOSE 3000

# Start the React app
CMD ["yarn", "start"]
