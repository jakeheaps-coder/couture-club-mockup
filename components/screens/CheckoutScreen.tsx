"use client";

import { useState } from "react";
import type { CartItem } from "@/types";

interface CheckoutScreenProps {
  items: CartItem[];
  onBack: () => void;
  onPlaceOrder: () => void;
}

export default function CheckoutScreen({ items, onBack, onPlaceOrder }: CheckoutScreenProps) {
  const [editingAddress, setEditingAddress] = useState(false);
  const [name, setName] = useState("Ella Johnson");
  const [street, setStreet] = useState("123 Cottonwood Lane");
  const [cityState, setCityState] = useState("Salt Lake City, UT 84101");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPoints = items.reduce((sum, item) => sum + item.price * 2 * item.quantity, 0);

  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "rgba(30,35,45,0.06)" }}
          aria-label="Go back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e232d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <p className="text-[11px] tracking-[0.25em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Checkout
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
            Review Order
          </h2>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-2xl p-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
              Shipping Address
            </p>
            <button
              onClick={() => setEditingAddress(!editingAddress)}
              className="text-[11px] font-medium"
              style={{ color: "#967952" }}
            >
              {editingAddress ? "Done" : "Edit"}
            </button>
          </div>
          {editingAddress ? (
            <div className="flex flex-col gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ border: "1.5px solid rgba(150,121,82,0.3)", color: "#1e232d", fontFamily: "Inter, sans-serif", background: "#f8f5f0" }}
              />
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ border: "1.5px solid rgba(150,121,82,0.3)", color: "#1e232d", fontFamily: "Inter, sans-serif", background: "#f8f5f0" }}
              />
              <input
                value={cityState}
                onChange={(e) => setCityState(e.target.value)}
                className="w-full rounded-lg px-3 py-2 text-[13px] outline-none"
                style={{ border: "1.5px solid rgba(150,121,82,0.3)", color: "#1e232d", fontFamily: "Inter, sans-serif", background: "#f8f5f0" }}
              />
            </div>
          ) : (
            <>
              <p className="text-[13px] font-medium" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>{name}</p>
              <p className="text-[12px] mt-0.5 leading-relaxed" style={{ color: "#8b8b8b" }}>
                {street}<br />
                {cityState}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Payment Method */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-2xl p-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Payment Method
          </p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-7 rounded flex items-center justify-center" style={{ background: "#1e232d" }}>
              <span className="text-[10px] font-bold" style={{ color: "#e3c088" }}>VISA</span>
            </div>
            <div>
              <p className="text-[13px] font-medium" style={{ color: "#1e232d" }}>•••• •••• •••• 4242</p>
              <p className="text-[11px]" style={{ color: "#8b8b8b" }}>Expires 08/27</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mx-5 mb-4">
        <div
          className="rounded-2xl p-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Items ({items.reduce((s, i) => s + i.quantity, 0)})
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
        </div>
      </div>

      {/* Order Summary */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-2xl p-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
        >
          <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Order Summary
          </p>
          <div className="flex justify-between mb-2">
            <span className="text-[13px]" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>Subtotal</span>
            <span className="text-[13px] font-medium" style={{ color: "#1e232d" }}>${subtotal}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[13px]" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>Shipping</span>
            <span className="text-[13px] font-medium" style={{ color: "#967952" }}>Free</span>
          </div>
          <div className="h-px my-3" style={{ background: "rgba(30,35,45,0.08)" }} />
          <div className="flex justify-between">
            <span className="text-[15px] font-semibold" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>Total</span>
            <span
              className="text-[20px] font-semibold"
              style={{ color: "#1e232d", fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              ${subtotal}
            </span>
          </div>
        </div>
      </div>

      {/* Thread Points Earned */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-xl px-4 py-3 flex items-center gap-3"
          style={{ background: "rgba(150,121,82,0.08)", border: "1px solid rgba(150,121,82,0.15)" }}
        >
          <span className="text-lg">✦</span>
          <p className="text-[12px]" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            You&apos;ll earn <strong>+{totalPoints}</strong> Thread Points on this order
          </p>
        </div>
      </div>

      {/* Place Order CTA */}
      <div className="mx-5">
        <button
          onClick={onPlaceOrder}
          className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
          style={{
            background: "linear-gradient(135deg, #967952, #e3c088)",
            color: "#1e232d",
            letterSpacing: "0.1em",
            boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
          }}
        >
          Place Order — ${subtotal}
        </button>
        <p className="text-center text-[11px] mt-2" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
          Free shipping for Couture Club members
        </p>
      </div>
    </div>
  );
}
