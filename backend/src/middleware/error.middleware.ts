import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";
import { errorResponse } from "../utils/response";

export interface CustomError extends Error {
  statusCode?: number;
  status?: number;
}

export const errorMiddleware = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error("Express App Error:", err);

  if (err instanceof ZodError) {
    const formattedErrors = err.errors
      .map((e) => `${e.path.join(".")}: ${e.message}`)
      .join("; ");
    res.status(400).json(errorResponse(`Validation Failed: ${formattedErrors}`));
    return;
  }

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json(errorResponse(message));
};
