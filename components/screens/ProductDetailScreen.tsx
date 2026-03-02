"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product, Size } from "@/types";
import { getProductsByCollection } from "@/lib/api";

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onAddToCart?: (product: Product, size: Size, quantity: number) => void;
  onSelectProduct?: (product: Product) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

const sizeLabels: Record<Size, { label: string; dim: string }> = {
  Infant: { label: "Infant", dim: '30"×36"' },
  Tween: { label: "Tween", dim: '36"×50"' },
  Travel: { label: "Travel", dim: '36"×60"' },
  Adult: { label: "Adult", dim: '50"×60"' },
  Monster: { label: "Monster", dim: '60"×72"' },
  Grande: { label: "Grande", dim: '60"×84"' },
};

export default function ProductDetailScreen({ product, onBack, onAddToCart, onSelectProduct, cartCount = 0, onOpenCart }: ProductDetailScreenProps) {
  const availableSizes = [...new Set(product.variants.map((v) => v.size))];
  const [selectedSize, setSelectedSize] = useState<Size>("Adult");
  const [quantity, setQuantity] = useState(1);
  const [addedToBag, setAddedToBag] = useState(false);

  const selectedVariant = product.variants.find((v) => v.size === selectedSize);
  const price = selectedVariant?.price ?? product.priceRange.min;
  const totalPrice = price * quantity;
  const isSoldOut = selectedVariant ? !selectedVariant.available : false;

  const handleAddToBag = () => {
    if (isSoldOut) return;
    onAddToCart?.(product, selectedSize, quantity);
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

        {/* Top right: cart + badge */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span
            className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
            style={{ background: product.accentHex, color: "#1e232d" }}
          >
            {product.collection} Collection
          </span>
          <button
            onClick={onOpenCart}
            className="w-9 h-9 rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(248,245,240,0.9)", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            aria-label="View cart"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "#967952" }}
              >
                {cartCount}
              </span>
            )}
          </button>
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

        {/* Product image or fallback */}
        {product.image ? (
          <div className="absolute inset-0">
            <Image src={product.image} alt={product.title} fill style={{ objectFit: "cover" }} priority />
          </div>
        ) : (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-32 h-32 rounded-3xl opacity-40"
                style={{
                  background: `radial-gradient(ellipse, ${product.accentHex}60, transparent)`,
                  border: `2px solid ${product.accentHex}40`,
                }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at bottom center, ${product.accentHex}30, transparent 70%)`,
              }}
            />
          </>
        )}
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
              const variant = product.variants.find((v) => v.size === size);
              const sizeUnavailable = variant ? !variant.available : false;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="px-3 py-2 rounded-xl text-[12px] font-medium transition-all active:scale-95 relative"
                  style={{
                    background: isSelected ? (sizeUnavailable ? "#4a4a4a" : "#1e232d") : "#fff",
                    color: isSelected ? (sizeUnavailable ? "#8b8b8b" : "#e3c088") : (sizeUnavailable ? "#b0b0b0" : "#1e232d"),
                    border: isSelected ? `1.5px solid ${sizeUnavailable ? "#8b8b8b" : "#967952"}` : "1px solid rgba(30,35,45,0.12)",
                    fontFamily: "Inter, sans-serif",
                    opacity: sizeUnavailable ? 0.7 : 1,
                  }}
                >
                  <span className="block">{sizeLabels[size].label}</span>
                  <span className="block text-[10px] opacity-60 mt-0.5">
                    {sizeUnavailable ? "Sold Out" : sizeLabels[size].dim}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity selector */}
        <div className="mb-5">
          <p
            className="text-[11px] tracking-[0.2em] uppercase mb-2.5"
            style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          >
            Quantity
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] font-medium transition-all active:scale-95"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.12)", color: "#1e232d" }}
            >
              −
            </button>
            <span
              className="text-[18px] font-semibold w-8 text-center"
              style={{ color: "#1e232d", fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(10, q + 1))}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[18px] font-medium transition-all active:scale-95"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.12)", color: "#1e232d" }}
            >
              +
            </button>
            {quantity > 1 && (
              <span className="text-[12px] ml-2" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                ${price} each
              </span>
            )}
          </div>
        </div>

        {/* Thread Points callout */}
        <div
          className="rounded-xl px-4 py-3 mb-5 flex items-center gap-3"
          style={{ background: "rgba(150,121,82,0.08)", border: "1px solid rgba(150,121,82,0.15)" }}
        >
          <span className="text-lg">✦</span>
          <p className="text-[12px]" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Members earn <strong>{price * 2 * quantity}</strong> Thread Points on this purchase
          </p>
        </div>

        {/* Add to Bag CTA */}
        <button
          onClick={handleAddToBag}
          disabled={isSoldOut}
          className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
          style={{
            background: isSoldOut ? "rgba(30,35,45,0.12)" : "linear-gradient(135deg, #967952, #e3c088)",
            color: isSoldOut ? "#8b8b8b" : "#1e232d",
            letterSpacing: "0.1em",
            boxShadow: isSoldOut ? "none" : "0 4px 16px rgba(150,121,82,0.3)",
            cursor: isSoldOut ? "not-allowed" : "pointer",
          }}
        >
          {isSoldOut ? "Sold Out" : `Add to Bag — $${totalPrice}${quantity > 1 ? ` (${quantity} items)` : ""}`}
        </button>

        <p className="text-center text-[11px] mt-2.5 mb-4" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          Free shipping for Couture Club members · Free returns within 30 days
        </p>

        {/* Related Products */}
        {(() => {
          const related = getProductsByCollection(product.collection).filter(p => p.id !== product.id).slice(0, 4);
          if (related.length === 0) return null;
          return (
            <div className="mt-2 mb-4">
              <h3
                className="mb-3"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}
              >
                You May Also Like
              </h3>
              <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {related.map((p) => (
                  <button
                    key={p.id}
                    className="flex-shrink-0 rounded-2xl overflow-hidden text-left transition-all active:scale-98"
                    style={{ width: 130, background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
                    onClick={() => onSelectProduct?.(p)}
                  >
                    <div className="w-full h-24 relative flex items-center justify-center" style={{ background: p.colorHex }}>
                      {p.image ? (
                        <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} />
                      ) : null}
                      {p.tags[0] && (
                        <span className="absolute top-1.5 left-1.5 z-10 text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded-full font-medium" style={{ background: p.accentHex, color: "#1e232d" }}>
                          {p.tags[0]}
                        </span>
                      )}
                    </div>
                    <div className="px-2 py-2">
                      <p className="text-[11px] font-medium text-[#1e232d] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                        {p.title}
                      </p>
                      <p className="text-[12px] font-semibold mt-0.5" style={{ color: "#967952" }}>
                        From ${p.priceRange.min}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })()}
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
              {quantity}x {product.title} — {selectedSize}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
