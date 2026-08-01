import { supabase } from "../config/supabase";
import { BlockchainService } from "./blockchain.service";

export interface CoOwner {
  name: string;
  role: string;
  wallet: string;
  share: number;
}

export interface OwnershipRecord {
  assetId: string;
  filename: string;
  leadOwnerWallet: string;
  leadOwnerName: string;
  totalRoyaltiesDistributed: string;
  coOwners: CoOwner[];
  lastBlockchainTx: string;
  updatedAt: string;
}

// In-Memory store for demonstration & Supabase fallback synchronization
const memoryLedgerStore = new Map<string, OwnershipRecord>([
  [
    "LT-8849-PX9",
    {
      assetId: "LT-8849-PX9",
      filename: "urban_exploration_09.jpg",
      leadOwnerWallet: "0x71C7976F8942A0011234567890abcdef12345678",
      leadOwnerName: "Alex Mercer",
      totalRoyaltiesDistributed: "4250 MATIC",
      coOwners: [
        { name: "Alex Mercer (Primary)", role: "Lead Photographer", wallet: "0x71C7...976F", share: 60 },
        { name: "Apex Media Studio", role: "Production Agency", wallet: "0x882B...11AA", share: 25 },
        { name: "Elena Rostova", role: "Creative Director", wallet: "0x3A89...91BC", share: 15 },
      ],
      lastBlockchainTx: "0x9f8a21c4e7123987bcda10293847561029384756102938475610293847561029",
      updatedAt: new Date().toISOString(),
    },
  ],
]);

export class OwnershipService {
  
  static async getOwnershipLedger(assetId: string): Promise<OwnershipRecord> {
    const record = memoryLedgerStore.get(assetId);
    if (record) {
      return record;
    }

    // Default record fallback
    const fallback: OwnershipRecord = {
      assetId,
      filename: `asset_${assetId.toLowerCase()}.jpg`,
      leadOwnerWallet: "0x71C7976F8942A0011234567890abcdef12345678",
      leadOwnerName: "Alex Mercer",
      totalRoyaltiesDistributed: "1200 MATIC",
      coOwners: [
        { name: "Alex Mercer (Primary)", role: "Lead Photographer", wallet: "0x71C7...976F", share: 100 },
      ],
      lastBlockchainTx: "0x0000000000000000000000000000000000000000000000000000000000000000",
      updatedAt: new Date().toISOString(),
    };

    memoryLedgerStore.set(assetId, fallback);
    return fallback;
  }

  static async updateCoOwners(assetId: string, coOwners: CoOwner[]): Promise<{ record: OwnershipRecord; txHash: string }> {
    const totalShare = coOwners.reduce((sum, item) => sum + item.share, 0);
    if (totalShare > 100) {
      throw new Error(`Total percentage shares (${totalShare}%) exceed maximum allowed limit of 100%.`);
    }

    const currentRecord = await this.getOwnershipLedger(assetId);
    
    // Register updated ledger fingerprint on Polygon Blockchain
    const txHash = await BlockchainService.registerOwnershipTx(
      `OWNERSHIP_LEDGER_UPDATE:${assetId}:${Date.now()}`,
      `CO_OWNERS:${coOwners.length}:${JSON.stringify(coOwners)}`
    );

    const updatedRecord: OwnershipRecord = {
      ...currentRecord,
      coOwners,
      lastBlockchainTx: txHash,
      updatedAt: new Date().toISOString(),
    };

    memoryLedgerStore.set(assetId, updatedRecord);

    return { record: updatedRecord, txHash };
  }

  static async transferOwnership(
    assetId: string, 
    newOwnerWallet: string, 
    newOwnerName: string,
    transferReason?: string
  ): Promise<{ record: OwnershipRecord; txHash: string }> {
    const currentRecord = await this.getOwnershipLedger(assetId);

    // Register ownership transfer transaction on Polygon Amoy Blockchain
    const txHash = await BlockchainService.registerOwnershipTx(
      `OWNERSHIP_TRANSFER:${assetId}:${currentRecord.leadOwnerWallet}`,
      `NEW_OWNER:${newOwnerWallet}:${newOwnerName}:${transferReason || 'Direct Sale'}`
    );

    // Update lead owner & primary co-owner
    const updatedCoOwners = currentRecord.coOwners.map((item, idx) => {
      if (idx === 0) {
        return {
          ...item,
          name: `${newOwnerName} (Primary)`,
          wallet: `${newOwnerWallet.substring(0, 6)}...${newOwnerWallet.substring(newOwnerWallet.length - 4)}`,
        };
      }
      return item;
    });

    const updatedRecord: OwnershipRecord = {
      ...currentRecord,
      leadOwnerWallet: newOwnerWallet,
      leadOwnerName: newOwnerName,
      coOwners: updatedCoOwners,
      lastBlockchainTx: txHash,
      updatedAt: new Date().toISOString(),
    };

    memoryLedgerStore.set(assetId, updatedRecord);

    return { record: updatedRecord, txHash };
  }

  static async executeRoyaltyPayout(assetId: string, amountMatic: number): Promise<{
    assetId: string;
    amountMatic: number;
    splits: Array<{ coOwner: string; wallet: string; share: number; maticReceived: number }>;
    txHash: string;
  }> {
    const record = await this.getOwnershipLedger(assetId);

    const splits = record.coOwners.map((owner) => ({
      coOwner: owner.name,
      wallet: owner.wallet,
      share: owner.share,
      maticReceived: Number(((amountMatic * owner.share) / 100).toFixed(4)),
    }));

    // Register Payout Transaction on Blockchain
    const txHash = await BlockchainService.registerOwnershipTx(
      `ROYALTY_PAYOUT:${assetId}:${amountMatic}MATIC`,
      `SPLITS:${JSON.stringify(splits)}`
    );

    return {
      assetId,
      amountMatic,
      splits,
      txHash,
    };
  }

}
