// ============================================================
// SHREE NEW EVEREST DISTILLERY – Central Type Definitions
// ============================================================

export type ProductCategory =
  | "SOJU"
  | "WHISKY"
  | "VODKA"
  | "HERO_SERIES"
  | "OTHER_DISTILLED"
  | "NON_ALCOHOLIC"
  | "UPCOMING";

export interface TasteNote {
  label: string;
}

export interface Product {
  id?: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  alcoholPercent: number | null;
  origin: string;
  tasteNotes: TasteNote[];
  image: string; // URL or base64 data URL
  featured: boolean;
  isUpcoming: boolean;
  variants?: string[];
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

export interface LeadershipProfile {
  id?: string;
  name: string;
  position: string;
  bio: string;
  image: string; // URL or base64 data URL
  boardType: "Board of Directors" | "Management";
  displayOrder: number;
  showOnSite: boolean;
}

export interface ContactInfo {
  id?: string;
  factoryAddress: string;
  officeAddress: string;
  phone: string;
  email: string;
  mapEmbedUrl?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface HeroContent {
  tagline: string;
  subTagline: string;
  ctaText: string;
}

export interface SiteContent {
  heroContent: HeroContent;
  products: Product[];
  timeline: TimelineEvent[];
  leadership: LeadershipProfile[];
  contactInfo: ContactInfo;
  aboutContent: AboutContent;
}

export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
  read?: boolean;
}

export interface AdminProfile {
  username: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface AdminLogin {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  user: AdminProfile;
}

export interface AboutContent {
  aboutSummary: string;
  brandStory: string;
}

export interface MetaDataResponse {
  page: number | null;
  limit: number | null;

  totalItems: number;

  totalPages: number;
}

export interface ResponseDto<T> {
  data: T[];
  metadata: MetaDataResponse;
}
