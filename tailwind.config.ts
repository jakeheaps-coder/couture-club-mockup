import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          navy: "#1e232d",
          cream: "#f8f5f0",
          pink: "#e4b2a0",
          gold: "#967952",
          "gold-light": "#e3c088",
          "gold-pale": "#f0ddb0",
          white: "#ffffff",
          muted: "#8b8b8b",
          "navy-light": "#2e3547",
        },
      },
      fontFamily: {
        ogg: ["var(--font-ogg)", "Cormorant Garamond", "Georgia", "serif"],
        proxima: ["var(--font-proxima)", "Inter", "system-ui", "sans-serif"],
        script: ["var(--font-script)", "Dancing Script", "cursive"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #967952 0%, #e3c088 50%, #967952 100%)",
        "navy-gradient": "linear-gradient(180deg, #1e232d 0%, #2e3547 100%)",
        "cream-gradient": "linear-gradient(180deg, #f8f5f0 0%, #f0ebe3 100%)",
      },
      boxShadow: {
        "card": "0 4px 24px rgba(30, 35, 45, 0.12)",
        "phone": "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)",
        "gold": "0 4px 16px rgba(150, 121, 82, 0.4)",
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
