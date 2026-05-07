"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function LeadershipSection() {
  const { siteContent } = useSite();
  const [tab, setTab] = useState<"Board of Directors" | "Management">("Board of Directors");

  const visible = siteContent.leadership
    .filter((l) => l.showOnSite && l.boardType === tab)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <section id="leadership" className="relative py-24 md:py-32" style={{ background:"var(--dark2)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle eyebrow="Our People" title="Leadership & Governance"
            subtitle="The visionaries steering Everest Distillery toward a global future." />
          <Link href="/leadership" className="flex-shrink-0">
            <Button variant="outline" size="sm">Meet the Team <ArrowRight size={13} /></Button>
          </Link>
        </div>

        <div className="flex gap-2 mb-8">
          {(["Board of Directors","Management"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-[11px] tracking-[0.12em] uppercase px-5 py-2 rounded-full transition-all duration-200 ${tab === t ? "font-semibold text-black" : "text-white/45 hover:text-white/75"}`}
              style={tab === t ? { background:"var(--g400)", boxShadow:"0 0 15px rgba(74,222,128,0.3)" } : { border:"1px solid rgba(255,255,255,0.1)" }}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((leader) => (
            <div key={leader.name} className="glass-green rounded-xl p-6 hover-lift group">
              <div className="w-14 h-14 rounded-full overflow-hidden mb-4 flex-shrink-0 flex items-center justify-center"
                style={{ background:"linear-gradient(135deg, rgba(22,163,74,0.3), rgba(37,99,235,0.3))", border:"1.5px solid rgba(74,222,128,0.25)" }}>
                {leader.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="font-display text-2xl" style={{ color:"var(--g400)" }}>{leader.name[0]}</span>
                )}
              </div>
              <h3 className="font-display text-xl text-white group-hover:text-[var(--g300)] transition-colors">{leader.name}</h3>
              <p className="text-[11px] tracking-wider uppercase mt-1 mb-3" style={{ color:"var(--g500)" }}>{leader.position}</p>
              <p className="text-xs text-white/45 leading-relaxed line-clamp-3">{leader.bio}</p>
            </div>
          ))}
          {visible.length === 0 && <p className="text-white/30 text-sm col-span-3 text-center py-10">No profiles available.</p>}
        </div>
      </div>
    </section>
  );
}
