"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import type {
  SiteContent,
  Product,
  LeadershipProfile,
  ContactInfo,
  HeroContent,
  Inquiry,
  AdminProfile,
  AboutContent,
  ResponseDto,
} from "@/types";
import {
  DEFAULT_SITE_CONTENT,
  DEFAULT_INQUIRIES,
  DEFAULT_ADMIN_PROFILE,
} from "@/lib/constants";
import { getLocalStorage, isTokenExpired } from "@/lib/utils";
import { getMe } from "@/app/admin/profile/action";
import { getAbout, getHero } from "@/app/admin/hero/action";
import { getProduct } from "@/app/admin/products/action";
import { getLeader } from "@/app/admin/leadership/action";
import { getContactInfo } from "@/app/admin/contact/action";
import { getInquirie } from "@/app/admin/inquiries/action";

interface SiteContextValue {
  siteContent: SiteContent;
  setSiteContent: (c: SiteContent) => void;
  updateHero: (h: HeroContent) => void;
  updateAbout: (a: AboutContent) => void;
  addProduct: (p: Product) => void;
  updateProduct: (i: number, p: Product) => void;
  deleteProduct: (i: number) => void;
  addLeader: (l: LeadershipProfile) => void;
  updateLeader: (i: number, l: LeadershipProfile) => void;
  updateAllLeader: (l: LeadershipProfile[]) => void;
  deleteLeader: (i: number) => void;
  updateContact: (c: ContactInfo) => void;
  inquiries: Inquiry[];
  addInquiry: (i: Omit<Inquiry, "createdAt" | "read">) => void;
  markInquiryRead: (i: number) => void;
  setInquiries: (i: Inquiry[]) => void;
  deleteInquiry: (i: number) => void;
  adminProfile: AdminProfile;
  updateAdminProfile: (p: AdminProfile) => void;
  token: string;
  setToken: (t: string) => void;
  ageVerified: boolean;
  setAgeVerified: (v: boolean) => void;
  fetchProductContent: () => void;

  fetchLeadershipContent: () => void;
  fetchContactInfoContent: () => void;

  fetchInquiries: () => void;

  hydration: boolean;
  setHydration: (h: boolean) => void;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>("");
  const [hydration, setHydration] = useState<boolean>(false);
  const [siteContent, setSiteContentState] =
    useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [inquiries, setInquiries] = useState<Inquiry[]>(DEFAULT_INQUIRIES);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>(
    DEFAULT_ADMIN_PROFILE,
  );
  const [ageVerified, setAgeVerified] = useState(false);

  const setSiteContent = useCallback(
    (c: SiteContent) => setSiteContentState(c),
    [],
  );
  const updateHero = useCallback(
    (heroContent: HeroContent) =>
      setSiteContentState((p) => ({ ...p, heroContent })),
    [],
  );
  const updateAbout = useCallback(
    (aboutContent: AboutContent) =>
      setSiteContentState((p) => ({ ...p, aboutContent })),
    [],
  );
  const addProduct = useCallback(
    (product: Product) =>
      setSiteContentState((p) => ({
        ...p,
        products: [...p.products, product],
      })),
    [],
  );
  const updateProduct = useCallback(
    (idx: number, product: Product) =>
      setSiteContentState((p) => {
        const products = [...p.products];
        products[idx] = product;
        return { ...p, products };
      }),
    [],
  );
  const updateAllProducts = useCallback(
    (products: Product[]) => setSiteContentState((p) => ({ ...p, products })),
    [],
  );
  const deleteProduct = useCallback(
    (idx: number) =>
      setSiteContentState((p) => ({
        ...p,
        products: p.products.filter((_, i) => i !== idx),
      })),
    [],
  );
  const addLeader = useCallback(
    (leader: LeadershipProfile) =>
      setSiteContentState((p) => ({
        ...p,
        leadership: [...p.leadership, leader],
      })),
    [],
  );
  const updateLeader = useCallback(
    (idx: number, leader: LeadershipProfile) =>
      setSiteContentState((p) => {
        const leadership = [...p.leadership];
        leadership[idx] = leader;
        return { ...p, leadership };
      }),
    [],
  );

  const updateAllLeader = useCallback(
    (leadership: LeadershipProfile[]) =>
      setSiteContentState((p) => ({ ...p, leadership })),
    [],
  );
  const deleteLeader = useCallback(
    (idx: number) =>
      setSiteContentState((p) => ({
        ...p,
        leadership: p.leadership.filter((_, i) => i !== idx),
      })),
    [],
  );
  const updateContact = useCallback(
    (contactInfo: ContactInfo) =>
      setSiteContentState((p) => ({ ...p, contactInfo })),
    [],
  );
  const addInquiry = useCallback(
    (inq: Omit<Inquiry, "createdAt" | "read">) =>
      setInquiries((p) => [
        { ...inq, createdAt: new Date().toISOString(), read: false },
        ...p,
      ]),
    [],
  );
  const markInquiryRead = useCallback(
    (idx: number) =>
      setInquiries((p) =>
        p.map((q, i) => (i === idx ? { ...q, read: true } : q)),
      ),
    [],
  );
  const deleteInquiry = useCallback(
    (idx: number) => setInquiries((p) => p.filter((_, i) => i !== idx)),
    [],
  );
  const updateAdminProfile = useCallback(
    (profile: AdminProfile) => setAdminProfile(profile),
    [],
  );

  const fecthToken = async () => {
    const localToken: string = (await getLocalStorage("token")) ?? "";
    const tokenExpired = isTokenExpired(localToken);
    setToken(tokenExpired ? "" : localToken);
  };

  const fetchAdminProfile = async () => {
    try {
      const res = await getMe();
      const admin: AdminProfile = await res.json();
      console.log("admin", admin);
      setAdminProfile(admin);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAboutContent = async () => {
    try {
      const res = await getAbout();
      if (res.ok) {
        const aboutContent: AboutContent = await res.json();
        updateAbout(aboutContent);
      }
    } catch (err) {}
  };

  const fetchHeroContent = async () => {
    try {
      const res = await getHero();
      if (res.ok) {
        const heroContent: HeroContent = await res.json();
        console.log("heroContent", heroContent);
        updateHero(heroContent);
      }
    } catch (err) {}
  };

  const fetchProductContent = async () => {
    // getProduct;
    try {
      const res = await getProduct();
      if (res.ok) {
        const productContent: Product[] = await res.json();
        console.log("productContent", productContent);
        updateAllProducts(productContent);
      }
    } catch (err) {}
  };

  const fetchLeadershipContent = async () => {
    // getProduct;
    try {
      const res = await getLeader();
      if (res.ok) {
        const leadershipContent: LeadershipProfile[] = await res.json();
        updateAllLeader(leadershipContent);
      }
    } catch (err) {}
  };

  const fetchContactInfoContent = async () => {
    // getProduct;
    try {
      const res = await getContactInfo();
      if (res.ok) {
        const contactInfoContent: ContactInfo = await res.json();
        updateContact(contactInfoContent);
      }
    } catch (err) {}
  };

  const fetchInquiries = async () => {
    try {
      const res = await getInquirie("page=1&limit=10");
      if (res.ok) {
        const inquiryData: ResponseDto<Inquiry> = await res.json();
        setInquiries(inquiryData.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fecthToken();

    fetchAdminProfile();
    fetchHeroContent();
    fetchAboutContent();
    fetchProductContent();
    fetchLeadershipContent();
    fetchContactInfoContent();
    fetchInquiries();
    setHydration(true);
  }, []);

  return (
    <SiteContext.Provider
      value={{
        siteContent,
        setSiteContent,
        updateHero,
        updateAbout,
        addProduct,
        updateProduct,
        deleteProduct,
        addLeader,
        updateLeader,
        updateAllLeader,
        deleteLeader,
        updateContact,
        inquiries,
        addInquiry,
        markInquiryRead,
        deleteInquiry,
        setInquiries,
        adminProfile,
        updateAdminProfile,
        ageVerified,
        setAgeVerified,
        token,
        setToken,
        hydration,
        setHydration,
        fetchProductContent,
        fetchLeadershipContent,
        fetchContactInfoContent,
        fetchInquiries,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}
