import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { env } from "./config/env";
import { apiRateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import projectRoutes from "./routes/project.routes";
import obligationRoutes from "./routes/obligation.routes";
import eventRoutes from "./routes/event.routes";
import auditRoutes from "./routes/audit.routes";

// Initialize Firebase (side effect import)
import "./config/firebase";

const app = express();

// ── Security Headers
app.use(
  helmet({
    contentSecurityPolicy: env.NODE_ENV === "production",
    crossOriginEmbedderPolicy: env.NODE_ENV === "production",
  })
);

// ── CORS
const allowedOrigins = env.ALLOWED_ORIGINS.split(",").map((o) => o.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin ${origin} not allowed`));
      }
    },
    credentials: true, // needed for cookies
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));
app.use(cookieParser());

// ── Logging (dev only)
if (env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ── Global rate limiter
app.use("/api", apiRateLimiter);

// ── Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/obligations", obligationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/audit-log", auditRoutes);

// ── Health check
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", env: env.NODE_ENV });
});

// ── 404
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "Route not found." } });
});

// ── Error handler (must be last)
app.use(errorHandler);

export default app;

