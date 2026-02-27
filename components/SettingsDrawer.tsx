"use client";

import { useState } from "react";

interface SettingsDrawerProps {
  section: string;
  onClose: () => void;
}

function NotificationSettings() {
  const [push, setPush] = useState(true);
  const [sms, setSms] = useState(true);
  const [email, setEmail] = useState(false);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className="w-11 h-6 rounded-full transition-all relative"
      style={{ background: on ? "linear-gradient(135deg, #967952, #e3c088)" : "rgba(30,35,45,0.12)" }}
      aria-pressed={on}
    >
      <div
        className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
        style={{ left: on ? 22 : 2, boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }}
      />
    </button>
  );

  return (
    <div className="flex flex-col gap-4">
      {[
        { label: "Push Notifications", desc: "Vault drops, loyalty milestones", on: push, toggle: () => setPush(!push) },
        { label: "SMS Updates", desc: "Order confirmations, shipping", on: sms, toggle: () => setSms(!sms) },
        { label: "Email Marketing", desc: "Weekly newsletter, promotions", on: email, toggle: () => setEmail(!email) },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-medium" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>{item.label}</p>
            <p className="text-[11px]" style={{ color: "#8b8b8b" }}>{item.desc}</p>
          </div>
          <Toggle on={item.on} onToggle={item.toggle} />
        </div>
      ))}
    </div>
  );
}

function ShippingAddress() {
  return (
    <div className="rounded-xl p-4" style={{ background: "rgba(30,35,45,0.03)", border: "1px solid rgba(30,35,45,0.06)" }}>
      <p className="text-[13px] font-medium" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>Ella Johnson</p>
      <p className="text-[12px] mt-1 leading-relaxed" style={{ color: "#8b8b8b" }}>
        123 Cottonwood Lane<br />
        Salt Lake City, UT 84101
      </p>
      <button className="text-[12px] font-medium mt-2" style={{ color: "#967952" }}>Edit Address</button>
    </div>
  );
}

function PaymentMethods() {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl p-4 flex items-center gap-3" style={{ background: "rgba(30,35,45,0.03)", border: "1px solid rgba(30,35,45,0.06)" }}>
        <div className="w-10 h-7 rounded flex items-center justify-center" style={{ background: "#1e232d" }}>
          <span className="text-[10px] font-bold" style={{ color: "#e3c088" }}>VISA</span>
        </div>
        <div>
          <p className="text-[13px] font-medium" style={{ color: "#1e232d" }}>•••• •••• •••• 4242</p>
          <p className="text-[11px]" style={{ color: "#8b8b8b" }}>Expires 08/27</p>
        </div>
      </div>
      <button className="text-[12px] font-medium" style={{ color: "#967952" }}>+ Add Payment Method</button>
    </div>
  );
}

function ReferralCode() {
  const [copied, setCopied] = useState(false);
  const code = "ELLA-MC-2026";

  const handleCopy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[13px] text-center leading-relaxed" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
        Share your code and earn 150 Thread Points for each friend who joins.
      </p>
      <div
        className="rounded-xl px-5 py-3 flex items-center gap-3"
        style={{ background: "linear-gradient(135deg, #1e232d, #2e3547)" }}
      >
        <span className="text-[16px] font-semibold tracking-wider" style={{ color: "#e3c088", fontFamily: "Inter, sans-serif" }}>
          {code}
        </span>
      </div>
      <button
        onClick={handleCopy}
        className="px-4 py-2 rounded-xl text-[12px] font-medium tracking-wider uppercase transition-all active:scale-95"
        style={{
          background: copied ? "rgba(150,121,82,0.15)" : "linear-gradient(135deg, #967952, #e3c088)",
          color: copied ? "#967952" : "#1e232d",
          border: copied ? "1px solid #967952" : "none",
        }}
      >
        {copied ? "Copied ✓" : "Copy Code"}
      </button>
    </div>
  );
}

function ContactConcierge() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #967952, #e3c088)" }}
      >
        <span className="text-xl">💌</span>
      </div>
      <p className="text-[13px] text-center leading-relaxed" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
        Our concierge team is here for styling advice, order help, or anything else. Available Mon–Fri, 9am–5pm MST.
      </p>
      <button
        className="px-5 py-3 rounded-xl text-[13px] font-semibold tracking-wider uppercase transition-all active:scale-98"
        style={{ background: "linear-gradient(135deg, #967952, #e3c088)", color: "#1e232d" }}
      >
        Start Chat
      </button>
      <p className="text-[11px]" style={{ color: "#8b8b8b" }}>or email concierge@minkycouture.com</p>
    </div>
  );
}

const sections: Record<string, { title: string; component: React.ReactNode }> = {
  "Notification Settings": { title: "Notifications", component: <NotificationSettings /> },
  "Shipping Address": { title: "Shipping", component: <ShippingAddress /> },
  "Payment Methods": { title: "Payment", component: <PaymentMethods /> },
  "Referral Code": { title: "Referral", component: <ReferralCode /> },
  "Contact Concierge": { title: "Concierge", component: <ContactConcierge /> },
};

export default function SettingsDrawer({ section, onClose }: SettingsDrawerProps) {
  const data = sections[section];
  if (!data) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40" style={{ background: "rgba(0,0,0,0.4)" }} onClick={onClose} />

      {/* Drawer */}
      <div
        className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl screen-enter"
        style={{
          background: "#fff",
          boxShadow: "0 -12px 40px rgba(30,35,45,0.15)",
          maxHeight: "70%",
          overflowY: "auto",
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ background: "rgba(30,35,45,0.15)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3" style={{ borderBottom: "1px solid rgba(30,35,45,0.06)" }}>
          <p
            className="text-[11px] tracking-[0.2em] uppercase"
            style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}
          >
            {data.title}
          </p>
          <button onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 pb-8">{data.component}</div>
      </div>
    </>
  );
}
