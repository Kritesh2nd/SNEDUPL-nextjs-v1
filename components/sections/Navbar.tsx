"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Leaf } from "lucide-react";
import { NAV_LINKS, COMPANY_SHORT } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      style={{
        background: scrolled ? "rgba(3,12,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(74,222,128,0.08)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:glow-green"
            style={{
              background: "rgba(22,163,74,0.1)",
              border: "1px solid rgba(74,222,128,0.35)",
            }}
          >
            <Leaf size={15} style={{ color: "var(--g400)" }} />
          </div>
          <div className="hidden sm:block">
            <p className="font-display text-lg text-white leading-none">
              {COMPANY_SHORT}
            </p>
            <p
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "var(--g500)" }}
            >
              Est. 2011 · Nepal
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`nav-link text-[11px] tracking-[0.15em] uppercase transition-colors duration-200 ${active ? "active" : ""}`}
                  style={{
                    color: active ? "var(--g400)" : "rgba(255,255,255,0.55)",
                  }}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/admin"
            className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-sm transition-all"
            style={{
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.color =
                "rgba(74,222,128,0.7)";
              (e.target as HTMLAnchorElement).style.borderColor =
                "rgba(74,222,128,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.3)";
              (e.target as HTMLAnchorElement).style.borderColor =
                "rgba(255,255,255,0.08)";
            }}
          >
            Admin
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 py-6 space-y-4"
          style={{
            background: "rgba(3,12,6,0.97)",
            borderTop: "1px solid rgba(74,222,128,0.08)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm tracking-[0.15em] uppercase text-white/55 hover:text-[var(--g400)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="block text-xs text-white/30 tracking-widest uppercase"
          >
            Admin
          </Link>
        </div>
      )}
    </header>
  );
}
