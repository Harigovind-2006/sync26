export interface Author {
  slug: string;
  name: string;
  role: string;
  avatarUrl: string;
  bio: string;
  articleCount: number;
  linkedinUrl?: string;
  twitterUrl?: string;
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
  title: string;
  subtitle: string;
  category: 'Art' | 'Technology' | 'Copywriting' | 'AI' | 'Creativity' | 'Marketing';
  author: Author;
  publishedAt: string;
  readTime: number;
  recommended: boolean;
  imageUrl: string;
  sliceCount: number;
  content: ArticleContentBlock[];
}

export const authors: Record<string, Author> = {
  'jan-kudlacek': {
    slug: 'jan-kudlacek',
    name: 'Jan Kudláček',
    role: 'Founder & Editor-in-Chief',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300', // Grey/clean avatar
    bio: 'Jan is a creative mind with a sharp pen and an even sharper strategy. He loves finding new ways to get brands into people\'s heads (and hearts) - whether through content, marketing, or well-aimed sarcasm. When he\'s not creating, you\'ll find him in the mountains, over a good coffee, or plotting his next venture.',
    articleCount: 88,
    linkedinUrl: 'https://linkedin.com/in/kudlacek',
  },
  'anna-dvorakova': {
    slug: 'anna-dvorakova',
    name: 'Anna Dvořáková',
    role: 'AI Research Lead & Writer',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Anna bridges the gap between technical AI systems and human creativity. She writes on machine learning trends, neural generative art, and the future of human-AI collaboration in design agencies.',
    articleCount: 42,
    linkedinUrl: 'https://linkedin.com',
  },
  'michael-green': {
    slug: 'michael-green',
    name: 'Michael Green',
    role: 'Senior Copywriter',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    bio: 'Michael writes copy that converts. With over a decade of experience in copywriting and brand strategy, he helps companies tell stories that resonate and drives engagement through simple, persuasive prose.',
    articleCount: 56,
    twitterUrl: 'https://twitter.com',
  }
};

export const articles: Article[] = [
  {
    slug: 'colours-of-ostrava-2026-steel-rain-and-generational-shift',
    title: 'Colours of Ostrava 2026: Steel, Rain, and a Generational Shift Nobody Talked About Aloud',
    subtitle: 'When headliners steal the show from old-timers and the real action happens in the theater tents, you know something has changed. A comprehensive analysis of this year\'s festival.',
    category: 'Art',
    author: authors['jan-kudlacek'],
    publishedAt: 'July 28, 2026',
    readTime: 8,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 6,
    content: [
      {
        type: 'paragraph',
        text: 'The industrial steel frame of Ostrava\'s Dolní Vítkovice has witnessed many festivals, but 2026 marks a watershed moment. It wasn\'t just the rain that washed away the dust; it was a subtle, unannounced generational shift in the audience and the line-up alike.'
      },
      {
        type: 'heading',
        text: 'The Shift in Headliner Paradigm'
      },
      {
        type: 'paragraph',
        text: 'For years, festivals relied on the classic rock-era legends to pull the crowds. This year, however, the main stages were commanded by new-gen electronic innovators and genre-bending artists who speak a completely different musical language. The audience responded with an intensity that took traditional organizers by surprise.'
      },
      {
        type: 'quote',
        text: 'The music didn\'t just play in the background; it became a communal ritual under the heavy rain, framed by steel and neon lights.'
      },
      {
        type: 'subheading',
        text: 'The Secret Gems in the Theater Tents'
      },
      {
        type: 'paragraph',
        text: 'While the main stage hosted the largest gatherings, the true artistic breakthroughs took place in the smaller, enclosed stages. Immersive theater, live poetry slams, and experimental digital installations provided a conceptual depth that contrasted with the raw energy of the music stages.'
      },
      {
        type: 'list',
        items: [
          'Generational gap: A noticeable pivot toward Gen Z and younger Millennials.',
          'Technological integration: Art installations using real-time AI image projection and bio-metric feedback.',
          'Eco-strategy: Enhanced circular waste systems that actually worked.'
        ]
      },
      {
        type: 'paragraph',
        text: 'Ultimately, Colours of Ostrava 2026 showed that to survive and lead, major festivals must embrace transition, not resist it. The rust of the old machinery looks beautiful, but the new software is what keeps it running.'
      }
    ]
  },
  {
    slug: 'ai-creative-partner-or-efficient-copier',
    title: 'AI: A True Creative Partner or Just an Extremely Fast Copier?',
    subtitle: 'Where is the boundary between genuine innovation and statistical pattern replication? We dive deep into the philosophy of generative art and commercial design.',
    category: 'AI',
    author: authors['anna-dvorakova'],
    publishedAt: 'July 25, 2026',
    readTime: 6,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 5,
    content: [
      {
        type: 'paragraph',
        text: 'The debate around generative AI has moved past basic awe. We are no longer surprised that Midjourney or Stable Diffusion can produce photorealistic images in seconds. The urgent question now is: does it contain a seed of creativity, or is it merely recycling human genius at unprecedented scales?'
      },
      {
        type: 'heading',
        text: 'The Mechanics of Mimicry'
      },
      {
        type: 'paragraph',
        text: 'Large language models and diffusion systems do not "understand" art. They predict pixels and words based on complex multi-dimensional probability distribution. When we call this "creation," we are projecting our own consciousness onto a mathematical system.'
      },
      {
        type: 'quote',
        text: 'Creativity requires intent, vulnerability, and the capacity to fail. AI has none of these, but it is a mirror that reflects ours back at us.'
      },
      {
        type: 'paragraph',
        text: 'Yet, when designers use AI as a sparring partner - prompt-chaining, feeding custom styles, and assembling hybrid composite workflows - the line starts to blur. The machine might not be creative, but the synthesis is undeniably innovative.'
      }
    ]
  },
  {
    slug: 'death-of-corporate-jargon-copywriting-trends',
    title: 'The Slow, Welcome Death of Corporate Jargon in Modern Copywriting',
    subtitle: 'Why "synergy," "cutting-edge," and "hyper-scale" are costing you conversions, and how to write like a real human being in 2026.',
    category: 'Copywriting',
    author: authors['michael-green'],
    publishedAt: 'July 15, 2026',
    readTime: 5,
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 6,
    content: [
      {
        type: 'paragraph',
        text: 'For decades, business writing was hijacked by corporate buzzwords. Startups wanted to be "disruptive," enterprises wanted to drive "digital transformation," and agencies wanted to create "synergy." The result? Massive blocks of text that communicate absolutely nothing.'
      },
      {
        type: 'heading',
        text: 'The Clarity Premium'
      },
      {
        type: 'paragraph',
        text: 'In 2026, clarity is a competitive advantage. Attention spans are shorter than ever, and audiences have a highly tuned detector for corporate puffery. If a user has to translate your homepage header into simple terms to understand what you sell, you\'ve already lost them.'
      },
      {
        type: 'list',
        items: [
          'Say: "We help you build landing pages faster" instead of "We streamline and hyper-scale web deployment infrastructure."',
          'Say: "Simple, easy pricing" instead of "Optimized cost-efficiency monetization structures."',
          'Say: "Talk to us" instead of "Leverage our unified touchpoints for client success."'
        ]
      },
      {
        type: 'paragraph',
        text: 'Write as if you are talking to a colleague over coffee. Leave the buzzwords in the boardroom of 1999.'
      }
    ]
  },
  {
    slug: 'the-anatomy-of-a-stunning-landing-page',
    title: 'The Anatomy of a Stunning Landing Page: Breaking Down Premium Design',
    subtitle: 'How color theory, asymmetric layouts, glassmorphism, and micro-interactions combine to create layouts that command premium rates.',
    category: 'Marketing',
    author: authors['jan-kudlacek'],
    publishedAt: 'June 30, 2026',
    readTime: 10,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1541462608141-2f5203690acf?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 5,
    content: [
      {
        type: 'paragraph',
        text: 'What makes a website feel "premium"? It is rarely one big feature. Instead, it is the accumulation of dozens of tiny details: the speed of a hover effect, the curvature of a border, the choice of font family, and the intentional use of negative space.'
      },
      {
        type: 'heading',
        text: 'Design Principles for High-End Sites'
      },
      {
        type: 'paragraph',
        text: 'Premium design rejects standard templates. Here is the blueprint we use at NEXUSMAG to keep readers engaged and make our layout feel alive:'
      },
      {
        type: 'list',
        items: [
          'Vibrant Accents on Dark Backgrounds: Colors like neon lime or electric blue draw the eye to critical action items without overwhelming the page.',
          'Glassmorphism & Depth: Layering panels with subtle borders, background blur, and soft drop shadows creates a tactile sense of depth.',
          'Micro-Animations: Elements that react when you hover or scroll make the site feel responsive and premium.'
        ]
      },
      {
        type: 'paragraph',
        text: 'By focusing on detail-driven craftsmanship, you transform a generic page into a brand experience.'
      }
    ]
  },
  {
    slug: 'generative-ai-changing-marketing-funnels',
    title: 'How Generative AI is Rewriting the Marketing Funnel from Scratch',
    subtitle: 'From personalized landing pages built on the fly to automated copy optimization, AI is transforming how we acquire customers.',
    category: 'Marketing',
    author: authors['anna-dvorakova'],
    publishedAt: 'June 18, 2026',
    readTime: 7,
    recommended: false,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 6,
    content: [
      {
        type: 'paragraph',
        text: 'Traditional marketing funnels were static. You built an ad, linked it to a landing page, sent a sequence of emails, and hoped for a conversion. Today, generative AI tools allow marketers to personalize every single step of this journey dynamically.'
      },
      {
        type: 'heading',
        text: 'Dynamic Personalization at Scale'
      },
      {
        type: 'paragraph',
        text: 'Imagine a visitor landing on your homepage. In milliseconds, a model reads their referral source, predicts their search intent, and rewrites the hero header to match their industry. The body copy adjusts, the case studies swap out, and the calls-to-action align with their buying stage. This is not science fiction; it is the current standard of high-performing funnels.'
      }
    ]
  },
  {
    slug: 'the-art-of-saying-no-to-bad-clients',
    title: 'The Underappreciated Art of Saying "No" to Bad Clients',
    subtitle: 'How creative agencies and freelancers can save their sanity, improve their work quality, and actually make more money by filter-pricing.',
    category: 'Creativity',
    author: authors['jan-kudlacek'],
    publishedAt: 'May 12, 2026',
    readTime: 9,
    recommended: true,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200&h=800',
    sliceCount: 5,
    content: [
      {
        type: 'paragraph',
        text: 'In the early days of any creative business, you say yes to everyone. You need the money, you need the portfolio, and you need the validation. But as you grow, continuing to say yes to low-budget, high-maintenance clients becomes the single biggest blocker to your success.'
      },
      {
        type: 'heading',
        text: 'The Real Cost of a "Bad" Client'
      },
      {
        type: 'paragraph',
        text: 'A bad client doesn\'t just pay less. They occupy your mind space, drain your energy, delay your timelines, and prevent you from focusing on high-quality work for clients who value your expertise. By saying no to them, you create space to attract the work you actually want to do.'
      }
    ]
  }
];
