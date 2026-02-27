"use client";

import React from "react";

export type Screen =
  | "splash"
  | "home"
  | "shop"
  | "loyalty"
  | "studio"
  | "heart"
  | "profile"
  | "product-detail"
  | "about"
  | "content-detail";

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
}

const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    id: "shop",
    label: "Shop",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
    ),
  },
  {
    id: "loyalty",
    label: "Loyalty",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    id: "studio",
    label: "Studio",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    ),
  },
  {
    id: "heart",
    label: "Heart",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
    ),
  },
];

// Screens that should not show the bottom nav
const hiddenScreens: Screen[] = ["splash", "product-detail", "about", "content-detail"];

export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  if (hiddenScreens.includes(active)) return null;

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50"
      style={{
        background: "rgba(248,245,240,0.96)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(30,35,45,0.08)",
      }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-6">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 px-3 py-1 transition-all duration-200"
              style={{ minWidth: 52 }}
              aria-label={tab.label}
            >
              <div style={{ color: isActive ? "#967952" : "#8b8b8b", transition: "color 0.2s" }}>
                {tab.icon}
              </div>
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: isActive ? "#967952" : "#8b8b8b", fontFamily: "Inter, sans-serif", transition: "color 0.2s" }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full" style={{ background: "#967952", marginTop: -2 }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
