import { Request, Response, NextFunction } from "express";
import { BlockService } from "../services/block.service";
import { blockImageSchema, unblockImageSchema } from "../schemas/block.schema";

export const blockImageHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = blockImageSchema.parse(req.body);
    const record = await BlockService.blockImage(
      validatedData.imageId,
      validatedData.reason,
      validatedData.notes,
      validatedData.blockScope
    );
    res.json({
      success: true,
      message: `Image ${validatedData.imageId} has been blocked and quarantined on Polygon blockchain`,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const unblockImageHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = unblockImageSchema.parse(req.body);
    const record = await BlockService.unblockImage(validatedData.imageId, validatedData.reason);
    res.json({
      success: true,
      message: `Image ${validatedData.imageId} has been unblocked`,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlockedImagesHandler = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const records = await BlockService.getBlockedImages();
    res.json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlockStatusHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageId = Array.isArray(req.params.imageId) ? req.params.imageId[0] : req.params.imageId;
    const result = await BlockService.getBlockStatus(imageId);
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
