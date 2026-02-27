"use client";

import { useState } from "react";
import Image from "next/image";

const impacts = [
  {
    name: "Sarah M.",
    location: "Primary Children's NICU, Utah",
    blankets: 3,
    color: "#e4b2a0",
    quote: "She held it the moment we placed it on her. Our first calm moment in 11 days.",
  },
  {
    name: "The Torres Family",
    location: "St. Jude Children's Hospital, TN",
    blankets: 1,
    color: "#e3c088",
    quote: "It was the only thing that brought him comfort during treatment.",
  },
  {
    name: "Baby Emma",
    location: "Primary Children's NICU, Utah",
    blankets: 2,
    color: "#967952",
    quote: "The nurses said she slept better every night with her Minky. We're forever grateful.",
  },
];

const stats = [
  { value: "155,000+", label: "Blankets donated" },
  { value: "$4M", label: "To Primary Children's" },
  { value: "300+", label: "Partner hospitals" },
];

export default function HeartScreen() {
  const [heartDropNotified, setHeartDropNotified] = useState(false);
  const totalBlankets = 3;
  const nextMilestone = 5;
  const progress = (totalBlankets / nextMilestone) * 100;

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #1e232d 0%, #2e3547 100%)" }}
      >
        <div className="absolute inset-0 opacity-25">
          <Image src="/images/heart-giving.png" alt="" fill style={{ objectFit: "cover" }} />
        </div>
        <div className="absolute inset-0 opacity-80" style={{ background: "linear-gradient(160deg, #1e232d 0%, #2e3547 100%)" }} />
        <div className="relative">
          <p className="text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#e4b2a0", fontFamily: "Inter, sans-serif" }}>
            Philanthropic Program
          </p>
          <h2
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 32,
              fontWeight: 600,
              color: "#f8f5f0",
              lineHeight: 1.1,
            }}
          >
            Heart of Minky
          </h2>
          <p className="text-[13px] mt-2 leading-relaxed" style={{ color: "rgba(248,245,240,0.6)", fontFamily: "Inter, sans-serif" }}>
            Every purchase sends a mini blanket to a child in need.
          </p>
          <p className="text-[11px] mt-1 italic" style={{ color: "rgba(228,178,160,0.7)", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
            &ldquo;It started in a NICU, with one blanket and one family.&rdquo;
          </p>
        </div>
      </div>

      {/* Your impact card */}
      <div className="mx-5 -mt-4 mb-5">
        <div className="rounded-3xl p-5" style={{ background: "#fff", boxShadow: "0 8px 32px rgba(30,35,45,0.12)" }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] tracking-[0.15em] uppercase" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                Heartbeat Tracker
              </p>
              <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d", marginTop: 2 }}>
                Your Impact, Ella
              </p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(228,178,160,0.15)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#e4b2a0" stroke="#e4b2a0" strokeWidth="1">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </div>
          </div>

          <div className="flex items-end gap-3 mb-4">
            <div>
              <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 52, fontWeight: 700, color: "#1e232d", lineHeight: 1 }}>
                3
              </p>
              <p className="text-[12px]" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                Mini blankets sent
              </p>
            </div>
            <div className="pb-1">
              <div className="flex gap-1 mb-1">
                {Array.from({ length: totalBlankets }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-sm" style={{ background: "#e4b2a0" }} />
                ))}
                {Array.from({ length: nextMilestone - totalBlankets }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-sm" style={{ background: "rgba(228,178,160,0.15)", border: "1.5px dashed rgba(228,178,160,0.4)" }} />
                ))}
              </div>
              <p className="text-[10px]" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                {nextMilestone - totalBlankets} more to send your {nextMilestone}th
              </p>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[11px]" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                Next milestone: {nextMilestone} blankets
              </span>
              <span className="text-[11px] font-medium" style={{ color: "#e4b2a0", fontFamily: "Inter, sans-serif" }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-2 rounded-full w-full" style={{ background: "rgba(228,178,160,0.15)" }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #e4b2a0, #967952)" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Global stats — REAL data */}
      <div className="mx-5 mb-5">
        <h3 className="mb-3" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}>
          Our Collective Impact
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center" style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}>
              <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 18, fontWeight: 700, color: "#1e232d", lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="text-[10px] mt-1 leading-tight" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {/* Additional stats */}
        <div className="mt-2 flex gap-2">
          <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: "rgba(228,178,160,0.08)", border: "1px solid rgba(228,178,160,0.15)" }}>
            <p className="text-[13px] font-semibold" style={{ color: "#967952" }}>60,000</p>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8b8b8b" }}>Mini blankets to NICUs annually</p>
          </div>
          <div className="flex-1 rounded-xl px-3 py-2 text-center" style={{ background: "rgba(228,178,160,0.08)", border: "1px solid rgba(228,178,160,0.15)" }}>
            <p className="text-[13px] font-semibold" style={{ color: "#967952" }}>All 50</p>
            <p className="text-[9px] uppercase tracking-wider" style={{ color: "#8b8b8b" }}>States reached</p>
          </div>
        </div>
      </div>

      {/* Origin story */}
      <div className="mx-5 mb-5">
        <div className="rounded-2xl p-4" style={{ background: "linear-gradient(135deg, #1e232d, #2e3547)" }}>
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#e4b2a0", fontFamily: "Inter, sans-serif" }}>
            How It Started
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(248,245,240,0.7)", fontFamily: "Inter, sans-serif" }}>
            When founder Sandi Hendry&apos;s grandson was born premature at just 30 weeks, she placed a mini Minky in the NICU to collect her daughter&apos;s scent and comfort the baby. That moment of comfort inspired the Heart of Minky.
          </p>
          <p className="text-[12px] mt-2" style={{ color: "rgba(228,178,160,0.7)", fontFamily: "Inter, sans-serif" }}>
            Today, $5.5 million in retail value has been donated to families in need.
          </p>
        </div>
      </div>

      {/* Recent impacts */}
      <div className="px-5 mb-5">
        <h3 className="mb-3" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}>
          Recent Recipients
        </h3>
        <div className="flex flex-col gap-3">
          {impacts.map((impact) => (
            <div key={impact.name} className="p-3 rounded-2xl" style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${impact.color}20` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill={impact.color} stroke={impact.color} strokeWidth="1">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[#1e232d]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {impact.name}
                  </p>
                  <p className="text-[11px] text-[#8b8b8b] truncate" style={{ fontFamily: "Inter, sans-serif" }}>
                    {impact.location}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 18, fontWeight: 600, color: impact.color, lineHeight: 1 }}>
                    {impact.blankets}
                  </p>
                  <p className="text-[10px]" style={{ color: "#8b8b8b" }}>
                    {impact.blankets === 1 ? "blanket" : "blankets"}
                  </p>
                </div>
              </div>
              {/* Quote */}
              <p className="text-[12px] italic leading-relaxed pl-13 ml-13" style={{ color: "#4a5568", fontFamily: "Cormorant Garamond, Georgia, serif", paddingLeft: 52 }}>
                &ldquo;{impact.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Charity drop CTA */}
      <div className="mx-5 mb-5">
        <div className="rounded-3xl p-4 flex items-center gap-4" style={{ background: "linear-gradient(135deg, #1e232d 0%, #2e3547 100%)" }}>
          <div className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(228,178,160,0.15)", border: "1px solid rgba(228,178,160,0.3)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e4b2a0" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 16, fontWeight: 600, color: "#f8f5f0" }}>
              Heart Drop — Coming Soon
            </p>
            <p className="text-[11px]" style={{ color: "rgba(248,245,240,0.5)", fontFamily: "Inter, sans-serif" }}>
              100% of proceeds to Primary Children&apos;s NICU
            </p>
          </div>
          <button
            onClick={() => setHeartDropNotified(true)}
            className="px-3 py-2 rounded-xl text-[11px] font-medium tracking-wide flex-shrink-0 transition-all"
            style={{
              background: heartDropNotified ? "rgba(150,121,82,0.15)" : "linear-gradient(135deg, #967952, #e3c088)",
              color: heartDropNotified ? "#e3c088" : "#1e232d",
              border: heartDropNotified ? "1px solid rgba(150,121,82,0.3)" : "none",
            }}
            aria-label="Notify me about Heart Drop"
          >
            {heartDropNotified ? "Notified ✓" : "Notify"}
          </button>
        </div>
      </div>

      {/* YouTube Video Embed */}
      <div className="mx-5 mb-5">
        <h3 className="mb-3" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 20, fontWeight: 600, color: "#1e232d" }}>
          Our Story
        </h3>
        <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(30,35,45,0.12)" }}>
          <iframe
            src="https://www.youtube.com/embed/fSSTTS_1icA"
            title="Heart of Minky — Our Story"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full"
            style={{ height: 200, border: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
