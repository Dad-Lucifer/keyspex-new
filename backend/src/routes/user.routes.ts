import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import {
  createUser,
  listUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/user.service";

const router = Router();

// All user routes require authentication
router.use(authenticate);

/**
 * POST /api/users
 * Admin only — create employee or client
 */
router.post(
  "/",
  requireRole("admin"),
  validate(createUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await createUser(req.body, req.user!.uid, req.user!.role);
      res.status(201).json({ success: true, data: { user } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/users
 * Admin only — list all users, optionally filter by ?role=employee|client
 */
router.get(
  "/",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filterRole = req.query.role as string | undefined;
      const users = await listUsers(req.user!.role, filterRole as any);
      res.status(200).json({ success: true, data: { users } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/users/:uid
 * Admin can get any user; others can only get themselves
 */
router.get(
  "/:uid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.params.uid as string;
      if (req.user!.role !== "admin" && req.user!.uid !== uid) {
        res.status(403).json({ success: false, error: { code: "FORBIDDEN", message: "Insufficient permissions." } });
        return;
      }
      const user = await getUserById(uid);
      res.status(200).json({ success: true, data: { user } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/users/:uid
 * Admin can update anyone; users can update themselves
 */
router.patch(
  "/:uid",
  validate(updateUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.params.uid as string;
      await updateUser(uid, req.body, req.user!.uid, req.user!.role);
      res.status(200).json({ success: true, message: "User updated successfully." });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/users/:uid
 * Admin only
 */
router.delete(
  "/:uid",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.params.uid as string;
      await deleteUser(uid, req.user!.role);
      res.status(200).json({ success: true, message: "User deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

