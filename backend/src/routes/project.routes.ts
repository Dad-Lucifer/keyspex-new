import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createProjectSchema, updateProjectSchema } from "../schemas/project.schema";
import {
  listProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../services/project.service";

const router = Router();

// All project routes require authentication
router.use(authenticate);

/**
 * GET /api/projects
 * Admin only. Query param: ?top=N to cap results (used by Revenue by Project panel).
 */
router.get(
  "/",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topParam = req.query.top;
      const limit =
        topParam !== undefined && !isNaN(Number(topParam))
          ? Number(topParam)
          : undefined;
      const projects = await listProjects(limit);
      res.status(200).json({ success: true, data: { projects } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/projects
 * Admin only — create project.
 */
router.post(
  "/",
  requireRole("admin"),
  validate(createProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const project = await createProject(
        req.body,
        req.user!.uid,
        req.user!.email // use email as name fallback; display name set by admin separately
      );
      res.status(201).json({ success: true, data: { project } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/projects/:id
 * Admin can view any project; employee/client access restricted (future: by assignment).
 */
router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user!.role !== "admin") {
        res.status(403).json({
          success: false,
          error: { code: "FORBIDDEN", message: "Insufficient permissions." },
        });
        return;
      }
      const project = await getProjectById(req.params.id as string);
      res.status(200).json({ success: true, data: { project } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/projects/:id
 * Admin only — update project.
 */
router.patch(
  "/:id",
  requireRole("admin"),
  validate(updateProjectSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateProject(
        req.params.id as string,
        req.body,
        req.user!.uid,
        req.user!.email
      );
      res.status(200).json({ success: true, message: "Project updated successfully." });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/projects/:id
 * Admin only — delete project.
 */
router.delete(
  "/:id",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteProject(req.params.id as string, req.user!.uid, req.user!.email);
      res.status(200).json({ success: true, message: "Project deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

