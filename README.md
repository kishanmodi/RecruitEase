# RecruitEase

RecruitEase is a web application built with React.js to simplify the process of managing job applications and recruitment processes.

## Features

- Manage job listings
- Track job applications
- Organize candidate information
- Schedule interviews

## Installation

To run RecruitEase locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Recruit-Ease/Recruit-Ease-Frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Recruit-Ease-Frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app should now be running on [http://localhost:3000](http://localhost:3000).

## Docker

Alternatively, you can run RecruitEase using Docker. Make sure you have Docker installed on your system.

1. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/Recruit-Ease/Recruit-Ease-Frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Recruit-Ease-Frontend
   ```

3. Create a `Dockerfile` with the following content:

   ```Dockerfile
   FROM node:alpine

   # Set working directory
   WORKDIR /app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of your application code
   COPY . .

   # Expose the port your app runs on
   EXPOSE 3000

   # Command to run your application
   CMD ["npm", "start"]
   ```

4. Create a `docker-compose.yml` file with the following content:

   ```yaml
   version: '3.7'
   services:
     frontend:
       container_name: recruitease-frontend
       build:
         context: .
         dockerfile: Dockerfile
       volumes:
         - '.:/app'
         - '/app/node_modules'
       ports:
         - 3001:3000
       environment:
         - CHOKIDAR_USEPOLLING=true
   ```

5. Run the following command to start the app:

   ```bash
   docker-compose up -d
   ```

   The app should now be accessible at [http://localhost:3001](http://localhost:3001).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any problems or have suggestions for improvement.
