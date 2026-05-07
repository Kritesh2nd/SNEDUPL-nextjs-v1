"use client";
import React from "react";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";

export default function TimelineSection() {
  const { siteContent } = useSite();
  const events = [...siteContent.timeline].sort((a, b) => a.year - b.year);

  return (
    <section
      id="timeline"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--dark3)" }}
    >
      <div className="absolute inset-0 dot-grid-blue opacity-25 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          eyebrow="Our Journey"
          title="A Legacy Built Over 15 Years"
          centered
          accentColor="green"
        />
        <div className="mt-16 relative">
          {/* centre line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(34,197,94,0.3), transparent)",
            }}
          />

          <div className="space-y-6">
            {events.map((evt, i) => {
              const isLeft = i % 2 === 0;
              const isFuture = evt.year >= 2026;
              const dotColor = isFuture ? "var(--b400)" : "var(--g400)";
              const borderColor = isFuture
                ? "rgba(96,165,250,0.2)"
                : "rgba(74,222,128,0.15)";
              const bg = isFuture
                ? "rgba(37,99,235,0.06)"
                : "rgba(22,163,74,0.06)";

              return (
                <div
                  key={`${evt.year}-${i}`}
                  className={`flex items-center gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className="flex-1">
                    <div
                      className={`rounded-xl p-5 hover-lift ${isLeft ? "md:text-right" : "md:text-left"}`}
                      style={{
                        background: bg,
                        border: `1px solid ${borderColor}`,
                      }}
                    >
                      <span
                        className="text-[11px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: dotColor }}
                      >
                        {evt.year}
                        {isFuture ? " · Upcoming" : ""}
                      </span>
                      <h3 className="font-display text-xl text-white mt-1">
                        {evt.title}
                      </h3>
                      <p className="text-white/45 text-xs mt-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                  </div>

                  {/* Dot */}
                  <div
                    className="hidden md:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: bg,
                      border: `1.5px solid ${dotColor}`,
                      boxShadow: `0 0 12px ${dotColor}55`,
                    }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: dotColor }}
                    />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
