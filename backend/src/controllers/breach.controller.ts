import { Response, NextFunction } from "express";
import { BreachService } from "../services/breach.service";
import { createBreachReportSchema } from "../schemas/breach.schema";
import { successResponse } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class BreachController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const validated = createBreachReportSchema.parse(req.body);
      const report = await BreachService.createReport(
        validated.imageId,
        validated.suspect_url,
        validated.confidence
      );

      res.status(201).json(successResponse(report, "Breach report filed and recorded on Polygon Amoy blockchain"));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const reports = await BreachService.getAllReports();
      res.status(200).json(successResponse(reports));
    } catch (error) {
      next(error);
    }
  }
}
