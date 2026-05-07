"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSite } from "@/context/SiteContext";
import SectionTitle from "@/components/ui/SectionTitle";
import ProductCard from "@/components/ui/ProductCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import type { Product, ProductCategory } from "@/types";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

const FILTERS: { value: ProductCategory | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "SOJU", label: "Soju" },
  { value: "WHISKY", label: "Whisky" },
  { value: "VODKA", label: "Vodka" },
  { value: "HERO_SERIES", label: "Hero Series" },
  { value: "OTHER_DISTILLED", label: "Other Spirits" },
  { value: "NON_ALCOHOLIC", label: "Non-Alcoholic" },
  { value: "UPCOMING", label: "Upcoming" },
];

export default function ProductsSection() {
  const { siteContent } = useSite();
  const [filter, setFilter] = useState<ProductCategory | "ALL">("ALL");
  const [selected, setSelected] = useState<Product | null>(null);

  const featured = siteContent.products.filter((p) => p.featured).slice(0, 3);
  const filtered =
    filter === "ALL"
      ? siteContent.products
      : siteContent.products.filter((p) => p.category === filter);

  return (
    <section
      id="products"
      className="relative py-24 md:py-32"
      style={{ background: "var(--dark)" }}
    >
      <div
        className="absolute left-0 top-1/4 w-80 h-80 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(22,163,74,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle
            eyebrow="Our Portfolio"
            title="Spirits Crafted to Perfection"
            subtitle="From pristine soju to aged whiskies — every bottle carries the soul of the Himalayas."
          />
          <Link href="/products" className="flex-shrink-0">
            <Button variant="outline" size="sm">
              View All Products <ArrowRight size={13} />
            </Button>
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-full transition-all duration-200 ${
                filter === f.value
                  ? "text-black font-semibold"
                  : "text-white/45 hover:text-white/75"
              }`}
              style={
                filter === f.value
                  ? {
                      background: "var(--g400)",
                      boxShadow: "0 0 15px rgba(74,222,128,0.3)",
                    }
                  : { border: "1px solid rgba(255,255,255,0.1)" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <div
              key={`${product.name}-${i}`}
              className="fade-up"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "both",
              }}
            >
              <ProductCard
                product={product}
                onClick={() => setSelected(product)}
              />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/25">
            <p className="text-sm tracking-wider uppercase">
              No products in this category
            </p>
          </div>
        )}
      </div>

      {selected && (
        <Modal
          open={!!selected}
          onClose={() => setSelected(null)}
          title={selected.name}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "var(--g400)" }}
            >
              {PRODUCT_CATEGORY_LABELS[selected.category]}
            </span>
            <p className="text-white/50 text-sm italic">{selected.tagline}</p>
            <p className="text-white/55 text-sm leading-relaxed">
              {selected.description}
            </p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              {selected.alcoholPercent != null && (
                <div className="glass-green rounded-lg p-3">
                  <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                    ABV
                  </p>
                  <p
                    className="font-display text-2xl"
                    style={{ color: "var(--g400)" }}
                  >
                    {selected.alcoholPercent}%
                  </p>
                </div>
              )}
              <div className="glass-blue rounded-lg p-3">
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                  Origin
                </p>
                <p className="font-display text-xl text-white">
                  {selected.origin}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
                Taste Profile
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.tasteNotes.map((n) => (
                  <span
                    key={n.label}
                    className="text-xs px-3 py-1 rounded-full tag-green"
                  >
                    {n.label}
                  </span>
                ))}
              </div>
            </div>
            {selected.variants && (
              <div>
                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
                  Variants
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.variants.map((v) => (
                    <span
                      key={v}
                      className="text-xs px-3 py-1 glass rounded-full text-white/55"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </section>
  );
}
