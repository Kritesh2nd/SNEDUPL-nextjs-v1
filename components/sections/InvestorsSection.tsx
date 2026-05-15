"use client";
import React from "react";
import Link from "next/link";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { ArrowRight, TrendingUp, Globe2, Factory, Users } from "lucide-react";

const METRICS = [
  { label: "Year Founded", value: "2011" },
  { label: "Products Portfolio", value: "30+" },
  { label: "National Dealers", value: "50+" },
  { label: "Production Capacity", value: "5K+ Cases/mo" },
  { label: "Facility Area", value: "85 Kattha" },
  { label: "IPO Target", value: "2026" },
];
const PILLARS = [
  {
    icon: TrendingUp,
    title: "Robust Revenue Growth",
    desc: "Consistent year-on-year revenue growth driven by expanding distribution and new product launches.",
  },
  {
    icon: Globe2,
    title: "International Market Entry",
    desc: "Targeting South Asia and Southeast Asia with premium soju and whisky exports by 2026.",
  },
  {
    icon: Factory,
    title: "Capacity Expansion",
    desc: "Phase II facility expansion to double production capacity ahead of IPO listing.",
  },
  {
    icon: Users,
    title: "Strong Leadership",
    desc: "Experienced management team with deep industry expertise driving operational excellence.",
  },
];

export default function InvestorsSection() {
  return (
    <section
      id="investors"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--dark)" }}
    >
      <div className="absolute inset-0 dot-grid-blue opacity-20 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle
            eyebrow="Investor Relations"
            title="The Next Chapter"
            accentColor="green"
            subtitle="Entering our most ambitious growth phase — international expansion and IPO readiness."
          />
          <Link href="/investors" className="flex-shrink-0">
            <Button variant="outline" size="sm">
              Learn More <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="glass-green rounded-xl p-5 hover-lift text-center"
            >
              <p
                className="font-display text-4xl mb-1"
                style={{ color: "var(--g300)" }}
              >
                {m.value}
              </p>
              <p className="text-[10px] text-white/40 tracking-[0.18em] uppercase">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {PILLARS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass rounded-xl p-5 flex gap-4 hover-lift group"
              style={{ border: "1px solid rgba(96,165,250,0.1)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(96,165,250,0.2)",
                }}
              >
                <Icon size={18} style={{ color: "var(--g400)" }} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-[var(--g300)] transition-colors">
                  {title}
                </h4>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
