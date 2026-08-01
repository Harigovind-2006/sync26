import { Response, NextFunction } from "express";
import path from "path";
import { PythonService } from "../services/python.service";
import { StorageService } from "../services/storage.service";
import { ImageService } from "../services/image.service";
import { LicenseService } from "../services/license.service";
import { successResponse, errorResponse } from "../utils/response";
import { AuthenticatedRequest } from "../middleware/auth.middleware";

export class WatermarkController {
  static async embed(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json(errorResponse("Uploaded image is required"));
        return;
      }

      const { image_id, payload } = req.body;
      const watermarkPayload = payload || `LENSTRACE:${image_id || Date.now()}:${req.user?.id || "guest"}`;

      const outputFilename = `watermarked-${req.file.filename}`;
      const outputPath = path.join(req.file.destination, outputFilename);

      const pythonResult = await PythonService.embed(
        req.file.path,
        outputPath,
        watermarkPayload
      );

      const watermarkedUrl = await StorageService.uploadWatermarked(outputPath, outputFilename);

      if (image_id) {
        await ImageService.updateWatermarkedUrl(image_id, watermarkedUrl);
      }

      res.status(200).json(
        successResponse(
          {
            watermarked_url: watermarkedUrl,
            payload: watermarkPayload,
            python_result: pythonResult,
          },
          "Invisible DCT Watermark embedded successfully via Python child process"
        )
      );
    } catch (error) {
      next(error);
    }
  }

  static async extract(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json(errorResponse("Suspect image file is required"));
        return;
      }

      const pythonResult = await PythonService.extract(req.file.path);
      const suspectUrl = await StorageService.uploadSuspect(req.file.path, req.file.filename);

      const license = await LicenseService.findByWatermarkPayload(pythonResult.extracted_payload);

      res.status(200).json(
        successResponse(
          {
            suspect_url: suspectUrl,
            extracted_payload: pythonResult.extracted_payload,
            confidence: pythonResult.confidence,
            license_match: license || null,
            owner_info: license ? { buyer_id: license.buyer_id, image_id: license.image_id } : null,
          },
          "Watermark extracted successfully"
        )
      );
    } catch (error) {
      next(error);
    }
  }
}
