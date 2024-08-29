FROM node:18 AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Install Serve globally
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the built React app with Serve
CMD ["npm", "start"]