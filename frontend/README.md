# Frontend — PlayStation-Styled Auth App

A React single-page application that provides a **Login** page and a **Welcome** page, backed by the JWT authentication service in the `backend/` folder.

## Design System

The UI follows the PlayStation design system defined in [`DESIGN 1.md`](../DESIGN%201.md) at the root of the repository:

- **Colors**: PlayStation Blue (`#0070d1`) for primary actions, dark canvas (`#000000` / `#181818`) as backgrounds.
- **Typography**: PlayStation SST (falls back to system sans-serif), weight-300 display headings, weight-700 button labels.
- **Components**: Fully-rounded pill buttons, 4 px-radius text inputs, 8 px-radius cards, all on dark-mode surfaces.

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx             # Root component with routing
│   ├── AuthContext.jsx     # Authentication state & session storage
│   ├── ProtectedRoute.jsx  # Route guard (redirects to / if not logged in)
│   ├── Login.jsx           # Login page component
│   ├── Login.module.css    # Login page styles
│   ├── Welcome.jsx         # Welcome page component (protected)
│   ├── Welcome.module.css  # Welcome page styles
│   ├── index.css           # Global CSS variables & reset
│   └── main.jsx            # React entry point
├── .env.example            # Environment variable template
├── index.html
├── package.json
└── vite.config.js
```

## Requirements

- **Node.js** 20.19+ or 22.12+
- **npm** 9 or later
- The backend service must be running (see `backend/` for instructions)

## Environment Variables

Copy `.env.example` to `.env` and adjust as needed:

```
VITE_API_URL=http://localhost:8000
```

| Variable       | Default                    | Description                          |
|----------------|----------------------------|--------------------------------------|
| `VITE_API_URL` | `http://localhost:8000`    | Base URL of the backend API service  |

## Installation

```bash
cd frontend
npm install
```

## Running in Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Building for Production

```bash
npm run build
```

The compiled output is written to `frontend/dist/`.

## Usage

1. **Start the backend** (from the `backend/` folder):
   ```bash
   docker-compose up
   # or: uvicorn app.main:app --reload
   ```

2. **Start the frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

4. **Login page** — enter credentials (default: `admin` / `admin123`) and click **Sign In**.  
   The JWT token is saved in `sessionStorage` and you are redirected to the Welcome page.

5. **Welcome page** — displays a personalised greeting with the logged-in username and navigation cards.  
   Click **Sign Out** to clear the session and return to the Login page.

6. Navigating directly to `/welcome` without logging in redirects you back to `/`.

## Authentication Flow

```
User          Frontend              Backend
 |──Sign In──▶ POST /login  ──────▶ Validates credentials
 |             ◀── 200 { access_token } ──
 |             Stores token in sessionStorage
 |◀─ Redirect /welcome ─────────────────
 |
 |──Sign Out─▶ Clears sessionStorage
 |◀─ Redirect / ──────────────────────
```
