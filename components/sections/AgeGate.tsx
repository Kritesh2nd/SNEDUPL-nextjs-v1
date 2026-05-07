"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import { COMPANY_NAME, COMPANY_SHORT } from "@/lib/constants";

export default function AgeGate() {
  const { ageVerified, setAgeVerified } = useSite();
  const [declined, setDeclined] = useState(false);
  if (ageVerified) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse at 40% 30%, rgba(22,163,74,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(37,99,235,0.1) 0%, transparent 50%), #000",
      }}
    >
      {/* Animated rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[320, 480, 640, 800].map((s, i) => (
          <div
            key={s}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: s,
              height: s,
              border: `1px solid rgba(74,222,128,${0.08 - i * 0.015})`,
              animation: `pulse-glow ${3 + i}s ease infinite ${i * 0.4}s`,
            }}
          />
        ))}
      </div>
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      <div className="relative text-center px-6 max-w-sm mx-auto fade-up">
        {/* Logo mark */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center glow-green"
              style={{
                background: "rgba(22,163,74,0.1)",
                border: "1.5px solid rgba(74,222,128,0.5)",
              }}
            >
              <span
                className="font-display text-4xl font-bold"
                style={{ color: "var(--g400)" }}
              >
                E
              </span>
            </div>
            <div
              className="absolute -inset-2 rounded-full"
              style={{
                border: "1px solid rgba(74,222,128,0.15)",
                animation: "pulse-glow 3s ease infinite",
              }}
            />
          </div>
        </div>

        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-2"
          style={{ color: "var(--g400)" }}
        >
          Est. 2011
        </p>
        <h1 className="font-display text-3xl text-white mb-1">
          {COMPANY_SHORT}
        </h1>
        <p className="text-xs text-white/35 mb-6 tracking-wide">Nepal</p>
        <div
          className="w-12 h-px mx-auto mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--g500), transparent)",
          }}
        />

        {!declined ? (
          <>
            <p className="text-white/55 text-sm mb-2 leading-relaxed">
              By entering this website, you confirm you are of legal drinking
              age in your country of residence.
            </p>
            <p className="text-white/30 text-[11px] mb-8 tracking-widest uppercase">
              Are you 18 years or older?
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setAgeVerified(true)}
                className="min-w-[130px]"
              >
                Yes, Enter
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setDeclined(true)}
                className="min-w-[130px]"
              >
                No, Exit
              </Button>
            </div>
          </>
        ) : (
          <div className="fade-up">
            <p className="text-white/55 text-sm leading-relaxed">
              We&apos;re sorry. This site is only accessible to those of legal
              drinking age.
            </p>
            <p className="mt-4 text-white/25 text-xs tracking-wider">
              Please drink responsibly.
            </p>
          </div>
        )}

        <p className="mt-10 text-white/15 text-[10px] tracking-[0.2em] uppercase">
          {COMPANY_NAME} · Kohalpur, Banke, Nepal
        </p>
      </div>
    </div>
  );
}
