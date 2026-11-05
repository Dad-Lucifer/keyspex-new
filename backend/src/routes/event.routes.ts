import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import { createEventSchema, updateEventSchema } from "../schemas/event.schema";
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../services/event.service";

const router = Router();

// All event routes — admin only
router.use(authenticate, requireRole("admin"));

/**
 * GET /api/events
 * List calendar events. Optional query: ?upcoming=true (default: true)
 */
router.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Default to upcoming=true (dashboard only shows future events)
      const upcoming = req.query.upcoming !== "false";
      const events = await listEvents(upcoming);
      res.status(200).json({ success: true, data: { events } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /api/events
 * Create a calendar event.
 */
router.post(
  "/",
  validate(createEventSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await createEvent(req.body, req.user!.uid);
      res.status(201).json({ success: true, data: { event } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/events/:id
 * Fetch a single event.
 */
router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await getEventById(req.params.id as string);
      res.status(200).json({ success: true, data: { event } });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PATCH /api/events/:id
 * Update event fields.
 */
router.patch(
  "/:id",
  validate(updateEventSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await updateEvent(req.params.id as string, req.body);
      res.status(200).json({ success: true, message: "Event updated successfully." });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/events/:id
 * Delete a calendar event.
 */
router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteEvent(req.params.id as string);
      res.status(200).json({ success: true, message: "Event deleted successfully." });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

