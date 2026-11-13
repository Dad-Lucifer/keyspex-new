import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import {
  createPaymentEntrySchema,
  updatePaymentEntrySchema,
} from "../schemas/paymentTimeline.schema";
import {
  listPaymentEntries,
  createPaymentEntry,
  updatePaymentEntry,
  deletePaymentEntry,
  getProjectPaymentSummary,
} from "../services/paymentTimeline.service";

const router = Router();

// All payment timeline routes require authentication
router.use(authenticate);

/**
 * GET /api/payment-timeline/entries
 * Query params: ?projectId=... & ?type=received|invested
 */
router.get("/entries", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = req.query.projectId as string | undefined;
    const type = req.query.type as string | undefined;

    const entries = await listPaymentEntries({ projectId, type });
    res.status(200).json({ success: true, data: { entries } });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/payment-timeline/entries
 * Admin only — create payment entry (received payment from client or invested amount)
 */
router.post(
  "/entries",
  requireRole("admin"),
  validate(createPaymentEntrySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entry = await createPaymentEntry(req.body, {
        uid: req.user!.uid,
        email: req.user!.email,
        role: req.user!.role,
        name: "Admin",
      });

      res.status(201).json({
        success: true,
        message: `Successfully recorded ${entry.type === "received" ? "received payment" : "investment entry"}.`,
        data: { entry },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/payment-timeline/entries/:id
 * Admin only — update entry
 */
router.patch(
  "/entries/:id",
  requireRole("admin"),
  validate(updatePaymentEntrySchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const entry = await updatePaymentEntry(
        req.params.id as string,
        req.body,
        {
          uid: req.user!.uid,
          email: req.user!.email,
          role: req.user!.role,
          name: "Admin",
        }
      );

      res.status(200).json({
        success: true,
        message: "Payment entry updated successfully.",
        data: { entry },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/payment-timeline/entries/:id
 * Admin only — delete entry
 */
router.delete(
  "/entries/:id",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deletePaymentEntry(req.params.id as string, {
        uid: req.user!.uid,
        email: req.user!.email,
        role: req.user!.role,
        name: "Admin",
      });

      res.status(200).json({
        success: true,
        message: "Payment entry deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/payment-timeline/summary/:projectId
 * Get summary breakdown for a specific project
 */
router.get("/summary/:projectId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const summary = await getProjectPaymentSummary(req.params.projectId as string);
    res.status(200).json({ success: true, data: { summary } });
  } catch (err) {
    next(err);
  }
});

export default router;

