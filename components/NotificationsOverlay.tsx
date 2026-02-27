"use client";

import { useState } from "react";
import { getNotifications } from "@/lib/api";

interface NotificationsOverlayProps {
  onClose: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  lock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  ),
  star: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  heart: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  ),
};

export default function NotificationsOverlay({ onClose }: NotificationsOverlayProps) {
  const allNotifications = getNotifications();
  const [readIds, setReadIds] = useState<Set<string>>(
    new Set(allNotifications.filter((n) => n.read).map((n) => n.id)),
  );

  const markAsRead = (id: string) => setReadIds((prev) => new Set(prev).add(id));

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-0 z-40" style={{ background: "rgba(0,0,0,0.3)" }} onClick={onClose} />

      {/* Dropdown */}
      <div
        className="absolute top-14 right-4 left-4 z-50 rounded-2xl overflow-hidden screen-enter"
        style={{
          background: "#fff",
          boxShadow: "0 12px 40px rgba(30,35,45,0.2)",
          maxHeight: 360,
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2" style={{ borderBottom: "1px solid rgba(30,35,45,0.06)" }}>
          <p className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
            Notifications
          </p>
          <button onClick={onClose} aria-label="Close notifications">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col">
          {allNotifications.map((notif) => {
            const isRead = readIds.has(notif.id);
            return (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className="flex items-start gap-3 px-4 py-3 text-left transition-all"
                style={{
                  borderBottom: "1px solid rgba(30,35,45,0.04)",
                  background: isRead ? "transparent" : "rgba(150,121,82,0.04)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{
                    background: isRead ? "rgba(30,35,45,0.06)" : "linear-gradient(135deg, #967952, #e3c088)",
                    color: isRead ? "#8b8b8b" : "#fff",
                  }}
                >
                  {iconMap[notif.icon] ?? iconMap.star}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium leading-tight" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
                    {notif.title}
                  </p>
                  <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "#8b8b8b" }}>
                    {notif.message}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "#b0b0b0" }}>
                    {notif.time}
                  </p>
                </div>
                {!isRead && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2" style={{ background: "#967952" }} />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
