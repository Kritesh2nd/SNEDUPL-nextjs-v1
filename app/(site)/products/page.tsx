"use client";
import React, { useState } from "react";
import { useSite } from "@/context/SiteContext";
import ProductCard from "@/components/ui/ProductCard";
import Modal from "@/components/ui/Modal";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Product, ProductCategory } from "@/types";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { Search } from "lucide-react";

const FILTERS: { value: ProductCategory | "ALL"; label: string; desc: string }[] = [
  { value:"ALL",            label:"All Products",    desc:"Complete portfolio" },
  { value:"SOJU",           label:"Soju",            desc:"Signature collection" },
  { value:"WHISKY",         label:"Whisky",          desc:"Aged expressions" },
  { value:"VODKA",          label:"Vodka",           desc:"Ultra-pure distillates" },
  { value:"HERO_SERIES",    label:"Hero Series",     desc:"Flavoured RTDs" },
  { value:"OTHER_DISTILLED",label:"Other Spirits",   desc:"Diversified spirits" },
  { value:"NON_ALCOHOLIC",  label:"Non-Alcoholic",   desc:"Premium beverages" },
  { value:"UPCOMING",       label:"Upcoming",        desc:"Coming soon" },
];

export default function ProductsPage() {
  const { siteContent } = useSite();
  const [filter, setFilter] = useState<ProductCategory | "ALL">("ALL");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered = siteContent.products.filter((p) => {
    const matchCat = filter === "ALL" || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.tasteNotes.some(n => n.label.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const counts: Record<string, number> = { ALL: siteContent.products.length };
  siteContent.products.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1;
  });

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 md:py-24 page-hero-bg overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-[11px] font-semibold tracking-[0.28em] uppercase" style={{ color:"var(--g400)" }}>Our Portfolio</span>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-3 mb-4">
            Spirits Crafted to<br /><span className="text-electric-green">Perfection</span>
          </h1>
          <p className="text-white/45 text-base max-w-xl mx-auto leading-relaxed">
            30+ expressions spanning soju, whisky, vodka, ready-to-drink, and more — every bottle a testament to Himalayan craftsmanship.
          </p>
        </div>
      </section>

      {/* Filter sidebar + grid */}
      <section className="py-12" style={{ background:"var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar filters */}
            <aside className="lg:w-56 flex-shrink-0">
              <div className="sticky top-24 space-y-1">
                <p className="text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color:"var(--g400)" }}>Category</p>
                {FILTERS.map((f) => (
                  <button key={f.value} onClick={() => setFilter(f.value)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                      filter === f.value ? "text-black font-semibold" : "text-white/45 hover:text-white/75"
                    }`}
                    style={filter === f.value
                      ? { background:"var(--g500)", boxShadow:"0 0 15px rgba(34,197,94,0.25)" }
                      : { border:"1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-xs">{f.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${filter === f.value ? "bg-black/20 text-black" : "text-white/30"}`}>
                      {counts[f.value] || 0}
                    </span>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Search */}
              <div className="relative mb-8">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products, taste notes..."
                  className="w-full pl-11 pr-4 py-3 text-sm text-white rounded-lg outline-none"
                  style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(74,222,128,0.15)" }}
                  onFocus={e => (e.target.style.borderColor = "var(--g400)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(74,222,128,0.15)")} />
              </div>

              <p className="text-xs text-white/30 mb-6">Showing {filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <div key={`${product.name}-${i}`} className="fade-up" style={{ animationDelay:`${i * 0.04}s`, animationFillMode:"both" }}>
                    <ProductCard product={product} onClick={() => setSelected(product)} />
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="col-span-3 py-20 text-center text-white/25">
                    <p className="text-sm tracking-wider uppercase">No products found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product detail modal */}
      {selected && (
        <Modal open={!!selected} onClose={() => setSelected(null)} title={selected.name} maxWidth="max-w-lg">
          <div className="space-y-4">
            <p className="text-[10px] tracking-widest uppercase" style={{ color:"var(--g400)" }}>
              {PRODUCT_CATEGORY_LABELS[selected.category]}
            </p>
            <p className="text-white/50 text-sm italic">{selected.tagline}</p>
            {selected.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={selected.image} alt={selected.name} className="w-full h-48 object-cover rounded-lg" />
            )}
            <p className="text-white/55 text-sm leading-relaxed">{selected.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {selected.alcoholPercent != null && (
                <div className="glass-green rounded-lg p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">ABV</p>
                  <p className="font-display text-2xl" style={{ color:"var(--g400)" }}>{selected.alcoholPercent}%</p>
                </div>
              )}
              <div className="glass-blue rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Origin</p>
                <p className="font-display text-xl text-white">{selected.origin}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Taste Profile</p>
              <div className="flex flex-wrap gap-2">
                {selected.tasteNotes.map((n) => (
                  <span key={n.label} className="text-xs px-3 py-1 rounded-full tag-green">{n.label}</span>
                ))}
              </div>
            </div>
            {selected.variants && (
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">Variants</p>
                <div className="flex flex-wrap gap-2">
                  {selected.variants.map((v) => (
                    <span key={v} className="text-xs px-3 py-1 glass rounded-full text-white/55">{v}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
