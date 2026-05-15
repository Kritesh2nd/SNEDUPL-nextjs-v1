"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import { ArrowRight, ChevronDown, Zap, Award, Globe } from "lucide-react";
import { COMPANY_SHORT } from "@/lib/constants";
import SojuBottleViewer from "../ui/SojuBottleViewer";

const TRUST_BADGES = [
  { icon: Award, label: "15 Years Excellence" },
  { icon: Globe, label: "Export-Ready Quality" },
  { icon: Zap, label: "30+ Premium SKUs" },
];

export default function HeroSection() {
  const { siteContent } = useSite();
  const { heroContent } = siteContent;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 30% 20%, rgba(22,163,74,0.13) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 80% 80%, rgba(37,99,235,0.08) 0%, transparent 50%), var(--dark)",
      }}
    >
      {/* Grid */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Vertical accent lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0.25, 0.5, 0.75].map((pos) => (
          <div
            key={pos}
            className="absolute top-0 bottom-0 w-px opacity-5"
            style={{
              left: `${pos * 100}%`,
              background:
                "linear-gradient(to bottom, transparent, var(--g500), transparent)",
            }}
          />
        ))}
        {/* Top glow bar */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, var(--g500) 50%, transparent 100%)",
            opacity: 0.4,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center">
        {/* ── Left column ── */}
        <div
          className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-[11px] tracking-[0.2em] uppercase"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(74,222,128,0.2)",
              color: "var(--g400)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block pulse-glow"
              style={{ background: "var(--g400)" }}
            />
            Nepal&apos;s Premium Spirits House
          </div>

          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white leading-[1.04] mb-6">
            {heroContent.tagline.includes(".") ? (
              <>
                <span className="block">
                  {heroContent.tagline.split(".")[0]}.
                </span>
                <span className="block mt-2 text-electric-green">
                  {heroContent.tagline.split(".").slice(1).join(".").trim()}
                </span>
              </>
            ) : (
              heroContent.tagline
            )}
          </h1>

          <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-md mb-8">
            {heroContent.subTagline}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mb-10">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs text-white/55"
              >
                <Icon size={13} style={{ color: "var(--g400)" }} />
                {label}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/products">
              <Button variant="primary" size="lg">
                {heroContent.ctaText} <ArrowRight size={15} />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg">
                Our Story
              </Button>
            </Link>
          </div>
        </div>

        {/* ── Right column – Bottle showcase ── */}
        <div
          className={`flex justify-center items-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100" : "opacity-0"} hidden`}
        >
          <div className="relative">
            {/* Radial glow behind bottle */}
            <div
              className="absolute inset-0 -inset-16 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse, rgba(34,197,94,0.2) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Main flagship bottle */}
            <div className="relative float-anim">
              <div
                className="w-28 h-72 rounded-t-full rounded-b-sm relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(160deg, #14532d 0%, #052e16 55%, #0a1628 100%)",
                  border: "1px solid rgba(74,222,128,0.25)",
                  boxShadow:
                    "0 0 50px rgba(34,197,94,0.18), 0 0 100px rgba(34,197,94,0.06), inset 0 0 30px rgba(0,0,0,0.4)",
                }}
              >
                {/* Shine streak */}
                <div
                  className="absolute top-0 left-5 w-2 h-full opacity-15"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #fff, transparent)",
                  }}
                />
                {/* Label */}
                <div
                  className="absolute bottom-10 inset-x-2 h-[4.5rem] rounded flex flex-col items-center justify-center gap-1 py-2"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  <span
                    className="font-display text-base leading-none"
                    style={{ color: "var(--g300)" }}
                  >
                    SAN
                  </span>
                  <span
                    className="font-display text-[10px] tracking-[0.35em] uppercase"
                    style={{ color: "var(--g500)" }}
                  >
                    SOJU
                  </span>
                  <div
                    className="w-8 h-px my-0.5"
                    style={{ background: "rgba(74,222,128,0.4)" }}
                  />
                  <span className="text-[7px] text-white/35 tracking-widest uppercase">
                    Everest Distillery
                  </span>
                </div>
                {/* Neck */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-14 rounded-t-full"
                  style={{
                    background: "rgba(22,101,52,0.7)",
                    borderBottom: "1px solid rgba(74,222,128,0.2)",
                  }}
                />
              </div>
              {/* Gold cap */}
              <div
                className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-11 h-5 rounded-sm"
                style={{
                  background: "linear-gradient(to bottom, #fbbf24, #92400e)",
                  boxShadow: "0 2px 10px rgba(251,191,36,0.35)",
                }}
              />
            </div>

            {/* Floating info cards */}
            <div
              className="absolute -right-12 top-8 glass-green rounded-lg px-3 py-2 text-center"
              style={{ animation: "floatY 4s ease-in-out infinite 0.5s" }}
            >
              <p className="text-[9px] text-white/40 uppercase tracking-wider">
                ABV
              </p>
              <p
                className="font-display text-xl"
                style={{ color: "var(--g400)" }}
              >
                25%
              </p>
            </div>
            <div
              className="absolute -left-14 bottom-16 glass-blue rounded-lg px-3 py-2 text-center"
              style={{ animation: "floatY 5s ease-in-out infinite 1.2s" }}
            >
              <p className="text-[9px] text-white/40 uppercase tracking-wider">
                Origin
              </p>
              <p className="font-display text-sm text-white">Nepal 🏔️</p>
            </div>
            <div
              className="absolute -right-8 bottom-6 glass rounded-lg px-3 py-2 text-center"
              style={{ animation: "floatY 4.5s ease-in-out infinite 0.8s" }}
            >
              <p className="text-[9px] text-white/40 uppercase tracking-wider">
                Est.
              </p>
              <p
                className="font-display text-sm"
                style={{ color: "var(--b300)" }}
              >
                2011
              </p>
            </div>
          </div>
        </div>

        <SojuBottleViewer />
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35">
        <span className="text-[9px] tracking-[0.25em] uppercase text-white">
          Scroll
        </span>
        <ChevronDown
          size={14}
          className="text-white"
          style={{ animation: "floatY 2s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
