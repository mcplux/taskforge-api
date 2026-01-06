# TaskForge API

## Run the server locally

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
