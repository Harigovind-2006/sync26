export interface CreatorAnalyticsPayload {
  creator: {
    name: string;
    email: string;
    plan: string;
    walletAddress: string;
  };
  metrics: {
    totalProtectedAssets: number;
    activeDetectionScans: number;
    blockchainVerificationsOnChain: number;
    totalBreachesDetected: number;
    dmcaNoticesIssued: number;
    quarantinedBlockedImages: number;
    totalRoyaltiesEarnedMatic: number;
    totalRoyaltiesEarnedUsd: number;
  };
  threatLevelDistribution: {
    lowRiskCount: number;
    mediumRiskCount: number;
    highRiskCriticalCount: number;
  };
  scrapingPlatformBreakdown: Array<{
    platform: string;
    breachSharePercentage: number;
    breachesCount: number;
  }>;
  monthlyProtectionTimeline: Array<{
    month: string;
    protectedAssetsCount: number;
    scansExecuted: number;
    breachesIntercepted: number;
  }>;
}

export class AnalyticsService {
  
  static async getUserAnalytics(userId: string = "creator-001"): Promise<CreatorAnalyticsPayload> {
    return {
      creator: {
        name: "Alex Mercer",
        email: "creator@laxmanrekha.ai",
        plan: "Pro Creator Tier",
        walletAddress: "0x71C7976F8942A0011234567890abcdef12345678",
      },
      metrics: {
        totalProtectedAssets: 48,
        activeDetectionScans: 1420,
        blockchainVerificationsOnChain: 48,
        totalBreachesDetected: 12,
        dmcaNoticesIssued: 8,
        quarantinedBlockedImages: 3,
        totalRoyaltiesEarnedMatic: 4250,
        totalRoyaltiesEarnedUsd: 3187.50,
      },
      threatLevelDistribution: {
        lowRiskCount: 6,
        mediumRiskCount: 4,
        highRiskCriticalCount: 2,
      },
      scrapingPlatformBreakdown: [
        { platform: "Instagram / Meta", breachSharePercentage: 42, breachesCount: 5 },
        { platform: "Pinterest Marketplace", breachSharePercentage: 25, breachesCount: 3 },
        { platform: "AI Generative Scrapers", breachSharePercentage: 20, breachesCount: 2 },
        { platform: "Unauthorized Stock Mirror", breachSharePercentage: 13, breachesCount: 2 },
      ],
      monthlyProtectionTimeline: [
        { month: "Mar 2026", protectedAssetsCount: 12, scansExecuted: 320, breachesIntercepted: 1 },
        { month: "Apr 2026", protectedAssetsCount: 20, scansExecuted: 550, breachesIntercepted: 3 },
        { month: "May 2026", protectedAssetsCount: 32, scansExecuted: 890, breachesIntercepted: 2 },
        { month: "Jun 2026", protectedAssetsCount: 40, scansExecuted: 1100, breachesIntercepted: 4 },
        { month: "Jul 2026", protectedAssetsCount: 48, scansExecuted: 1420, breachesIntercepted: 2 },
      ],
    };
  }

}
