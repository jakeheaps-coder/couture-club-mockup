"use client";

import { useState } from "react";
import type { CartItem } from "@/types";

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  onContinueShopping: () => void;
  onCheckout?: () => void;
}

export default function CartScreen({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onBack,
  onContinueShopping,
  onCheckout,
}: CartScreenProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPoints = items.reduce((sum, item) => sum + (item.price * 2) * item.quantity, 0);
  const isEmpty = items.length === 0;

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      setPromoApplied(true);
    }
  };

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
            Your Bag
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
            {isEmpty ? "Your Bag is Empty" : `${items.reduce((s, i) => s + i.quantity, 0)} Items`}
          </h2>
        </div>
      </div>

      {isEmpty ? (
        <div className="flex flex-col items-center justify-center px-8 pt-16">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
            style={{ background: "rgba(150,121,82,0.08)" }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#967952" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <p
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 22, fontWeight: 600, color: "#1e232d" }}
          >
            Nothing here yet
          </p>
          <p className="text-[13px] mt-1 mb-6 text-center" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
            Browse our collections and add your favorites.
          </p>
          <button
            onClick={onContinueShopping}
            className="px-6 py-3 rounded-2xl text-[13px] font-semibold tracking-wider uppercase transition-all active:scale-98"
            style={{
              background: "linear-gradient(135deg, #967952, #e3c088)",
              color: "#1e232d",
              boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
            }}
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart items */}
          <div className="px-5 flex flex-col gap-3 mb-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl p-3 flex gap-3"
                style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
              >
                {/* Color swatch */}
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ background: item.colorHex, border: "1px solid rgba(30,35,45,0.06)" }}
                />

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[13px] font-medium text-[#1e232d] leading-tight" style={{ fontFamily: "Inter, sans-serif" }}>
                        {item.title}
                      </p>
                      <p className="text-[11px] mt-0.5" style={{ color: "#8b8b8b" }}>
                        Size: {item.size}
                      </p>
                    </div>
                    {/* Remove button with confirmation */}
                    {confirmRemoveId === item.id ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            onRemoveItem(item.id);
                            setConfirmRemoveId(null);
                          }}
                          className="px-2 py-1 rounded-lg text-[10px] font-semibold tracking-wide uppercase"
                          style={{ background: "rgba(196,144,128,0.12)", color: "#c49080", border: "1px solid rgba(196,144,128,0.25)" }}
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => setConfirmRemoveId(null)}
                          className="px-2 py-1 rounded-lg text-[10px] font-medium"
                          style={{ color: "#8b8b8b", border: "1px solid rgba(30,35,45,0.1)" }}
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmRemoveId(item.id)}
                        className="p-1"
                        aria-label={`Remove ${item.title}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Quantity + Price row */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[14px]"
                        style={{ background: "rgba(30,35,45,0.06)", color: "#1e232d" }}
                      >
                        −
                      </button>
                      <span className="text-[14px] font-semibold w-5 text-center" style={{ color: "#1e232d" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.min(10, item.quantity + 1))}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[14px]"
                        style={{ background: "rgba(30,35,45,0.06)", color: "#1e232d" }}
                      >
                        +
                      </button>
                    </div>
                    <p className="text-[15px] font-semibold" style={{ color: "#967952", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                      ${item.price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div className="mx-5 mb-4">
            <div
              className="rounded-2xl p-4"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
            >
              <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
                Promo Code
              </p>
              {promoApplied ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex-1 rounded-xl px-3 py-2.5 text-[13px]"
                    style={{ background: "rgba(150,121,82,0.06)", border: "1px solid rgba(150,121,82,0.2)", color: "#967952", fontFamily: "Inter, sans-serif" }}
                  >
                    {promoCode}
                  </div>
                  <span className="text-[12px] font-semibold px-3 py-2.5" style={{ color: "#967952" }}>
                    Applied!
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter code"
                    className="flex-1 rounded-xl px-3 py-2.5 text-[13px] outline-none"
                    style={{
                      border: "1.5px solid rgba(30,35,45,0.1)",
                      color: "#1e232d",
                      fontFamily: "Inter, sans-serif",
                      background: "#f8f5f0",
                    }}
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2.5 rounded-xl text-[12px] font-semibold tracking-wide uppercase"
                    style={{
                      background: promoCode.trim() ? "linear-gradient(135deg, #967952, #e3c088)" : "rgba(30,35,45,0.06)",
                      color: promoCode.trim() ? "#1e232d" : "#8b8b8b",
                    }}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order summary */}
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
              <div className="flex justify-between mb-2">
                <span className="text-[13px]" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>Thread Points earned</span>
                <span className="text-[13px] font-medium" style={{ color: "#967952" }}>+{totalPoints}</span>
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

          {/* Trust signals */}
          <div className="mx-5 mb-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[10px]" style={{ color: "#8b8b8b" }}>Secure checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[10px]" style={{ color: "#8b8b8b" }}>Free returns within 30 days</span>
              </div>
            </div>
          </div>

          {/* Checkout CTA */}
          <div className="mx-5">
            <button
              onClick={() => onCheckout?.()}
              className="w-full py-4 rounded-2xl text-[14px] font-semibold tracking-wider uppercase transition-all active:scale-98"
              style={{
                background: "linear-gradient(135deg, #967952, #e3c088)",
                color: "#1e232d",
                letterSpacing: "0.1em",
                boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
              }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onContinueShopping}
              className="w-full py-3 mt-2 text-[12px] font-medium tracking-wide"
              style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}
