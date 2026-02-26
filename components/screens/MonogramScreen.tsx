"use client";

import { useState } from "react";

const colors = [
  { name: "Midnight Champagne", hex: "#1a1f2e" },
  { name: "Dusty Rose", hex: "#e4b2a0" },
  { name: "Cream Velvet", hex: "#f0ebe3" },
  { name: "Velvet Noir", hex: "#2a1f2e" },
  { name: "Desert Gold", hex: "#c4943a" },
  { name: "Sage Mist", hex: "#8fa898" },
  { name: "Navy Classic", hex: "#1e232d" },
  { name: "Blush Pearl", hex: "#d4a0a0" },
];

const fonts = ["Classic Serif", "Modern Script", "Bold Block", "Elegant Italic"];
const threadColors = [
  { name: "Gold", hex: "#e3c088" },
  { name: "Silver", hex: "#c0c0c0" },
  { name: "White", hex: "#f8f5f0" },
  { name: "Navy", hex: "#1e232d" },
  { name: "Blush", hex: "#e4b2a0" },
  { name: "Black", hex: "#111" },
];

export default function MonogramScreen() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedFont, setSelectedFont] = useState(0);
  const [selectedThread, setSelectedThread] = useState(0);
  const [monogramText, setMonogramText] = useState("ELJ");

  const blanketColor = colors[selectedColor].hex;
  const threadColor = threadColors[selectedThread].hex;

  // Determine if blanket is light or dark for text contrast
  const isLight = ["#f0ebe3", "#c4943a", "#e4b2a0", "#8fa898", "#d4a0a0"].includes(blanketColor);

  return (
    <div
      className="w-full pb-24 screen-enter"
      style={{ background: "#f8f5f0", minHeight: "100%" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <p className="text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          App Exclusive
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 30,
            fontWeight: 600,
            color: "#1e232d",
            lineHeight: 1.1,
          }}
        >
          Monogram
          <br />
          Studio
        </h2>
      </div>

      {/* Blanket preview */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-3xl w-full relative overflow-hidden flex items-center justify-center"
          style={{
            height: 200,
            background: blanketColor,
            boxShadow: "0 8px 24px rgba(30,35,45,0.15)",
            transition: "background 0.4s ease",
          }}
        >
          {/* Texture lines */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(90deg, ${isLight ? "#00000015" : "#ffffff15"} 0px, ${isLight ? "#00000015" : "#ffffff15"} 1px, transparent 1px, transparent 8px)`,
            }}
          />
          {/* Monogram */}
          <div className="flex flex-col items-center gap-1 relative z-10">
            <p
              style={{
                fontFamily: selectedFont === 1 ? "Dancing Script, cursive" : "Cormorant Garamond, Georgia, serif",
                fontSize: selectedFont === 2 ? 56 : 52,
                fontWeight: selectedFont === 2 ? 800 : 600,
                fontStyle: selectedFont === 3 ? "italic" : "normal",
                color: threadColor,
                letterSpacing: "0.1em",
                textShadow: `0 2px 12px ${threadColor}60`,
                transition: "all 0.3s",
                lineHeight: 1,
              }}
            >
              {monogramText || "MC"}
            </p>
            <div
              className="h-px w-16 mt-1"
              style={{
                background: `linear-gradient(90deg, transparent, ${threadColor}, transparent)`,
                transition: "background 0.3s",
              }}
            />
            <p
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: `${threadColor}80`, fontFamily: "Inter, sans-serif" }}
            >
              Minky Couture
            </p>
          </div>

          {/* App exclusive badge */}
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(30,35,45,0.5)",
              backdropFilter: "blur(4px)",
            }}
          >
            <span className="text-[9px] tracking-widest uppercase" style={{ color: "#e3c088", fontFamily: "Inter, sans-serif" }}>
              App Only
            </span>
          </div>
        </div>
      </div>

      {/* Monogram text */}
      <div className="mx-5 mb-4">
        <label
          className="text-[11px] tracking-[0.2em] uppercase block mb-2"
          style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}
        >
          Your Initials
        </label>
        <div className="flex gap-2">
          {["E", "L", "J"].map((letter, i) => (
            <div
              key={i}
              className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-semibold cursor-pointer"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(150,121,82,0.4)",
                color: "#1e232d",
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: 22,
              }}
            >
              {letter}
            </div>
          ))}
          <div
            className="flex-1 h-14 rounded-xl flex items-center justify-center text-[12px]"
            style={{ background: "rgba(150,121,82,0.08)", border: "1.5px dashed rgba(150,121,82,0.3)", color: "#967952" }}
          >
            Edit
          </div>
        </div>
      </div>

      {/* Blanket color */}
      <div className="mx-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
            Blanket Color
          </label>
          <span className="text-[12px]" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
            {colors[selectedColor].name}
          </span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {colors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setSelectedColor(i)}
              className="flex-shrink-0 rounded-full transition-all"
              style={{
                width: 32,
                height: 32,
                background: c.hex,
                border: selectedColor === i ? "2.5px solid #967952" : "2px solid transparent",
                outline: selectedColor === i ? "2px solid rgba(150,121,82,0.3)" : "none",
                boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Thread color */}
      <div className="mx-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
            Thread Color
          </label>
          <span className="text-[12px]" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
            {threadColors[selectedThread].name}
          </span>
        </div>
        <div className="flex gap-2.5">
          {threadColors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setSelectedThread(i)}
              className="flex-shrink-0 rounded-full transition-all"
              style={{
                width: 28,
                height: 28,
                background: c.hex,
                border: selectedThread === i ? "2.5px solid #967952" : "1.5px solid rgba(30,35,45,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Font style */}
      <div className="mx-5 mb-5">
        <label className="text-[11px] tracking-[0.2em] uppercase block mb-2" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          Font Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((f, i) => (
            <button
              key={f}
              onClick={() => setSelectedFont(i)}
              className="py-2.5 rounded-xl text-[12px] transition-all"
              style={{
                fontFamily: i === 1 ? "Dancing Script, cursive" : "Cormorant Garamond, Georgia, serif",
                fontStyle: i === 3 ? "italic" : "normal",
                fontWeight: i === 2 ? 700 : 500,
                background: selectedFont === i ? "#1e232d" : "#fff",
                color: selectedFont === i ? "#e3c088" : "#1e232d",
                border: "1px solid rgba(30,35,45,0.1)",
                fontSize: i === 1 ? 16 : 13,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mx-5">
        <button
          className="w-full py-4 rounded-2xl text-[13px] font-semibold tracking-widest uppercase transition-all active:scale-98"
          style={{
            background: "linear-gradient(135deg, #967952, #e3c088)",
            color: "#1e232d",
          }}
        >
          Add to Order — $189
        </button>
        <p className="text-center text-[11px] mt-2" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          App-exclusive embroidery · Ships in 5–7 days
        </p>
      </div>
    </div>
  );
}
