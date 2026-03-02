"use client";

import { useState } from "react";
import Image from "next/image";
import { type Screen } from "../BottomNav";
import { getFeaturedProducts, getFeedItems, getNotifications, getVaultDrops } from "@/lib/api";
import NotificationsOverlay from "../NotificationsOverlay";
import type { Product, FeedItem } from "@/types";

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
  onSelectProduct: (product: Product) => void;
  onSelectContent: (item: FeedItem) => void;
  cartCount?: number;
  onOpenCart?: () => void;
}

export default function HomeScreen({ onNavigate, onSelectProduct, onSelectContent, cartCount = 0, onOpenCart }: HomeScreenProps) {
  const [showNotifs, setShowNotifs] = useState(false);

  const products = getFeaturedProducts();
  const feed = getFeedItems();
  const unreadCount = getNotifications().filter((n) => !n.read).length;

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
      {/* Logo */}
      <div className="flex justify-center pt-3 pb-1">
        <Image src="/images/minky-logo.svg" alt="Minky Couture" width={140} height={32} style={{ objectFit: "contain" }} />
      </div>

      {/* Header */}
      <div className="px-5 pt-1 pb-3 flex items-center justify-between">
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
            Ella Johnson ✦
          </h2>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="relative" onClick={() => setShowNotifs(true)} aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
            {unreadCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "#967952" }}
              >
                {unreadCount}
              </span>
            )}
          </button>
          <button className="relative" onClick={onOpenCart} aria-label="View cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: "#967952" }}
              >
                {cartCount}
              </span>
            )}
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
          <p className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Couture Club Member
          </p>
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

      {/* Vault teaser */}
      {(() => {
        const liveDrop = getVaultDrops().find(d => d.live);
        if (!liveDrop) return null;
        return (
          <button
            className="mx-5 mb-4 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all active:scale-98"
            style={{
              background: "linear-gradient(135deg, #1e232d 0%, #2e3547 100%)",
              border: "1px solid rgba(227,192,136,0.2)",
              boxShadow: "0 4px 20px rgba(30,35,45,0.2)",
            }}
            onClick={() => onNavigate("shop")}
          >
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(227,192,136,0.15)", border: "1px solid rgba(227,192,136,0.3)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e3c088" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <p className="text-[12px] font-semibold" style={{ color: "#e3c088", fontFamily: "Inter, sans-serif" }}>
                  Vault Drop Live
                </p>
                <div className="w-1.5 h-1.5 rounded-full countdown-pulse" style={{ background: "#e3c088" }} />
              </div>
              <p className="text-[11px]" style={{ color: "rgba(248,245,240,0.5)" }}>
                {liveDrop.name} — {liveDrop.tierRestriction}
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(227,192,136,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        );
      })()}

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
              {p.image ? (
                <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} />
              ) : (
                <div
                  className="w-20 h-20 rounded-2xl opacity-60"
                  style={{
                    background: `radial-gradient(ellipse, ${p.accentHex}40, transparent)`,
                    border: `2px solid ${p.accentHex}40`,
                  }}
                />
              )}
              {p.tags[0] && (
                <span
                  className="absolute top-2 left-2 z-10 text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium"
                  style={{ background: p.accentHex, color: "#1e232d" }}
                >
                  {p.tags[0]}
                </span>
              )}
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
          { label: "Shop", screen: "shop" as Screen, iconPath: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" },
          { label: "My Loyalty", screen: "loyalty" as Screen, iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" },
          { label: "Heart", screen: "heart" as Screen, iconPath: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" },
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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#967952" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d={action.iconPath} />
            </svg>
            <span className="text-[10px] font-medium text-[#1e232d]" style={{ fontFamily: "Inter, sans-serif" }}>
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* Notifications overlay */}
      {showNotifs && <NotificationsOverlay onClose={() => setShowNotifs(false)} onNavigate={(screen) => { setShowNotifs(false); onNavigate(screen as Screen); }} />}
    </div>
  );
}
