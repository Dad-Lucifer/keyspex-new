import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import {
  getDashboardMetrics,
  getRevenueData,
  getBudgetData,
} from "../services/dashboard.service";
import type { RevenuePeriod } from "../types/dashboard";

const router = Router();

// All dashboard routes — admin only
router.use(authenticate, requireRole("admin"));

/**
 * GET /api/dashboard/metrics
 * Aggregate KPI cards data.
 */
router.get(
  "/metrics",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const metrics = await getDashboardMetrics();
      res.status(200).json({ success: true, data: { metrics } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/dashboard/revenue?period=6M|YTD|1Y
 * Revenue chart data for a trailing period.
 */
router.get(
  "/revenue",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ALLOWED: RevenuePeriod[] = ["6M", "YTD", "1Y"];
      const rawPeriod = (req.query.period as string | undefined)?.toUpperCase();
      const period: RevenuePeriod =
        rawPeriod && (ALLOWED as string[]).includes(rawPeriod)
          ? (rawPeriod as RevenuePeriod)
          : "6M";

      const data = await getRevenueData(period);
      res.status(200).json({ success: true, data });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/dashboard/budget
 * Budget utilization breakdown.
 */
router.get(
  "/budget",
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const budget = await getBudgetData();
      res.status(200).json({ success: true, data: { budget } });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

