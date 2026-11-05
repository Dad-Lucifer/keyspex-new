import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/error";
import { env } from "../config/env";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.code ?? "ERROR",
        message: err.message,
      },
    });
    return;
  }

  if (env.NODE_ENV === "development") {
    console.error(err);
  }

  res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred.",
    },
  });
}

