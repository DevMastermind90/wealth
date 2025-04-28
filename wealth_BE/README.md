# Asset Management API

This project is a simple Node.js and Express API for managing financial assets, connected to a MongoDB database. It provides APIs to fetch, process, and organize assets into categories and subcategories.
Data is loaded via a migration script from a JSON file into MongoDB.

## Pre-requisites
- Node.js
- MongoDB (Atlas used in this project)

## Installation & Setup
### 1. Navigate to the Backend folder after cloning the Repository
```bash
cd wealth_BE
```
### 2. Install Dependencies

```bash
npm install
```

### 3. Set up Environment Variables

```bash
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### 4. Seed Database (Migration)
```bash
node src/migrations/2025-04-28-populate-assets.js
```

### 4. Run the Server
```bash
node server.js
```


## Available API Endpoints

```bash
GET	/api/assets	(Fetches and processes all assets)
GET	/	(Basic health check for server)
```

## Improvements We Could Make
- Add Redis Caching
   - Use Redis to cache the results of frequently accessed API endpoints (e.g., the /api/assets route).

- Add Filtering, Sorting, and Pagination

    ```bash
     api/assets?category=Investment?sortBy=balanceCurrent&order=desc?page=1&limit=10
     ```
- Write unit tests and integration tests using tools like Jest and Supertest.

- Dockerize the App

- Authentication & Authorization (Future)

  - Protect APIs using JWT or OAuth if assets should be user-specific.

- Implement Error Handling Middleware
