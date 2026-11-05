# KeySpex Backend API

Node.js + Express + TypeScript REST API powering the KeySpex platform — a role-based access system for Admin, Employee, and Client users backed by Firebase Authentication and Firestore.

---

## Stack Overview

| Layer | Technology |
|---|---|
| Runtime | Node.js (LTS) |
| Framework | Express 4 |
| Language | TypeScript 5 (strict mode) |
| Auth Provider | Firebase Authentication (Admin SDK) |
| Database | Firestore (via Firebase Admin SDK) |
| Session Tokens | JWT — access token (15 min) + refresh token (7 d, httpOnly cookie) |
| Password Hashing | bcryptjs (12 rounds) — used for any local hashing utilities |
| Validation | Zod |
| Security | helmet · cors · express-rate-limit · cookie-parser |
| Logging | morgan (dev only) |
| Dev Server | ts-node-dev |

---

## Directory Structure

```
backend/
├── scripts/
│   └── seedAdmin.ts          # One-time admin seeding script
├── src/
│   ├── config/
│   │   ├── env.ts            # Validated environment config (Zod)
│   │   └── firebase.ts       # Firebase Admin SDK initialisation
│   ├── middleware/
│   │   ├── authenticate.ts   # JWT Bearer verification + requireRole guard
│   │   ├── errorHandler.ts   # Central error handler
│   │   ├── rateLimiter.ts    # Login + global API rate limiters
│   │   └── validate.ts       # Zod request body validator
│   ├── routes/
│   │   ├── auth.routes.ts    # /api/auth/*
│   │   └── user.routes.ts    # /api/users/*
│   ├── schemas/
│   │   ├── auth.schema.ts    # Login schema
│   │   └── user.schema.ts    # Create / update user schemas
│   ├── services/
│   │   ├── auth.service.ts   # Login, token refresh, logout logic
│   │   └── user.service.ts   # CRUD operations for user management
│   ├── types/
│   │   └── index.ts          # Shared TypeScript types & interfaces
│   ├── utils/
│   │   ├── error.ts          # AppError class
│   │   ├── jwt.ts            # sign / verify helpers
│   │   └── password.ts       # bcryptjs hash / compare helpers
│   ├── app.ts                # Express app setup (middleware + routes)
│   └── index.ts              # Server entry point
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## Environment Setup

Copy `.env.example` to `.env` and fill in every value:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `NODE_ENV` | `development` \| `production` \| `test` |
| `FIREBASE_PROJECT_ID` | Your Firebase project ID |
| `FIREBASE_PRIVATE_KEY` | The `private_key` field from your service account JSON (keep the `\n` escape sequences) |
| `FIREBASE_CLIENT_EMAIL` | The `client_email` field from your service account JSON |
| `JWT_ACCESS_SECRET` | Random 64-byte hex string — `openssl rand -hex 64` |
| `JWT_REFRESH_SECRET` | Different random 64-byte hex string |
| `ACCESS_TOKEN_EXPIRES_IN` | JWT access token TTL (default `15m`) |
| `REFRESH_TOKEN_EXPIRES_IN` | JWT refresh token TTL (default `7d`) |
| `ALLOWED_ORIGINS` | Comma-separated CORS origins (e.g. `http://localhost:3000`) |
| `LOGIN_RATE_LIMIT_WINDOW_MS` | Rate limit window in ms (default `900000` = 15 min) |
| `LOGIN_RATE_LIMIT_MAX` | Max login attempts per window (default `10`) |

> [!CAUTION]
> Never commit `.env` or `serviceAccountKey.json` to version control. Both are listed in `.gitignore`.

---

## Firebase Setup

1. **Create a Firebase project** at [console.firebase.google.com](https://console.firebase.google.com).
2. **Enable Email/Password** sign-in: *Authentication → Sign-in method → Email/Password → Enable*.
3. **Create Firestore database**: *Firestore Database → Create database* (start in production mode).
4. **Generate a service account key**:
   - *Project Settings → Service Accounts → Generate new private key*
   - Download the JSON file. **Do not commit it.**
5. Copy the values from the JSON into your `.env`:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY` (the entire string including `-----BEGIN…-----END…`)
   - `client_email` → `FIREBASE_CLIENT_EMAIL`
6. **Firestore indexes**: The `listUsers` query uses `orderBy("createdAt", "desc")` with an optional `where("role", …)` filter. Create a composite index in the Firestore console if Firestore prompts you with an index link in the server logs.

---

## Installing Dependencies

```bash
cd backend
npm install
```

---

## Running the Dev Server

```bash
npm run dev
```

The server starts on `http://localhost:5000` (or the `PORT` in your `.env`).

---

## Seeding the Initial Admin

Admin accounts are **not** created through the API. Run the seed script once after setting up Firebase:

```bash
# From the backend/ directory
ADMIN_EMAIL=admin@example.com \
ADMIN_PASSWORD=SuperSecret1 \
ADMIN_DISPLAY_NAME="KeySpex Admin" \
npx ts-node scripts/seedAdmin.ts
```

The script:
1. Creates the user in Firebase Auth (or finds an existing one by email).
2. Sets the `role: "admin"` custom claim on the Firebase Auth user.
3. Writes the user document to the `users` Firestore collection.

> [!NOTE]
> Re-running the script on an existing email is safe — it uses `merge: true` on the Firestore write.

---

## API Endpoints

### Auth — `/api/auth`

| Method | Path | Auth required | Description |
|---|---|---|---|
| `POST` | `/api/auth/login` | ✗ | Sign in with email + password. Returns `accessToken` in JSON body and sets `ks_refresh` httpOnly cookie. |
| `POST` | `/api/auth/refresh` | ✗ (cookie) | Rotate tokens. Reads `ks_refresh` cookie, returns new `accessToken` and rotates the cookie. |
| `POST` | `/api/auth/logout` | ✓ Bearer | Clears the `ks_refresh` cookie. |
| `GET` | `/api/auth/me` | ✓ Bearer | Returns the authenticated user's profile from Firestore. |

**Login request body:**
```json
{ "email": "user@example.com", "password": "MyPassword1" }
```

**Login success response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "<jwt>",
    "expiresIn": 900,
    "user": { "uid": "…", "email": "…", "role": "admin", "displayName": "…", "active": true }
  }
}
```

---

### Users — `/api/users`

All routes require a valid `Authorization: Bearer <accessToken>` header.

| Method | Path | Role | Description |
|---|---|---|---|
| `POST` | `/api/users` | Admin | Create an Employee or Client account. |
| `GET` | `/api/users` | Admin | List all users. Optional `?role=employee\|client` filter. |
| `GET` | `/api/users/:uid` | Admin / Self | Get a user by UID. Non-admins may only fetch their own record. |
| `PATCH` | `/api/users/:uid` | Admin / Self | Update `displayName`, `active` (admin only), or `password`. |
| `DELETE` | `/api/users/:uid` | Admin | Permanently delete a user from Auth + Firestore. |

**Create user request body:**
```json
{
  "email": "employee@example.com",
  "password": "Secure1234",
  "displayName": "Jane Smith",
  "role": "employee"
}
```

---

## Error Response Shape

All errors follow a consistent envelope:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request body.",
    "details": [{ "field": "email", "message": "Must be a valid email address." }]
  }
}
```

Common error codes: `UNAUTHORIZED`, `TOKEN_INVALID`, `FORBIDDEN`, `VALIDATION_ERROR`, `INVALID_CREDENTIALS`, `ACCOUNT_INACTIVE`, `EMAIL_TAKEN`, `USER_NOT_FOUND`, `RATE_LIMITED`, `INTERNAL_ERROR`.

---

## Security Features

- **helmet** — sets secure HTTP response headers (CSP, HSTS, etc. fully enabled in production).
- **CORS** — allow-list of origins with credentials support; rejects unknown origins.
- **express-rate-limit** — login endpoint limited to 10 attempts per 15 min per IP+email pair; global API limiter at 120 req/min.
- **httpOnly cookie** — refresh token is never accessible to JavaScript; `SameSite=Strict`, `Secure` in production.
- **JWT rotation** — each `/refresh` call issues a new refresh token, invalidating the old one conceptually (full blacklist support is a future enhancement).
- **Firebase custom claims** — role is stored as a custom claim on the Firebase Auth user, enabling enforcement at the Firestore security rules layer too.
- **Zod validation** — all incoming request bodies are parsed and coerced by strict schemas before reaching service logic.
- **Uniform auth errors** — login and user-lookup errors return identical messages to prevent user enumeration.
- **bcryptjs (12 rounds)** — password hashing utility available for any local credential storage needs.
- **Account deactivation** — `active: false` blocks login and token refresh immediately without deleting the Firebase Auth user.

---

## Building for Production

```bash
npm run build        # compiles TypeScript to dist/
npm start            # runs the compiled JS
```

Set `NODE_ENV=production` in your deployment environment to enable all helmet policies, disable morgan logging, and set `Secure` on cookies.

