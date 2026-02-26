"use client";

import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-[#0d0d0f] px-4 py-8">
      {/* Outer phone shell */}
      <div
        className="relative rounded-[52px] bg-[#1a1a1a] select-none"
        style={{
          width: 393,
          height: 852,
          boxShadow:
            "0 0 0 2px #2a2a2a, 0 0 0 3px #111, 0 50px 100px rgba(0,0,0,0.8), inset 0 1px 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Side buttons — volume */}
        <div className="absolute -left-[3px] top-[120px] w-[3px] h-[36px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[170px] w-[3px] h-[64px] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[248px] w-[3px] h-[64px] bg-[#2a2a2a] rounded-l-sm" />
        {/* Side button — power */}
        <div className="absolute -right-[3px] top-[180px] w-[3px] h-[80px] bg-[#2a2a2a] rounded-r-sm" />

        {/* Inner screen area */}
        <div
          className="absolute inset-[3px] rounded-[49px] overflow-hidden bg-[#f8f5f0]"
          style={{ isolation: "isolate" }}
        >
          {/* Dynamic Island */}
          <div
            className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50 bg-black rounded-full"
            style={{ width: 126, height: 37 }}
          />

          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-[54px] z-40 flex items-end px-8 pb-2">
            <span className="text-[12px] font-semibold text-[#1e232d] ml-auto opacity-80">
              9:41
            </span>
            <div className="flex items-center gap-[5px] ml-auto">
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="#1e232d" opacity="0.8">
                <rect x="0" y="6" width="3" height="6" rx="1"/>
                <rect x="4.5" y="4" width="3" height="8" rx="1"/>
                <rect x="9" y="2" width="3" height="10" rx="1"/>
                <rect x="13.5" y="0" width="3" height="12" rx="1"/>
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" opacity="0.8">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#1e232d"/>
                <path d="M4.5 6.5C5.8 5.2 6.8 4.5 8 4.5s2.2.7 3.5 2" stroke="#1e232d" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M1.5 3.5C3.5 1.5 5.6 0.5 8 0.5s4.5 1 6.5 3" stroke="#1e232d" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center gap-[2px]">
                <div className="relative w-[25px] h-[12px] rounded-[3px] border border-[#1e232d] opacity-80">
                  <div className="absolute inset-[2px] right-[3px] bg-[#1e232d] rounded-[1px]" style={{ right: "4px" }} />
                </div>
                <div className="w-[1.5px] h-[5px] bg-[#1e232d] rounded-r-sm opacity-80" />
              </div>
            </div>
          </div>

          {/* Screen content — full area below status bar, overflow managed by children */}
          <div className="absolute inset-0 top-[54px] bottom-0 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
