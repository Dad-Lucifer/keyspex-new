import { Router } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { getEmployeeDashboard } from "../services/employee.service";

const router = Router();

// Endpoint for the logged-in employee to get their live dashboard
router.get("/dashboard", authenticate, requireRole("employee", "admin"), async (req, res, next) => {
  try {
    const data = await getEmployeeDashboard(req.user!.uid);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
});

export default router;