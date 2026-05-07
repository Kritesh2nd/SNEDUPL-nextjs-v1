"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";

export default function AdminHeroPage() {
  const { siteContent, updateHero, updateAbout } = useSite();
  const [hero, setHero] = useState({ ...siteContent.heroContent });
  const [about, setAbout] = useState({
    summary: siteContent.aboutSummary,
    story: siteContent.brandStory,
  });
  const [heroLoading, setHeroLoading] = useState(false);
  const [aboutLoading, setAboutLoading] = useState(false);
  const [heroSaved, setHeroSaved] = useState(false);
  const [aboutSaved, setAboutSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const saveHero = async () => {
    const e: Record<string, string> = {};
    if (!hero.tagline.trim()) e.tagline = "Tagline required";
    if (!hero.subTagline.trim()) e.subTagline = "Sub-tagline required";
    if (!hero.ctaText.trim()) e.ctaText = "CTA text required";
    setErrors(e);
    if (Object.keys(e).length) return;
    setHeroLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    updateHero(hero);
    console.log("Hero updated:", hero);
    setHeroLoading(false);
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 2500);
  };

  const saveAbout = async () => {
    const e: Record<string, string> = {};
    if (!about.summary.trim()) e.summary = "Summary required";
    if (!about.story.trim()) e.story = "Brand story required";
    setErrors(e);
    if (Object.keys(e).length) return;
    setAboutLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    updateAbout(about.summary, about.story);
    console.log("About updated:", about);
    setAboutLoading(false);
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 2500);
  };

  const clearErr = (k: string) => setErrors((p) => ({ ...p, [k]: "" }));

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="font-display text-3xl text-white">
          Hero &amp; About Content
        </h1>
        <p className="text-white/40 text-sm mt-1">
          Manage homepage messaging and brand narrative
        </p>
      </div>

      {/* Hero */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          background: "#0a1a0d",
          border: "1px solid rgba(74,222,128,0.1)",
        }}
      >
        <h2 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">
          Hero Section
        </h2>
        <Input
          label="Main Tagline"
          value={hero.tagline}
          onChange={(e) => {
            setHero((p) => ({ ...p, tagline: e.target.value }));
            clearErr("tagline");
          }}
          error={errors.tagline}
          placeholder="Crafted with Precision. Distilled for the World."
        />
        <Input
          label="Sub Tagline"
          value={hero.subTagline}
          onChange={(e) => {
            setHero((p) => ({ ...p, subTagline: e.target.value }));
            clearErr("subTagline");
          }}
          error={errors.subTagline}
          placeholder="Nepal's Emerging Premium Spirits House…"
        />
        <Input
          label="CTA Button Text"
          value={hero.ctaText}
          onChange={(e) => {
            setHero((p) => ({ ...p, ctaText: e.target.value }));
            clearErr("ctaText");
          }}
          error={errors.ctaText}
          placeholder="Explore Our Spirits"
        />
        <div className="flex items-center gap-3">
          <Button variant="primary" loading={heroLoading} onClick={saveHero}>
            Save Hero
          </Button>
          {heroSaved && (
            <span className="text-xs fade-up" style={{ color: "var(--g400)" }}>
              ✓ Saved
            </span>
          )}
        </div>
      </div>

      {/* About */}
      <div
        className="rounded-xl p-6 space-y-4"
        style={{
          background: "#0a1a0d",
          border: "1px solid rgba(74,222,128,0.1)",
        }}
      >
        <h2 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">
          About &amp; Brand Story
        </h2>
        <Textarea
          label="About Summary (short)"
          value={about.summary}
          onChange={(e) => {
            setAbout((p) => ({ ...p, summary: e.target.value }));
            clearErr("summary");
          }}
          error={errors.summary}
          rows={3}
          placeholder="Short summary shown in the About section…"
        />
        <Textarea
          label="Full Brand Story"
          value={about.story}
          onChange={(e) => {
            setAbout((p) => ({ ...p, story: e.target.value }));
            clearErr("story");
          }}
          error={errors.story}
          rows={6}
          placeholder="Full brand story…"
        />
        <div className="flex items-center gap-3">
          <Button variant="primary" loading={aboutLoading} onClick={saveAbout}>
            Save About
          </Button>
          {aboutSaved && (
            <span className="text-xs fade-up" style={{ color: "var(--g400)" }}>
              ✓ Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
