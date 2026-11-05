import { Router, Request, Response, NextFunction } from "express";
import { validate } from "../middleware/validate";
import { authenticate } from "../middleware/authenticate";
import { loginRateLimiter } from "../middleware/rateLimiter";
import { loginSchema } from "../schemas/auth.schema";
import {
  loginUser,
  refreshTokens,
  logoutUser,
  REFRESH_COOKIE_NAME,
  COOKIE_OPTIONS,
} from "../services/auth.service";

const router = Router();

/**
 * POST /api/auth/login
 * Rate limited. Returns access token in body, refresh token in httpOnly cookie.
 */
router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await loginUser(req.body);
      res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({
        success: true,
        data: {
          accessToken: result.tokens.accessToken,
          expiresIn: result.tokens.expiresIn,
          user: result.user,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/auth/refresh
 * Uses httpOnly cookie to issue new access + refresh token pair (rotation).
 */
router.post(
  "/refresh",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME];
      const result = await refreshTokens(refreshToken);
      res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, COOKIE_OPTIONS);
      res.status(200).json({
        success: true,
        data: {
          accessToken: result.accessToken,
          expiresIn: result.expiresIn,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/auth/logout
 * Clears the refresh cookie.
 */
router.post(
  "/logout",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await logoutUser(req.user!.uid);
      res.clearCookie(REFRESH_COOKIE_NAME, { path: "/api/auth" });
      res.status(200).json({ success: true, message: "Logged out successfully." });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/auth/me
 * Returns the current authenticated user's profile.
 */
router.get(
  "/me",
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { db } = await import("../config/firebase");
      const doc = await db.collection("users").doc(req.user!.uid).get();
      if (!doc.exists) {
        res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "User not found." } });
        return;
      }
      const data = doc.data();
      res.status(200).json({
        success: true,
        data: {
          uid: data?.uid,
          email: data?.email,
          role: data?.role,
          displayName: data?.displayName,
          active: data?.active,
          lastLoginAt: data?.lastLoginAt,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

