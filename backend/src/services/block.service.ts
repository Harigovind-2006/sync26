import { BlockchainService } from "./blockchain.service";
import { logger } from "../utils/logger";

export interface BlockedImageRecord {
  imageId: string;
  filename: string;
  status: "BLOCKED" | "QUARANTINED" | "ACTIVE";
  reason: string;
  blockScope: string;
  notes?: string;
  blockedAt: string;
  blockchainTx: string;
}

const blockedImagesStore = new Map<string, BlockedImageRecord>([
  [
    "LT-9921-X01",
    {
      imageId: "LT-9921-X01",
      filename: "suspect_stolen_portrait_09.jpg",
      status: "BLOCKED",
      reason: "Unauthorized AI Scraping",
      blockScope: "Global Crawler Quarantine",
      notes: "Scraped by unauthorized Midjourney fine-tuning crawler bot",
      blockedAt: new Date(Date.now() - 86400000).toISOString(),
      blockchainTx: "0x8f12a99c4b7123987bcda10293847561029384756102938475610293847561029",
    },
  ],
]);

export class BlockService {

  static async blockImage(
    imageId: string, 
    reason: string, 
    notes?: string, 
    blockScope: string = "Global Crawler Quarantine"
  ): Promise<BlockedImageRecord> {
    logger.info(`Initiating block protocol for Image ID ${imageId}. Reason: ${reason}`);

    // Register Block Transaction on Polygon Amoy Blockchain
    const txHash = await BlockchainService.registerOwnershipTx(
      `BLOCK_IMAGE:${imageId}:${Date.now()}`,
      `REASON:${reason}:SCOPE:${blockScope}`
    );

    const record: BlockedImageRecord = {
      imageId,
      filename: `asset_${imageId.toLowerCase()}.jpg`,
      status: "BLOCKED",
      reason,
      blockScope,
      notes: notes || "Quarantined via Laxman Rekha Security Engine",
      blockedAt: new Date().toISOString(),
      blockchainTx: txHash,
    };

    blockedImagesStore.set(imageId, record);
    return record;
  }

  static async unblockImage(imageId: string, reason: string): Promise<BlockedImageRecord> {
    const existing = blockedImagesStore.get(imageId);
    if (!existing) {
      throw new Error(`Blocked record for Image ID ${imageId} not found.`);
    }

    const txHash = await BlockchainService.registerOwnershipTx(
      `UNBLOCK_IMAGE:${imageId}:${Date.now()}`,
      `REASON:${reason}`
    );

    const updatedRecord: BlockedImageRecord = {
      ...existing,
      status: "ACTIVE",
      notes: `Unblocked: ${reason}`,
      blockchainTx: txHash,
    };

    blockedImagesStore.set(imageId, updatedRecord);
    return updatedRecord;
  }

  static async getBlockedImages(): Promise<BlockedImageRecord[]> {
    return Array.from(blockedImagesStore.values());
  }

  static async getBlockStatus(imageId: string): Promise<{ isBlocked: boolean; record: BlockedImageRecord | null }> {
    const record = blockedImagesStore.get(imageId) || null;
    return {
      isBlocked: record?.status === "BLOCKED",
      record,
    };
  }

}
