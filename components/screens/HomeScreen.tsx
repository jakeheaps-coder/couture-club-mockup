"use client";

import { useState } from "react";
import Image from "next/image";
import { type Screen } from "../BottomNav";
import { getFeaturedProducts, getFeedItems } from "@/lib/api";
import NotificationsOverlay from "../NotificationsOverlay";
import type { Product, FeedItem } from "@/types";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onSelectProduct: (product: Product) => void;
  onSelectContent: (item: FeedItem) => void;
}

export default function HomeScreen({ onNavigate, onSelectProduct, onSelectContent }: HomeScreenProps) {
  const [showNotifs, setShowNotifs] = useState(false);

  const products = getFeaturedProducts();
  const feed = getFeedItems();

  const handleFeedTap = (item: FeedItem) => {
    if (item.navigateTo === "heart") {
      onNavigate("heart");
    } else if (item.navigateTo === "shop") {
      onNavigate("shop");
    } else if (item.navigateTo === "content-detail") {
      onSelectContent(item);
    }
  };

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Welcome back
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              color: "#1e232d",
              lineHeight: 1.1,
            }}
          >
            Ella ✦
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative" onClick={() => setShowNotifs(true)} aria-label="Notifications">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ background: "#967952" }} />
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #967952, #e3c088)" }}
            aria-label="View profile"
          >
            E
          </button>
        </div>
      </div>

      {/* Loyalty mini-card */}
      <div
        className="mx-5 mb-4 rounded-2xl px-4 py-3 flex items-center justify-between cursor-pointer active:scale-98 transition-all"
        style={{
          background: "linear-gradient(135deg, #1e232d 0%, #2e3547 100%)",
          boxShadow: "0 4px 20px rgba(30,35,45,0.2)",
        }}
        onClick={() => onNavigate("loyalty")}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
              Couture Club Member
            </p>
            <span className="text-[8px] tracking-wider px-1.5 py-0.5 rounded-full" style={{ background: "rgba(227,192,136,0.15)", color: "#e3c088" }}>
              Women-Owned
            </span>
          </div>
          <p
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 18,
              fontWeight: 600,
              color: "#e3c088",
            }}
          >
            Petal Tier — 1,240 pts
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] tracking-wider uppercase" style={{ color: "#967952" }}>
            480 to Lush
          </span>
          <div className="w-20 h-1.5 rounded-full" style={{ background: "rgba(227,192,136,0.2)" }}>
            <div className="h-full rounded-full progress-bar" style={{ width: "72%" }} />
          </div>
        </div>
      </div>

      {/* Dream Feed header */}
      <div className="px-5 mb-3 flex items-center justify-between">
        <h3
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#1e232d",
          }}
        >
          Dream Feed
        </h3>
        <button
          className="text-[12px] tracking-wide"
          style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          onClick={() => onNavigate("shop")}
        >
          See All →
        </button>
      </div>

      {/* Feed grid */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-5">
        {feed.map((item) => (
          <button
            key={item.id}
            className="rounded-2xl overflow-hidden text-left transition-all active:scale-98"
            style={{ height: 120, background: item.bgColor, position: "relative" }}
            onClick={() => handleFeedTap(item)}
          >
            {item.image && (
              <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", opacity: 0.6 }} />
            )}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(ellipse at top right, rgba(227,192,136,0.3) 0%, transparent 60%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-[13px] font-semibold text-white leading-tight">{item.title}</p>
              <p className="text-[10px] text-white/60 mt-0.5">{item.subtitle}</p>
            </div>
          </button>
        ))}
      </div>

      {/* App Exclusive Drops */}
      <div className="px-5 mb-3 flex items-center justify-between">
        <h3
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#1e232d",
          }}
        >
          Exclusive Drops
        </h3>
        <button
          className="text-[12px] tracking-wide"
          style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          onClick={() => onNavigate("shop")}
        >
          Shop All →
        </button>
      </div>

      {/* Product scroll */}
      <div className="flex gap-3 px-5 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
        {products.map((p) => (
          <button
            key={p.id}
            className="flex-shrink-0 rounded-2xl overflow-hidden text-left transition-all active:scale-98"
            style={{ width: 140 }}
            onClick={() => onSelectProduct(p)}
          >
            <div
              className="w-full h-36 relative flex items-center justify-center"
              style={{ background: p.colorHex }}
            >
              {p.tags[0] && (
                <span
                  className="absolute top-2 left-2 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                  style={{ background: p.accentHex, color: "#1e232d" }}
                >
                  {p.tags[0]}
                </span>
              )}
              <div
                className="w-20 h-20 rounded-2xl opacity-60"
                style={{
                  background: `radial-gradient(ellipse, ${p.accentHex}40, transparent)`,
                  border: `2px solid ${p.accentHex}40`,
                }}
              />
            </div>
            <div className="px-2 py-2" style={{ background: "#fff" }}>
              <p className="text-[12px] font-medium text-[#1e232d] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                {p.title}
              </p>
              <p className="text-[12px] font-semibold mt-0.5" style={{ color: "#967952" }}>
                From ${p.priceRange.min}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Quick actions */}
      <div className="px-5 mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Shop", icon: "🛍", screen: "shop" as Screen },
          { label: "My Loyalty", icon: "✦", screen: "loyalty" as Screen },
          { label: "Monogram", icon: "✍", screen: "studio" as Screen },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => onNavigate(action.screen)}
            className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl transition-all active:scale-95"
            style={{
              background: "#fff",
              border: "1px solid rgba(30,35,45,0.08)",
              boxShadow: "0 2px 8px rgba(30,35,45,0.06)",
            }}
          >
            <span className="text-lg">{action.icon}</span>
            <span className="text-[10px] font-medium text-[#1e232d]" style={{ fontFamily: "Inter, sans-serif" }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications overlay */}
      {showNotifs && <NotificationsOverlay onClose={() => setShowNotifs(false)} />}
    </div>
  );
}
