"use client";

import { useState } from "react";
import Image from "next/image";

const tiers = [
  {
    name: "Petal",
    range: "0–1,719 pts",
    color: "#e4b2a0",
    benefits: ["Early sale access", "Birthday bonus points", "Free standard shipping over $100"],
  },
  {
    name: "Lush",
    range: "1,720–4,999 pts",
    color: "#e3c088",
    benefits: ["Priority early drop access", "Free shipping on all orders", "Exclusive colorways", "Quarterly surprise gift"],
  },
  {
    name: "Grand",
    range: "5,000+ pts",
    color: "#967952",
    benefits: [
      "First access to all Vault drops",
      "Concierge support line",
      "App-only charity drops",
      "VIP event invitations",
      "Personalized monogram credit",
      "Donation made in your name",
    ],
  },
];

const history = [
  { label: "Purchase — Dusty Rose Garden", pts: "+320", date: "Feb 18" },
  { label: "First App Order Bonus", pts: "+200", date: "Feb 10" },
  { label: "Birthday Bonus", pts: "+100", date: "Jan 28" },
  { label: "Purchase — Cream Velvet", pts: "+280", date: "Jan 15" },
  { label: "Referral Bonus", pts: "+150", date: "Jan 3" },
];

export default function LoyaltyScreen() {
  const [activeTab, setActiveTab] = useState<"benefits" | "history">("benefits");
  const currentPoints = 1240;
  const nextTierPoints = 1720;
  const progress = (currentPoints / nextTierPoints) * 100;

  return (
    <div
      className="w-full pb-24 screen-enter"
      style={{ background: "#f8f5f0", minHeight: "100%" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          Membership
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 30,
            fontWeight: 600,
            color: "#1e232d",
            lineHeight: 1,
          }}
        >
          Thread Count<br />Rewards
        </h2>
      </div>

      {/* Member card */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #1e232d 0%, #2a3040 40%, #1e232d 100%)",
            boxShadow: "0 12px 40px rgba(30,35,45,0.3)",
            minHeight: 180,
          }}
        >
          {/* Gold foil background */}
          <div className="absolute inset-0 opacity-15">
            <Image src="/images/loyalty-bg.png" alt="" fill style={{ objectFit: "cover" }} />
          </div>

          {/* Card top row */}
          <div className="relative flex items-start justify-between mb-4">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: "rgba(227,192,136,0.6)", fontFamily: "Inter, sans-serif" }}>
                Couture Club
              </p>
              <p
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#f8f5f0",
                }}
              >
                Ella Johnson
              </p>
            </div>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #967952, #e3c088)",
              }}
            >
              <span
                style={{
                  fontFamily: "Cormorant Garamond, Georgia, serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#1e232d",
                }}
              >
                MC
              </span>
            </div>
          </div>

          {/* Points */}
          <div className="relative mb-4">
            <p
              className="gold-shimmer"
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: 40,
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              1,240
            </p>
            <p className="text-[11px] tracking-[0.15em] uppercase mt-0.5" style={{ color: "rgba(248,245,240,0.4)", fontFamily: "Inter, sans-serif" }}>
              Thread Points
            </p>
          </div>

          {/* Tier + progress */}
          <div className="relative">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
                  style={{ background: "rgba(228,178,160,0.2)", color: "#e4b2a0", border: "1px solid rgba(228,178,160,0.3)" }}
                >
                  Petal
                </span>
                <span className="text-[10px]" style={{ color: "rgba(248,245,240,0.3)" }}>→</span>
                <span className="text-[11px]" style={{ color: "rgba(248,245,240,0.3)", fontFamily: "Inter, sans-serif" }}>Lush</span>
              </div>
              <span className="text-[11px]" style={{ color: "rgba(248,245,240,0.4)", fontFamily: "Inter, sans-serif" }}>
                480 pts to go
              </span>
            </div>
            <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div className="h-full rounded-full progress-bar" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Member since */}
          <div className="relative mt-3 flex items-center justify-between">
            <span className="text-[10px]" style={{ color: "rgba(248,245,240,0.25)", fontFamily: "Inter, sans-serif" }}>
              Founder Member · Since Jan 2026
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "rgba(150,121,82,0.3)", color: "#e3c088" }}>
              #00847
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-5 mb-4 flex rounded-xl overflow-hidden" style={{ background: "rgba(30,35,45,0.07)" }}>
        {(["benefits", "history"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-2.5 text-[12px] font-medium tracking-wide capitalize transition-all"
            style={{
              fontFamily: "Inter, sans-serif",
              background: activeTab === tab ? "#1e232d" : "transparent",
              color: activeTab === tab ? "#f8f5f0" : "#8b8b8b",
              borderRadius: 12,
            }}
          >
            {tab === "benefits" ? "Tier Benefits" : "Points History"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="px-5">
        {activeTab === "benefits" ? (
          <div className="flex flex-col gap-3">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: idx === 0 ? "1.5px solid rgba(228,178,160,0.5)" : "1px solid rgba(30,35,45,0.08)",
                  background: idx === 0 ? "rgba(228,178,160,0.06)" : "#fff",
                }}
              >
                <div
                  className="px-4 py-2.5 flex items-center justify-between"
                  style={{ borderBottom: "1px solid rgba(30,35,45,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: tier.color }} />
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, Georgia, serif",
                        fontSize: 17,
                        fontWeight: 600,
                        color: "#1e232d",
                      }}
                    >
                      {tier.name}
                    </span>
                  </div>
                  <span className="text-[11px]" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                    {tier.range}
                  </span>
                  {idx === 0 && (
                    <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: "#e4b2a0", color: "#1e232d" }}>
                      You
                    </span>
                  )}
                </div>
                <div className="px-4 py-3 flex flex-col gap-1.5">
                  {tier.benefits.map((b) => (
                    <div key={b} className="flex items-start gap-2">
                      <span style={{ color: tier.color, lineHeight: "20px" }}>✦</span>
                      <span className="text-[12px] leading-relaxed" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {history.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-3 px-4 rounded-xl"
                style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
              >
                <div>
                  <p className="text-[13px] font-medium" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-[11px]" style={{ color: "#8b8b8b" }}>{item.date}</p>
                </div>
                <span
                  className="text-[14px] font-semibold"
                  style={{
                    color: "#967952",
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                  }}
                >
                  {item.pts}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
