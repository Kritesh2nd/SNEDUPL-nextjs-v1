"use client";
import SectionTitle from "@/components/ui/SectionTitle";
import InvestorsSection from "@/components/sections/InvestorsSection";
import {
  TrendingUp,
  Globe2,
  Package,
  Users,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

const INVESTMENT_HIGHLIGHTS = [
  {
    icon: TrendingUp,
    title: "Consistent Revenue Growth",
    desc: "Year-on-year revenue growth underpinned by expanding national distribution, new product launches, and increasing brand recognition.",
  },
  {
    icon: Package,
    title: "Diversified Portfolio",
    desc: "30+ SKUs across 7 spirit categories reduces single-product risk and captures multiple consumer segments.",
  },
  {
    icon: Globe2,
    title: "International Expansion",
    desc: "Structured market entry into South and Southeast Asia planned for 2025–2026, beginning with India and Singapore.",
  },
  {
    icon: Users,
    title: "Experienced Management",
    desc: "Seasoned leadership team with deep expertise in spirits manufacturing, distribution, finance, and governance.",
  },
  {
    icon: BarChart3,
    title: "Pre-IPO Opportunity",
    desc: "IPO planned for 2026 offers early investors significant upside potential as the company scales.",
  },
  {
    icon: ShieldCheck,
    title: "Strong Regulatory Standing",
    desc: "Full compliance with Nepal Bureau of Standards and Excise Department regulations, with clean audit history.",
  },
];

const TIMELINE_IPO = [
  {
    year: "2024",
    title: "Pre-IPO Preparation",
    desc: "Financial audits, governance restructuring, and investor documentation preparation.",
  },
  {
    year: "2025",
    title: "International Trials",
    desc: "Pilot exports to South Asian markets; distributor agreements in India and Singapore.",
  },
  {
    year: "Q1 2026",
    title: "IPO Filing",
    desc: "Filing with SEBON (Securities Board of Nepal); public offer preparation.",
  },
  {
    year: "Q3 2026",
    title: "Public Listing",
    desc: "Listed on Nepal Stock Exchange (NEPSE). Open to retail and institutional investors.",
  },
  {
    year: "2027+",
    title: "Scale & Expand",
    desc: "Post-IPO facility expansion, new product lines, and deeper international penetration.",
  },
];

export default function InvestorsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(37,99,235,0.12) 0%, transparent 60%), var(--dark)",
        }}
      >
        <div className="absolute inset-0 dot-grid-blue opacity-30 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span
            className="text-[11px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--b400)" }}
          >
            Investor Relations
          </span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white mt-4 mb-6">
            The Next
            <br />
            <span className="text-electric-blue">Chapter</span>
          </h1>
          <p className="text-white/45 text-base max-w-2xl mx-auto leading-relaxed">
            Shree New Everest Distillery Udhyog is entering its most ambitious
            phase of growth — IPO readiness, international expansion, and
            facility scale-up by 2026.
          </p>
        </div>
      </section>

      {/* Metrics section */}
      <InvestorsSection />

      {/* Investment highlights */}
      <section className="py-20" style={{ background: "var(--dark2)" }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionTitle
            eyebrow="Why Invest"
            title="Investment Highlights"
            centered
            accentColor="blue"
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INVESTMENT_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="glass-blue rounded-xl p-6 hover-lift group"
                style={{ border: "1px solid rgba(96,165,250,0.1)" }}
              >
                <div
                  className="w-11 h-11 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    background: "rgba(59,130,246,0.1)",
                    border: "1px solid rgba(96,165,250,0.2)",
                  }}
                >
                  <Icon size={20} style={{ color: "var(--b400)" }} />
                </div>
                <h4 className="font-display text-xl text-white mb-2 group-hover:text-[var(--b300)] transition-colors">
                  {title}
                </h4>
                <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IPO Roadmap */}
      <section className="py-20" style={{ background: "var(--dark)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <SectionTitle
            eyebrow="IPO Roadmap"
            title="Path to Public Listing"
            centered
            accentColor="blue"
          />
          <div className="mt-12 relative">
            <div
              className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(96,165,250,0.3), transparent)",
              }}
            />
            <div className="space-y-6">
              {TIMELINE_IPO.map((item) => (
                <div key={item.year} className="flex gap-8 items-start">
                  <div
                    className="hidden sm:flex w-16 h-16 rounded-full items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: "rgba(37,99,235,0.1)",
                      border: "1.5px solid rgba(96,165,250,0.3)",
                    }}
                  >
                    <span
                      className="text-[9px] font-bold text-center leading-tight"
                      style={{ color: "var(--b400)" }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <div
                    className="flex-1 glass-blue rounded-xl p-5 hover-lift"
                    style={{ border: "1px solid rgba(96,165,250,0.12)" }}
                  >
                    <span
                      className="text-[11px] font-bold tracking-widest uppercase sm:hidden"
                      style={{ color: "var(--b400)" }}
                    >
                      {item.year} ·{" "}
                    </span>
                    <h3 className="font-display text-xl text-white inline sm:block">
                      {item.title}
                    </h3>
                    <p className="text-white/45 text-xs mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "var(--dark2)" }}>
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            Interested in Investing?
          </h2>
          <p className="text-white/45 text-sm mb-8">
            Contact our investor relations team for detailed financials,
            investor deck, and partnership discussions.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Request Investor Deck",
              "Annual Report 2024",
              "Financial Overview",
            ].map((doc) => (
              <button
                key={doc}
                className="text-sm px-5 py-2.5 rounded-lg text-white/60 hover:text-white transition-all"
                style={{
                  border: "1px solid rgba(96,165,250,0.2)",
                  background: "rgba(37,99,235,0.06)",
                }}
                onClick={() => console.log("Document requested:", doc)}
              >
                {doc} ↓
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
