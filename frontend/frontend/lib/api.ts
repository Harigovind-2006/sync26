import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Axios Instance Configured for CORS API Connections
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Auto-attach JWT token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('lr_token');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

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

export interface ApiBreachReport {
  id: string;
  image_id: string;
  license_id?: string;
  suspect_url: string;
  confidence: number;
  blockchain_tx: string;
  created_at?: string;
}

// 1. Analytics & Metrics
export async function getDashboardMetrics(): Promise<ApiAnalytics> {
  const FALLBACK: ApiAnalytics = {
    totalProtectedAssets: 0,
    activeScansCount: 0,
    verificationsOnChain: 0,
    totalBreachesDetected: 0,
    dmcaNoticesIssued: 0,
    quarantinedBlockedImages: 0,
    totalRoyaltiesEarnedMatic: 0,
    totalRoyaltiesEarnedUsd: 0,
  };
  try {
    const res = await apiClient.get<{ success: boolean; data: any }>('/analytics/dashboard');
    const raw = res.data?.data;
    if (!raw) return FALLBACK;

    // Backend returns { creator, metrics, threatLevelDistribution, ... }
    const m = raw.metrics ?? raw;
    return {
      totalProtectedAssets: m?.totalProtectedAssets ?? m?.total_protected_assets ?? 0,
      activeScansCount: m?.activeDetectionScans ?? m?.activeScansCount ?? m?.active_scans_count ?? 0,
      verificationsOnChain: m?.blockchainVerificationsOnChain ?? m?.verificationsOnChain ?? 0,
      totalBreachesDetected: m?.totalBreachesDetected ?? m?.total_breaches_detected ?? 0,
      dmcaNoticesIssued: m?.dmcaNoticesIssued ?? m?.dmca_notices_issued ?? 0,
      quarantinedBlockedImages: m?.quarantinedBlockedImages ?? m?.quarantined_blocked_images ?? 0,
      totalRoyaltiesEarnedMatic: m?.totalRoyaltiesEarnedMatic ?? m?.total_royalties_earned_matic ?? 0,
      totalRoyaltiesEarnedUsd: m?.totalRoyaltiesEarnedUsd ?? m?.total_royalties_earned_usd ?? 0,
    };
  } catch (err) {
    console.warn('Backend API unavailable, using zero metrics:', err);
    return FALLBACK;
  }
}

export async function getLiveAssets(): Promise<ApiAssetItem[]> {
  try {
    const res = await apiClient.get<{ success: boolean; data: any[] }>('/images');
    
    // Map backend ImageModel to frontend ApiAssetItem
    return res.data.data.map((item) => ({
      id: item.id,
      filename: item.filename,
      title: item.filename, // Using filename as title since title was removed from DB
      imageUrl: item.original_url,
      status: item.status || 'pending',
      protectionType: 'DCT Watermark', // Hardcoded as DB doesn't have it
      licensee: 'Client A', // Mock since no license table join yet
      sha256: item.sha256,
      blockchainTx: item.blockchain_tx,
      confidence: 99.4, // Hardcoded fallback
      verifiedBlock: '14,892,400', // Mock block height
    }));
  } catch (err) {
    console.warn('Backend API unavailable, returning empty live assets:', err);
    return [];
  }
}

// 3. Ownership Ledger & Royalty Splits
export async function getOwnershipLedger(assetId: string): Promise<ApiOwnershipRecord> {
  const res = await apiClient.get<{ success: boolean; data: ApiOwnershipRecord }>(`/ownership/${assetId}`);
  return res.data.data;
}

export async function updateCoOwnerSplits(assetId: string, coOwners: ApiCoOwner[]): Promise<{ record: ApiOwnershipRecord; blockchainTx: string }> {
  const res = await apiClient.post<{ success: boolean; data: ApiOwnershipRecord; blockchainTx: string }>('/ownership/co-owners', {
    assetId,
    coOwners,
  });
  return { record: res.data.data, blockchainTx: res.data.blockchainTx };
}

export async function transferLeadOwnership(
  assetId: string,
  newLeadWallet: string,
  transferReason: string
): Promise<{ record: ApiOwnershipRecord; blockchainTx: string }> {
  const res = await apiClient.post<{ success: boolean; data: ApiOwnershipRecord; blockchainTx: string }>('/ownership/transfer', {
    assetId,
    newLeadWallet,
    transferReason,
  });
  return { record: res.data.data, blockchainTx: res.data.blockchainTx };
}

export async function uploadImage(file: File, title: string): Promise<ApiAssetItem> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('title', title);
  
  const res = await apiClient.post<{ success: boolean; data: any }>('/images/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  const item = res.data.data;
  return {
    id: item.id,
    filename: item.filename,
    title: item.filename,
    imageUrl: item.original_url,
    status: item.status || 'watermarked',
    protectionType: 'DCT Embedded',
    licensee: 'Client A',
    sha256: item.sha256,
    blockchainTx: item.blockchain_tx,
    confidence: 99.4,
    verifiedBlock: '14,892,400',
  };
}

export async function executeRoyaltyPayout(assetId: string, amountMatic: number): Promise<{ txHash: string }> {
  const res = await apiClient.post<{ success: boolean; data: { txHash: string } }>('/ownership/payout', {
    assetId,
    amountMatic,
  });
  return res.data.data;
}

// 4. DMCA & Image Block Actions
export async function fileDmcaTakedown(imageId: string, suspectUrl?: string): Promise<{ breachId: string; blockchainTx: string }> {
  const res = await apiClient.post<{ success: boolean; data: { breachId: string; blockchainTx: string } }>('/breaches/report', {
    imageId,
    suspect_url: suspectUrl || 'https://instagram.com/p/unauthorized',
  });
  return res.data.data;
}

export async function getLiveBreaches(): Promise<ApiBreachReport[]> {
  try {
    const res = await apiClient.get<{ success: boolean; data: ApiBreachReport[] }>('/breaches');
    return res.data.data;
  } catch (err) {
    console.warn('Backend API unavailable for breaches:', err);
    return [];
  }
}

export async function blockQuarantineImage(imageId: string, reason: string): Promise<{ blockchainTx: string }> {
  const res = await apiClient.post<{ success: boolean; data: { blockchainTx: string } }>('/block/image', {
    imageId,
    reason,
  });
  return res.data.data;
}

// 5. Licenses
export interface ApiLicenseItem {
  id: string;
  image_id?: string;
  imageTitle?: string;
  buyer_wallet?: string;
  license_terms?: string;
  type?: 'Commercial' | 'Personal' | 'Exclusive';
  price?: string;
  status?: 'active' | 'expired' | 'revoked';
  watermark_payload?: string;
  created_at?: string;
}

export async function getLiveLicenses(): Promise<ApiLicenseItem[]> {
  try {
    const res = await apiClient.get<{ success: boolean; data: ApiLicenseItem[] }>('/licenses');
    return res.data.data;
  } catch (err) {
    console.warn('Backend API unavailable for licenses:', err);
    return [];
  }
}

export async function issueLicense(payload: {
  imageId: string;
  buyerWallet: string;
  licenseTerms: string;
  type: string;
  price: string;
}): Promise<ApiLicenseItem> {
  const res = await apiClient.post<{ success: boolean; data: ApiLicenseItem }>('/licenses/issue', payload);
  return res.data.data;
}

// 6. Auth
export async function loginUser(email: string, password: string): Promise<{ token: string; user: any }> {
  const res = await apiClient.post<{ success: boolean; data: { token: string; user: any } }>('/auth/login', {
    email,
    password,
  });
  const result = res.data.data;
  // Persist token so all future requests attach it automatically
  if (typeof window !== 'undefined' && result?.token) {
    localStorage.setItem('lr_token', result.token);
    localStorage.setItem('lr_user', JSON.stringify(result.user));
  }
  return result;
}

export async function signupUser(name: string, email: string, password: string): Promise<{ token: string; user: any }> {
  const res = await apiClient.post<{ success: boolean; data: { token: string; user: any } }>('/auth/register', {
    name,
    email,
    password,
  });
  const result = res.data.data;
  if (typeof window !== 'undefined' && result?.token) {
    localStorage.setItem('lr_token', result.token);
    localStorage.setItem('lr_user', JSON.stringify(result.user));
  }
  return result;
}

export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('lr_token');
    localStorage.removeItem('lr_user');
  }
}

export function getStoredUser(): any | null {
  if (typeof window !== 'undefined') {
    const u = localStorage.getItem('lr_user');
    return u && u !== 'undefined' ? JSON.parse(u) : null;
  }
  return null;
}
