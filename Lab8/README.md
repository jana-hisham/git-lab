# Lab 8 – Node.js Backend

## Overview

A simple Mini-Twitter REST API implemented using Node.js and Express.js. Users, posts, likes and comments are stored using JavaScript arrays and objects instead of a database.

## How to Run

1. Run `npm install` to install the dependencies.
2. Run `node server.js` to start the server.
3. The server runs at `http://localhost:3000`.

## API Documentation

**Base URL:** `http://localhost:3000`

| Method | Endpoint | Request Body | Description | Success Status |
|---|---|---|---|---|
| GET | /users | None | Get all users | 200 |
| POST | /users | name | Create a user | 201 |
| GET | /users/:id | None | Get a specific user | 200 |
| GET | /posts | None | Get all posts | 200 |
| POST | /posts | title, content | Create a post | 201 |
| GET | /posts/:id | None | Get a specific post | 200 |
| PUT | /posts/:id | title, content | Update a post | 200 |
| DELETE | /posts/:id | None | Delete a post | 204 |
| POST | /posts/:id/like | None | Like a post | 200 |
| DELETE | /posts/:id/like | None | Remove a like | 200 |
| GET | /posts/:id/comments | None | Get post comments | 200 |
| POST | /posts/:id/comments | content | Add a comment | 201 |
| DELETE | /posts/:id/comments/:commentId | None | Delete a comment | 204 |

## Request Examples

**Create a user — POST /users**

`{"name": "Test User"}`

**Create a post — POST /posts**

`{"title": "First post", "content": "Hello"}`

**Add a comment — POST /posts/1/comments**

`{"content": "Nice post!"}`

Request bodies should be sent as JSON using the Content-Type: application/json header.

## Status Codes

- 200: Successful request
- 201: Resource created successfully
- 204: Successful deletion with no response body
- 400: Missing required input
- 404: Resource not found

## Testing

The test-api.js file uses fetch and assertions to test the API endpoints.

Start the server with empty arrays, then open another terminal and run `node test-api.js`.

Testing results: 18 passed, 0 failed.

## Storage

Data is stored temporarily in memory and is cleared when the server restarts.