import { Response, NextFunction } from "express";
import { ImageService } from "../services/image.service";
import { uploadImageSchema } from "../schemas/image.schema";
import { successResponse, errorResponse } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class ImageController {
  static async upload(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json(errorResponse("Image file is required"));
        return;
      }

      if (!req.user) {
        res.status(401).json(errorResponse("Unauthorized user"));
        return;
      }

      const validated = uploadImageSchema.parse(req.body);
      const image = await ImageService.uploadAndRegisterImage(
        req.user.id,
        validated.title,
        req.file.path,
        req.file.filename
      );

      res.status(201).json(successResponse(image, "Image uploaded and registered on blockchain"));
    } catch (error) {
      next(error);
    }
  }

  static async getAll(_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const images = await ImageService.getAllImages();
      res.status(200).json(successResponse(images));
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = String(req.params.id);
      const image = await ImageService.getImageById(id);
      if (!image) {
        res.status(404).json(errorResponse("Image not found"));
        return;
      }
      res.status(200).json(successResponse(image));
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json(errorResponse("Unauthorized"));
        return;
      }

      const id = String(req.params.id);
      await ImageService.deleteImage(id, req.user.id);
      res.status(200).json(successResponse(null, "Image deleted successfully"));
    } catch (error: any) {
      if (error.message === "Image not found") {
        res.status(404).json(errorResponse(error.message));
        return;
      }
      if (error.message === "Unauthorized to delete this image") {
        res.status(403).json(errorResponse(error.message));
        return;
      }
      if (error.message && error.message.startsWith("Failed to delete image record")) {
        res.status(400).json(errorResponse("Cannot delete image because it has associated records (e.g., active breach alerts or licenses)."));
        return;
      }
      next(error);
    }
  }
}
