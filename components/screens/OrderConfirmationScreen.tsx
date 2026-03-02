"use client";

import type { CartItem } from "@/types";
import type { Screen } from "@/components/BottomNav";

interface OrderConfirmationScreenProps {
  items: CartItem[];
  onNavigate: (screen: Screen) => void;
}

const confettiColors = ["#967952", "#e3c088", "#f5e5bb", "#e4b2a0", "#1e232d"];

export default function OrderConfirmationScreen({ items, onNavigate }: OrderConfirmationScreenProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPoints = items.reduce((sum, item) => sum + item.price * 2 * item.quantity, 0);
  const orderNumber = `MC-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%", position: "relative", overflow: "hidden" }}>
      {/* Confetti celebration */}
      <div className="absolute inset-0 pointer-events-none z-10" aria-hidden="true">
        {confettiColors.flatMap((color, ci) =>
          [0, 1].map((i) => (
            <div
              key={`${ci}-${i}`}
              className="confetti-particle"
              style={{
                background: color,
                left: `${10 + (ci * 2 + i) * 8}%`,
                animationDelay: `${(ci * 0.15 + i * 0.3)}s`,
                animationDuration: `${2 + Math.random()}s`,
                width: i === 0 ? 8 : 6,
                height: i === 0 ? 8 : 10,
                borderRadius: i === 0 ? "50%" : "2px",
              }}
            />
          ))
        )}
      </div>

      {/* Gold checkmark hero */}
      <div className="flex flex-col items-center pt-16 pb-8 px-5 relative z-20">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{
            background: "linear-gradient(135deg, #967952, #e3c088)",
            boxShadow: "0 8px 32px rgba(150,121,82,0.35)",
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 32,
            fontWeight: 600,
            color: "#1e232d",
            lineHeight: 1.1,
          }}
        >
          Order Confirmed!
        </h1>
        <p className="text-[13px] mt-2 text-center" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          Thank you for your purchase, Ella.
        </p>

        {/* Order number */}
        <div
          className="mt-4 px-5 py-2.5 rounded-xl"
          style={{ background: "rgba(30,35,45,0.04)", border: "1px solid rgba(30,35,45,0.08)" }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase text-center" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
            Order Number
          </p>
          <p className="text-[16px] font-semibold text-center tracking-wider" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
            {orderNumber}
          </p>
        </div>
      </div>

      {/* Items summary */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-2xl p-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Items Ordered
          </p>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: item.colorHex, border: "1px solid rgba(30,35,45,0.06)" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-[#1e232d] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.title}
                  </p>
                  <p className="text-[10px]" style={{ color: "#8b8b8b" }}>
                    {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <p className="text-[13px] font-semibold" style={{ color: "#967952", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                  ${item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
          <div className="h-px my-3" style={{ background: "rgba(30,35,45,0.08)" }} />
          <div className="flex justify-between">
            <span className="text-[14px] font-semibold" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>Total</span>
            <span className="text-[18px] font-semibold" style={{ color: "#1e232d", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
              ${subtotal}
            </span>
          </div>
        </div>
      </div>

      {/* Delivery estimate */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(30,35,45,0.04)", border: "1px solid rgba(30,35,45,0.08)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#967952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="1" y="3" width="15" height="13" rx="2" ry="2" />
            <path d="M16 8h4l3 3v5h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <div>
            <p className="text-[12px] font-medium" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
              Estimated delivery: 5-7 business days
            </p>
            <p className="text-[11px]" style={{ color: "#8b8b8b" }}>
              Free shipping for Couture Club members
            </p>
          </div>
        </div>
      </div>

      {/* Thread Points earned */}
      <div className="mx-5 mb-6">
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(150,121,82,0.08)", border: "1px solid rgba(150,121,82,0.15)" }}
        >
          <span className="text-lg">✦</span>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
              +{totalPoints} Thread Points Earned
            </p>
            <p className="text-[11px]" style={{ color: "#8b8b8b" }}>
              Points will be added to your account
            </p>
          </div>
        </div>
      </div>

      {/* Heart of Minky */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(228,178,160,0.1)", border: "1px solid rgba(228,178,160,0.2)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e4b2a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <p className="text-[12px] leading-relaxed" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            This purchase brings us one step closer to sending another mini blanket to a child in need.
          </p>
        </div>
      </div>

      {/* Continue Shopping CTA */}
      <div className="mx-5">
        <button
          onClick={() => onNavigate("home")}
          className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
          style={{
            background: "linear-gradient(135deg, #967952, #e3c088)",
            color: "#1e232d",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
