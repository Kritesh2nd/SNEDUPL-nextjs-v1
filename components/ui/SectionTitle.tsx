"use client";
import React from "react";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  accentColor?: "green" | "blue";
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  centered,
  accentColor = "green",
}: Props) {
  const eyebrowColor = accentColor === "green" ? "var(--g400)" : "var(--b400)";
  const dividerGradient =
    accentColor === "green"
      ? "linear-gradient(90deg, var(--g500), transparent)"
      : "linear-gradient(90deg, var(--b400), transparent)";

  return (
    <div
      className={`flex flex-col gap-3 ${centered ? "items-center text-center" : ""}`}
    >
      {eyebrow && (
        <span
          className="text-[11px] font-semibold tracking-[0.25em] uppercase"
          style={{ color: eyebrowColor }}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.08] text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm md:text-base leading-relaxed max-w-2xl text-white/50">
          {subtitle}
        </p>
      )}
      <div
        className={`w-14 h-0.5 mt-1 rounded-full ${centered ? "mx-auto" : ""}`}
        style={{ background: dividerGradient }}
      />
    </div>
  );
}
