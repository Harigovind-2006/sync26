const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface ApiAssetItem {
  id: string;
  filename: string;
  title: string;
  imageUrl: string;
  status: 'watermarked' | 'pending' | 'alert';
  protectionType: string;
  licensee: string;
  sha256: string;
  blockchainTx: string;
  confidence: number;
  incidentUrl?: string;
  incidentTime?: string;
  verifiedBlock?: string;
}

export interface ApiAnalytics {
  totalProtectedAssets: number;
  activeScansCount: number;
  verificationsOnChain: number;
  totalBreachesDetected: number;
  dmcaNoticesIssued: number;
  quarantinedBlockedImages: number;
  totalRoyaltiesEarnedMatic: number;
  totalRoyaltiesEarnedUsd: number;
}

export interface ApiCoOwner {
  name: string;
  role: string;
  wallet: string;
  share: number;
}

export interface ApiOwnershipRecord {
  assetId: string;
  filename: string;
  leadOwnerWallet: string;
  leadOwnerName: string;
  totalRoyaltiesDistributed: string;
  coOwners: ApiCoOwner[];
  lastBlockchainTx: string;
  updatedAt: string;
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.message || `API Error ${response.status}`);
  }

  const json = await response.json();
  return json.data !== undefined ? json.data : json;
}

// 1. Analytics & Metrics
export async function getDashboardMetrics(): Promise<ApiAnalytics> {
  try {
    const res = await request<{ metrics: ApiAnalytics }>('/analytics/dashboard');
    return res.metrics;
  } catch (err) {
    console.warn('Backend API unavailable, fallback metrics:', err);
    return {
      totalProtectedAssets: 48,
      activeScansCount: 1420,
      verificationsOnChain: 48,
      totalBreachesDetected: 12,
      dmcaNoticesIssued: 8,
      quarantinedBlockedImages: 3,
      totalRoyaltiesEarnedMatic: 4250,
      totalRoyaltiesEarnedUsd: 3187.5,
    };
  }
}

// 2. Images & Assets
export async function getLiveAssets(): Promise<ApiAssetItem[]> {
  try {
    return await request<ApiAssetItem[]>('/images');
  } catch (err) {
    console.warn('Backend API unavailable, fallback live assets:', err);
    return [
      {
        id: 'LT-8849-PX9',
        filename: 'urban_exploration_09.jpg',
        title: 'Urban Exploration Night Cityscape',
        imageUrl: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
        status: 'alert',
        protectionType: 'Hidden DWT Watermark',
        licensee: 'Client X',
        sha256: '7f9c2a8e4b1d0f5c6e8b2a4f6d8c0e2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e',
        blockchainTx: '0x7f...3a89e92bc',
        confidence: 98.4,
        incidentUrl: 'instagram.com/p/CxD9_k...',
        incidentTime: '2 hours ago',
        verifiedBlock: '14,892,102',
      },
      {
        id: 'LT-7712-A01',
        filename: 'sunset_shoot_01.jpg',
        title: 'Sunset Mountain Range',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        status: 'watermarked',
        protectionType: 'DWT Embedded',
        licensee: 'Client A',
        sha256: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
        blockchainTx: '0x3a89f...91bc',
        confidence: 99.1,
        verifiedBlock: '14,890,442',
      },
      {
        id: 'LT-5509-B44',
        filename: 'studio_session_05.jpg',
        title: 'Studio Session B&W Portrait',
        imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        status: 'pending',
        protectionType: 'Not Protected',
        licensee: '-',
        sha256: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
        blockchainTx: '0x1120a...55f2',
        confidence: 0,
        verifiedBlock: '14,888,100',
      },
      {
        id: 'LT-3388-C99',
        filename: 'aerial_series_03.jpg',
        title: 'Aerial City Lights Skyline',
        imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30ac4ce09?auto=format&fit=crop&w=800&q=80',
        status: 'watermarked',
        protectionType: 'Steganographic',
        licensee: 'Agency B',
        sha256: '4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
        blockchainTx: '0x551f0...b23d',
        confidence: 97.8,
        verifiedBlock: '14,885,020',
      },
      {
        id: 'LT-2244-D88',
        filename: 'architecture_raw_11.jpg',
        title: 'Modern Glass Skyscraper Angle',
        imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
        status: 'watermarked',
        protectionType: 'DWT Embedded',
        licensee: 'Unlicensed',
        sha256: '8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d',
        blockchainTx: '0x882b9...11aa',
        confidence: 98.9,
        verifiedBlock: '14,880,991',
      },
      {
        id: 'LT-1100-E55',
        filename: 'portrait_editorial_02.jpg',
        title: 'Editorial Studio Model',
        imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
        status: 'pending',
        protectionType: 'Queued',
        licensee: '-',
        sha256: '2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b',
        blockchainTx: '0x441b2...99ee',
        confidence: 0,
        verifiedBlock: '14,875,400',
      },
    ];
  }
}

// 3. Ownership Ledger & Royalty Splits
export async function getOwnershipLedger(assetId: string): Promise<ApiOwnershipRecord> {
  return await request<ApiOwnershipRecord>(`/ownership/${assetId}`);
}

export async function updateCoOwnerSplits(assetId: string, coOwners: ApiCoOwner[]): Promise<{ record: ApiOwnershipRecord; blockchainTx: string }> {
  return await request<{ record: ApiOwnershipRecord; blockchainTx: string }>('/ownership/co-owners', {
    method: 'POST',
    body: JSON.stringify({ assetId, coOwners }),
  });
}

export async function transferLeadOwnership(
  assetId: string, 
  newOwnerWallet: string, 
  newOwnerName: string, 
  transferReason?: string
): Promise<{ record: ApiOwnershipRecord; blockchainTx: string }> {
  return await request<{ record: ApiOwnershipRecord; blockchainTx: string }>('/ownership/transfer', {
    method: 'POST',
    body: JSON.stringify({ assetId, newOwnerWallet, newOwnerName, transferReason }),
  });
}

export async function executeRoyaltyPayout(assetId: string, amountMatic: number): Promise<{ txHash: string }> {
  return await request<{ txHash: string }>('/ownership/payout', {
    method: 'POST',
    body: JSON.stringify({ assetId, amountMatic }),
  });
}

// 4. DMCA & Image Block Actions
export async function fileDmcaTakedown(imageId: string, suspectUrl?: string): Promise<{ breachId: string; blockchainTx: string }> {
  return await request<{ breachId: string; blockchainTx: string }>('/breaches/report', {
    method: 'POST',
    body: JSON.stringify({ imageId, suspectUrl: suspectUrl || 'https://instagram.com/p/unauthorized' }),
  });
}

export async function blockQuarantineImage(imageId: string, reason: string): Promise<{ blockchainTx: string }> {
  return await request<{ blockchainTx: string }>('/block/image', {
    method: 'POST',
    body: JSON.stringify({ imageId, reason }),
  });
}

// 5. Auth
export async function loginUser(email: string, password: string): Promise<{ token: string; user: any }> {
  return await request<{ token: string; user: any }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export async function signupUser(name: string, email: string, password: string): Promise<{ token: string; user: any }> {
  return await request<{ token: string; user: any }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}
