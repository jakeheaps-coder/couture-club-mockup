"use client";

import { useState } from "react";
import Image from "next/image";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    label: "Welcome to the Club",
    heading: "Luxury is a feeling.\nLoyalty is the reward.",
    body: "Couture Club is your all-access pass to app-exclusive products, VIP rewards, and a community that gives back. 100% women-owned, family-founded since 2009.",
    bgColor: "#1e232d",
    accentColor: "#e3c088",
    image: "/images/hero-blanket.png",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e3c088" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Thread Count Rewards",
    heading: "Earn with\nevery purchase.",
    body: "Earn 2 Thread Points for every $1 you spend. Rise from Petal to Lush to Grand — unlocking free shipping, early access to Vault drops, VIP events, and more.",
    bgColor: "#1e232d",
    accentColor: "#e3c088",
    image: null,
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e3c088" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Heart of Minky",
    heading: "Every purchase\ngives back.",
    body: "We've donated over 155,000 mini blankets to NICUs and hospitals across all 50 states. When you buy a Minky, you're wrapping someone else in comfort too.",
    bgColor: "#1e232d",
    accentColor: "#e4b2a0",
    image: "/images/heart-giving.png",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e4b2a0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
  },
];

const tierPreview = [
  { name: "Petal", color: "#e4b2a0", perks: "Early sale access, birthday bonus" },
  { name: "Lush", color: "#e3c088", perks: "Free shipping, exclusive colorways" },
  { name: "Grand", color: "#967952", perks: "Vault access, concierge, VIP events" },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const isLast = current === slides.length - 1;

  return (
    <div className="w-full h-full screen-enter" style={{ background: slide.bgColor, position: "relative", overflow: "hidden" }}>
      {/* Background image overlay */}
      {slide.image && (
        <div className="absolute inset-0">
          <Image src={slide.image} alt="" fill style={{ objectFit: "cover", opacity: 0.15 }} />
        </div>
      )}

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-5 right-5 z-30 text-[12px] tracking-wider"
        style={{ color: "rgba(248,245,240,0.5)", fontFamily: "Inter, sans-serif" }}
      >
        Skip
      </button>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full px-7 pt-20 pb-10">
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
          style={{ background: `${slide.accentColor}15` }}
        >
          {slide.icon}
        </div>

        {/* Label */}
        <p
          className="text-[11px] tracking-[0.35em] uppercase mb-3"
          style={{ color: slide.accentColor, fontFamily: "Inter, sans-serif" }}
        >
          {slide.label}
        </p>

        {/* Heading */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 36,
            fontWeight: 600,
            color: "#f8f5f0",
            lineHeight: 1.1,
            whiteSpace: "pre-line",
          }}
        >
          {slide.heading}
        </h1>

        {/* Body */}
        <p
          className="text-[14px] leading-relaxed mb-6"
          style={{ color: "rgba(248,245,240,0.7)", fontFamily: "Inter, sans-serif", maxWidth: 320 }}
        >
          {slide.body}
        </p>

        {/* Slide-specific content */}
        {current === 1 && (
          <div className="flex flex-col gap-2 mb-6">
            {tierPreview.map((tier) => (
              <div
                key={tier.name}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                style={{ background: "rgba(248,245,240,0.06)" }}
              >
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: tier.color }} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: tier.color, fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                    {tier.name}
                  </p>
                  <p className="text-[10px]" style={{ color: "rgba(248,245,240,0.5)" }}>{tier.perks}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {current === 2 && (
          <div className="flex gap-4 mb-6">
            {[
              { num: "155K+", label: "blankets donated" },
              { num: "$5.5M+", label: "donated value" },
              { num: "300+", label: "partner hospitals" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-[20px] font-semibold" style={{ color: "#e4b2a0", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                  {stat.num}
                </p>
                <p className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(248,245,240,0.4)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-5">
          {slides.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? slide.accentColor : "rgba(248,245,240,0.2)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => (isLast ? onComplete() : setCurrent(current + 1))}
          className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
          style={{
            background: `linear-gradient(135deg, ${slide.accentColor}, ${current === 2 ? "#f0c8b8" : "#f5e5bb"})`,
            color: "#1e232d",
            letterSpacing: "0.1em",
            boxShadow: `0 4px 16px ${slide.accentColor}50`,
          }}
        >
          {isLast ? "Enter the Club" : "Next"}
        </button>
      </div>
    </div>
  );
}
