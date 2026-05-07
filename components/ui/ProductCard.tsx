"use client";
import React from "react";
import type { Product } from "@/types";
import { PRODUCT_CATEGORY_LABELS } from "@/lib/constants";

interface Props {
  product: Product;
  onClick?: () => void;
}

const CAT_COLORS: Record<string, string> = {
  SOJU: "tag-green",
  WHISKY: "tag-lime",
  VODKA: "tag-blue",
  HERO_SERIES: "tag-green",
  OTHER_DISTILLED: "tag-blue",
  NON_ALCOHOLIC: "tag-lime",
  UPCOMING: "tag-blue",
};

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="group relative glass rounded-xl overflow-hidden hover-lift cursor-pointer"
      style={{ border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {/* Image / Visual */}
      <div
        className="relative h-52 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(22,163,74,0.08) 0%, rgba(37,99,235,0.06) 100%)",
        }}
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {/* Stylised bottle silhouette */}
            <div className="float-anim">
              <div className="relative" style={{ width: 52, height: 140 }}>
                <div
                  className="absolute bottom-0 inset-x-0 rounded-t-sm rounded-b-sm"
                  style={{
                    height: 110,
                    background:
                      "linear-gradient(160deg, rgba(22,163,74,0.5), rgba(5,46,22,0.8))",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}
                />
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 rounded-t-full"
                  style={{
                    width: 26,
                    height: 36,
                    background: "rgba(22,163,74,0.4)",
                    border: "1px solid rgba(74,222,128,0.15)",
                  }}
                />
                <div
                  className="absolute bottom-8 inset-x-2 h-10 rounded flex items-center justify-center"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <span className="font-display text-[9px] text-center text-white/50 px-1 leading-tight">
                    {product.name.split(" ")[0]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {product.featured && (
          <span
            className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{
              background: "var(--g600)",
              color: "#fff",
              boxShadow: "0 0 10px rgba(34,197,94,0.4)",
            }}
          >
            Featured
          </span>
        )}
        {product.isUpcoming && (
          <span
            className="absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(59,130,246,0.3)",
              color: "var(--b200)",
              border: "1px solid rgba(96,165,250,0.3)",
            }}
          >
            Coming Soon
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[rgba(22,163,74,0)] group-hover:bg-[rgba(22,163,74,0.06)] transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span
            className={`text-[9px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full ${CAT_COLORS[product.category] || "tag-green"}`}
          >
            {PRODUCT_CATEGORY_LABELS[product.category] || product.category}
          </span>
          {product.alcoholPercent != null && (
            <span className="text-[10px] text-white/35 font-mono">
              {product.alcoholPercent}% ABV
            </span>
          )}
        </div>
        <h3 className="font-display text-lg text-white mb-0.5 group-hover:text-[var(--g300)] transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] text-white/40 italic mb-3">
          {product.tagline}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.tasteNotes.slice(0, 3).map((n) => (
            <span
              key={n.label}
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {n.label}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-white/35 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div
          className="mt-3 pt-3 flex items-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-[9px] text-white/25 tracking-wider uppercase">
            Origin
          </span>
          <span
            className="text-[9px] font-semibold"
            style={{ color: "var(--g500)" }}
          >
            {product.origin}
          </span>
        </div>
      </div>
    </div>
  );
}
