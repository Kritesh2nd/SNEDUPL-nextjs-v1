"use client";
import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { SiteContent, Product, LeadershipProfile, ContactInfo, HeroContent, Inquiry, AdminProfile } from "@/types";
import { DEFAULT_SITE_CONTENT, DEFAULT_INQUIRIES, DEFAULT_ADMIN_PROFILE } from "@/lib/constants";

interface SiteContextValue {
  siteContent: SiteContent;
  setSiteContent: (c: SiteContent) => void;
  updateHero: (h: HeroContent) => void;
  updateAbout: (summary: string, story: string) => void;
  addProduct: (p: Product) => void;
  updateProduct: (i: number, p: Product) => void;
  deleteProduct: (i: number) => void;
  addLeader: (l: LeadershipProfile) => void;
  updateLeader: (i: number, l: LeadershipProfile) => void;
  deleteLeader: (i: number) => void;
  updateContact: (c: ContactInfo) => void;
  inquiries: Inquiry[];
  addInquiry: (i: Omit<Inquiry, "createdAt" | "read">) => void;
  markInquiryRead: (i: number) => void;
  deleteInquiry: (i: number) => void;
  adminProfile: AdminProfile;
  updateAdminProfile: (p: AdminProfile) => void;
  ageVerified: boolean;
  setAgeVerified: (v: boolean) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteContent, setSiteContentState] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(DEFAULT_ADMIN_PROFILE);
  const [ageVerified, setAgeVerified] = useState(false);

  const setSiteContent = useCallback((c: SiteContent) => setSiteContentState(c), []);
  const updateHero = useCallback((heroContent: HeroContent) => setSiteContentState(p => ({ ...p, heroContent })), []);
  const updateAbout = useCallback((aboutSummary: string, brandStory: string) => setSiteContentState(p => ({ ...p, aboutSummary, brandStory })), []);
  const addProduct = useCallback((product: Product) => setSiteContentState(p => ({ ...p, products: [...p.products, product] })), []);
  const updateProduct = useCallback((idx: number, product: Product) => setSiteContentState(p => { const products = [...p.products]; products[idx] = product; return { ...p, products }; }), []);
  const deleteProduct = useCallback((idx: number) => setSiteContentState(p => ({ ...p, products: p.products.filter((_, i) => i !== idx) })), []);
  const addLeader = useCallback((leader: LeadershipProfile) => setSiteContentState(p => ({ ...p, leadership: [...p.leadership, leader] })), []);
  const updateLeader = useCallback((idx: number, leader: LeadershipProfile) => setSiteContentState(p => { const leadership = [...p.leadership]; leadership[idx] = leader; return { ...p, leadership }; }), []);
  const deleteLeader = useCallback((idx: number) => setSiteContentState(p => ({ ...p, leadership: p.leadership.filter((_, i) => i !== idx) })), []);
  const updateContact = useCallback((contactInfo: ContactInfo) => setSiteContentState(p => ({ ...p, contactInfo })), []);
  const addInquiry = useCallback((inq: Omit<Inquiry, "createdAt" | "read">) => setInquiries(p => [{ ...inq, createdAt: new Date().toISOString(), read: false }, ...p]), []);
  const markInquiryRead = useCallback((idx: number) => setInquiries(p => p.map((q, i) => i === idx ? { ...q, read: true } : q)), []);
  const deleteInquiry = useCallback((idx: number) => setInquiries(p => p.filter((_, i) => i !== idx)), []);
  const updateAdminProfile = useCallback((profile: AdminProfile) => setAdminProfile(profile), []);

  return (
    <SiteContext.Provider value={{
      siteContent, setSiteContent, updateHero, updateAbout,
      addProduct, updateProduct, deleteProduct,
      addLeader, updateLeader, deleteLeader, updateContact,
      inquiries, addInquiry, markInquiryRead, deleteInquiry,
      adminProfile, updateAdminProfile, ageVerified, setAgeVerified,
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
