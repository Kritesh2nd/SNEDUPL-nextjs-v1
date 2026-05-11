// ============================================================
// SHREE NEW EVEREST DISTILLERY UDHYOG – Default Content
// ============================================================
import type {
  SiteContent,
  Product,
  TimelineEvent,
  LeadershipProfile,
  ContactInfo,
  HeroContent,
  Inquiry,
  AdminProfile,
  AboutContent,
} from "@/types";

export const COMPANY_NAME = "Shree New Everest Distillery Udhyog";
export const COMPANY_SHORT = "Everest Distillery";
export const COMPANY_TAGLINE =
  "Crafted with Precision. Distilled for the World.";

export const DEFAULT_HERO: HeroContent = {
  tagline: "Crafted with Precision. Distilled for the World.",
  subTagline:
    "Nepal's Emerging Premium Spirits House — 15 Years of Distillation Excellence",
  ctaText: "Explore Our Spirits",
};

export const DEFAULT_ABOUT_CONTENT: AboutContent = {
  aboutSummary:
    "Shree New Everest Distillery Udhyog stands at the confluence of Himalayan heritage and world-class distillation. Born in Nepal, crafted for connoisseurs globally, our spirits embody the purity of mountain water, the warmth of aged grain, and the boldness of a nation rising.",
  brandStory:
    "Founded in 2011, Shree New Everest Distillery Udhyog has spent over a decade quietly perfecting its craft in the shadow of the Himalayas. What began as a vision to bring world-class spirits from Nepal has evolved into a portfolio spanning soju, whisky, vodka, and innovative ready-to-drink beverages. Our 85-Kattha facility, established in 2018, represents one of Nepal's most modern distillation complexes — a testament to unwavering commitment to quality, precision, and pride in Nepali craftsmanship.",
};

export const DEFAULT_DISTILLERY_DETAILS = {
  area: "85 Kattha",
  location: "Kohalpur, Banke, Nepal",
  established: 2018,
  columns: 6,
  capacity: "5,000+ cases/month",
  waterSource: "Himalayan Spring Water",
  certifications: [
    "Nepal Bureau of Standards Certified",
    "ISO 9001:2015",
    "FNCCI Member",
  ],
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    name: "SAN SOJU",
    category: "SOJU",
    tagline: "The Spirit of the Himalayas",
    description:
      "SAN SOJU is our flagship offering — a clean, ultra-smooth soju distilled from the finest Himalayan water sources. Light, refreshing, and unmistakably premium, it redefines what Nepal can produce.",
    alcoholPercent: 25,
    origin: "Nepal",
    tasteNotes: [
      { label: "Ultra-Smooth" },
      { label: "Clean Finish" },
      { label: "Subtle Sweetness" },
      { label: "Crisp" },
    ],
    image: "",
    featured: true,
    isUpcoming: false,
  },
  {
    name: "Himalayan Reserve Whisky",
    category: "WHISKY",
    tagline: "Aged in the shadow of the peaks",
    description:
      "A blend aged in toasted oak barrels, carrying the warmth of valley nights and the depth of Himalayan grain. Notes of caramel, smoke, and warm spice make every sip a journey through Nepal's mountains.",
    alcoholPercent: 42.8,
    origin: "Nepal",
    tasteNotes: [
      { label: "Smoky" },
      { label: "Oak" },
      { label: "Warm Spice" },
      { label: "Caramel" },
    ],
    image: "",
    featured: true,
    isUpcoming: false,
  },
  {
    name: "Everest Premium Vodka",
    category: "VODKA",
    tagline: "Five-times distilled purity",
    description:
      "Distilled five times through our proprietary column process using pristine Himalayan spring water. This vodka delivers unparalleled clarity, a silky-smooth mouthfeel, and a perfectly neutral finish.",
    alcoholPercent: 40,
    origin: "Nepal",
    tasteNotes: [
      { label: "Crystal Clear" },
      { label: "Neutral" },
      { label: "Silky" },
      { label: "Clean" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "HERO Apple",
    category: "HERO_SERIES",
    tagline: "Orchard Fresh, Party Ready",
    description:
      "Crisp apple-infused RTD with a refreshing bite and natural sweetness.",
    alcoholPercent: 8,
    origin: "Nepal",
    tasteNotes: [
      { label: "Fresh Apple" },
      { label: "Crisp" },
      { label: "Lively" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
    variants: ["Apple", "Lemon", "Litchi", "Orange", "Jaljira"],
  },
  {
    name: "HERO Lemon",
    category: "HERO_SERIES",
    tagline: "Zesty, Light, Alive",
    description:
      "Tangy lemon RTD with a lively fizz and a clean citrus finish. Perfect chilled.",
    alcoholPercent: 8,
    origin: "Nepal",
    tasteNotes: [{ label: "Citrus" }, { label: "Tart" }, { label: "Bubbly" }],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "HERO Litchi",
    category: "HERO_SERIES",
    tagline: "Tropical Bliss in a Can",
    description:
      "Exotic litchi flavor bursting with tropical floral notes and gentle sweetness.",
    alcoholPercent: 8,
    origin: "Nepal",
    tasteNotes: [
      { label: "Floral" },
      { label: "Sweet" },
      { label: "Tropical" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "HERO Orange",
    category: "HERO_SERIES",
    tagline: "Sunshine in Every Sip",
    description:
      "Vibrant orange RTD with a bold citrus profile and refreshing effervescence.",
    alcoholPercent: 8,
    origin: "Nepal",
    tasteNotes: [
      { label: "Bold Citrus" },
      { label: "Bright" },
      { label: "Tangy" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "HERO Jaljira",
    category: "HERO_SERIES",
    tagline: "A Desi Classic, Reimagined",
    description:
      "Nepal's beloved spiced cumin drink transformed into a sparkling adult beverage with depth.",
    alcoholPercent: 8,
    origin: "Nepal",
    tasteNotes: [
      { label: "Spiced" },
      { label: "Cumin" },
      { label: "Tangy" },
      { label: "Earthy" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Florida Diamond",
    category: "OTHER_DISTILLED",
    tagline: "Bold. Bright. Unapologetic.",
    description:
      "A high-character distilled spirit for those who demand more from every sip. Bold aromatics with a confident finish.",
    alcoholPercent: 38,
    origin: "Nepal",
    tasteNotes: [{ label: "Bold" }, { label: "Spicy" }, { label: "Robust" }],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "South Pole",
    category: "OTHER_DISTILLED",
    tagline: "Ice-cold confidence",
    description:
      "A crisp, ultra-refreshing spirit inspired by polar purity. Served best ice cold.",
    alcoholPercent: 36,
    origin: "Nepal",
    tasteNotes: [{ label: "Icy" }, { label: "Clean" }, { label: "Sharp" }],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Hilsa",
    category: "OTHER_DISTILLED",
    tagline: "Timeless Taste",
    description:
      "Named after the legendary fish of Nepal's rivers, Hilsa is smooth, classic, and deeply familiar.",
    alcoholPercent: 37.5,
    origin: "Nepal",
    tasteNotes: [
      { label: "Smooth" },
      { label: "Traditional" },
      { label: "Mellow" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Pick",
    category: "OTHER_DISTILLED",
    tagline: "Your Pick, Every Time",
    description:
      "A versatile everyday spirit that punches well above its price point. Consistent, approachable, reliable.",
    alcoholPercent: 37.5,
    origin: "Nepal",
    tasteNotes: [
      { label: "Versatile" },
      { label: "Easy" },
      { label: "Approachable" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "SASA",
    category: "OTHER_DISTILLED",
    tagline: "Spirit of the Streets",
    description:
      "SASA captures the energetic pulse of Kathmandu's vibrant nightlife culture. Sharp, lively, electric.",
    alcoholPercent: 40,
    origin: "Nepal",
    tasteNotes: [
      { label: "Lively" },
      { label: "Sharp" },
      { label: "Energetic" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Somrus Gold",
    category: "OTHER_DISTILLED",
    tagline: "A Ceremony in Every Pour",
    description:
      "Somrus Gold is a premium artisan blend with a ceremonial character — rich, layered, and unforgettable. Reserved for moments that matter.",
    alcoholPercent: 42,
    origin: "Nepal",
    tasteNotes: [
      { label: "Rich" },
      { label: "Layered" },
      { label: "Ceremonial" },
      { label: "Warm" },
    ],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Hero Sofi Drinking Water",
    category: "NON_ALCOHOLIC",
    tagline: "Pure. Natural. Himalayan.",
    description:
      "Sourced from pristine Himalayan springs, Hero Sofi is the purest form of hydration — clean, crisp, and naturally mineral-balanced.",
    alcoholPercent: null,
    origin: "Nepal",
    tasteNotes: [{ label: "Pure" }, { label: "Crisp" }, { label: "Himalayan" }],
    image: "",
    featured: false,
    isUpcoming: false,
  },
  {
    name: "Project YETI",
    category: "UPCOMING",
    tagline: "Something legendary is brewing",
    description:
      "An upcoming super-premium aged spirit crafted for the world's most discerning palates. Inspired by the myth of the mountains. Coming 2026.",
    alcoholPercent: null,
    origin: "Nepal",
    tasteNotes: [
      { label: "Mystery" },
      { label: "Premium" },
      { label: "Limited Edition" },
    ],
    image: "",
    featured: false,
    isUpcoming: true,
  },
];

export const DEFAULT_TIMELINE: TimelineEvent[] = [
  {
    year: 2011,
    title: "Company Incorporated",
    description:
      "Shree New Everest Distillery Udhyog was incorporated with a bold vision to create world-class spirits from the heart of Nepal.",
  },
  {
    year: 2015,
    title: "Production Began",
    description:
      "First distillation runs commenced, establishing our core production processes, quality benchmarks, and signature taste profiles.",
  },
  {
    year: 2017,
    title: "Land Acquisition",
    description:
      "Strategic acquisition of 85 Kattha of prime land in Kohalpur, Banke to build Nepal's most advanced private distillery campus.",
  },
  {
    year: 2018,
    title: "Own Facility Established",
    description:
      "State-of-the-art 85 Kattha distillery complex completed in Kohalpur — one of Nepal's largest private spirit manufacturing facilities.",
  },
  {
    year: 2018,
    title: "Launch of 30 Products",
    description:
      "Everest Distillery launched an unprecedented 30 products across multiple spirit categories in a single landmark year.",
  },
  {
    year: 2020,
    title: "SAN SOJU Launch",
    description:
      "The launch of SAN SOJU marked a turning point — Nepal's first premium soju captured the imagination of the market and critics alike.",
  },
  {
    year: 2022,
    title: "50+ Dealer Expansion",
    description:
      "National distribution network expanded to over 50 authorized dealers, covering all major cities and districts across Nepal.",
  },
  {
    year: 2026,
    title: "IPO Expansion Phase",
    description:
      "Entering a bold new chapter with a planned IPO, international market entry across South and Southeast Asia, and facility scale-up.",
  },
];

export const DEFAULT_LEADERSHIP: LeadershipProfile[] = [
  {
    name: "Rabindra Man Shrestha",
    position: "CEO | Managing Director",
    bio: "Rabindra Man Shrestha is the visionary founder and Managing Director of Shree New Everest Distillery Udhyog. With over 20 years of experience in Nepal's beverages industry, he built the company from the ground up with an unwavering belief that Nepal could produce world-class spirits for global markets.",
    image: "",
    boardType: "Board of Directors",
    displayOrder: 1,
    showOnSite: true,
  },
  {
    name: "Shirish Aryal",
    position: "General Manager",
    bio: "Shirish Aryal serves as General Manager overseeing all operational, production, and commercial functions of the distillery. He brings deep expertise in spirits manufacturing and distribution, ensuring Everest Distillery maintains the highest standards across its 30+ product portfolio.",
    image: "",
    boardType: "Management",
    displayOrder: 1,
    showOnSite: true,
  },
  {
    name: "Priya Gurung",
    position: "Non-Executive Director",
    bio: "Priya brings corporate governance expertise and financial acumen, having served on boards of several leading Nepali enterprises. She provides strategic oversight on the company's expansion and investor relations.",
    image: "",
    boardType: "Board of Directors",
    displayOrder: 2,
    showOnSite: true,
  },
  {
    name: "Anil Bajracharya",
    position: "Chief Financial Officer",
    bio: "A chartered accountant with a specialty in emerging market finance, Anil oversees Everest Distillery's financial strategy, audit functions, and pre-IPO investor relations.",
    image: "",
    boardType: "Management",
    displayOrder: 2,
    showOnSite: true,
  },
  {
    name: "Bikash Thapa",
    position: "Head of Production & Quality",
    bio: "Master distiller with expertise in grain spirits and column distillation. Bikash leads the production team and has been instrumental in developing Everest Distillery's signature taste profiles across all 30+ SKUs.",
    image: "",
    boardType: "Management",
    displayOrder: 3,
    showOnSite: true,
  },
];

export const DEFAULT_CONTACT: ContactInfo = {
  factoryAddress: "Kohalpur, Banke, Nepal",
  officeAddress: "Koteshwor, Kathmandu, Nepal",
  phone: "+977 9768534235",
  email: "info.everestdistillery@gmail.com",
  mapEmbedUrl: "",
  socialLinks: {
    facebook: "https://facebook.com/everestdistillery",
    instagram: "https://instagram.com/everestdistillery",
    linkedin: "https://linkedin.com/company/everestdistillery",
  },
};

export const DEFAULT_SITE_CONTENT: SiteContent = {
  heroContent: DEFAULT_HERO,
  products: DEFAULT_PRODUCTS,
  timeline: DEFAULT_TIMELINE,
  leadership: DEFAULT_LEADERSHIP,
  contactInfo: DEFAULT_CONTACT,
  aboutContent: DEFAULT_ABOUT_CONTENT,
};

export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    name: "Ramesh Karki",
    email: "ramesh@example.com",
    phone: "+977-9841000001",
    subject: "Wholesale Partnership Inquiry",
    message:
      "We are interested in becoming an authorized dealer in Pokhara region. Please provide details about your dealer program and margin structure.",
    createdAt: "2025-01-15T10:30:00Z",
    read: false,
  },
  {
    name: "Sita Rana",
    email: "sita@hotel.com",
    subject: "Hotel Bulk Order",
    message:
      "Our 5-star hotel would like to place a bulk order for SAN SOJU and Hero Series RTDs for our upcoming New Year event.",
    createdAt: "2025-01-10T14:15:00Z",
    read: true,
  },
];

export const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  username: "admin",
  email: "admin@everestdistillery.com.np",
  name: "Admin User",
};

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  SOJU: "Soju",
  WHISKY: "Whisky",
  VODKA: "Vodka",
  HERO_SERIES: "Hero Series (RTD)",
  OTHER_DISTILLED: "Other Distilled",
  NON_ALCOHOLIC: "Non-Alcoholic",
  UPCOMING: "Upcoming",
};

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/distillery", label: "Distillery" },
  { href: "/leadership", label: "Leadership" },
  { href: "/investors", label: "Investors" },
  { href: "/contact", label: "Contact" },
];

/*

INSERT INTO products (
  name,
  category,
  tagline,
  description,
  "alcoholPercent",
  origin,
  "tasteNotes",
  image,
  featured,
  "isUpcoming",
  variants
)
VALUES
(
  'SAN SOJU',
  'SOJU',
  'The Spirit of the Himalayas',
  'SAN SOJU is our flagship offering — a clean, ultra-smooth soju distilled from the finest Himalayan water sources. Light, refreshing, and unmistakably premium, it redefines what Nepal can produce.',
  25,
  'Nepal',
  '[{"label":"Ultra-Smooth"},{"label":"Clean Finish"},{"label":"Subtle Sweetness"},{"label":"Crisp"}]'::jsonb,
  '',
  true,
  false,
  '{}'::text[]
),
(
  'Himalayan Reserve Whisky',
  'WHISKY',
  'Aged in the shadow of the peaks',
  'A blend aged in toasted oak barrels, carrying the warmth of valley nights and the depth of Himalayan grain. Notes of caramel, smoke, and warm spice make every sip a journey through Nepal''s mountains.',
  42.8,
  'Nepal',
  '[{"label":"Smoky"},{"label":"Oak"},{"label":"Warm Spice"},{"label":"Caramel"}]'::jsonb,
  '',
  true,
  false,
  '{}'::text[]
),
(
  'Everest Premium Vodka',
  'VODKA',
  'Five-times distilled purity',
  'Distilled five times through our proprietary column process using pristine Himalayan spring water. This vodka delivers unparalleled clarity, a silky-smooth mouthfeel, and a perfectly neutral finish.',
  40,
  'Nepal',
  '[{"label":"Crystal Clear"},{"label":"Neutral"},{"label":"Silky"},{"label":"Clean"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'HERO Apple',
  'HERO_SERIES',
  'Orchard Fresh, Party Ready',
  'Crisp apple-infused RTD with a refreshing bite and natural sweetness.',
  8,
  'Nepal',
  '[{"label":"Fresh Apple"},{"label":"Crisp"},{"label":"Lively"}]'::jsonb,
  '',
  false,
  false,
  '{Apple,Lemon,Litchi,Orange,Jaljira}'
),
(
  'HERO Lemon',
  'HERO_SERIES',
  'Zesty, Light, Alive',
  'Tangy lemon RTD with a lively fizz and a clean citrus finish. Perfect chilled.',
  8,
  'Nepal',
  '[{"label":"Citrus"},{"label":"Tart"},{"label":"Bubbly"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'HERO Litchi',
  'HERO_SERIES',
  'Tropical Bliss in a Can',
  'Exotic litchi flavor bursting with tropical floral notes and gentle sweetness.',
  8,
  'Nepal',
  '[{"label":"Floral"},{"label":"Sweet"},{"label":"Tropical"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'HERO Orange',
  'HERO_SERIES',
  'Sunshine in Every Sip',
  'Vibrant orange RTD with a bold citrus profile and refreshing effervescence.',
  8,
  'Nepal',
  '[{"label":"Bold Citrus"},{"label":"Bright"},{"label":"Tangy"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'HERO Jaljira',
  'HERO_SERIES',
  'A Desi Classic, Reimagined',
  'Nepal''s beloved spiced cumin drink transformed into a sparkling adult beverage with depth.',
  8,
  'Nepal',
  '[{"label":"Spiced"},{"label":"Cumin"},{"label":"Tangy"},{"label":"Earthy"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Florida Diamond',
  'OTHER_DISTILLED',
  'Bold. Bright. Unapologetic.',
  'A high-character distilled spirit for those who demand more from every sip. Bold aromatics with a confident finish.',
  38,
  'Nepal',
  '[{"label":"Bold"},{"label":"Spicy"},{"label":"Robust"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'South Pole',
  'OTHER_DISTILLED',
  'Ice-cold confidence',
  'A crisp, ultra-refreshing spirit inspired by polar purity. Served best ice cold.',
  36,
  'Nepal',
  '[{"label":"Icy"},{"label":"Clean"},{"label":"Sharp"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Hilsa',
  'OTHER_DISTILLED',
  'Timeless Taste',
  'Named after the legendary fish of Nepal''s rivers, Hilsa is smooth, classic, and deeply familiar.',
  37.5,
  'Nepal',
  '[{"label":"Smooth"},{"label":"Traditional"},{"label":"Mellow"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Pick',
  'OTHER_DISTILLED',
  'Your Pick, Every Time',
  'A versatile everyday spirit that punches well above its price point. Consistent, approachable, reliable.',
  37.5,
  'Nepal',
  '[{"label":"Versatile"},{"label":"Easy"},{"label":"Approachable"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'SASA',
  'OTHER_DISTILLED',
  'Spirit of the Streets',
  'SASA captures the energetic pulse of Kathmandu''s vibrant nightlife culture. Sharp, lively, electric.',
  40,
  'Nepal',
  '[{"label":"Lively"},{"label":"Sharp"},{"label":"Energetic"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Somrus Gold',
  'OTHER_DISTILLED',
  'A Ceremony in Every Pour',
  'Somrus Gold is a premium artisan blend with a ceremonial character — rich, layered, and unforgettable. Reserved for moments that matter.',
  42,
  'Nepal',
  '[{"label":"Rich"},{"label":"Layered"},{"label":"Ceremonial"},{"label":"Warm"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Hero Sofi Drinking Water',
  'NON_ALCOHOLIC',
  'Pure. Natural. Himalayan.',
  'Sourced from pristine Himalayan springs, Hero Sofi is the purest form of hydration — clean, crisp, and naturally mineral-balanced.',
  NULL,
  'Nepal',
  '[{"label":"Pure"},{"label":"Crisp"},{"label":"Himalayan"}]'::jsonb,
  '',
  false,
  false,
  '{}'::text[]
),
(
  'Project YETI',
  'UPCOMING',
  'Something legendary is brewing',
  'An upcoming super-premium aged spirit crafted for the world''s most discerning palates. Inspired by the myth of the mountains. Coming 2026.',
  NULL,
  'Nepal',
  '[{"label":"Mystery"},{"label":"Premium"},{"label":"Limited Edition"}]'::jsonb,
  '',
  false,
  true,
  '{}'::text[]
);

*/
