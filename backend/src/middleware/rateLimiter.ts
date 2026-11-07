import rateLimit from "express-rate-limit";
import { env } from "../config/env";

export const loginRateLimiter = rateLimit({
  windowMs: Number(env.LOGIN_RATE_LIMIT_WINDOW_MS),
  max: Number(env.LOGIN_RATE_LIMIT_MAX),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "RATE_LIMITED",
      message: "Too many login attempts. Please try again later.",
    },
  },
  // Key by IP + email to allow multiple IPs per account
  keyGenerator: (req) => `${req.ip}::${(req.body?.email ?? "").toLowerCase()}`,
});

export const apiRateLimiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
});

export const inquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "RATE_LIMITED",
      message: "Too many inquiries submitted from this IP. Please try again after 15 minutes.",
    },
  },
});

