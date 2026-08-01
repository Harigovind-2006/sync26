export interface Author {
  slug: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio?: string;
}

export interface CardItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'AI' | 'Art' | 'News' | 'Technology' | 'Marketing';
  imageUrl: string;
  aspectRatio: 'aspect-[3/4]' | 'aspect-[4/5]' | 'aspect-[1/1]' | 'aspect-[9/16]' | 'aspect-[4/3]';
  publishedAt: string;
  readTime: number;
  author: Author;
  recommended?: boolean;
  payloadId?: string;
  res?: string;
  pixels?: string;
}

export interface AlertItem {
  id: string;
  fileName: string;
  status: 'Flagged' | 'Mitigated' | 'Monitoring';
  modification: string;
  siteDetected: string;
  timestamp: string;
}
