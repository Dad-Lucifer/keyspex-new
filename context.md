# KeySpex — Full-Stack Project Context

> **Purpose of this document**: Comprehensive technical and business context for the KeySpex codebase. Any AI agent or developer reading this should be able to understand the full architecture, conventions, data flow, and current state of the project without reading individual files.

---

## 1. Project Overview

**KeySpex** is a digital services agency based in India that offers websites, business tools, marketing, and creative work for SMBs (small and medium-sized businesses), startups, local shops, and growing brands. The project is a **full-stack web application** consisting of:

- A **public-facing marketing website** (Next.js frontend)
- A **private team portal** (admin/employee/client login)
- A **REST API backend** (Express + TypeScript + Firebase)

The monorepo root is:
```
/mnt/E-drive/work/KeySpex/keyspex-new/
├── frontend/   ← Next.js 16 marketing site + auth portal
└── backend/    ← Express.js REST API
```

---

## 2. Tech Stack

### Frontend
| Concern | Technology |
|---|---|
| Framework | Next.js 16.4.3 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/turbopack`) |
| Animations | GSAP 3.15 + `@gsap/react`, Motion (`motion/react` v14) |
| UI Components | shadcn/ui (Radix primitives via `@base-ui/react`), Lucide React |
| Form Validation | Zod v4 (client-side) |
| Fonts | Space Grotesk (`--font-headline`), Inter (`--font-body`), Geist Mono (`--font-mono`) |
| Build | Turbopack (dev), Next.js default (prod) |
| Package manager | npm |

### Backend
| Concern | Technology |
|---|---|
| Framework | Express.js 4 |
| Language | TypeScript 5 |
| Auth DB | Firebase Admin SDK (Firestore + Firebase Auth) |
| JWT | `jsonwebtoken` — dual-token (access + refresh) |
| Password hashing | `bcryptjs` (12 salt rounds) — utility only; actual login delegates to Firebase Identity Toolkit REST API |
| Validation | Zod v4 |
| Security | Helmet, CORS with allowlist, `express-rate-limit` |
| Logging | Morgan (dev only) |
| Cookie | `cookie-parser` |
| Dev server | `ts-node-dev` |
| Build output | `dist/` via `tsc` |

---

## 3. Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
NODE_ENV=development

FIREBASE_PROJECT_ID=keyspex-d80e4
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@keyspex-d80e4.iam.gserviceaccount.com
FIREBASE_API_KEY=AIzaSy...  # Web API Key from Firebase Console → Project Settings → General

JWT_ACCESS_SECRET="..."      # min 32 chars
JWT_REFRESH_SECRET="..."     # min 32 chars

ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

ALLOWED_ORIGINS=http://localhost:3000   # comma-separated for multi-origin

LOGIN_RATE_LIMIT_WINDOW_MS=900000       # 15 minutes
LOGIN_RATE_LIMIT_MAX=10
```
All env vars are validated at startup via Zod (`src/config/env.ts`). Missing required vars kill the process with a clear error.

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
If not set, `LoginForm.tsx` defaults to `http://localhost:5000`.

---

## 4. Backend Architecture

### Folder Structure
```
backend/src/
├── index.ts              ← Entry point: loads dotenv, starts HTTP server on PORT
├── app.ts                ← Express app setup (middleware chain, routes, error handler)
├── config/
│   ├── env.ts            ← Zod-validated env schema; exports `env` object
│   └── firebase.ts       ← Firebase Admin SDK init; exports `db` (Firestore) and `auth` (Auth)
├── middleware/
│   ├── authenticate.ts   ← `authenticate` (Bearer JWT check) + `requireRole(...roles)`
│   ├── errorHandler.ts   ← Global error handler (AppError → JSON response)
│   ├── rateLimiter.ts    ← `loginRateLimiter` (by IP+email) + `apiRateLimiter` (global)
│   └── validate.ts       ← Zod schema middleware factory
├── routes/
│   ├── auth.routes.ts        ← /api/auth/login, /refresh, /logout, /me
│   ├── user.routes.ts        ← /api/users CRUD (admin-only except self-read/update)
│   ├── dashboard.routes.ts   ← /api/dashboard/metrics, /revenue, /budget (admin only)
│   ├── project.routes.ts     ← /api/projects CRUD (admin only)
│   ├── obligation.routes.ts  ← /api/obligations CRUD (admin only)
│   ├── event.routes.ts       ← /api/events CRUD (admin only)
│   └── audit.routes.ts       ← /api/audit-log GET (admin only)
├── schemas/
│   ├── auth.schema.ts        ← `loginSchema` (email, password ≥8 chars)
│   ├── user.schema.ts        ← `createUserSchema`, `updateUserSchema`
│   ├── project.schema.ts     ← `createProjectSchema`, `updateProjectSchema`
│   ├── obligation.schema.ts  ← `createObligationSchema`, `updateObligationSchema`
│   └── event.schema.ts       ← `createEventSchema`, `updateEventSchema`
├── services/
│   ├── auth.service.ts       ← `loginUser`, `refreshTokens`, `logoutUser`
│   ├── user.service.ts       ← `createUser`, `listUsers`, `getUserById`, `updateUser`, `deleteUser`
│   ├── dashboard.service.ts  ← `getDashboardMetrics`, `getRevenueData`, `getBudgetData`
│   ├── project.service.ts    ← `listProjects`, `getProjectById`, `createProject`, `updateProject`, `deleteProject`
│   ├── obligation.service.ts ← `listObligations`, `getObligationById`, `createObligation`, `updateObligation`, `deleteObligation`
│   ├── event.service.ts      ← `listEvents`, `getEventById`, `createEvent`, `updateEvent`, `deleteEvent`
│   └── auditLog.service.ts   ← `logAction`, `getRecentActivity`
├── types/
│   ├── index.ts              ← `UserRole`, `UserRecord`, `JwtPayload`, `AuthTokens`
│   └── dashboard.ts          ← All dashboard types (metrics, project, obligation, event, audit log)
└── utils/
    ├── error.ts          ← `AppError` class (statusCode, message, code)
    ├── jwt.ts            ← `signAccessToken`, `signRefreshToken`, `verifyAccessToken`, `verifyRefreshToken`
    └── password.ts       ← `hashPassword`, `comparePassword` (bcrypt, 12 rounds) — utility only
```

### Middleware Chain (in order)
1. **Helmet** — security headers (CSP only in production)
2. **CORS** — allowlist from `ALLOWED_ORIGINS`, `credentials: true`
3. **JSON body parser** — 16kb limit
4. **URL-encoded body parser** — 16kb limit
5. **Cookie parser**
6. **Morgan** — dev-only HTTP logging
7. **API rate limiter** — 120 req/min on all `/api/*`
8. **Routes** — `/api/auth`, `/api/users`, `/api/dashboard`, `/api/projects`, `/api/obligations`, `/api/events`, `/api/audit-log`
9. **Health check** — `GET /health`
10. **404 handler**
11. **Error handler** — must be last

### Authentication Flow

#### Login (`POST /api/auth/login`)
1. `loginRateLimiter` — keyed by `IP::email`, 10 attempts per 15 min window
2. `validate(loginSchema)` — Zod validation on `{ email, password }`
3. `loginUser()` service:
   - Calls Firebase Identity Toolkit REST API (`signInWithPassword`) with email+password → returns Firebase UID
   - Fetches Firestore `users/{uid}` document
   - **Fallback 1**: if not found by UID, queries by `email` field
   - **Fallback 2**: if still not found, auto-provisions from Firebase Auth user (assigns role from `customClaims.role` or defaults to `"admin"`)
   - Checks `active === false` → throws 403 `ACCOUNT_INACTIVE`
   - Signs JWT `accessToken` (15m) + `refreshToken` (7d)
   - Updates `lastLoginAt` in Firestore (non-blocking)
4. Response: `accessToken` in body, `refreshToken` in `httpOnly` cookie (`ks_refresh`)

#### Refresh (`POST /api/auth/refresh`)
- Reads `ks_refresh` cookie
- Verifies refresh token signature
- Re-validates user is still active in Firestore
- Issues new access + refresh token pair (rotation)

#### Logout (`POST /api/auth/logout`)
- Requires valid access token (`authenticate` middleware)
- Clears `ks_refresh` cookie
- `logoutUser()` is a stub (future: token blacklist/whitelist)

#### `GET /api/auth/me`
- Requires valid access token
- Returns user profile from Firestore (uid, email, role, displayName, active, lastLoginAt)

### User Management (`/api/users`)
All routes require `authenticate`. Role enforcement via `requireRole("admin")`.

| Method | Path | Access | Description |
|---|---|---|---|
| POST | `/api/users` | admin | Create employee or client |
| GET | `/api/users` | admin | List all users, optional `?role=employee\|client` |
| GET | `/api/users/:uid` | admin or self | Get single user |
| PATCH | `/api/users/:uid` | admin or self | Update displayName, password, active |
| DELETE | `/api/users/:uid` | admin | Delete from Firestore + Firebase Auth |

#### `createUser` flow:
1. Admin-only gate
2. Email uniqueness check (`auth.getUserByEmail`)
3. `auth.createUser(...)` → Firebase Auth user
4. `auth.setCustomUserClaims(uid, { role })` — sets role in Firebase custom claims
5. Writes `UserRecord` to Firestore `users/{uid}`

### Data Model

#### Firestore `users` collection
```typescript
interface UserRecord {
  uid: string;           // Firebase Auth UID (also the Firestore doc ID)
  email: string;         // lowercase
  role: "admin" | "employee" | "client";
  displayName: string;
  createdBy?: string;    // uid of admin who created this user (not set for super-admin)
  createdAt: Timestamp;
  updatedAt: Timestamp;
  active: boolean;
  lastLoginAt?: Timestamp;
}
```

#### JWT Payload
```typescript
interface JwtPayload {
  uid: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
```

### Cookie Configuration
- **Name**: `ks_refresh`
- **httpOnly**: `true`
- **secure**: `true` in production only
- **sameSite**: `"strict"`
- **maxAge**: 7 days
- **path**: `/api/auth` (limits cookie scope)

### Error Response Format
All errors follow this JSON shape:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message."
  }
}
```
Validation errors also include `details: [{ field, message }]`.

### Success Response Format
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Codes
| Code | HTTP | Meaning |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Zod validation failed |
| `UNAUTHORIZED` | 401 | Missing/invalid access token |
| `INVALID_CREDENTIALS` | 401 | Wrong email or password |
| `NO_REFRESH_TOKEN` | 401 | No refresh cookie on /refresh |
| `REFRESH_TOKEN_INVALID` | 401 | Expired/invalid refresh token |
| `TOKEN_INVALID` | 401 | Access token verification failed |
| `USER_NOT_FOUND` | 401/404 | User not in Firestore |
| `ACCOUNT_INACTIVE` | 403 | User is deactivated |
| `FORBIDDEN` | 403 | Insufficient role |
| `EMAIL_TAKEN` | 409 | Email already in Firebase Auth |
| `OPERATION_NOT_ALLOWED` | 403 | Firebase Email/Password not enabled |
| `INVALID_API_KEY` | 500 | Bad FIREBASE_API_KEY |
| `CONFIG_ERROR` | 500 | FIREBASE_API_KEY missing |
| `INTERNAL_ERROR` | 500 | Unhandled server error |
| `PROJECT_NOT_FOUND` | 404 | Project doc not in Firestore |
| `PROJECT_CODE_TAKEN` | 409 | Duplicate project code |
| `OBLIGATION_NOT_FOUND` | 404 | Obligation doc not in Firestore |
| `EVENT_NOT_FOUND` | 404 | Event doc not in Firestore |
| `NOT_FOUND` | 404 | Route not found |

### Rate Limiting
- **Login**: 10 attempts per 15 min, keyed by `IP::email`
- **Global API**: 120 requests/min per IP on all `/api/*` routes

### Admin Seed Script
```bash
ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=SecurePass1 ts-node scripts/seedAdmin.ts
```
Creates or updates Firebase Auth user and Firestore document with `role: "admin"`.

---

## 5. Frontend Architecture

### Folder Structure
```
frontend/src/
├── middleware.ts                    ← Edge middleware route guard (protects /dashboard routes)
├── app/
│   ├── layout.tsx                   ← Root layout: fonts, MotionProvider, metadata
│   ├── page.tsx                     ← Home page: Nav + all marketing sections + Footer
│   ├── globals.css                  ← CSS custom properties, Tailwind, marquee keyframes
│   ├── (auth)/
│   │   ├── layout.tsx               ← Auth layout (passthrough <>)
│   │   └── login/
│   │       └── page.tsx             ← Login page UI (uses LoginForm component)
│   ├── dashboard/
│   │   ├── page.tsx                 ← Redirects /dashboard → /dashboard/admin
│   │   └── admin/
│   │       └── page.tsx             ← Enterprise OS Admin Dashboard (Financials, Projects, Team, Audit Log)
│   └── services/
│       └── [slug]/
│           └── page.tsx             ← Static service detail pages (generateStaticParams)
├── components/
│   ├── auth/
│   │   └── LoginForm.tsx            ← Login form with Zod validation + fetch to backend
│   ├── brand/
│   │   └── BrandLogo.tsx            ← Reusable brand logo component
│   ├── dashboard/                   ← Enterprise OS Dashboard components
│   │   ├── Sidebar.tsx              ← Collapsible navigation sidebar + user card
│   │   ├── Header.tsx               ← Top bar (search, currency, notifications, profile, logout)
│   │   ├── MetricCards.tsx          ← 6 top financial & team metric summary cards
│   │   ├── RevenueChart.tsx         ← Interactive SVG bezier revenue curve (6M, YTD, 1Y)
│   │   ├── BudgetUtilization.tsx    ← Donut gauge chart + cap breakdown + 3 allocation segments
│   │   ├── RevenueByProject.tsx     ← Top 4 project accounts with visual share bars
│   │   ├── UpcomingObligations.tsx  ← Imminent payouts & disbursements list
│   │   ├── RecentActivity.tsx       ← Live audit log table (actors, actions, timestamps, badges)
│   │   ├── UpcomingEvents.tsx       ← Calendar reviews, client syncs & deadlines
│   │   ├── CreateUserModal.tsx      ← Modal dialog for creating employee/client via POST /api/users
│   │   └── UserManagementView.tsx   ← Live directory view for employees/clients (toggle active, delete)
│   ├── hero/
│   │   ├── Hero.tsx                 ← Hero wrapper (HeroVisualStage + HeroStatement + HeroTicker)
│   │   ├── HeroVisualStage.tsx      ← GSAP animated 8-scene service showcase (~1334 lines)
│   │   ├── HeroStatement.tsx        ← Below-hero statement with animated stat cards
│   │   ├── HeroTicker.tsx           ← Marquee ticker strip
│   │   ├── KeyMotif.tsx             ← Brand key motif SVG
│   │   ├── Nav.tsx                  ← Fixed nav with scroll detection + mobile drawer
│   │   ├── MobileNav.tsx            ← Sheet-based mobile nav (shadcn Sheet) [may be legacy]
│   │   └── Ticker.tsx               ← Reusable ticker/marquee component
│   ├── motion/
│   │   ├── Provider.tsx             ← MotionConfig with reducedMotion="user"
│   │   └── Reveal.tsx               ← Scroll-triggered fade+slide reveal (Motion)
│   ├── sections/
│   │   ├── WhoWeSupport.tsx         ← Section 01: "Who we work with" (4 target groups)
│   │   ├── ServicesSection.tsx      ← Section 02: Services list by category A/B/C
│   │   ├── MarketingBand.tsx        ← Section 03: Marketing principles (dark bg)
│   │   ├── ProcessSection.tsx       ← Section 04: 5-step process with GSAP scrub line
│   │   ├── WhyKeySpex.tsx           ← Section 05: 3 differentiator cards
│   │   ├── PricingNote.tsx          ← Pricing philosophy + CTA
│   │   ├── FAQSection.tsx           ← Section 06: Accordion FAQ (custom, no Radix)
│   │   ├── ContactSection.tsx       ← Section 07: Contact form + info (form is STUB)
│   │   └── Footer.tsx               ← Footer with nav, services list, copyright
│   └── ui/
│       ├── accordion.tsx            ← shadcn Accordion
│       ├── button.tsx               ← shadcn Button
│       ├── input.tsx                ← shadcn Input
│       ├── sheet.tsx                ← shadcn Sheet (mobile nav drawer)
│       └── textarea.tsx             ← shadcn Textarea
├── content/
│   └── site.ts                      ← SINGLE SOURCE OF TRUTH for all site content
├── lib/
│   ├── api.ts                       ← Centralized API client (fetchWithAuth, dashboard & user endpoints)
│   ├── gsap.ts                      ← GSAP + ScrollTrigger + useGSAP registration
│   └── utils.ts                     ← cn() helper (clsx + tailwind-merge)
└── types/
    └── lucide-react.d.ts            ← TypeScript declarations for Lucide icons
```

### Design System / CSS Variables

Defined in `globals.css`:

```css
:root {
  --paper: #f5f2ed;         /* warm off-white — primary background */
  --bg-primary: #f5f2ed;
  --bg-elevated: #e0dbd3;   /* slightly darker surfaces */
  --bg-surface: #ebe7e0;
  --bg-contrast: #1a1a1f;   /* near-black */
  --ink: #1a1a1f;           /* primary text */
  --text-secondary: #5a5a65;/* muted text */
  --text-inverse: #f5f2ed;
  --line: #e0dbd3;          /* borders */
  --brand: #0A5CF0;         /* KeySpex blue — primary accent */
  --brand-bright: #0068FE;
  --brand-ink: #0842B0;     /* hover/active brand */
  --tint: #ebe7e0;          /* subtle bg tint */
  --muted: #5a5a65;
  --radius: 0px;            /* sharp corners everywhere — intentional design choice */
}
```

**Key design decisions:**
- `--radius: 0px` — all UI elements are sharp/rectangular, NO rounded corners (by design)
- Brand color `#0A5CF0` (blue) used as primary accent
- Warm neutral palette (`#f5f2ed`) for backgrounds, not pure white
- `font-mono` text in uppercase tracking — editorial aesthetic
- Space Grotesk for headlines, Inter for body, Geist Mono for labels/eyebrows

### Typography Conventions

| Variable | Font | Used for |
|---|---|---|
| `--font-headline` / `--font-display` | Space Grotesk | H1-H3, brand wordmark |
| `--font-body` | Inter | Body paragraphs |
| `--font-mono` | Geist Mono | Labels, eyebrows, monospace UI text |

### Routing

| Route | Type | Description |
|---|---|---|
| `/` | Server Component | Full marketing landing page |
| `/services/[slug]` | Static (SSG) | Individual service detail pages |
| `/(auth)/login` | Server Component | Login portal page |
| `/dashboard` | Server Component | Redirects directly to `/dashboard/admin` |
| `/dashboard/admin` | Client Component | Enterprise OS Admin Dashboard (Financials, Projects, Team directory, Audit Log) |
| `/dashboard/employee` | NOT YET BUILT | Planned employee dashboard |
| `/dashboard/client` | NOT YET BUILT | Planned client dashboard |

Service slugs are statically generated via `generateStaticParams()` from `site.services`.

### Admin Dashboard Architecture (`/dashboard/admin`)

The Admin Dashboard provides an executive command center ("Enterprise OS") designed for financial oversight, project tracking, and team administration. All panels are wired directly to the backend REST API via `frontend/src/lib/api.ts` with transparent authentication (`Authorization: Bearer <token>`) and automatic fallback to demo data if the API is offline:

1. **Header & Navigation**:
   - Collapsible sidebar (`Sidebar.tsx`) with category groupings (Overview, Financial Management, People Management, Project Management, Operations, Insights).
   - Sticky top bar (`Header.tsx`) with breadcrumbs, interactive global search (`⌘K`), currency switcher (`INR ₹`, `USD $`, `EUR €`), notifications drawer, help modal, and user profile with instant signout.
2. **Key Metric Cards (`MetricCards.tsx`)**:
   - Live connected to `GET /api/dashboard/metrics`.
   - 6 summary cards: Total Revenue, Outstanding, Total Budget, Salary Payable, Active Projects, and Total Employees.
3. **Revenue Trajectory Chart (`RevenueChart.tsx`)**:
   - Live connected to `GET /api/dashboard/revenue?period=6M|YTD|1Y`.
   - SVG cubic bezier area curve with gradient fill and comparison dashed baseline.
   - Interactive timeframe toggle (`6M`, `YTD`, `1Y`) and dynamic hover tooltips.
4. **Budget Utilization (`BudgetUtilization.tsx`)**:
   - Live connected to `GET /api/dashboard/budget`.
   - Circular SVG donut gauge.
   - Fiscal breakdown: Allocated Cap, Committed/Spent, and Remaining Buffer.
   - Allocation segment cards: Operations, Payroll, Infra & SaaS.
5. **Project Realization (`RevenueByProject.tsx`)**:
   - Live connected to `GET /api/projects?top=4`.
   - Top 4 accounts rank list with code identifiers, billings, and percentage progress bars.
6. **Upcoming Obligations (`UpcomingObligations.tsx`)**:
   - Live connected to `GET /api/obligations`.
   - Imminent disbursements (AWS cloud renewal, payroll runs, milestone payments, SaaS tooling) with status badges and calculated pipeline total.
7. **Audit Log & Schedule**:
   - `RecentActivity.tsx`: Live connected to `GET /api/audit-log?limit=10` (actors, actions, relative timestamps, and badges).
   - `UpcomingEvents.tsx`: Live connected to `GET /api/events?upcoming=true` (review meetings, payroll reconciliation, budget reviews, and client syncs).
8. **Live User Directory & Creation**:
   - Clicking `Employees` or `Clients` in the sidebar renders `UserManagementView.tsx`, fetching real accounts from `GET /api/users?role=...`.
   - Allows toggling account status (`active: boolean`) via `PATCH /api/users/:uid` and deleting accounts via `DELETE /api/users/:uid`.
   - `+ Create New` button opens `CreateUserModal.tsx`, validating and dispatching to `POST /api/users`.
9. **Financial Export**:
   - "Export Report" button generates and downloads a clean CSV summary of current financial performance and project shares.

### Content Layer (`src/content/site.ts`)

This is the **single source of truth** for all site content. Any AI making changes to copy, services, or data should edit this file.

#### Services (8 total)

| # | Slug | Category | Title |
|---|---|---|---|
| 01 | `business-portfolio-website` | A | Business Portfolio Website |
| 02 | `business-dashboard` | A | Business Dashboard |
| 03 | `store-management-system` | A | Store Management System |
| 04 | `google-business-seo` | B | Google Business SEO |
| 05 | `social-media-marketing` | B | Social Media Marketing |
| 06 | `social-media-campaigns` | B | Social Media Campaigns |
| 07 | `graphic-designing` | C | Graphic Designing |
| 08 | `video-editing` | C | Video Editing |

#### Service Categories
- **A** — Website & Business Solutions
- **B** — Digital Visibility & Marketing
- **C** — Creative & Content

#### `ServiceItem` interface
```typescript
interface ServiceItem {
  slug: string;
  n: string;           // "01" - "08"
  cat: "A" | "B" | "C";
  title: string;
  forWho: string;      // Target audience description
  blurb: string;       // Service description
  points: string[];    // Key deliverables
  benefit: string;     // Primary business benefit (1 line)
  cta: string;         // CTA question for sidebar card
  note?: string;       // Optional short note (store management only)
  subnote?: string;    // Extended note
  flow?: string[];     // Campaign flow steps (social campaigns only)
}
```

#### Nav Links
```typescript
[
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How we work", href: "/#process" },
  { label: "Why KeySpex", href: "/#why" },
  { label: "FAQ", href: "/#faq" },
]
```

### Home Page Section Order

| Section ID | Component | Description |
|---|---|---|
| (hero) | `<Hero>` | GSAP-animated 8-scene full-height showcase |
| (hero statement) | `<HeroStatement>` | 2-col layout with stats and service pills |
| `#about` | `<WhoWeSupport>` | 4 target business types grid |
| `#services` | `<ServicesSection>` | 3 category groups with service rows |
| (marketing band) | `<MarketingBand>` | Dark section: 3 marketing principles |
| `#process` | `<ProcessSection>` | 5-step process with GSAP scroll scrub |
| `#why` | `<WhyKeySpex>` | 3 differentiators |
| (pricing) | `<PricingNote>` | Pricing philosophy + consultation CTA |
| `#faq` | `<FAQSection>` | 5 accordion FAQ items |
| `#contact` | `<ContactSection>` | Contact form + direct contact info |
| (footer) | `<Footer>` | 3-col footer |

### Hero Visual Stage (`HeroVisualStage.tsx`)

This is the most complex component (~1334 lines). Key details:

- Full-viewport-height dark section (`bg-[#0a0a0f]`)
- 8 animated "scenes" (one per service), each in an absolutely-positioned `div#sc1` through `div#sc8`
- Uses **GSAP master timeline** that loops infinitely with scene transitions
- Transitions: alternating horizontal/vertical clip-path wipes (0.24s — intentionally ultra-fast snap)
- Each scene is ~3.2s dwell + 2.2s reading time
- Controls: HUD tab bar at top, keyboard (←/→/Space), mobile touch swipe
- Respects `prefers-reduced-motion` — detected client-side to avoid SSR mismatch
- Auto-pauses when tab is hidden (Page Visibility API) and when scrolled off screen (IntersectionObserver)

Scene backgrounds alternate:
- Scenes 1,3,6,8: dark (`#0a0a0f`, `#0e131d`)
- Scenes 2,5,7: light (`#f8f9fc`, `#fafaf8`)
- Scene 4: dark gradient

### Authentication (Frontend)

**`LoginForm.tsx`** (`"use client"` component):
1. Client-side Zod validation (mirrors backend schema)
2. `fetch()` to `NEXT_PUBLIC_API_URL/api/auth/login` with `credentials: "include"` (sends/receives cookies)
3. On success:
   - Stores `accessToken` in `sessionStorage` as `ks_access_token`
   - Stores user object in `sessionStorage` as `ks_user`
   - Redirects based on role:
     - `admin` → `/dashboard/admin`
     - `employee` → `/dashboard/employee`
     - `client` → `/dashboard/client`
4. These dashboard routes **do not exist yet** — they need to be built

**Important**: The `sessionStorage`-based token storage is intentionally simple. The access token is short-lived (15m). The `httpOnly` refresh cookie handles silent renewal (but no auto-refresh logic is built on the frontend yet).

### Navigation (`Nav.tsx`)

- Fixed position, `z-50`
- **On hero** (`pathname === "/" && !scrolled`): shows full white logo image (`/brand/black.png`)
- **After scroll** (`scrolled > 20px`): shows icon + wordmark text lockup, adds `backdrop-blur` + border
- Mobile: inline hamburger that transforms to X, shows fullscreen drawer with large nav links

### Motion System

- **`<Reveal>`** — wraps any content in `motion.div` for scroll-triggered `opacity+y` fade-in (uses `whileInView`, `once: true`)
- **`<MotionProvider>`** — wraps everything in `MotionConfig reducedMotion="user"` to auto-disable animations for users with reduced-motion preference
- **GSAP** — used for complex timeline animations (`HeroVisualStage`, `ProcessSection` scrub line)
- `src/lib/gsap.ts` registers `ScrollTrigger` and `useGSAP` once globally

### Contact Form (STUB)

The `ContactSection.tsx` contact form currently:
- Collects: name, email, phone, service selection, message
- **Does NOT send data anywhere** — `handleSubmit` just simulates a 800ms delay and shows success state
- Contact info (`hello@keyspex.com`, `+91 98765 43210`) has `// TODO: confirm` markers
- **Needs backend integration** to actually submit inquiries

### Service Detail Pages

`/services/[slug]/page.tsx` — Server Component (SSG):
- Statically generated for all 8 service slugs
- Sections: breadcrumb, header (title, category, forWho callout), overview blurb, special callouts (store management note, campaign flow), key deliverables list, benefit highlight, sticky CTA sidebar, prev/next service pagination
- CTA in sidebar links to `/?service={slug}#contact` which auto-selects the service in the contact form via `URLSearchParams`

---

## 6. API Reference

### Base URL
- Dev: `http://localhost:5000`
- Prod: (not yet deployed)

### Auth Endpoints

#### `POST /api/auth/login`
**Rate limited** (10/15min per IP+email)

Request:
```json
{ "email": "user@example.com", "password": "Min8chars" }
```
Response (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "<JWT>",
    "expiresIn": 900,
    "user": { "uid": "...", "email": "...", "role": "admin", "displayName": "...", "active": true }
  }
}
```
Side effect: sets `ks_refresh` httpOnly cookie.

#### `POST /api/auth/refresh`
No body required. Reads `ks_refresh` cookie.
Response (200):
```json
{ "success": true, "data": { "accessToken": "<JWT>", "expiresIn": 900 } }
```

#### `POST /api/auth/logout`
Requires: `Authorization: Bearer <accessToken>`
Response (200): `{ "success": true, "message": "Logged out successfully." }`

#### `GET /api/auth/me`
Requires: `Authorization: Bearer <accessToken>`
Response (200):
```json
{
  "success": true,
  "data": { "uid": "...", "email": "...", "role": "...", "displayName": "...", "active": true, "lastLoginAt": "..." }
}
```

### User Endpoints (all require `Authorization: Bearer <accessToken>`)

#### `POST /api/users` (admin only)
```json
{
  "email": "new@example.com",
  "password": "Min8chars1A",
  "displayName": "John Doe",
  "role": "employee"
}
```

#### `GET /api/users` (admin only)
Optional query: `?role=employee` or `?role=client`

#### `GET /api/users/:uid`
Admin: any user. Non-admin: own uid only.

#### `PATCH /api/users/:uid`
```json
{
  "displayName": "New Name",
  "password": "NewPass1A",
  "active": false
}
```

#### `DELETE /api/users/:uid` (admin only)

### Health Check
`GET /health` → `{ "status": "ok", "env": "development" }`

---

### Dashboard Endpoints (all require `Authorization: Bearer <accessToken>` + `admin` role)

#### `GET /api/dashboard/metrics`
Returns aggregated KPI data for all 6 metric cards.
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalRevenue": 845000,
      "outstanding": 175000,
      "outstandingCount": 1,
      "totalBudget": 1200000,
      "budgetUtilizationPercent": 70.4,
      "salaryPayable": 240000,
      "salaryDueDate": "Nov 1",
      "salaryStaffCount": 18,
      "activeProjects": 12,
      "projectsOnTrack": 8,
      "projectsNearDeadline": 2,
      "projectsAtRisk": 2,
      "totalEmployees": 18,
      "activeEmployees": 16,
      "onboardingEmployees": 1
    }
  }
}
```

#### `GET /api/dashboard/revenue?period=6M|YTD|1Y`
Revenue chart data. `period` defaults to `6M`.
```json
{
  "success": true,
  "data": {
    "period": "6M",
    "months": ["May","Jun","Jul","Aug","Sep","Oct"],
    "current": [320000, 380000, 450000, 520000, 600000, 780000],
    "previous": [230000, 260000, 300000, 360000, 400000, 480000]
  }
}
```

#### `GET /api/dashboard/budget`
Budget utilization donut data.
```json
{
  "success": true,
  "data": {
    "budget": {
      "allocatedCap": 1200000,
      "committedSpent": 845000,
      "remainingBuffer": 355000,
      "utilizedPercent": 70.4,
      "segments": [
        { "name": "Operations", "amountInLakhs": 4.2, "percent": 49.7 },
        { "name": "Payroll", "amountInLakhs": 2.8, "percent": 33.1 },
        { "name": "Infra & SaaS", "amountInLakhs": 1.45, "percent": 17.2 }
      ]
    }
  }
}
```

---

### Project Endpoints (all require `admin` role)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/projects` | List all projects (optional `?top=N`) |
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/projects/:id` | Get project by Firestore doc ID |
| `PATCH` | `/api/projects/:id` | Update project fields |
| `DELETE` | `/api/projects/:id` | Delete project |

**`POST /api/projects` body:**
```json
{
  "code": "PRJ-3005",
  "title": "New Project",
  "clientId": "CLI-2001",
  "clientName": "Apex Global",
  "amount": 150000,
  "sharePercent": 10.0,
  "status": "on-track",
  "startDate": "2024-11-01",
  "endDate": "2025-06-30"
}
```
`status` values: `"on-track" | "near-deadline" | "at-risk" | "completed" | "paused"`

---

### Obligation Endpoints (all require `admin` role)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/obligations` | List obligations (optional `?next14days=true`) |
| `POST` | `/api/obligations` | Create obligation |
| `GET` | `/api/obligations/:id` | Get single obligation |
| `PATCH` | `/api/obligations/:id` | Update obligation |
| `DELETE` | `/api/obligations/:id` | Delete obligation |

**`POST /api/obligations` body:**
```json
{
  "dueDate": "2024-11-15",
  "title": "November Payroll Run",
  "account": "Core Team (18 Staff) • Auto-ACH",
  "amount": 240000,
  "status": "scheduled"
}
```
`status` values: `"overdue" | "scheduled" | "pending-auth" | "paid"`

---

### Event Endpoints (all require `admin` role)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/events` | List events (optional `?upcoming=false` to include past) |
| `POST` | `/api/events` | Create event |
| `GET` | `/api/events/:id` | Get single event |
| `PATCH` | `/api/events/:id` | Update event |
| `DELETE` | `/api/events/:id` | Delete event |

**`POST /api/events` body:**
```json
{
  "date": "2024-11-10",
  "title": "Q4 Strategy Review",
  "time": "03:00 PM",
  "context": "Leadership Council Room",
  "tag": "Financial"
}
```
`tag` values: `"Project Deadline" | "Operations" | "Financial" | "Client Meeting" | "HR" | "Review"`

---

### Audit Log Endpoint (requires `admin` role)

#### `GET /api/audit-log?limit=10`
Returns `limit` most recent entries (max 100).
```json
{
  "success": true,
  "data": {
    "entries": [
      {
        "id": "log-001",
        "actor": { "uid": "admin-001", "name": "Alex Rivera", "role": "admin", "initials": "AR" },
        "action": "Created Contract CON-5001",
        "target": "Apex Global (CLI-2001)",
        "time": { "_seconds": 1730102400, "_nanoseconds": 0 },
        "status": "Completed"
      }
    ]
  }
}
```
`status` values: `"Completed" | "Verified" | "Reconciled" | "Updated" | "Failed" | "Pending"`

---

## 7. User Roles & Permissions

| Role | Can Create Users | Can List All Users | Can Read Any User | Can Update Any User | Can Delete Users |
|---|---|---|---|---|---|
| `admin` | Yes | Yes | Yes | Yes (incl. active flag) | Yes |
| `employee` | No | No | Own only | Own profile only | No |
| `client` | No | No | Own only | Own profile only | No |

**Important**: Admins **cannot create other admins** via the API — `createUserSchema` only allows `role: "employee" | "client"`. Admins must be created via the `seedAdmin.ts` script.

---

## 8. Known TODOs & Incomplete Work

### Critical / Must-Do
1. **Dashboard pages status** — `/dashboard/admin` is fully implemented and end-to-end bound to the backend REST API (`/api/dashboard/metrics`, `/api/dashboard/revenue`, `/api/dashboard/budget`, `/api/projects`, `/api/obligations`, `/api/events`, `/api/audit-log`, and `/api/users`). `/dashboard/employee` and `/dashboard/client` remain to be built.
2. **Contact form is a stub** — `ContactSection.tsx` `handleSubmit` does not send data anywhere. Needs a backend endpoint + integration.
3. **Contact info placeholders** — `site.contact.email` and `site.contact.phone` have `// TODO: confirm` comments. Real values need to be filled in `src/content/site.ts`.
4. **Token refresh logic** — No automatic token refresh on the frontend. When `accessToken` expires (15m), user gets logged out silently. Needs an API wrapper/interceptor that calls `/api/auth/refresh` automatically.
5. **Logout is not secure** — Backend `logoutUser()` function is a stub. The refresh token cookie is cleared client-side but the refresh token is not invalidated/blacklisted server-side. Same refresh token could potentially be reused.

### Medium Priority
6. **No authentication persistence** — `sessionStorage` clears on tab close. User must re-login every new session.
7. ~~Protected routes~~ *(RESOLVED)*: Implemented two-tier security for `/dashboard` and `/dashboard/admin`:
   - **Tier 1 (Edge Middleware - `frontend/src/middleware.ts`)**: Network-level interceptor. Checks `ks_token` and `ks_role === "admin"` cookies. Unauthorized direct requests are immediately redirected (307) to `/login`.
   - **Tier 2 (Client Component Guard - `page.tsx`)**: Validates `sessionStorage` and actively verifies session with `GET /api/auth/me`. Unauthorized users see a security verification shield before being redirected to `/login`; unauthenticated users never receive or render dashboard data.
8. **Two mobile nav implementations** — `Nav.tsx` has its own inline mobile drawer (currently used). `MobileNav.tsx` uses the Sheet component (may be legacy/unused). Should be consolidated.
9. **`HeroTicker.tsx` and `Ticker.tsx`** — Separate ticker components exist. Relationship and usage should be verified and possibly consolidated.

### Minor / Polish
10. ~~Email validation error key inconsistency~~ *(FIXED)*: `loginSchema` on frontend has been aligned with Zod v4 syntax (`error` and `issues`).
11. `bcryptjs` / `password.ts` utility is in backend but never actually called — Firebase Auth handles passwords. It is available if the team ever moves to self-managed auth.
12. `serviceAccountKey.json` is present in the backend root — ensure this is in `.gitignore` and never committed to public repos.

---

## 9. Development Setup

### Backend
```bash
cd backend
npm install
# Ensure .env is configured (see Section 3)
npm run dev    # ts-node-dev --respawn --transpile-only src/index.ts
```
Server starts on `http://localhost:5000`.

### Frontend
```bash
cd frontend
npm install
# Create .env.local with NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev    # next dev (Turbopack)
```
App starts on `http://localhost:3000`.

### Seed Admin User
```bash
cd backend
ADMIN_EMAIL=admin@keyspex.com ADMIN_PASSWORD=AdminPass1 ts-node scripts/seedAdmin.ts
```

### Build
```bash
# Backend
cd backend && npm run build   # outputs to dist/

# Frontend
cd frontend && npm run build
```

---

## 10. File Naming & Code Conventions

- **Components**: PascalCase (`HeroStatement.tsx`, `LoginForm.tsx`, `Sidebar.tsx`)
- **Page files**: lowercase (`page.tsx`, `layout.tsx`)
- **Config/utils**: camelCase (`env.ts`, `jwt.ts`, `error.ts`)
- **Route files**: kebab-dot (`auth.routes.ts`, `user.routes.ts`)
- **Schema files**: kebab-dot (`auth.schema.ts`, `user.schema.ts`)
- All TypeScript — no `.js` source files
- `"use client"` directive used explicitly on interactive components
- Server Components are the default (no directive needed)
- CSS: Tailwind utility classes primary, `style={{}}` for CSS variable references (`var(--brand)`, etc.)
- **Design system distinction**:
  - **Public Marketing Site**: Brutalist, sharp editorial aesthetic with zero border radius (`--radius: 0px`, `rounded-none`).
  - **Enterprise OS Dashboard**: Modern executive dashboard system using refined border radiuses (`rounded-xl`, `rounded-2xl`, `rounded-full` for status badges), clean soft borders (`#e2e8f0`), and crisp high-contrast cards.

---

## 11. Brand & Visual Identity

- **Brand color**: `#0A5CF0` (blue)
- **Background**: `#f5f2ed` (warm off-white/parchment)
- **Text**: `#1a1a1f` (near-black)
- **Muted text**: `#5a5a65`
- **Border/lines**: `#e0dbd3`
- **Shape**: Sharp, rectangular — zero border radius everywhere
- **Typography style**: Uppercase mono labels with wide letter-spacing, bold/black weight headlines
- **Tagline**: "Custom digital solutions for real businesses"
- **Target market**: India — SMBs, startups, local/offline shops, growing brands
- **Disclaimer** (shown in footer and Why section): *"Outcomes depend on your business, market and agreed scope. KeySpex does not promise specific rankings, enquiry numbers or timelines."*

---

## 12. Firebase Project Details

- **Project ID**: `keyspex-d80e4`
- **Service Account**: `firebase-adminsdk-fbsvc@keyspex-d80e4.iam.gserviceaccount.com`
- **Firebase Auth**: Email/Password provider must be enabled in Firebase Console → Authentication → Sign-in method
- **Firestore**: Used for user profiles in `users` collection, plus `projects`, `obligations`, `events`, `auditLog`, `financials`, and `revenueSnapshots` collections for the Admin Dashboard.
- **Firebase Admin SDK**: Server-side only (backend); never exposed to frontend
- **Frontend Firebase**: Not used — no Firebase client SDK. All Firebase operations go through the backend REST API.

---

## 12b. Firestore Collections Reference

| Collection | Doc ID | Purpose |
|---|---|---|
| `users` | Firebase Auth UID | User profiles (role, active, etc.) |
| `projects` | auto Firestore ID | Project records (code, title, amount, status, etc.) |
| `obligations` | auto Firestore ID | Payment obligations/scheduled disbursements |
| `events` | auto Firestore ID | Calendar events (reviews, syncs, deadlines) |
| `auditLog` | auto Firestore ID | Activity log entries (actor, action, target, status) |
| `financials` | `"current"` | Live financial snapshot (allocatedCap, committedSpent, segments) |
| `revenueSnapshots` | `"YYYY-MM"` | Monthly revenue totals for chart (yearMonth, amount) |

### Seed Script
```bash
cd backend
npx ts-node scripts/seedDashboardData.ts
```
Seeds all dashboard collections with realistic demo data. Safe to run multiple times (skips collections that already have data).

---

## 13. Quick Reference: Where Things Are

| Task | File |
|---|---|
| Change site content (services, FAQ, nav, process) | `frontend/src/content/site.ts` |
| Change CSS tokens / colors / fonts | `frontend/src/app/globals.css` |
| Add a new page | `frontend/src/app/[route]/page.tsx` |
| Modify Admin Dashboard page | `frontend/src/app/dashboard/admin/page.tsx` |
| Modify Dashboard Sidebar / Header | `frontend/src/components/dashboard/Sidebar.tsx`, `Header.tsx` |
| Modify Dashboard Charts & Metrics | `frontend/src/components/dashboard/RevenueChart.tsx`, `MetricCards.tsx`, `BudgetUtilization.tsx` |
| Modify User Management views | `frontend/src/components/dashboard/UserManagementView.tsx`, `CreateUserModal.tsx` |
| Add a new API route | `backend/src/routes/` + `backend/src/services/` |
| Modify dashboard KPI aggregation | `backend/src/services/dashboard.service.ts` |
| Modify project CRUD logic | `backend/src/services/project.service.ts` |
| Modify obligation CRUD logic | `backend/src/services/obligation.service.ts` |
| Modify calendar event CRUD logic | `backend/src/services/event.service.ts` |
| Write an audit log entry | `backend/src/services/auditLog.service.ts` → `logAction(...)` |
| Add new Firestore collection types | `backend/src/types/dashboard.ts` |
| Seed dashboard demo data | `cd backend && npx ts-node scripts/seedDashboardData.ts` |
| Modify JWT behavior | `backend/src/utils/jwt.ts` |
| Add a new Firestore field | `backend/src/types/index.ts` + relevant service |
| Change rate limits | `backend/.env` (env vars) or `backend/src/middleware/rateLimiter.ts` |
| Change token TTLs | `backend/.env` |
| Modify CORS origins | `backend/.env` (`ALLOWED_ORIGINS`) |
| Update the hero animation | `frontend/src/components/hero/HeroVisualStage.tsx` |
| Update the login form | `frontend/src/components/auth/LoginForm.tsx` |
| Update nav links | `frontend/src/content/site.ts` (`navLinks`) |
| Add a new user field | `backend/src/schemas/user.schema.ts` + `backend/src/types/index.ts` + `backend/src/services/user.service.ts` |

