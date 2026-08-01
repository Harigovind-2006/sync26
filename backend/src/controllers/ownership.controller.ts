import { Request, Response, NextFunction } from "express";
import { OwnershipService } from "../services/ownership.service";
import { updateCoOwnersSchema, transferOwnershipSchema, executePayoutSchema } from "../schemas/ownership.schema";

export const getOwnershipLedgerHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assetId = Array.isArray(req.params.assetId) ? req.params.assetId[0] : req.params.assetId;
    const record = await OwnershipService.getOwnershipLedger(assetId);
    res.json({
      success: true,
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCoOwnersHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = updateCoOwnersSchema.parse(req.body);
    const result = await OwnershipService.updateCoOwners(validatedData.assetId, validatedData.coOwners);
    res.json({
      success: true,
      message: "Co-ownership registry updated and broadcasted to Polygon blockchain",
      data: result.record,
      blockchainTx: result.txHash,
    });
  } catch (error) {
    next(error);
  }
};

export const transferOwnershipHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = transferOwnershipSchema.parse(req.body);
    const result = await OwnershipService.transferOwnership(
      validatedData.assetId,
      validatedData.newOwnerWallet,
      validatedData.newOwnerName,
      validatedData.transferReason
    );
    res.json({
      success: true,
      message: "Lead asset ownership successfully transferred and verified on Polygon Amoy blockchain",
      data: result.record,
      blockchainTx: result.txHash,
    });
  } catch (error) {
    next(error);
  }
};

export const executePayoutHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = executePayoutSchema.parse(req.body);
    const result = await OwnershipService.executeRoyaltyPayout(validatedData.assetId, validatedData.amountMatic);
    res.json({
      success: true,
      message: `Automated royalty payout of ${validatedData.amountMatic} MATIC executed across ${result.splits.length} co-owners`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
