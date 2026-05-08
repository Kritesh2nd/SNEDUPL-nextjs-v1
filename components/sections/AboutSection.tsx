"use client";
import React from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { ArrowRight, CheckCircle } from "lucide-react";

const STATS = [
  { value: "15+", label: "Years of Excellence", color: "var(--g400)" },
  { value: "30+", label: "Products Launched", color: "var(--g500)" },
  { value: "50+", label: "Dealers Nationwide", color: "var(--b400)" },
  { value: "85", label: "Kattha Facility", color: "var(--b300)" },
];

const QUALITY_SIGNALS = [
  "Nepal Bureau of Standards Certified",
  "Pure Himalayan Spring Water",
  "100% Nepali Owned & Operated",
  "Export-Ready Quality Standards",
  "ISO-Aligned Production Processes",
  "Column Distillation Technology",
];

export default function AboutSection() {
  const { siteContent } = useSite();
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--dark2)" }}
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionTitle
              eyebrow="Our Heritage"
              title={"Nepal's Spirit,\nDistilled for\nthe World"}
              subtitle={siteContent.aboutContent.aboutSummary}
            />
            <div className="mt-8 space-y-3 text-white/45 text-sm leading-relaxed">
              {siteContent.aboutContent.brandStory
                .split(". ")
                .reduce<string[][]>((acc, s, i) => {
                  const chunk = Math.floor(i / 2);
                  if (!acc[chunk]) acc[chunk] = [];
                  acc[chunk].push(s);
                  return acc;
                }, [])
                .slice(0, 2)
                .map((sentences, i) => (
                  <p key={i}>{sentences.join(". ")}.</p>
                ))}
            </div>
            {/* Quality signals */}
            <div className="mt-8 grid grid-cols-2 gap-2">
              {QUALITY_SIGNALS.map((sig) => (
                <div key={sig} className="flex items-start gap-2">
                  <CheckCircle
                    size={13}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--g400)" }}
                  />
                  <span className="text-xs text-white/50 leading-snug">
                    {sig}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/about">
                <Button variant="outline" size="md">
                  Full Story <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="glass-green rounded-xl p-6 hover-lift"
                >
                  <p
                    className="font-display text-5xl mb-1"
                    style={{ color: s.color }}
                  >
                    {s.value}
                  </p>
                  <p className="text-[11px] text-white/45 tracking-wider uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            {/* SAN SOJU spotlight */}
            <div
              className="relative rounded-xl p-6 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(22,163,74,0.12) 0%, rgba(37,99,235,0.12) 100%)",
                border: "1px solid rgba(74,222,128,0.15)",
              }}
            >
              <div className="relative z-10">
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ color: "var(--g400)" }}
                >
                  Flagship Product
                </span>
                <h3 className="font-display text-3xl text-white mt-1 mb-2">
                  SAN SOJU
                </h3>
                <p className="text-white/45 text-xs leading-relaxed">
                  Launched in 2020, SAN SOJU placed Nepal firmly on the global
                  soju map. Ultra-smooth, pristinely clean, distilled from
                  Himalayan spring water — it is the spirit that defines our
                  house style.
                </p>
                <div className="flex gap-3 mt-3">
                  {["Ultra-Smooth", "25% ABV", "Himalayan"].map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2 py-0.5 rounded-full tag-green"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute right-2 bottom-0 opacity-8 select-none pointer-events-none">
                <span
                  className="font-display"
                  style={{
                    fontSize: "9rem",
                    lineHeight: 1,
                    color: "var(--g300)",
                  }}
                >
                  S
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
