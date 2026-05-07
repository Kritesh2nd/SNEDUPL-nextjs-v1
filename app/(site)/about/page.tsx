"use client";
import React from "react";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import TimelineSection from "@/components/sections/TimelineSection";
import {
  CheckCircle,
  Leaf,
  Mountain,
  Droplets,
  Award,
  Globe2,
} from "lucide-react";
import { COMPANY_NAME, DEFAULT_DISTILLERY_DETAILS } from "@/lib/constants";

const VALUES = [
  {
    icon: Leaf,
    title: "Natural Purity",
    desc: "Every spirit begins with pristine Himalayan spring water — nature's purest foundation for distillation.",
  },
  {
    icon: Mountain,
    title: "Himalayan Heritage",
    desc: "Rooted in Nepal's mountain culture, our spirits carry the spirit of the Himalayas in every pour.",
  },
  {
    icon: Droplets,
    title: "Precision Craft",
    desc: "15 years of distillation expertise translated into scientifically precise, artisanally crafted spirits.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    desc: "From grain to glass, every stage is monitored by our QA team to meet international export standards.",
  },
  {
    icon: Globe2,
    title: "Global Vision",
    desc: "Built in Nepal, crafted for the world — our sights are firmly set on international markets.",
  },
];

const QUALITY_SIGNALS = [
  "Nepal Bureau of Standards Certified",
  "Pure Himalayan Spring Water Source",
  "100% Nepali Owned & Operated",
  "Export-Ready Quality Standards",
  "ISO-Aligned Production Processes",
  "6-Column Distillation Technology",
  "In-House Quality Assurance Lab",
  "Sustainable Production Practices",
];

export default function AboutPage() {
  const { siteContent } = useSite();
  const d = DEFAULT_DISTILLERY_DETAILS;

  return (
    <div className="pt-20">
      {/* Page Hero */}
      <section className="relative py-20 md:py-28 page-hero-bg overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span
            className="text-[11px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--g400)" }}
          >
            Est. 2011 · Kohalpur, Nepal
          </span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white mt-4 mb-6 leading-[1.06]">
            Our Story &<br />
            <span className="text-electric-green">Heritage</span>
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-2xl mx-auto">
            {siteContent.aboutSummary}
          </p>
          <div
            className="w-16 h-px mx-auto mt-8"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--g500), transparent)",
            }}
          />
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20" style={{ background: "var(--dark2)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionTitle
                eyebrow="The Beginning"
                title="15 Years of Distillation Excellence"
              />
              <div className="mt-8 space-y-5 text-white/50 text-sm leading-[1.9]">
                {siteContent.brandStory
                  .split(". ")
                  .reduce<string[][]>((acc, s, i) => {
                    const chunk = Math.floor(i / 3);
                    if (!acc[chunk]) acc[chunk] = [];
                    acc[chunk].push(s);
                    return acc;
                  }, [])
                  .map((sentences, i) => (
                    <p key={i}>{sentences.join(". ")}.</p>
                  ))}
                <p className="text-white/40">
                  Today, Shree New Everest Distillery Udhyog is more than a
                  spirits company — it is a statement that Nepal&apos;s
                  entrepreneurs can compete and win on a global stage. From
                  humble beginnings to a 30+ product portfolio with over 50
                  national dealers, our journey is only just beginning.
                </p>
              </div>
            </div>
            <div>
              {/* Company quick facts */}
              <div className="glass-green rounded-2xl p-6 mb-6">
                <h3 className="font-display text-xl text-white mb-5">
                  Company Overview
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Full Name", value: COMPANY_NAME },
                    { label: "Founded", value: "2011, Kohalpur, Banke, Nepal" },
                    { label: "Facility", value: `${d.area} at ${d.location}` },
                    {
                      label: "Portfolio",
                      value: "30+ SKUs across 7 categories",
                    },
                    {
                      label: "Distribution",
                      value: "50+ authorized dealers, nationwide",
                    },
                    { label: "Water Source", value: d.waterSource },
                    { label: "IPO Target", value: "2026" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3"
                      style={{
                        borderBottom: "1px solid rgba(74,222,128,0.07)",
                        paddingBottom: "12px",
                      }}
                    >
                      <span className="text-[10px] text-white/35 tracking-wider uppercase w-28 flex-shrink-0 pt-0.5">
                        {item.label}
                      </span>
                      <span className="text-xs text-white/70">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality signals grid */}
              <div className="grid grid-cols-2 gap-2">
                {QUALITY_SIGNALS.map((sig) => (
                  <div
                    key={sig}
                    className="flex items-start gap-2 p-3 rounded-lg"
                    style={{
                      background: "rgba(34,197,94,0.05)",
                      border: "1px solid rgba(74,222,128,0.1)",
                    }}
                  >
                    <CheckCircle
                      size={12}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: "var(--g400)" }}
                    />
                    <span className="text-[10px] text-white/50 leading-snug">
                      {sig}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "var(--dark)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            eyebrow="What Drives Us"
            title="Our Core Values"
            centered
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass rounded-xl p-5 text-center hover-lift group"
                style={{ border: "1px solid rgba(74,222,128,0.08)" }}
              >
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--g400)" }} />
                </div>
                <h4 className="font-display text-base text-white mb-2 group-hover:text-[var(--g300)] transition-colors">
                  {title}
                </h4>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline embedded */}
      <TimelineSection />
    </div>
  );
}
