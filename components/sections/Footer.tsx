"use client";
import React from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import { Leaf, MapPin, Phone, Mail } from "lucide-react";
import { COMPANY_NAME, COMPANY_SHORT, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const { siteContent } = useSite();
  const { contactInfo } = siteContent;

  return (
    <footer style={{ background: "var(--dark2)", borderTop: "1px solid rgba(74,222,128,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background:"rgba(22,163,74,0.1)", border:"1px solid rgba(74,222,128,0.3)" }}>
                <Leaf size={16} style={{ color:"var(--g400)" }} />
              </div>
              <div>
                <p className="font-display text-lg text-white">{COMPANY_SHORT}</p>
                <p className="text-[9px] tracking-[0.2em] uppercase" style={{ color:"var(--g500)" }}>Est. 2011 · Nepal</p>
              </div>
            </div>
            <p className="text-white/40 text-xs leading-relaxed max-w-xs mb-4">
              Nepal&apos;s emerging premium spirits house. Crafted with precision, distilled for the world.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color:"var(--g500)" }} />
                <p className="text-[11px] text-white/35">{contactInfo.factoryAddress}</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={11} className="mt-0.5 flex-shrink-0" style={{ color:"var(--b400)" }} />
                <p className="text-[11px] text-white/35">{contactInfo.officeAddress}</p>
              </div>
            </div>
            <p className="text-white/15 text-[10px] mt-5 tracking-wider uppercase">🍃 Drink Responsibly · 18+</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color:"var(--g400)" }}>Explore</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-white/40 hover:text-[var(--g400)] transition-colors duration-200">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase mb-5" style={{ color:"var(--g400)" }}>Connect</p>
            <div className="space-y-3">
              <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 text-xs text-white/40 hover:text-[var(--g400)] transition-colors">
                <Phone size={11} />{contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-xs text-white/40 hover:text-[var(--g400)] transition-colors">
                <Mail size={11} />{contactInfo.email}
              </a>
            </div>
            <div className="flex gap-2 mt-5">
              {Object.entries(contactInfo.socialLinks).map(([platform, url]) => url && (
                <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] px-2.5 py-1 rounded-sm capitalize text-white/35 hover:text-[var(--g400)] transition-colors"
                  style={{ border:"1px solid rgba(255,255,255,0.07)" }}>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="divider-green mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-white/20">© {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <Link href="/admin" className="text-[10px] text-white/15 hover:text-white/40 transition-colors tracking-wider uppercase">Admin Portal</Link>
        </div>
      </div>
    </footer>
  );
}
