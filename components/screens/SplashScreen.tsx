"use client";

import { useEffect } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#1e232d" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <Image src="/images/hero-blanket.png" alt="" fill style={{ objectFit: "cover" }} priority />
      </div>
      <div className="absolute inset-0" style={{ background: "rgba(30,35,45,0.75)" }} />

      {/* Soft shimmer lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #e3c088, transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ background: "linear-gradient(90deg, transparent, #e3c088, transparent)" }}
      />

      {/* Main content */}
      <div className="flex flex-col items-center gap-5 animate-fade-in">
        {/* Minky Couture logo */}
        <div className="mb-2" style={{ filter: "brightness(2)" }}>
          <Image src="/images/minky-logo.svg" alt="Minky Couture" width={180} height={48} style={{ objectFit: "contain" }} priority />
        </div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-[11px] tracking-[0.35em] uppercase"
            style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          >
            Introducing
          </p>
          <h1
            className="gold-shimmer"
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 48,
              fontWeight: 600,
              letterSpacing: "0.02em",
              lineHeight: 1,
            }}
          >
            Couture Club
          </h1>
          <div
            className="h-px w-32 mt-1"
            style={{ background: "linear-gradient(90deg, transparent, #967952, transparent)" }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-center animate-slide-up-delay"
          style={{
            color: "#f8f5f0",
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: 300,
            letterSpacing: "0.03em",
          }}
        >
          Luxury is a feeling.
          <br />
          <span style={{ color: "#e3c088" }}>Loyalty is the reward.</span>
        </p>
      </div>

      {/* Bottom brand */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 animate-fade-in">
        <p
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 16,
            color: "rgba(248,245,240,0.5)",
            fontStyle: "italic",
          }}
        >
          By Minky Couture
        </p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 18 : 6,
                height: 6,
                background: i === 0 ? "#967952" : "rgba(150,121,82,0.3)",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
