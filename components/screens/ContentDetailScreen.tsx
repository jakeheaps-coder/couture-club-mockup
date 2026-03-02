"use client";

import Image from "next/image";
import type { FeedItem } from "@/types";
import type { Screen } from "@/components/BottomNav";

interface ContentDetailScreenProps {
  item: FeedItem;
  onBack: () => void;
  onNavigate?: (screen: Screen) => void;
}

export default function ContentDetailScreen({ item, onBack, onNavigate }: ContentDetailScreenProps) {
  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Hero */}
      <div className="relative w-full" style={{ height: 220, background: item.bgColor }}>
        {item.image && (
          <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", opacity: 0.5 }} />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 40%, rgba(30,35,45,0.6) 100%)" }}
        />

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

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <span
            className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
            style={{ background: "rgba(248,245,240,0.9)", color: "#967952" }}
          >
            {item.category}
          </span>
        </div>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h1
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#f8f5f0",
              lineHeight: 1.1,
            }}
          >
            {item.title}
          </h1>
          <p className="text-[12px] mt-1" style={{ color: "rgba(248,245,240,0.7)", fontFamily: "Inter, sans-serif" }}>
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-5">
        <p className="text-[14px] leading-relaxed" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
          {item.content}
        </p>

        {/* Divider */}
        <div className="my-6" style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(150,121,82,0.3), transparent)" }} />

        {/* CTA */}
        <button
          className="rounded-2xl p-4 flex items-center gap-3 w-full text-left transition-all active:scale-98"
          style={{
            background: "linear-gradient(135deg, #1e232d, #2e3547)",
            boxShadow: "0 4px 20px rgba(30,35,45,0.2)",
          }}
          onClick={() => onNavigate?.("shop")}
        >
          <div className="flex-1">
            <p className="text-[11px] tracking-[0.2em] uppercase mb-1" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
              Related
            </p>
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 16, fontWeight: 600, color: "#f8f5f0" }}>
              Explore the {item.category === "Vault" ? "Vault Drops" : "Collection"}
            </p>
          </div>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #967952, #e3c088)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
