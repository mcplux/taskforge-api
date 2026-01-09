# TaskForge API

TaskForge API is a RESTful task management API focused on clean architecture, scalability, and OpenAPI documentation.

## ⚙️ Features

### Task Management

- Create tasks.
- Read tasks (list & single).
- Update tasks.
- Delete tasks.

### Authentication

- User registration.
- User login.
- JWT-based authentication.
- Protected task routes

## 🧱 Tech Stack

- 🟦 [**TypeScript**](https://www.typescriptlang.org/) — Type-safe JavaScript for scalable and maintainable code.
- 🚀 [**Express.js**](https://expressjs.com/) — Minimal and fast framework for building REST APIs.
- 🍃 [**MongoDB**](https://www.mongodb.com/) — Flexible NoSQL database for modern applications.
- 🧩 [**Mongoose**](https://mongoosejs.com/) — Elegant ODM for modeling and managing MongoDB data.
- 🛡️ [**Zod**](https://zod.dev/) — Schema validation for safe and predictable inputs.
- 🔐 [**JWT (JSON Web Tokens)**](https://www.jwt.io/) — Secure and stateless authentication.
- 🐳 [**Docker & Docker Compose**](https://www.docker.com/) — Consistent environments and simplified service orchestration.

## ▶️ Run the project locally

### Prerequisites

- Node 24.
- npm.
- Docker.

### Steps

1. Clone the repository

   ```bash
   git clone https://github.com/mcplux/taskforge-api.git
   ```

2. Copy the environment variables file

   ```bash
   cp .env.example .env
   ```

3. Build the API Docker image

   ```bash
   docker compose build --no-cache
   ```

4. Start the server using Docker

   ```bash
   docker compose up --watch
   ```

5. Useful links (default configuration):

   - **API**: http://localhost:4000/api
   - **Mongo Express**: http://localhost:8081

Once the containers are running, you can work directly on your local machine.  
Local changes are automatically synchronized with the Docker container.

You can also install new dependencies locally the Docker image will be rebuilt automatically when needed.

## 📡 API Documentation

Upcoming...

## ❤️ Author

Created by Juan Pablo Martinez ([@mcplux](https://github.com/mcplux))
