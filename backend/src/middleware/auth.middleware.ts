import { Request, Response, NextFunction } from "express";
import { verifyToken, JwtPayloadCustom } from "../utils/jwt";
import { errorResponse } from "../utils/response";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayloadCustom;
}

export const authenticateJwt = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json(errorResponse("Access denied. No authentication token provided."));
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(errorResponse("Invalid or expired authentication token."));
  }
};
