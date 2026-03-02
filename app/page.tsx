"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import PhoneFrame from "@/components/PhoneFrame";
import BottomNav, { type Screen } from "@/components/BottomNav";
import SplashScreen from "@/components/screens/SplashScreen";
import HomeScreen from "@/components/screens/HomeScreen";
import ShopScreen from "@/components/screens/ShopScreen";
import LoyaltyScreen from "@/components/screens/LoyaltyScreen";
import HeartScreen from "@/components/screens/HeartScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";
import ProductDetailScreen from "@/components/screens/ProductDetailScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import ContentDetailScreen from "@/components/screens/ContentDetailScreen";
import CartScreen from "@/components/screens/CartScreen";
import CheckoutScreen from "@/components/screens/CheckoutScreen";
import OrderConfirmationScreen from "@/components/screens/OrderConfirmationScreen";
import OnboardingScreen from "@/components/screens/OnboardingScreen";
import ErrorBoundary from "@/components/ErrorBoundary";
import SettingsDrawer from "@/components/SettingsDrawer";
import type { Product, FeedItem, CartItem, Size } from "@/types";

const CART_STORAGE_KEY = "couture-club-cart";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

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

  // ── Cart state with localStorage persistence ────────────
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderConfirmItems, setOrderConfirmItems] = useState<CartItem[]>([]);
  const cartInitialized = useRef(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (!cartInitialized.current) {
      const stored = loadCartFromStorage();
      if (stored.length > 0) setCart(stored);
      cartInitialized.current = true;
    }
  }, []);

  // Persist cart to localStorage on every change
  useEffect(() => {
    if (cartInitialized.current) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch {
        // ignore storage quota errors
      }
    }
  }, [cart]);

  const addToCart = useCallback((product: Product, size: Size, quantity: number) => {
    const variant = product.variants.find((v) => v.size === size);
    const price = variant?.price ?? product.priceRange.min;
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.productId === product.id && i.size === size,
      );
      if (existingIdx >= 0) {
        return prev.map((item, idx) =>
          idx === existingIdx ? { ...item, quantity: Math.min(10, item.quantity + quantity) } : item,
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          productId: product.id,
          title: product.title,
          size,
          quantity,
          price,
          colorHex: product.colorHex,
          accentHex: product.accentHex,
        },
      ];
    });
  }, []);

  const updateCartQuantity = useCallback((id: string, quantity: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  // ── Overlay state (rendered above BottomNav) ──────────────
  const [drawerSection, setDrawerSection] = useState<string | null>(null);

  // ── Vault countdown ───────────────────────────────────────
  const vaultEndTime = useRef(Date.now() + (3 * 3600 + 42 * 60 + 17) * 1000);

  // ── Scroll position memory ────────────────────────────────
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

  // ── Navigation ────────────────────────────────────────────
  const handleNavigate = useCallback(
    (next: Screen) => {
      saveScroll();
      setDrawerSection(null);
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

  const handleOpenCart = useCallback(() => {
    saveScroll();
    setPreviousScreen(screen);
    setScreen("cart");
  }, [screen, saveScroll]);

  // ── Checkout flow ─────────────────────────────────────────
  const handleCheckout = useCallback(() => {
    saveScroll();
    setPreviousScreen("cart");
    setScreen("checkout");
  }, [saveScroll]);

  const handlePlaceOrder = useCallback(() => {
    // Save current cart for confirmation screen before clearing
    setOrderConfirmItems([...cart]);
    setCart([]);
    setScreen("order-confirmation");
  }, [cart]);

  // ── Screen renderer ───────────────────────────────────────
  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return (
          <SplashScreen
            onComplete={() => {
              const onboarded = typeof window !== "undefined" && localStorage.getItem("couture-club-onboarded");
              setScreen(onboarded ? "home" : "onboarding");
            }}
          />
        );
      case "onboarding":
        return (
          <OnboardingScreen
            onComplete={() => {
              if (typeof window !== "undefined") localStorage.setItem("couture-club-onboarded", "true");
              setScreen("home");
            }}
          />
        );
      case "home":
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        );
      case "shop":
        return (
          <ShopScreen
            onSelectProduct={handleSelectProduct}
            vaultEndTime={vaultEndTime.current}
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        );
      case "loyalty":
        return (
          <LoyaltyScreen
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        );
      case "heart":
        return (
          <HeartScreen
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            onNavigate={handleNavigate}
            onOpenDrawer={setDrawerSection}
            onSelectProduct={handleSelectProduct}
          />
        );
      case "product-detail":
        return selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={handleBack}
            onAddToCart={addToCart}
            onSelectProduct={handleSelectProduct}
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
          />
        ) : null;
      case "about":
        return <AboutScreen onBack={handleBack} />;
      case "content-detail":
        return selectedContent ? (
          <ContentDetailScreen
            item={selectedContent}
            onBack={handleBack}
            onNavigate={handleNavigate}
          />
        ) : null;
      case "cart":
        return (
          <CartScreen
            items={cart}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onBack={handleBack}
            onContinueShopping={() => handleNavigate("shop")}
            onCheckout={handleCheckout}
          />
        );
      case "checkout":
        return (
          <CheckoutScreen
            items={cart}
            onBack={handleBack}
            onPlaceOrder={handlePlaceOrder}
          />
        );
      case "order-confirmation":
        return (
          <OrderConfirmationScreen
            items={orderConfirmItems}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onSelectContent={handleSelectContent}
            cartCount={cartCount}
            onOpenCart={handleOpenCart}
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

      {/* Overlays — rendered ABOVE BottomNav, outside scroll container */}
      {drawerSection && (
        <SettingsDrawer section={drawerSection} onClose={() => setDrawerSection(null)} />
      )}
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
