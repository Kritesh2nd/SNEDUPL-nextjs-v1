"use client";
import React from "react";
import SectionTitle from "@/components/ui/SectionTitle";
import { DEFAULT_DISTILLERY_DETAILS } from "@/lib/constants";

const INFRA = [
  { icon:"🏭", title:"85 Kattha Facility", desc:"Nepal's largest private distillery campus, purpose-built for precision, scale, and consistency in Kohalpur, Banke." },
  { icon:"💧", title:"Himalayan Spring Water", desc:"Our secret ingredient — pristine mountain-sourced water with perfect mineral balance, the foundation of our spirit purity." },
  { icon:"⚗️", title:"Multi-Column Distillation", desc:"6-column stainless steel distillation towers enabling precise separation and consistently high spirit purity across all SKUs." },
  { icon:"🌡️", title:"Climate-Controlled Aging", desc:"Temperature and humidity-controlled barrel warehouses ensuring consistent flavor development for our aged expressions." },
  { icon:"🔬", title:"In-House QA Lab", desc:"Full spectrometric and sensory analysis laboratory. Every batch is tested before it leaves our facility." },
  { icon:"♻️", title:"Sustainable Operations", desc:"Closed-loop water recycling, biomass energy recovery, and zero-waste bottling initiatives in our eco-first production model." },
];

export default function DistillerySection() {
  const d = DEFAULT_DISTILLERY_DETAILS;
  return (
    <section id="distillery" className="relative py-24 md:py-32 overflow-hidden" style={{ background:"var(--dark)" }}>
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none" style={{
        background:"radial-gradient(ellipse at right, rgba(37,99,235,0.04) 0%, transparent 60%)"
      }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <SectionTitle eyebrow="Our Facility" title={"Where Precision\nMeets Passion"} accentColor="blue"
              subtitle="Established in 2018, our world-class distillery campus spans 85 Kattha in Kohalpur, Banke — a monument to Nepali craftsmanship and modern distillation science." />

            {/* Facility stats */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { label:"Area",     value: d.area },
                { label:"Capacity", value: d.capacity },
                { label:"Columns",  value: `${d.columns} Column` },
              ].map((s) => (
                <div key={s.label} className="glass-blue rounded-lg p-4 text-center">
                  <p className="font-display text-2xl text-white mb-0.5">{s.value}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Visual distillery mock */}
            <div className="mt-6 relative rounded-xl overflow-hidden" style={{ aspectRatio:"16/9" }}>
              <div className="w-full h-full flex items-end justify-center pb-6 gap-3" style={{
                background:"linear-gradient(135deg, rgba(22,163,74,0.06) 0%, rgba(37,99,235,0.08) 100%)",
                border:"1px solid rgba(74,222,128,0.1)"
              }}>
                {[70,100,130,85,120,90,60].map((h, i) => (
                  <div key={i} className="rounded-t-sm flex-shrink-0"
                    style={{ width:28, height:h, background:`linear-gradient(to top, rgba(22,163,74,0.5), rgba(74,222,128,0.2))`,
                      border:"1px solid rgba(74,222,128,0.2)" }}>
                    <div className="w-full h-4 rounded-t-sm" style={{ background:`rgba(${i%2===0?"34,197,94":"96,165,250"},0.25)` }} />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <p className="text-[9px] text-white/25 tracking-widest uppercase">Kohalpur Distillery — Est. 2018</p>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-4 flex flex-wrap gap-2">
              {d.certifications.map((c) => (
                <span key={c} className="text-[10px] px-3 py-1 rounded-full tag-green">{c}</span>
              ))}
            </div>
          </div>

          {/* Right – Infrastructure grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {INFRA.map((item) => (
              <div key={item.title} className="glass rounded-xl p-5 hover-lift group transition-all duration-300"
                style={{ border:"1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h4 className="font-display text-lg text-white mb-2 group-hover:text-[var(--g300)] transition-colors">{item.title}</h4>
                <p className="text-[11px] text-white/45 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
