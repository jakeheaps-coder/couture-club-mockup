"use client";

interface CartBadgeProps {
  count: number;
  onClick?: () => void;
  /** Use "light" stroke color for dark backgrounds */
  variant?: "dark" | "light";
}

export default function CartBadge({ count, onClick, variant = "dark" }: CartBadgeProps) {
  const strokeColor = variant === "light" ? "#f8f5f0" : "#1e232d";

  return (
    <button className="relative" onClick={onClick} aria-label="View cart">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
          style={{ background: "#967952" }}
        >
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
