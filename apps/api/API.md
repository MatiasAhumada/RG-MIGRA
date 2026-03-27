# API Documentation

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <accessToken>
```

## Endpoints

### Health

#### GET /health

Check API health status.

**Response:**
```json
{
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/health"
}
```

#### GET /health/ready

Check if API is ready (includes database connection).

**Response:**
```json
{
  "data": {
    "status": "ready",
    "database": "connected",
    "timestamp": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/health/ready"
}
```

---

### Auth

#### POST /auth/login

Authenticate user and get tokens.

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/auth/login"
}
```

#### POST /auth/register

Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/auth/register"
}
```

#### POST /auth/refresh

Refresh access token.

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/auth/refresh"
}
```

---

### Users

#### GET /users

Get all users with pagination.

**Query Parameters:**
| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number |
| limit | number | 10 | Items per page |

**Response:**
```json
{
  "data": {
    "data": [
      {
        "id": "uuid",
        "name": "John Doe",
        "email": "john@example.com",
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "meta": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/users"
}
```

#### GET /users/:id

Get user by ID.

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/users/uuid"
}
```

#### POST /users

Create a new user. (Public endpoint)

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/users"
}
```

#### PUT /users/:id

Update user.

**Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "isActive": true
}
```

**Response:**
```json
{
  "data": {
    "id": "uuid",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/users/uuid"
}
```

#### DELETE /users/:id

Delete user.

**Response:**
```json
{
  "data": null,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/users/uuid"
}
```

---

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Invalid data provided",
  "code": "BAD_REQUEST",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "code": "UNAUTHORIZED",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User not found",
  "code": "NOT_FOUND",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users/uuid"
}
```

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "code": "CONFLICT",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "code": "INTERNAL_ERROR",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/users"
}
```

---

## Swagger Documentation

Interactive API documentation is available at:

```
http://localhost:3000/api/docs
```

Features:
- Interactive API testing
- Schema definitions
- Authentication support
- Request/response examples
