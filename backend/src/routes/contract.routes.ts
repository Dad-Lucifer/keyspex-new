import { Router, Request, Response, NextFunction } from "express";
import { authenticate, requireRole } from "../middleware/authenticate";
import { validate } from "../middleware/validate";
import {
  createContractSchema,
  updateContractStatusSchema,
} from "../schemas/contract.schema";
import {
  createContract,
  listContracts,
  getContractById,
  updateContractStatus,
  deleteContract,
} from "../services/contract.service";
import type { ContractStatus } from "../types/contract";

const router = Router();

// All contract routes require authentication
router.use(authenticate);

/**
 * GET /api/contracts
 * Admin can view all contracts or filter by employeeUid/status.
 * Employees can only view their own contracts.
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = req.user!.role;
    const userUid = req.user!.uid;

    let employeeUid = req.query.employeeUid as string | undefined;
    const status = req.query.status as ContractStatus | undefined;

    // Non-admins can only see their own contracts
    if (userRole !== "admin") {
      employeeUid = userUid;
    }

    const contracts = await listContracts(employeeUid, status);
    res.status(200).json({ success: true, data: { contracts } });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/contracts
 * Admin only — create & issue contract to employee.
 */
router.post(
  "/",
  requireRole("admin"),
  validate(createContractSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await createContract(
        req.body,
        req.user!.uid,
        req.user!.email
      );
      res.status(201).json({
        success: true,
        message: `Contract successfully generated and issued to ${contract.employeeName}.`,
        data: { contract },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /api/contracts/:id
 * Admin can view any; employee can only view their own.
 */
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const contract = await getContractById(req.params.id as string);

    if (req.user!.role !== "admin" && contract.employeeUid !== req.user!.uid) {
      res.status(403).json({
        success: false,
        error: { code: "FORBIDDEN", message: "Insufficient permissions." },
      });
      return;
    }

    res.status(200).json({ success: true, data: { contract } });
  } catch (err) {
    next(err);
  }
});

/**
 * PATCH /api/contracts/:id/status
 * Update contract status (admin or the assigned employee signing).
 */
router.patch(
  "/:id/status",
  validate(updateContractStatusSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contract = await getContractById(req.params.id as string);

      if (
        req.user!.role !== "admin" &&
        contract.employeeUid !== req.user!.uid
      ) {
        res.status(403).json({
          success: false,
          error: { code: "FORBIDDEN", message: "Insufficient permissions." },
        });
        return;
      }

      const updated = await updateContractStatus(
        req.params.id as string,
        req.body.status,
        req.user!.uid,
        req.user!.email
      );

      res.status(200).json({
        success: true,
        message: `Contract status updated to ${req.body.status}.`,
        data: { contract: updated },
      });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * DELETE /api/contracts/:id
 * Admin only — delete contract.
 */
router.delete(
  "/:id",
  requireRole("admin"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await deleteContract(
        req.params.id as string,
        req.user!.uid,
        req.user!.email
      );
      res.status(200).json({
        success: true,
        message: "Contract deleted successfully.",
      });
    } catch (err) {
      next(err);
    }
  }
);

export default router;

