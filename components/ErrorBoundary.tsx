"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center px-8 text-center"
          style={{ background: "#f8f5f0", minHeight: "100%", paddingTop: 120 }}
        >
          {/* MC monogram */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, #967952, #e3c088)",
              boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
            }}
          >
            <span
              style={{
                fontFamily: "Cormorant Garamond, Georgia, serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#1e232d",
              }}
            >
              MC
            </span>
          </div>

          <h2
            style={{
              fontFamily: "Cormorant Garamond, Georgia, serif",
              fontSize: 26,
              fontWeight: 600,
              color: "#1e232d",
              lineHeight: 1.2,
            }}
          >
            Something went wrong
          </h2>

          <p
            className="mt-2 mb-6"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: "#8b8b8b",
              lineHeight: 1.5,
              maxWidth: 260,
            }}
          >
            We hit a snag. Tap below to return to the app.
          </p>

          <button
            onClick={this.handleReset}
            className="px-6 py-3 rounded-2xl text-[13px] font-semibold tracking-wider uppercase transition-all active:scale-98"
            style={{
              background: "linear-gradient(135deg, #967952, #e3c088)",
              color: "#1e232d",
              letterSpacing: "0.1em",
              boxShadow: "0 4px 16px rgba(150,121,82,0.3)",
            }}
          >
            Return to Home
          </button>

          {/* Error detail (dev only) */}
          {process.env.NODE_ENV === "development" && this.state.error && (
            <div
              className="mt-8 w-full rounded-xl p-3 text-left"
              style={{
                background: "rgba(30,35,45,0.04)",
                border: "1px solid rgba(30,35,45,0.08)",
                maxWidth: 320,
              }}
            >
              <p className="text-[10px] tracking-wider uppercase mb-1" style={{ color: "#967952" }}>
                Dev Error
              </p>
              <p className="text-[11px] font-mono break-all" style={{ color: "#4a5568" }}>
                {this.state.error.message}
              </p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
