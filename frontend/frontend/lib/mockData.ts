import { CardItem, Author, AlertItem } from '../types';

export const mockAuthors: Record<string, Author> = {
  'jan-kudlacek': {
    slug: 'jan-kudlacek',
    name: 'Jan Kudláček',
    role: 'Chief Cryptography Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150',
    bio: 'Jan is a cryptographer specialized in digital steganography and spatial pixel manipulation.',
  },
  'martin-slat': {
    slug: 'martin-slat',
    name: 'Martin Šlat',
    role: 'Head of Crawler Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150',
    bio: 'Martin oversees Pixie\'s globally distributed web crawlers and scraper arrays.',
  }
};

export const mockAlerts: AlertItem[] = [
  {
    id: 'PX-9821',
    fileName: 'campaign_portrait_03.png',
    status: 'Flagged',
    modification: 'AI Face Swap (Deepfake)',
    siteDetected: 'ai-mod-forum.net/thread/284',
    timestamp: '2 mins ago'
  },
  {
    id: 'PX-9818',
    fileName: 'executive_headshot_new.jpg',
    status: 'Mitigated',
    modification: 'Deepfake Context (Visual Edit)',
    siteDetected: 'x-social-feed.com/status/9821',
    timestamp: '14 mins ago'
  },
  {
    id: 'PX-9799',
    fileName: 'nature_gallery_highland.jpg',
    status: 'Flagged',
    modification: 'Model Training Crop',
    siteDetected: 'model-dataset-crawler/train-img-3012',
    timestamp: '1 hour ago'
  },
  {
    id: 'PX-9785',
    fileName: 'commercial_illustration_tech.png',
    status: 'Mitigated',
    modification: 'Cropping & Title Removal',
    siteDetected: 'tech-blog-unauthorized.cz/post-82',
    timestamp: '4 hours ago'
  },
  {
    id: 'PX-9742',
    fileName: 'product_render_concept.jpg',
    status: 'Monitoring',
    modification: 'Faceswap AI derivative',
    siteDetected: 'deepfake-hub.org/v/product-leak',
    timestamp: '8 hours ago'
  }
];

export const mockCards: CardItem[] = [
  {
    id: '1',
    slug: 'case-study-deepfake-mitigation-fashion-campaign',
    title: 'Protecting Fashion Billboards Against Face-Swap Models',
    description: 'How Pixie\'s per-pixel steganographic watermarking detected and flagged unauthorized derivative AI models within 4 hours.',
    category: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600&h=800',
    aspectRatio: 'aspect-[3/4]',
    publishedAt: 'August 1, 2026',
    readTime: 6,
    author: mockAuthors['jan-kudlacek'],
    recommended: true,
  },
  {
    id: '2',
    slug: 'case-study-photographer-image-scraping-protection',
    title: 'Securing Photographer Portfolios from Scrapers',
    description: 'Tracing how a landscape gallery was processed by commercial generative AI training databases without licensing permission.',
    category: 'Art',
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=600&h=450',
    aspectRatio: 'aspect-[4/3]',
    publishedAt: 'July 25, 2026',
    readTime: 8,
    author: mockAuthors['martin-slat'],
    recommended: true,
  },
  {
    id: '3',
    slug: 'security-incident-political-disinformation-flagged',
    title: 'Disinformation Edit Flagged in Under Five Minutes',
    description: 'Our crawler network identified a face-swapped variant of an executive headshot used in a viral stock manipulation attempt.',
    category: 'News',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=600&h=600',
    aspectRatio: 'aspect-[1/1]',
    publishedAt: 'July 20, 2026',
    readTime: 5,
    author: mockAuthors['jan-kudlacek'],
  },
  {
    id: '4',
    slug: 'technology-steganography-individual-pixel-watermarks',
    title: 'Steganography vs. Extreme File Compression',
    description: 'Why conventional EXIF filters are scrubbed instantly, and how shifts in color space channels preserve copyright signatures.',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=800',
    aspectRatio: 'aspect-[3/4]',
    publishedAt: 'July 12, 2026',
    readTime: 7,
    author: mockAuthors['jan-kudlacek'],
  },
  {
    id: '5',
    slug: 'crawler-alert-unauthorized-editorial-usage-detected',
    title: 'Corporate Blog Flagged for Crop Copyright Infringement',
    description: 'A tech platform cropped out an artist\'s visual watermark. The underlying pixel signatures remained intact, triggering a billing ticket.',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=600&h=750',
    aspectRatio: 'aspect-[4/5]',
    publishedAt: 'July 2, 2026',
    readTime: 4,
    author: mockAuthors['martin-slat'],
  },
  {
    id: '6',
    slug: 'incident-report-nft-marketplace-clones-mitigated',
    title: 'Tracing Minted Art Clones on Open Ledger Markets',
    description: 'How we helped digital artists trace bulk vector downloads that were minted as unauthorized NFTs on decentralized chains.',
    category: 'Art',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=600&h=450',
    aspectRatio: 'aspect-[4/3]',
    publishedAt: 'June 28, 2026',
    readTime: 6,
    author: mockAuthors['martin-slat'],
  },
  {
    id: '7',
    slug: 'technology-crawler-indexing-speed-milestone',
    title: 'Scaling Our Real-Time Scraper Nodes Globally',
    description: 'Deploying high-frequency visual hash comparators to parse 100M+ web pages daily with latency limits below 150 milliseconds.',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&q=80&w=600&h=600',
    aspectRatio: 'aspect-[1/1]',
    publishedAt: 'June 22, 2026',
    readTime: 5,
    author: mockAuthors['martin-slat'],
  },
  {
    id: '8',
    slug: 'case-study-deepfake-video-detection-synthetic-voices',
    title: 'Mitigating Deepfakes in Enterprise Video Calls',
    description: 'We extended the Pixie pixel validation protocol to frame-level checks, blocking synthetic avatar injections in closed streams.',
    category: 'AI',
    imageUrl: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=600&h=800',
    aspectRatio: 'aspect-[3/4]',
    publishedAt: 'June 15, 2026',
    readTime: 9,
    author: mockAuthors['jan-kudlacek'],
  },
  {
    id: '9',
    slug: 'marketing-rights-compliance-case-audit',
    title: 'Ad Networks and Copyright Audits in the AI Era',
    description: 'Evaluating why publishers need a programmatic verification record to escape secondary infringement liability under new laws.',
    category: 'Marketing',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=450',
    aspectRatio: 'aspect-[4/3]',
    publishedAt: 'June 10, 2026',
    readTime: 5,
    author: mockAuthors['martin-slat'],
  }
];
