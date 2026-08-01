export interface Author {
  slug: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  articleCount: number;
}

export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'subheading' | 'quote' | 'image' | 'list';
  text?: string;
  items?: string[];
  url?: string;
  caption?: string;
}

export interface Article {
  slug: string;
  originalSlug: string;
  title: string;
  subtitle: string;
  category: 'AI' | 'Art' | 'News' | 'Technology' | 'Marketing';
  author: Author;
  publishedAt: string;
  readTime: number;
  recommended: boolean;
  imageUrl: string;
  sliceCount: number;
  content: ArticleContentBlock[];
}

export interface LiveAlert {
  id: string;
  fileName: string;
  status: 'Flagged' | 'Mitigated' | 'Monitoring';
  modification: string;
  siteDetected: string;
  timestamp: string;
}

export const authors: Record<string, Author> = {
  'jan-kudlacek': {
    slug: 'jan-kudlacek',
    name: 'Jan Kudláček',
    role: 'Chief Cryptography Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Jan is a cryptographer specialized in digital steganography and spatial pixel manipulation. Before founding Pixie, he spent a decade developing visual anti-piracy algorithms and image metadata protection systems.',
    articleCount: 140,
  },
  'martin-slat': {
    slug: 'martin-slat',
    name: 'Martin Šlat',
    role: 'Head of Crawler Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Martin oversees Pixie\'s globally distributed web crawlers. He specializes in real-time scraping architectures, algorithmic image similarity filters, and automated DMCA/takedown API notifications.',
    articleCount: 78,
  }
};

export const articles: Article[] = [
  {
    slug: 'case-study-deepfake-mitigation-fashion-campaign',
    originalSlug: 'generativni-ai-v-brandingu-5-chyb-kterymi-pohrbis-brand-identitu',
    title: 'Case Study: Protecting a Global Fashion Campaign from Generative Face-swaps',
    subtitle: 'How Pixie\'s per-pixel steganographic watermarking detected and flagged unauthorized derivative AI models within 4 hours of launch.',
    category: 'AI',
    author: authors['jan-kudlacek'],
    publishedAt: 'August 1, 2026',
    readTime: 6,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 5,
    content: [
      {
        type: 'paragraph',
        text: 'A high-end luxury fashion brand launched a global billboard campaign featuring high-definition portrait photography. Within hours of the press release, derivative AI models were uploaded to public platforms, modifying the faces of the models into deepfaked adult content.'
      },
      {
        type: 'heading',
        text: 'The Steganographic Defense'
      },
      {
        type: 'paragraph',
        text: 'Because the original images were processed by Pixie prior to publication, every single pixel carried a cryptographically encoded payload. This watermark is completely invisible to the human eye and resistant to heavy compression, cropping, and rescaling.'
      },
      {
        type: 'quote',
        text: 'Even when the AI redrew the faces, the surrounding hair and clothing pixels retained our signature tags, triggering an immediate notification.'
      },
      {
        type: 'paragraph',
        text: 'Pixie\'s scraping network flagged the modified files on a secondary forum at 04:12 UTC. An automated alert was sent to the brand\'s safety team, including pre-compiled DMCA takedown payloads. Within 2 hours, the deepfaked images were removed from the hosting platform, mitigating brand damage.'
      }
    ]
  },
  {
    slug: 'case-study-photographer-image-scraping-protection',
    originalSlug: 'kid-francescoli-marseillan-jehoz-smycku-znas-i-kdyz-jeho-jmeno-mozna-ne',
    title: 'Case Study: Securing an Independent Photographer Gallery Against AI Training Scrapers',
    subtitle: 'A look at how we helped landscape photographer Anna Dvorakova trace how her copyrighted pictures were scraped and processed by commercial LLM datasets.',
    category: 'Art',
    author: authors['martin-slat'],
    publishedAt: 'July 25, 2026',
    readTime: 8,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 6,
    content: [
      {
        type: 'paragraph',
        text: 'Commercial AI image models require billions of parameters, often sourced by scraping independent artist portfolios. Landscape photographer Anna Dvorakova noticed that generated images on popular platforms bore striking resemblances to her signature style, color palette, and composition.'
      },
      {
        type: 'heading',
        text: 'Tracing the Scraped Pixels'
      },
      {
        type: 'paragraph',
        text: 'Anna integrated Pixie into her online store gallery. Each image was dynamically watermarked at the pixel level. When a new competitor model launched its public beta, Anna ran a set of outputs through Pixie\'s verify console. The system decoded her individual pixel signatures from the outputs, proving they were used as training data.'
      },
      {
        type: 'quote',
        text: 'Standard metadata is wiped in seconds. Cryptographic pixel signatures survive the model training weights, creating undeniable proof of copyright infringement.'
      },
      {
        type: 'paragraph',
        text: 'Equipped with the cryptographic reports generated by Pixie, Anna\'s legal representatives successfully filed a data retrieval request, leading to a commercial settlement and the removal of her assets from the model\'s next training loop.'
      }
    ]
  },
  {
    slug: 'security-incident-political-disinformation-flagged',
    originalSlug: 'colours-of-ostrava-2026-ocel-dest-a-generacni-vymena-kterou-nikdo-nekomentoval-nahlas',
    title: 'Security Briefing: Real-time Alert Flags Political Disinformation Edit',
    subtitle: 'Pixie\'s active crawler network detected a modified, face-swapped version of a client\'s profile picture used in a viral disinformation campaign.',
    category: 'News',
    author: authors['jan-kudlacek'],
    publishedAt: 'July 20, 2026',
    readTime: 5,
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 6,
    content: [
      {
        type: 'paragraph',
        text: 'In July 2026, a high-profile corporate executive\'s headshot was modified using generative AI, making them appear in a simulated scenario designed to create stock price fluctuations. The image quickly began circulating on social channels.'
      },
      {
        type: 'heading',
        text: 'Immediate Attribution'
      },
      {
        type: 'paragraph',
        text: 'Because the executive\'s official headshots were secured using Pixie, our real-time crawlers identified the modified copy. The signature confirmed the source image, and flagged the specific pixels that were edited. A high-priority SMS and email alert was dispatched to the client\'s Security Operations Center, allowing them to issue a correction notice within minutes and notify social network moderators.'
      }
    ]
  },
  {
    slug: 'technology-steganography-individual-pixel-watermarks',
    originalSlug: 'faq-schema-v-roce-2026-google-to-vypnul-a-ai-o-to-nikdy-nestala',
    title: 'Deep Dive: How Steganographic Pixel-level Watermarking Outlasts Compression',
    subtitle: 'Why conventional metadata strips fail, and how embedding cryptographic signatures into low-frequency pixel color spaces protects your ownership.',
    category: 'Technology',
    author: authors['jan-kudlacek'],
    publishedAt: 'July 12, 2026',
    readTime: 7,
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 4,
    content: [
      {
        type: 'paragraph',
        text: 'Most social media sites automatically strip EXIF, IPTC, and standard file metadata to reduce file sizes. This leaves image files completely anonymous and vulnerable to theft. Pixie solves this by weaving the metadata directly into the pixels.'
      },
      {
        type: 'heading',
        text: 'Embedding in the Frequency Domain'
      },
      {
        type: 'paragraph',
        text: 'Pixie converts images into the frequency domain using discrete cosine transforms. By slightly shifting the relationships between specific pixel colors in low-frequency space, we write a multi-bit signature. The shifts are calculated to be below the threshold of human visual perception but highly recognizable to our decoding algorithms.'
      }
    ]
  },
  {
    slug: 'crawler-alert-unauthorized-editorial-usage-detected',
    originalSlug: 'authority-first-marketing-konec-kratkodobych-kampani',
    title: 'Licensing Incident: Corporate Publisher Flagged for Editorial Picture Use',
    subtitle: 'A commercial tech blog copied a watermarked vector illustration, cropped it, and posted it without authorization. Pixie triggered an automatic takedown notice.',
    category: 'Marketing',
    author: authors['martin-slat'],
    publishedAt: 'July 2, 2026',
    readTime: 4,
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 5,
    content: [
      {
        type: 'paragraph',
        text: 'Unintentional copyright infringement is common among online publications. However, corporate publishers have an obligation to verify licenses. Pixie makes tracking unauthorized licensing simple.'
      },
      {
        type: 'heading',
        text: 'Automatic Notification & DMCA Takedown'
      },
      {
        type: 'paragraph',
        text: 'Our active web scraper identified a watermarked image on a high-traffic tech blog. The image was cropped to remove the artist\'s visual signature, but the underlying pixel signatures remained intact. Pixie generated an automatic audit log showing the match, which was delivered to the creator, letting them invoice the publisher directly.'
      }
    ]
  }
];

export const liveAlerts: LiveAlert[] = [
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
