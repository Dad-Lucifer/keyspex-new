import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema";
import {
  createTask,
  listTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../services/task.service";
import { AppError } from "../utils/error";

const router = Router();

// All task routes require authentication
router.use(authenticate);

/**
 * GET /api/tasks
 * Admin can view all tasks or filter by status, priority, or assignedTo.
 * Employees can only view tasks assigned to them.
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user!.role;
    const userUid = req.user!.uid;

    let assignedTo = req.query.assignedTo as string | undefined;
    const status = req.query.status as string | undefined;
    const priority = req.query.priority as string | undefined;

    // Non-admin users are restricted to tasks assigned to them
    if (userRole !== "admin") {
      assignedTo = userUid;
    }

    const tasks = await listTasks({ assignedTo, status, priority });
    res.status(200).json({ success: true, data: { tasks } });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/tasks
 * Admin only — create and assign a task to an employee.
 */
router.post(
  "/",
  requireRole("admin"),
  validate(createTaskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await createTask(req.body, {
        uid: req.user!.uid,
        email: req.user!.email,
        role: req.user!.role,
        name: "Admin",
      });

      res.status(201).json({
        success: true,
        message: `Task '${task.title}' assigned to ${task.assignedEmployeeName}.`,
        data: { task },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/tasks/:id
 * Retrieve a specific task by ID.
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await getTaskById(req.params.id as string);

    // Non-admins can only view their own tasks
    if (req.user!.role !== "admin" && task.assignedTo !== req.user!.uid) {
      throw new AppError(403, "You do not have permission to view this task.", "FORBIDDEN");
    }

    res.status(200).json({ success: true, data: { task } });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/tasks/:id
 * Update task details (admin) or status (admin & assigned employee).
 */
router.patch(
  "/:id",
  validate(updateTaskSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const task = await getTaskById(req.params.id as string);

      // Non-admins can only update tasks assigned to them, and can only update status
      if (req.user!.role !== "admin") {
        if (task.assignedTo !== req.user!.uid) {
          throw new AppError(403, "You do not have permission to modify this task.", "FORBIDDEN");
        }
        // Employees can only update status
        const updateKeys = Object.keys(req.body);
        if (updateKeys.some((k) => k !== "status")) {
          throw new AppError(403, "Employees are only permitted to update task status.", "FORBIDDEN");
        }
      }

      const updated = await updateTask(
        req.params.id as string,
        req.body,
        {
          uid: req.user!.uid,
          email: req.user!.email,
          role: req.user!.role,
          name: req.user!.role === "admin" ? "Admin" : task.assignedEmployeeName,
        }
      );

      res.status(200).json({
        success: true,
        message: "Task updated successfully.",
        data: { task: updated },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/tasks/:id
 * Admin only — delete a task.
 */
router.delete(
  "/:id",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteTask(req.params.id as string, {
        uid: req.user!.uid,
        email: req.user!.email,
        role: req.user!.role,
        name: "Admin",
      });

      res.status(200).json({
        success: true,
        message: "Task deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

