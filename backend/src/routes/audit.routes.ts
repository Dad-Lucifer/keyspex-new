import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { getRecentActivity } from "../services/auditLog.service";

const router = Router();

// All audit-log routes — admin only
router.use(authenticate, requireRole("admin"));

/**
 * GET /api/audit-log
 * Fetch recent activity entries.
 * Optional query: ?limit=N (default 10, max 100)
 */
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rawLimit = Number(req.query.limit ?? 10);
      const limit = isNaN(rawLimit) ? 10 : Math.min(Math.max(1, rawLimit), 100);
      const entries = await getRecentActivity(limit);
      res.status(200).json({ success: true, data: { entries } });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

