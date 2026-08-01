import { Response, NextFunction } from "express";
import { LicenseService } from "../services/license.service";
import { createLicenseSchema } from "../schemas/license.schema";
import { successResponse, errorResponse } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class LicenseController {
  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json(errorResponse("Unauthorized"));
        return;
      }

      const validated = createLicenseSchema.parse(req.body);
      const license = await LicenseService.createLicense(
        req.user.id,
        validated.image_id,
        validated.license_terms
      );

      res.status(201).json(successResponse(license, "License created successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const licenses = await LicenseService.getAllLicenses();
      res.status(200).json(successResponse(licenses));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const license = await LicenseService.getLicenseById(id);
      if (!license) {
        res.status(404).json(errorResponse("License not found"));
        return;
      }
      res.status(200).json(successResponse(license));
    } catch (error) {
      next(error);
    }
  }
}
