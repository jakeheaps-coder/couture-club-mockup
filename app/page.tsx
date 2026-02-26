"use client";

import { useState, useCallback } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav, { type Screen } from "@/components/BottomNav";
import SplashScreen from "@/components/screens/SplashScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import VaultScreen from "@/components/screens/VaultScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import MonogramScreen from "@/components/screens/MonogramScreen";
import HeartScreen from "@/components/screens/HeartScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");

  const handleNavigate = useCallback((next: Screen) => {
    setScreen(next);
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onComplete={() => setScreen("home")} />;
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "vault":
        return <VaultScreen />;
      case "loyalty":
        return <LoyaltyScreen />;
      case "studio":
        return <MonogramScreen />;
      case "heart":
        return <HeartScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <PhoneFrame>
      {/* Scrollable content area */}
      <div
        className="absolute inset-0 bottom-0 overflow-y-auto overflow-x-hidden"
        style={{
          background: screen === "vault" ? "#1e232d" : "#f8f5f0",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {renderScreen()}
      </div>
      {/* Sticky bottom nav — sits on top */}
      <BottomNav active={screen} onNavigate={handleNavigate} />
    </PhoneFrame>
  );
}
