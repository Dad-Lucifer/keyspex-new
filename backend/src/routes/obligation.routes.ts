import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createObligationSchema, updateObligationSchema } from "../schemas/obligation.schema";
import {
  listObligations,
  getObligationById,
  createObligation,
  updateObligation,
  deleteObligation,
} from "../services/obligation.service";

const router = Router();

// All obligation routes — admin only
router.use(authenticate, requireRole("admin"));

/**
 * GET /api/obligations
 * List all obligations ordered by dueDate asc.
 * Optional query: ?next14days=true
 */
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const next14days = req.query.next14days === "true";
      const obligations = await listObligations(next14days);
      res.status(200).json({ success: true, data: { obligations } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/obligations
 * Create a new payment obligation.
 */
router.post(
  "/",
  validate(createObligationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const obligation = await createObligation(req.body);
      res.status(201).json({ success: true, data: { obligation } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/obligations/:id
 * Fetch a single obligation.
 */
router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const obligation = await getObligationById(req.params.id as string);
      res.status(200).json({ success: true, data: { obligation } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/obligations/:id
 * Update obligation fields.
 */
router.patch(
  "/:id",
  validate(updateObligationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateObligation(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Obligation updated successfully." });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/obligations/:id
 * Delete an obligation.
 */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteObligation(req.params.id as string);
      res.status(200).json({ success: true, message: "Obligation deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

