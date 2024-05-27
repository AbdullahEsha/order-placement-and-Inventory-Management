# Common Ecommerce Backend

# Project Overview

This project is a back-end API server built using Express.js and TypeScript. It provides RESTful API endpoints for interacting with Git repositories.

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install` || `yarn`.
3. Build the project by running `npm run build` || `yarn build`.
4. Start the server by running `npm start` || `yarn start`.

## API Endpoints

The following API endpoints are available:

| Endpoint                           | Description                                          |
| ---------------------------------- | ---------------------------------------------------- |
| `/api/v1/repositories`             | Returns a list of all repositories.                  |
| `/api/v1/repositories/:id`         | Returns information about a specific repository.     |
| `/api/v1/repositories/:id/commits` | Returns a list of commits for a specific repository. |
| `/api/v1/repositories/:id/commits` | Returns information about a specific commit.         |
