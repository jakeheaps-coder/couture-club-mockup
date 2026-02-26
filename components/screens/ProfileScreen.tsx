"use client";

const orders = [
  { name: "Dusty Rose Garden", date: "Feb 18, 2026", price: "$169", status: "Delivered" },
  { name: "Cream Velvet", date: "Jan 15, 2026", price: "$159", status: "Delivered" },
  { name: "Navy Classic", date: "Dec 22, 2025", price: "$149", status: "Delivered" },
];

export default function ProfileScreen() {
  return (
    <div
      className="w-full pb-24 screen-enter"
      style={{ background: "#f8f5f0", minHeight: "100%" }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-5">
        <p className="text-[11px] tracking-[0.25em] uppercase mb-1" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          Your Profile
        </p>
        <h2
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 30,
            fontWeight: 600,
            color: "#1e232d",
            lineHeight: 1,
          }}
        >
          Member Card
        </h2>
      </div>

      {/* Digital membership card */}
      <div className="mx-5 mb-5">
        <div
          className="rounded-3xl overflow-hidden relative"
          style={{
            background: "linear-gradient(145deg, #1e232d 0%, #2e3547 60%, #1a2030 100%)",
            boxShadow: "0 16px 48px rgba(30,35,45,0.35), 0 0 0 1px rgba(227,192,136,0.15)",
            minHeight: 200,
          }}
        >
          {/* Gold pattern overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #e3c088 0px, #e3c088 1px, transparent 1px, transparent 16px), repeating-linear-gradient(-45deg, #e3c088 0px, #e3c088 1px, transparent 1px, transparent 16px)",
            }}
          />

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(227,192,136,0.6), transparent)" }} />

          <div className="relative p-5">
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "rgba(227,192,136,0.5)", fontFamily: "Inter, sans-serif" }}>
                  The Couture Club
                </p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#f8f5f0",
                  }}
                >
                  Ella Johnson
                </p>
              </div>
              <div
                className="rounded-xl w-14 h-14 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #967952 0%, #e3c088 100%)",
                  boxShadow: "0 4px 16px rgba(150,121,82,0.4)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, Georgia, serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#1e232d",
                  }}
                >
                  MC
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px mb-4" style={{ background: "rgba(227,192,136,0.15)" }} />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Member Since", value: "Jan '26" },
                { label: "Tier", value: "Petal" },
                { label: "Orders", value: "3" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, Georgia, serif",
                      fontSize: 18,
                      fontWeight: 600,
                      color: "#e3c088",
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(248,245,240,0.4)", fontFamily: "Inter, sans-serif" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* QR / ID row */}
            <div className="flex items-center justify-between">
              {/* Pseudo-QR */}
              <div
                className="w-16 h-16 rounded-lg overflow-hidden relative"
                style={{ background: "rgba(248,245,240,0.05)", border: "1px solid rgba(227,192,136,0.2)" }}
              >
                <div className="grid grid-cols-5 gap-0.5 p-1 w-full h-full">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-[1px]"
                      style={{
                        background: [0, 1, 5, 6, 4, 9, 10, 14, 19, 20, 21, 22, 23, 24, 12, 7, 17, 2, 15, 8].includes(i)
                          ? "#e3c088"
                          : "transparent",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span
                  className="text-[11px] font-medium tracking-widest"
                  style={{ color: "rgba(248,245,240,0.3)", fontFamily: "Inter, sans-serif" }}
                >
                  MEMBER #00847
                </span>
                <span className="text-[10px] tracking-wider" style={{ color: "rgba(248,245,240,0.2)", fontFamily: "Inter, sans-serif" }}>
                  Founder Status
                </span>
                <div
                  className="px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "rgba(227,192,136,0.15)",
                    border: "1px solid rgba(227,192,136,0.3)",
                  }}
                >
                  <span className="text-[9px] tracking-widest uppercase" style={{ color: "#e3c088" }}>
                    Free Shipping ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order history */}
      <div className="px-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 20,
              fontWeight: 600,
              color: "#1e232d",
            }}
          >
            Order History
          </h3>
          <button className="text-[12px]" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>See All</button>
        </div>
        <div className="flex flex-col gap-2">
          {orders.map((order) => (
            <div
              key={order.name}
              className="flex items-center justify-between p-3 rounded-2xl"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex-shrink-0"
                  style={{ background: "rgba(30,35,45,0.06)" }}
                />
                <div>
                  <p className="text-[13px] font-medium text-[#1e232d]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {order.name}
                  </p>
                  <p className="text-[11px] text-[#8b8b8b]">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[13px] font-semibold" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>{order.price}</p>
                <p className="text-[10px]" style={{ color: "#967952" }}>{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-5">
        <h3
          className="mb-3"
          style={{
            fontFamily: "Cormorant Garamond, Georgia, serif",
            fontSize: 20,
            fontWeight: 600,
            color: "#1e232d",
          }}
        >
          Preferences
        </h3>
        {[
          { label: "Notification Settings", icon: "🔔" },
          { label: "Shipping Address", icon: "📍" },
          { label: "Payment Methods", icon: "💳" },
          { label: "Referral Code", icon: "🔗" },
          { label: "Contact Concierge", icon: "💌" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between py-3.5 px-4 rounded-xl mb-2 cursor-pointer"
            style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <span>{item.icon}</span>
              <span className="text-[13px] font-medium text-[#1e232d]" style={{ fontFamily: "Inter, sans-serif" }}>
                {item.label}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b8b8b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
