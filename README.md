# taller-session-2

## Backend — JWT Authentication Service

A FastAPI application that implements JWT-based authentication.

### Features

- **POST `/login`** — Accepts `username` and `password`, returns a JWT token valid for 300 seconds.
- **POST `/refresh`** — Accepts an existing JWT token and returns a new token with a renewed expiry.

### Credentials

| Field    | Value      |
|----------|------------|
| username | `admin`    |
| password | `admin123` |

---

## Running with Docker

```bash
cd backend
docker-compose up --build
```

The service will be available at `http://localhost:8000`.

Interactive API docs: `http://localhost:8000/docs`

---

## Running locally (with Poetry)

```bash
cd backend
poetry install
poetry run uvicorn app.main:app --reload
```

---

## Example usage

### Login

```bash
curl -X POST http://localhost:8000/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

Response:
```json
{
  "access_token": "<jwt_token>",
  "token_type": "bearer",
  "expires_in": 300
}
```

### Refresh token

```bash
curl -X POST http://localhost:8000/refresh \
  -H "Content-Type: application/json" \
  -d '{"token": "<jwt_token>"}'
```

---

## Running tests

```bash
cd backend
poetry run pytest tests/
```