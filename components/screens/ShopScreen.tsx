"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { getCollections, getProductsByCollection, getFeaturedProducts, getVaultDrops, getProductById, searchProducts } from "@/lib/api";
import CartBadge from "@/components/CartBadge";
import type { Product, CollectionHandle } from "@/types";

interface ShopScreenProps {
  onSelectProduct: (product: Product) => void;
  vaultEndTime: number;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function ShopScreen({ onSelectProduct, vaultEndTime, cartCount = 0, onOpenCart }: ShopScreenProps) {
  const [activeCollection, setActiveCollection] = useState<CollectionHandle | "all">("all");
  const [unlocked, setUnlocked] = useState(false);
  const [notified, setNotified] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  const collections = getCollections();
  const vaultDrops = getVaultDrops();
  const liveDrop = vaultDrops.find((d) => d.live);
  const upcomingDrops = vaultDrops.filter((d) => !d.live);

  const isSearching = searchQuery.trim().length > 0;
  const searchResults = isSearching ? searchProducts(searchQuery) : [];

  const products = isSearching
    ? searchResults
    : activeCollection === "all"
      ? getFeaturedProducts()
      : getProductsByCollection(activeCollection);

  // Countdown timer
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, vaultEndTime - Date.now());
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setTimeLeft({ h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [vaultEndTime]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* ── The Vault Section ─────────────────────────────────── */}
      <div style={{ background: "#1e232d" }} className="pb-5">
        <div className="px-5 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full" style={{ background: "#967952", boxShadow: "0 0 6px #967952" }} />
                <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
                  Members Only
                </span>
              </div>
              <h2
                className="gold-shimmer"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 30, fontWeight: 600, lineHeight: 1 }}
              >
                The Vault
              </h2>
            </div>
            <CartBadge count={cartCount} onClick={onOpenCart} variant="light" />
          </div>
          <p className="text-[12px] mt-1" style={{ color: "rgba(248,245,240,0.5)", fontFamily: "Inter, sans-serif" }}>
            Exclusive limited-edition drops available only to Couture Club members. Once they&apos;re gone, they&apos;re gone.
          </p>
        </div>

        {liveDrop && (
          <div className="mx-5 mt-2">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(160deg, #2e3547, #1a1f2e)",
                border: "1px solid rgba(227,192,136,0.2)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {/* Hero area */}
              <div className="relative w-full h-36 flex items-center justify-center" style={{ background: liveDrop.colorHex }}>
                {(() => { const p = getProductById(liveDrop.productId); return p?.image ? <Image src={p.image} alt={liveDrop.name} fill style={{ objectFit: "cover", opacity: 0.6 }} /> : <Image src="/images/vault-box.png" alt="The Vault" fill style={{ objectFit: "cover", opacity: 0.4 }} />; })()}
                <div className="absolute inset-0 opacity-50" style={{ background: "radial-gradient(ellipse at center, #e3c088 0%, transparent 70%)" }} />
                <button
                  className="relative z-10 transition-all duration-500 active:scale-90"
                  onClick={() => setUnlocked((u) => !u)}
                  aria-label={unlocked ? "Lock this drop" : "Unlock this drop"}
                >
                  {unlocked ? (
                    <div className="flex flex-col items-center gap-1">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#e3c088" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 019.9-1" />
                      </svg>
                      <span className="text-[9px] tracking-widest uppercase" style={{ color: "#e3c088" }}>Tap to lock</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(227,192,136,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                        <circle cx="12" cy="16" r="1.5" fill="rgba(227,192,136,0.6)" />
                      </svg>
                      <span className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(227,192,136,0.6)" }}>Tap to unlock</span>
                    </div>
                  )}
                </button>
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: "rgba(227,192,136,0.15)", border: "1px solid rgba(227,192,136,0.3)" }}>
                  <div className="w-1.5 h-1.5 rounded-full countdown-pulse" style={{ background: "#e3c088" }} />
                  <span className="text-[10px] tracking-wider uppercase font-medium" style={{ color: "#e3c088" }}>Live</span>
                </div>
              </div>

              {/* Drop info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#f8f5f0" }}>
                      {liveDrop.name}
                    </h3>
                    <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "rgba(248,245,240,0.5)" }}>
                      {liveDrop.description}
                    </p>
                  </div>
                  <span className="text-[18px] font-semibold ml-3" style={{ color: "#e3c088", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                    {liveDrop.price}
                  </span>
                </div>

                {/* Countdown */}
                <div className="rounded-xl p-3 mb-3 flex items-center justify-between" style={{ background: "rgba(0,0,0,0.3)" }} aria-live="polite">
                  <span className="text-[11px] tracking-wide" style={{ color: "rgba(248,245,240,0.4)" }}>Drops in</span>
                  <div className="flex items-center gap-2">
                    {[pad(timeLeft.h), pad(timeLeft.m), pad(timeLeft.s)].map((unit, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-[22px] font-bold tabular-nums" style={{ color: "#e3c088", fontFamily: "Inter, sans-serif", fontVariantNumeric: "tabular-nums" }}>
                            {unit}
                          </span>
                          <span className="text-[8px] tracking-widest uppercase" style={{ color: "rgba(248,245,240,0.3)" }}>
                            {["hrs", "min", "sec"][i]}
                          </span>
                        </div>
                        {i < 2 && <span className="text-[18px] font-light pb-3" style={{ color: "#967952" }}>:</span>}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] tracking-wide px-2 py-0.5 rounded-full" style={{ background: "rgba(150,121,82,0.2)", color: "#e3c088" }}>
                    {liveDrop.tierRestriction}
                  </span>
                </div>

                <button
                  className="w-full py-3 rounded-xl text-[13px] font-semibold tracking-wider uppercase transition-all active:scale-98"
                  style={{ background: "linear-gradient(135deg, #967952, #e3c088)", color: "#1e232d", letterSpacing: "0.1em" }}
                  onClick={() => {
                    if (unlocked && liveDrop) {
                      const product = getProductById(liveDrop.productId);
                      if (product) onSelectProduct(product);
                    } else {
                      setUnlocked(true);
                    }
                  }}
                >
                  {unlocked ? "Shop This Drop" : "Unlock to Shop"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming drops horizontal scroll */}
        {upcomingDrops.length > 0 && (
          <div className="mt-4 px-5">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
              Upcoming Drops
            </p>
            <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {upcomingDrops.map((drop) => (
                <div
                  key={drop.id}
                  className="flex-shrink-0 rounded-xl p-3 flex items-center gap-3"
                  style={{ background: "rgba(248,245,240,0.05)", border: "1px solid rgba(248,245,240,0.08)", width: 260 }}
                >
                  <div className="w-12 h-12 rounded-lg flex-shrink-0" style={{ background: drop.colorHex, border: `1px solid ${drop.accentHex}30` }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate" style={{ color: "#f8f5f0", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 15 }}>
                      {drop.name}
                    </p>
                    <p className="text-[10px]" style={{ color: "rgba(248,245,240,0.4)" }}>
                      in {drop.countdownHours}h {drop.countdownMinutes > 0 ? `${drop.countdownMinutes}m` : ""}
                    </p>
                    <span className="text-[9px]" style={{ color: drop.accentHex }}>{drop.tierRestriction}</span>
                  </div>
                  <button
                    onClick={() => setNotified((prev) => new Set(prev).add(drop.id))}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-medium tracking-wide uppercase transition-all"
                    style={{
                      border: notified.has(drop.id) ? "1px solid rgba(150,121,82,0.5)" : "1px solid rgba(227,192,136,0.3)",
                      color: "#e3c088",
                      background: notified.has(drop.id) ? "rgba(150,121,82,0.15)" : "transparent",
                    }}
                    aria-label={`Notify me about ${drop.name}`}
                  >
                    {notified.has(drop.id) ? "Notified ✓" : "Notify"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Shop by Collection ───────────────────────────────── */}
      <div className="px-5 pt-5">
        <h2
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 22, fontWeight: 600, color: "#1e232d" }}
        >
          Shop by Collection
        </h2>
        <p className="text-[12px] mb-3" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          {activeCollection !== "all"
            ? collections.find(c => c.handle === activeCollection)?.tagline ?? "The original luxury blanket. Est. 2009."
            : "The original luxury blanket. Est. 2009."}
        </p>

        {/* Search input */}
        <div className="relative mb-3">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blankets..."
            className="w-full rounded-xl pl-9 pr-9 py-2.5 text-[13px] outline-none transition-all"
            style={{
              border: searchQuery ? "1.5px solid rgba(150,121,82,0.4)" : "1.5px solid rgba(30,35,45,0.08)",
              color: "#1e232d",
              fontFamily: "Inter, sans-serif",
              background: "#fff",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label="Clear search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Search results header or collection pills */}
        {isSearching ? (
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px]" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="text-[12px] font-medium"
              style={{ color: "#967952" }}
            >
              Clear
            </button>
          </div>
        ) : (
          <div className="flex gap-2 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setActiveCollection("all")}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all"
              style={{
                background: activeCollection === "all" ? "#1e232d" : "#fff",
                color: activeCollection === "all" ? "#e3c088" : "#1e232d",
                border: activeCollection === "all" ? "1px solid #967952" : "1px solid rgba(30,35,45,0.1)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Featured
            </button>
            {collections.map((col) => (
              <button
                key={col.handle}
                onClick={() => setActiveCollection(col.handle)}
                className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all"
                style={{
                  background: activeCollection === col.handle ? "#1e232d" : "#fff",
                  color: activeCollection === col.handle ? "#e3c088" : "#1e232d",
                  border: activeCollection === col.handle ? "1px solid #967952" : "1px solid rgba(30,35,45,0.1)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {col.title}
              </button>
            ))}
          </div>
        )}

        {/* Empty search state */}
        {isSearching && searchResults.length === 0 && (
          <div className="flex flex-col items-center py-12 px-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(150,121,82,0.08)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#967952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}>
              Nothing matches &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-[12px] mt-1 mb-4 text-center" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
              Try a different search or explore our collections
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              {collections.slice(0, 4).map((col) => (
                <button
                  key={col.handle}
                  onClick={() => { setSearchQuery(""); setActiveCollection(col.handle); }}
                  className="px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide"
                  style={{ border: "1px solid rgba(150,121,82,0.3)", color: "#967952", fontFamily: "Inter, sans-serif" }}
                >
                  {col.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="rounded-2xl overflow-hidden text-left transition-all active:scale-98"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
            >
              <div className="w-full h-32 relative flex items-center justify-center" style={{ background: product.colorHex }}>
                {product.image ? (
                  <Image src={product.image} alt={product.title} fill style={{ objectFit: "cover" }} />
                ) : (
                  <div
                    className="w-16 h-16 rounded-2xl opacity-40"
                    style={{
                      background: `radial-gradient(ellipse, ${product.accentHex}50, transparent)`,
                      border: `2px solid ${product.accentHex}30`,
                    }}
                  />
                )}
                {product.tags[0] && (
                  <span
                    className="absolute top-2 left-2 z-10 text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                    style={{ background: product.accentHex, color: "#1e232d" }}
                  >
                    {product.tags[0]}
                  </span>
                )}
                {product.variants.some(v => !v.available) && (
                  <span
                    className="absolute bottom-2 right-2 z-10 text-[7px] tracking-widest uppercase px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: "rgba(30,35,45,0.7)", color: "#e3c088", backdropFilter: "blur(4px)" }}
                  >
                    Selling Fast
                  </span>
                )}
              </div>
              <div className="px-2.5 py-2">
                <p className="text-[12px] font-medium text-[#1e232d] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                  {product.title}
                </p>
                <p className="text-[11px] mt-0.5" style={{ color: "#8b8b8b" }}>
                  {product.collection.charAt(0).toUpperCase() + product.collection.slice(1)}
                </p>
                <p className="text-[13px] font-semibold mt-0.5" style={{ color: "#967952" }}>
                  From ${product.priceRange.min}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
