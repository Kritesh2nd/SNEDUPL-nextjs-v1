"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import { ExternalLink, Mail } from "lucide-react";

export default function LeadershipPage() {
  const { siteContent } = useSite();
  const [tab, setTab] = useState<"Board of Directors" | "Management">(
    "Board of Directors",
  );

  const visible = siteContent.leadership
    .filter((l) => l.showOnSite && l.boardType === tab)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const allVisible = siteContent.leadership.filter((l) => l.showOnSite);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 page-hero-bg overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span
            className="text-[11px] font-semibold tracking-[0.28em] uppercase"
            style={{ color: "var(--g400)" }}
          >
            Our People
          </span>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl text-white mt-4 mb-6">
            Leadership &<br />
            <span className="text-electric-green">Governance</span>
          </h1>
          <p className="text-white/45 text-base max-w-2xl mx-auto">
            The visionaries, operators, and experts who have built Everest
            Distillery into Nepal&apos;s most dynamic spirits house — and are
            charting its global future.
          </p>
        </div>
      </section>

      {/* Leadership grid */}
      <section className="py-20" style={{ background: "var(--dark)" }}>
        <div className="max-w-6xl mx-auto px-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-12 justify-center">
            {(["Board of Directors", "Management"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-[11px] tracking-[0.12em] uppercase px-6 py-2.5 rounded-full transition-all duration-200 font-semibold ${tab === t ? "text-black" : "text-white/45 hover:text-white/75"}`}
                style={
                  tab === t
                    ? {
                        background: "var(--g400)",
                        boxShadow: "0 0 20px rgba(74,222,128,0.3)",
                      }
                    : { border: "1px solid rgba(255,255,255,0.1)" }
                }
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((leader) => (
              <div
                key={leader.name}
                className="relative glass-green rounded-2xl overflow-hidden hover-lift group"
              >
                {/* Avatar section */}
                <div
                  className="relative h-48 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(22,163,74,0.08) 0%, rgba(37,99,235,0.08) 100%)",
                  }}
                >
                  <div
                    className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(22,163,74,0.25), rgba(37,99,235,0.25))",
                      border: "2px solid rgba(74,222,128,0.3)",
                    }}
                  >
                    {leader.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span
                        className="font-display text-4xl"
                        style={{ color: "var(--g400)" }}
                      >
                        {leader.name[0]}
                      </span>
                    )}
                  </div>
                  {/* Decorative ring */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-32 h-32 rounded-full opacity-20"
                      style={{ border: "1px solid rgba(74,222,128,0.4)" }}
                    />
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-2xl text-white group-hover:text-[var(--g300)] transition-colors">
                    {leader.name}
                  </h3>
                  <p
                    className="text-[11px] tracking-[0.15em] uppercase mt-1 mb-4"
                    style={{ color: "var(--g500)" }}
                  >
                    {leader.position}
                  </p>
                  <p className="text-xs text-white/45 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
                {/* Top right order badge */}
                <div
                  className="absolute top-3 right-3 text-[9px] px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(74,222,128,0.1)",
                    border: "1px solid rgba(74,222,128,0.2)",
                    color: "var(--g400)",
                  }}
                >
                  #{leader.displayOrder}
                </div>
              </div>
            ))}
            {visible.length === 0 && (
              <p className="col-span-3 text-white/30 text-sm text-center py-12">
                No profiles available.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Company ethos */}
      <section className="py-16" style={{ background: "var(--dark2)" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionTitle
            eyebrow="Our Culture"
            title="Built on Trust, Driven by Excellence"
            centered
          />
          <p className="text-white/45 text-sm leading-relaxed mt-6 max-w-2xl mx-auto">
            At Shree New Everest Distillery Udhyog, our leadership culture is
            built on transparency, accountability, and an unwavering commitment
            to quality. Our team of {allVisible.length} leaders brings together
            decades of experience in spirits production, finance, distribution,
            and governance — all united by a shared vision for Nepal&apos;s
            place on the global spirits stage.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { value: `${allVisible.length}`, label: "Leadership Team" },
              { value: "20+", label: "Years Combined Experience" },
              { value: "2", label: "Office Locations" },
            ].map((m) => (
              <div key={m.label} className="glass-green rounded-xl p-5">
                <p
                  className="font-display text-4xl mb-1"
                  style={{ color: "var(--g400)" }}
                >
                  {m.value}
                </p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
