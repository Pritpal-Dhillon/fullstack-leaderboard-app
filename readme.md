# Leaderboard API Documentation

Welcome to the leaderboard API documentation. This application contains a list of users, and provides endpoints for retrieving, creating, updating, and deleting users, and their associated points. The API is designed to be used in conjunction with a frontend leaderboard application.

## Installation and Setup Instructions

### Backend Installation:

1. Navigate to the backend directory:

    ```
    cd leaderboard-backend
    ```
2. Install dependencies:

    ```
    npm i
    ```
3. Update your environment variables in `.env` file:

    ```
    PORT=5000
    ```

    Note: Change the `PORT` to the one where you want your API to run.

4. Start the backend server:

    ```
    node server.js
    ```

### Frontend Installation:

1. Navigate to the frontend directory:

    ```
    cd leaderboard-frontend
    ```
2. Install dependencies:

    ```
    npm i
    ```
3. Update your environment variables in `.env` file:

    ```
    REACT_APP_API_URL=http://localhost:5000/api/v1
    ```

    Note: Change `REACT_APP_API_URL` to match where your API is running.

4. Start the frontend:

    ```
    npm start
    ```








### Testing:

To run the unit tests for the backend or frontend, use the following command:

```
npm test
```





## API Endpoints:

### 1. GET /api/v1/users

Fetch all users from the database, sorted by 'points' in descending order, and then by 'name'.

**Response:**
```json
[
    {
        "id": "string",
        "name": "string",
        "age": "integer",
        "address": "string",
        "points": "integer"
    },
    // ... more users
]
```

### 2. GET /api/v1/users/:id

Fetch a specific user from the database using the user's 'id'. 

**URL Parameters:**
- `id` (required): The ID of the user to be fetched.

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "age": "integer",
    "address": "string",
    "points": "integer"
}
```

### 3. POST /api/v1/users

Create a new user. The server generates the user's 'id', and 'points' are initialized to 0. 

**Request Body:**
- `name` (required): The name of the user.
- `age` (required): The age of the user.
- `address` (required): The address of the user.

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "age": "integer",
    "address": "string",
    "points": "integer"
}
```

### 4. DELETE /api/v1/users/:id

Delete a specific user from the database using the user's 'id'.

**URL Parameters:**
- `id` (required): The ID of the user to be deleted.

**Response:**
```json
{
    "message": "User deleted"
}
```

### 5. POST /api/v1/users/:id/points

Update the 'points' of a specific user. 

**URL Parameters:**
- `id` (required): The ID of the user whose points are to be updated.

**Request Body:**
- `points` (required): The amount to add to (or subtract from, if negative) the user's current points. This value cannot be such that the user's points would go below 0.

**Response:**
```json
{
    "id": "string",
    "name": "string",
    "age": "integer",
    "address": "string",
    "points": "integer"
}
```