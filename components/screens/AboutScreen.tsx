"use client";

interface AboutScreenProps {
  onBack: () => void;
}

const stats = [
  { value: "2009", label: "Founded" },
  { value: "~300", label: "Employees" },
  { value: "100%", label: "Women-Owned" },
];

const milestones = [
  { year: "2009", text: "Sandi sews the first Minky blanket for her hospitalized daughter" },
  { year: "2010", text: "Friends and family line up — Sandi sells blankets from the trunk of her car" },
  { year: "2013", text: "First retail location opens in Lindon, Utah" },
  { year: "2019", text: "Sandi receives Ernst & Young Entrepreneur of the Year award" },
  { year: "2020", text: "Women in Business Athena Award" },
  { year: "2025", text: "Heart of Minky program launches — 155,000+ blankets donated, $5.5M in retail value" },
  { year: "2025", text: "Minky Couture partners with Domo to power the next era of growth" },
];

export default function AboutScreen({ onBack }: AboutScreenProps) {
  return (
    <div className="w-full pb-24 screen-enter" style={{ background: "#f8f5f0", minHeight: "100%" }}>
      {/* Header */}
      <div
        className="relative px-5 pt-4 pb-6"
        style={{ background: "linear-gradient(180deg, #1e232d, #2e3547)" }}
      >
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center mb-3"
          style={{ background: "rgba(248,245,240,0.1)" }}
          aria-label="Go back"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f8f5f0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        <p className="text-[11px] tracking-[0.3em] uppercase mb-1" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          Our Story
        </p>
        <h1
          className="gold-shimmer"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 32, fontWeight: 600, lineHeight: 1 }}
        >
          Minky Couture
        </h1>
        <p className="text-[13px] mt-2 leading-relaxed" style={{ color: "rgba(248,245,240,0.6)", fontFamily: "Inter, sans-serif" }}>
          The original luxury blanket. 100% women-owned. Est. 2009.
        </p>
      </div>

      {/* Stats */}
      <div className="px-5 -mt-3">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl py-3 flex flex-col items-center"
              style={{ background: "#fff", boxShadow: "0 2px 12px rgba(30,35,45,0.08)" }}
            >
              <span
                className="text-[20px] font-bold"
                style={{ color: "#967952", fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {s.value}
              </span>
              <span className="text-[10px] tracking-wider uppercase" style={{ color: "#8b8b8b", fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Founder Story */}
      <div className="px-5 mt-6">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          The Founder
        </p>
        <h2
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif", fontSize: 22, fontWeight: 600, color: "#1e232d", lineHeight: 1.2 }}
        >
          Sandi Hendry
        </h2>

        <div
          className="rounded-2xl p-4 mt-3 mb-4"
          style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)", boxShadow: "0 2px 12px rgba(30,35,45,0.06)" }}
        >
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
            In 2009, Sandi Hendry&apos;s daughter was hospitalized with a life-threatening illness. She wanted a blanket that was soft, cozy — and actually cute. So Sandi sewed one.
          </p>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
            Friends and family saw it and wanted their own. Within months, Sandi was selling blankets from the trunk of her car, surrounded by the friends who believed in her dream. Many of those original friends still work with her today.
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
            Today, Minky Couture employs around 300 people — mostly women — and 30-50 local seamstresses who craft each blanket with care. Every blanket is made with the same love Sandi put into that very first one.
          </p>
        </div>

        {/* Quote */}
        <div
          className="rounded-2xl p-4 mb-6"
          style={{
            background: "linear-gradient(135deg, #1e232d, #2e3547)",
            boxShadow: "0 4px 20px rgba(30,35,45,0.2)",
          }}
        >
          <p
            className="text-[16px] leading-relaxed italic"
            style={{ color: "#e3c088", fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            &ldquo;Our purpose has always been bigger than blankets.&rdquo;
          </p>
          <p className="text-[11px] mt-2 tracking-wider uppercase" style={{ color: "rgba(248,245,240,0.5)", fontFamily: "Inter, sans-serif" }}>
            — Sandi Hendry, Founder & CEO
          </p>
        </div>

        {/* Timeline */}
        <p className="text-[11px] tracking-[0.2em] uppercase mb-3" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          Milestones
        </p>
        <div className="flex flex-col gap-3 mb-6">
          {milestones.map((m, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: "#967952" }} />
                {i < milestones.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: "rgba(150,121,82,0.2)" }} />}
              </div>
              <div className="pb-2">
                <span className="text-[11px] font-semibold" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
                  {m.year}
                </span>
                <p className="text-[12px] leading-relaxed mt-0.5" style={{ color: "#4a5568", fontFamily: "Inter, sans-serif" }}>
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Awards */}
        <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "#967952", fontFamily: "Inter, sans-serif" }}>
          Recognition
        </p>
        <div className="flex flex-col gap-2">
          {[
            "Ernst & Young Entrepreneur of the Year 2019",
            "Women in Business Athena Award 2020",
            "U.S. Chamber of Commerce — Corporate Citizenship",
          ].map((award) => (
            <div
              key={award}
              className="rounded-xl px-4 py-3 flex items-center gap-3"
              style={{ background: "#fff", border: "1px solid rgba(30,35,45,0.06)" }}
            >
              <span className="text-base">🏆</span>
              <p className="text-[12px]" style={{ color: "#1e232d", fontFamily: "Inter, sans-serif" }}>
                {award}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
