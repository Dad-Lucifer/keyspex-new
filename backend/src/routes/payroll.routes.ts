import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createSalaryPaymentSchema } from "../schemas/payroll.schema";
import {
  disburseSalary,
  listSalaries,
  getPayrollSummary,
} from "../services/payroll.service";

const router = Router();

// All payroll routes require admin authentication
router.use(authenticate, requireRole("admin"));

/**
 * POST /api/payroll
 * Disburse and record a salary payment in the `salaries` Firestore collection
 */
router.post(
  "/",
  validate(createSalaryPaymentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminUid = req.user!.uid;
      const adminName = req.user!.email ? req.user!.email.split("@")[0] : "Admin";

      const record = await disburseSalary(req.body, adminUid, adminName);

      res.status(201).json({
        success: true,
        message: `Salary of ₹${record.amount.toLocaleString("en-IN")} successfully disbursed to ${record.employeeName}.`,
        data: { salary: record },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/payroll
 * Fetch salary disbursement history from `salaries` collection
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const salaries = await listSalaries(limit);

    res.status(200).json({
      success: true,
      data: { salaries },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/payroll/summary
 * Fetch summary KPI metrics for payroll
 */
router.get("/summary", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await getPayrollSummary();

    res.status(200).json({
      success: true,
      data: { summary },
    });
  } catch (err) {
    next(err);
  }
});

export default router;
