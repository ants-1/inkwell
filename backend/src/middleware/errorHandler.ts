import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const err = error?.err || error;
  const isDev = process.env.NODE_ENV === "development";

  // Handle Zod errors
  if (err instanceof ZodError) {
    logger.error({
      type: "ZodError",
      issues: err.issues,
    });

    return res.status(400).json({
      success: false,
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
      ...(isDev ? { stack: err.stack } : {}),
    });
  }

  // Handle other errors
  logger.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
    code: err.code || "INTERNAL_ERROR",
    errors: [],
    ...(isDev ? { stack: err.stack } : {}),
  });
}
