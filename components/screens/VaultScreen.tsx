"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const drops = [
  {
    name: "Midnight Champagne",
    desc: "An app-exclusive dark luxury colorway with gold threading detail.",
    price: "$189",
    color: "#1a1f2e",
    accent: "#e3c088",
    timeLeft: { h: 3, m: 42, s: 17 },
    members: "Grand & Lush only",
    live: true,
  },
  {
    name: "Velvet Noir",
    desc: "Deep obsidian texture with subtle sheen. Limited to 200 units.",
    price: "$219",
    color: "#2a1f2e",
    accent: "#c4a0d4",
    timeLeft: { h: 11, m: 0, s: 0 },
    members: "Grand only",
    live: false,
  },
  {
    name: "Desert Gold",
    desc: "Sun-kissed warm sand tones. Part of the Founders Collection.",
    price: "$175",
    color: "#3d2e1a",
    accent: "#f0c060",
    timeLeft: { h: 23, m: 15, s: 0 },
    members: "All members",
    live: false,
  },
];

export default function VaultScreen() {
  const [seconds, setSeconds] = useState(drops[0].timeLeft.s);
  const [minutes, setMinutes] = useState(drops[0].timeLeft.m);
  const [hours, setHours] = useState(drops[0].timeLeft.h);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => {
            if (m === 0) {
              setHours((h) => (h > 0 ? h - 1 : 0));
              return 59;
            }
            return m - 1;
          });
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      className="w-full pb-24 screen-enter"
      style={{ background: "#1e232d", minHeight: "100%" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: "#967952", boxShadow: "0 0 6px #967952" }}
          />
          <span className="text-[11px] tracking-[0.3em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Members Only
          </span>
        </div>
        <h2
          className="gold-shimmer"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 36,
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          The Vault
        </h2>
        <p className="text-[13px] mt-1" style={{ color: "rgba(248,245,240,0.5)", fontFamily: "Inter, sans-serif" }}>
          Exclusive drops. For members only.
        </p>
      </div>

      {/* Live drop */}
      <div className="mx-5 mt-4 mb-5">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #2e3547 0%, #1a1f2e 100%)",
            border: "1px solid rgba(227,192,136,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Drop hero */}
          <div
            className="relative w-full h-44 flex items-center justify-center"
            style={{ background: drops[0].color }}
          >
            {/* Background image */}
            <Image src="/images/vault-box.png" alt="The Vault" fill style={{ objectFit: "cover", opacity: 0.4 }} />
            {/* Glow */}
            <div
              className="absolute inset-0 opacity-50"
              style={{
                background: "radial-gradient(ellipse at center, #e3c088 0%, transparent 70%)",
              }}
            />
            {/* Lock/unlock icon */}
            <button
              className="relative z-10 transition-all duration-500 active:scale-90"
              onClick={() => setUnlocked((u) => !u)}
            >
              {unlocked ? (
                <div className="flex flex-col items-center gap-1">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#e3c088" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 019.9-1"/>
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "#e3c088" }}>Tap to lock</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(227,192,136,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0110 0v4"/>
                    <circle cx="12" cy="16" r="1.5" fill="rgba(227,192,136,0.6)"/>
                  </svg>
                  <span className="text-[10px] tracking-widest uppercase" style={{ color: "rgba(227,192,136,0.6)" }}>Tap to unlock</span>
                </div>
              )}
            </button>

            {/* LIVE badge */}
            <div
              className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(227,192,136,0.15)", border: "1px solid rgba(227,192,136,0.3)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full countdown-pulse" style={{ background: "#e3c088" }} />
              <span className="text-[10px] tracking-wider uppercase font-medium" style={{ color: "#e3c088" }}>Live</span>
            </div>
          </div>

          {/* Drop info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: "#f8f5f0",
                  }}
                >
                  {drops[0].name}
                </h3>
                <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: "rgba(248,245,240,0.5)" }}>
                  {drops[0].desc}
                </p>
              </div>
              <span
                className="text-[18px] font-semibold ml-3"
                style={{ color: "#e3c088", fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {drops[0].price}
              </span>
            </div>

            {/* Countdown */}
            <div
              className="rounded-xl p-3 mb-3 flex items-center justify-between"
              style={{ background: "rgba(0,0,0,0.3)" }}
            >
              <span className="text-[11px] tracking-wide" style={{ color: "rgba(248,245,240,0.4)" }}>
                Drops in
              </span>
              <div className="flex items-center gap-2">
                {[pad(hours), pad(minutes), pad(seconds)].map((unit, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <span
                        className="text-[24px] font-bold tabular-nums"
                        style={{
                          color: "#e3c088",
                          fontFamily: "Inter, sans-serif",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {unit}
                      </span>
                      <span className="text-[8px] tracking-widest uppercase" style={{ color: "rgba(248,245,240,0.3)" }}>
                        {["hrs", "min", "sec"][i]}
                      </span>
                    </div>
                    {i < 2 && <span className="text-[20px] font-light pb-3" style={{ color: "#967952" }}>:</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] tracking-wide px-2 py-0.5 rounded-full" style={{ background: "rgba(150,121,82,0.2)", color: "#e3c088" }}>
                {drops[0].members}
              </span>
            </div>

            <button
              className="w-full py-3 rounded-xl text-[13px] font-semibold tracking-wider uppercase transition-all active:scale-98"
              style={{
                background: "linear-gradient(135deg, #967952, #e3c088)",
                color: "#1e232d",
                letterSpacing: "0.1em",
              }}
            >
              {unlocked ? "Shop This Drop" : "Unlock to Shop"}
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming drops */}
      <div className="px-5">
        <h3
          className="mb-3"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 18,
            fontWeight: 600,
            color: "#f8f5f0",
          }}
        >
          Upcoming Drops
        </h3>
        <div className="flex flex-col gap-3">
          {drops.slice(1).map((drop) => (
            <div
              key={drop.name}
              className="rounded-2xl flex items-center gap-3 p-3"
              style={{
                background: "rgba(248,245,240,0.05)",
                border: "1px solid rgba(248,245,240,0.08)",
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex-shrink-0"
                style={{ background: drop.color, border: `1px solid ${drop.accent}30` }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium truncate"
                  style={{ color: "#f8f5f0", fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 16 }}
                >
                  {drop.name}
                </p>
                <p className="text-[11px]" style={{ color: "rgba(248,245,240,0.4)" }}>
                  in {drop.timeLeft.h}h {drop.timeLeft.m > 0 ? `${drop.timeLeft.m}m` : ""}
                </p>
                <span className="text-[10px]" style={{ color: drop.accent }}>{drop.members}</span>
              </div>
              <button
                className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium tracking-wide uppercase"
                style={{ border: `1px solid rgba(227,192,136,0.3)`, color: "#e3c088" }}
              >
                Notify
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
