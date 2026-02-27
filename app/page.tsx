"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav, { type Screen } from "@/components/BottomNav";
import SplashScreen from "@/components/screens/SplashScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import ShopScreen from "@/components/screens/ShopScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import MonogramScreen from "@/components/screens/MonogramScreen";
import HeartScreen from "@/components/screens/HeartScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import ProductDetailScreen from "@/components/screens/ProductDetailScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import ContentDetailScreen from "@/components/screens/ContentDetailScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import type { Product, FeedItem } from "@/types";

function useIsStandalone() {
  const [standalone, setStandalone] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(display-mode: standalone)");
    const iOS = "standalone" in navigator && (navigator as unknown as { standalone: boolean }).standalone;
    setStandalone(mq.matches || !!iOS);
  }, []);
  return standalone;
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [previousScreen, setPreviousScreen] = useState<Screen>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedContent, setSelectedContent] = useState<FeedItem | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const isStandalone = useIsStandalone();

  // Persistent countdown end-time for Vault — survives screen remounts
  const vaultEndTime = useRef(Date.now() + (3 * 3600 + 42 * 60 + 17) * 1000);

  // Scroll position memory
  const scrollPositions = useRef<Record<string, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const saveScroll = useCallback(() => {
    if (scrollRef.current) {
      scrollPositions.current[screen] = scrollRef.current.scrollTop;
    }
  }, [screen]);

  const restoreScroll = useCallback((targetScreen: Screen) => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollPositions.current[targetScreen] || 0;
      }
    });
  }, []);

  const handleNavigate = useCallback(
    (next: Screen) => {
      saveScroll();
      setTransitioning(true);
      setTimeout(() => {
        setPreviousScreen(screen);
        setScreen(next);
        setTransitioning(false);
        restoreScroll(next);
      }, 120);
    },
    [screen, saveScroll, restoreScroll],
  );

  const handleSelectProduct = useCallback(
    (product: Product) => {
      saveScroll();
      setPreviousScreen(screen);
      setSelectedProduct(product);
      setScreen("product-detail");
    },
    [screen, saveScroll],
  );

  const handleSelectContent = useCallback(
    (item: FeedItem) => {
      saveScroll();
      setPreviousScreen(screen);
      setSelectedContent(item);
      setScreen("content-detail");
    },
    [screen, saveScroll],
  );

  const handleBack = useCallback(() => {
    setScreen(previousScreen);
    restoreScroll(previousScreen);
  }, [previousScreen, restoreScroll]);

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onComplete={() => setScreen("home")} />;
      case "home":
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
          />
        );
      case "shop":
        return (
          <ShopScreen
            onSelectProduct={handleSelectProduct}
            vaultEndTime={vaultEndTime.current}
          />
        );
      case "loyalty":
        return <LoyaltyScreen />;
      case "studio":
        return <MonogramScreen />;
      case "heart":
        return <HeartScreen />;
      case "profile":
        return <ProfileScreen onNavigate={handleNavigate} />;
      case "product-detail":
        return selectedProduct ? (
          <ProductDetailScreen product={selectedProduct} onBack={handleBack} />
        ) : (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
          />
        );
      case "about":
        return <AboutScreen onBack={handleBack} />;
      case "content-detail":
        return selectedContent ? (
          <ContentDetailScreen item={selectedContent} onBack={handleBack} />
        ) : (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
          />
        );
    }
  };

  const bgColor = screen === "shop" ? "#1e232d" : "#f8f5f0";

  const appContent = (
    <>
      <div
        ref={scrollRef}
        className={`absolute inset-0 overflow-y-auto overflow-x-hidden ${transitioning ? "screen-exit" : ""}`}
        style={{
          background: bgColor,
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        <ErrorBoundary onReset={() => handleNavigate("home")}>
          {renderScreen()}
        </ErrorBoundary>
      </div>
      <BottomNav active={screen} onNavigate={handleNavigate} />
    </>
  );

  if (isStandalone) {
    return (
      <div className="fixed inset-0" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        {appContent}
      </div>
    );
  }

  return <PhoneFrame>{appContent}</PhoneFrame>;
}
