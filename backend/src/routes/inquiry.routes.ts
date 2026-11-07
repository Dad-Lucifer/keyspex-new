import { Router } from "express";
import { validate } from "../middleware/validate";
import { inquiryRateLimiter } from "../middleware/rateLimiter";
import { authenticate, requireRole } from "../middleware/authenticate";
import { createInquirySchema } from "../schemas/inquiry.schema";
import { createInquiry, listInquiries } from "../services/inquiry.service";

const router = Router();

// Public: Submit inquiry
router.post(
  "/",
  inquiryRateLimiter,
  validate(createInquirySchema),
  async (req, res, next) => {
    try {
      const record = await createInquiry(req.body);
      res.status(201).json({
        success: true,
        message: "Inquiry received successfully. Our team will contact you shortly.",
        data: { id: record.id },
      });
    } catch (err) {
      next(err);
    }
  }
);

// Admin-only: List inquiries
router.get(
  "/",
  authenticate,
  requireRole("admin"),
  async (req, res, next) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 50;
      const inquiries = await listInquiries(limit);
      res.status(200).json({
        success: true,
        data: { inquiries },
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

