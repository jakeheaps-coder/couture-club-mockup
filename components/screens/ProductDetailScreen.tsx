"use client";

import { useState } from "react";
import type { Product, Size } from "@/types";

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
}

const sizeLabels: Record<Size, { label: string; dim: string }> = {
  Infant: { label: "Infant", dim: '30"×36"' },
  Tween: { label: "Tween", dim: '36"×50"' },
  Travel: { label: "Travel", dim: '36"×60"' },
  Adult: { label: "Adult", dim: '50"×60"' },
  Monster: { label: "Monster", dim: '60"×72"' },
  Grande: { label: "Grande", dim: '60"×84"' },
};

export default function ProductDetailScreen({ product, onBack }: ProductDetailScreenProps) {
  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const [selectedSize, setSelectedSize] = useState<Size>("Adult");
  const [addedToBag, setAddedToBag] = useState(false);

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const price = selectedVariant?.price ?? product.priceRange.min;

  const handleAddToBag = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1500);
  };

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Hero */}
      <div className="relative w-full" style={{ height: 280, background: product.colorHex }}>
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(248,245,240,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
          aria-label="Go back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Collection badge */}
        <div className="absolute top-4 right-4 z-10">
          <span
            className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
            style={{ background: product.accentHex, color: "#1e232d" }}
          >
            {product.collection} Collection
          </span>
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 flex gap-1.5">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(0,0,0,0.4)", color: "#f8f5f0", backdropFilter: "blur(8px)" }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blanket visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-3xl opacity-40"
            style={{
              background: `radial-gradient(ellipse, ${product.accentHex}60, transparent)`,
              border: `2px solid ${product.accentHex}40`,
            }}
          />
        </div>

        {/* Glow */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at bottom center, ${product.accentHex}30, transparent 70%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="px-5 pt-5">
        {/* Title + Price */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h1
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: 28,
                fontWeight: 600,
                color: "#1e232d",
                lineHeight: 1.1,
              }}
            >
              {product.title}
            </h1>
            <p className="text-[12px] mt-1" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
              {product.material}
            </p>
          </div>
          <span
            className="text-[24px] font-semibold ml-3"
            style={{ color: "#967952", fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            ${price}
          </span>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed mb-5" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
          {product.description}
        </p>

        {/* Size selector */}
        <div className="mb-5">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-2.5"
            style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          >
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isSelected = size === selectedSize;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="px-3 py-2 rounded-xl text-[12px] font-medium transition-all active:scale-95"
                  style={{
                    background: isSelected ? "#1e232d" : "#fff",
                    color: isSelected ? "#e3c088" : "#1e232d",
                    border: isSelected ? "1.5px solid #967952" : "1px solid rgba(30,35,45,0.12)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  <span className="block">{sizeLabels[size].label}</span>
                  <span className="block text-[10px] opacity-60 mt-0.5">{sizeLabels[size].dim}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread Points callout */}
        <div
          className="rounded-xl px-4 py-3 mb-5 flex items-center gap-3"
          style={{ background: "rgba(150,121,82,0.08)", border: "1px solid rgba(150,121,82,0.15)" }}
        >
          <span className="text-lg">✦</span>
          <p className="text-[12px]" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Members earn <strong>{product.threadPoints}</strong> Thread Points on this purchase
          </p>
        </div>

        {/* Add to Bag CTA */}
        <button
          onClick={handleAddToBag}
          className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
          style={{
            background: "linear-gradient(135deg, #967952, #e3c088)",
            color: "#1e232d",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
          }}
        >
          Add to Bag — ${price}
        </button>

        <p className="text-center text-[11px] mt-2.5 mb-4" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          Free shipping for Couture Club members
        </p>
      </div>

      {/* Added to Bag overlay */}
      {addedToBag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(30,35,45,0.6)" }}>
          <div
            className="rounded-3xl px-8 py-6 flex flex-col items-center gap-3 screen-enter"
            style={{ background: "#fff", boxShadow: "0 16px 48px rgba(0,0,0,0.2)" }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #967952, #e3c088)" }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}>
              Added to Bag
            </p>
            <p className="text-[12px]" style={{ color: "#8b8b8b" }}>
              {product.title} — {selectedSize}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
