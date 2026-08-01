import { Request, Response, NextFunction } from "express";
import { AnalyticsService } from "../services/analytics.service";

export const getUserAnalyticsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = (req.query.userId as string) || "creator-001";
    const data = await AnalyticsService.getUserAnalytics(userId);
    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
