"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { getBaseUrl } from "@/lib/utils";

export default function LeadershipSection() {
  const { siteContent } = useSite();
  const [tab, setTab] = useState<"Board of Directors" | "Management">(
    "Board of Directors",
  );

  const visible = siteContent.leadership
    .filter((l) => l.showOnSite && l.boardType === tab)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
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
                      src={getBaseUrl() + leader.image}
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
  );
}
