import type { Product, VaultDrop, FeedItem, Notification, OrderItem } from "@/types";

// ---------------------------------------------------------------------------
// Size-based pricing tiers (realistic Minky Couture ranges)
// ---------------------------------------------------------------------------
const sizePricing = {
  Infant: 0,    // base
  Tween: 20,
  Travel: 30,
  Adult: 40,
  Monster: 60,
  Grande: 80,
} as const;

function buildVariants(
  productId: string,
  basePrice: number,
  color: string,
  colorHex: string,
) {
  return (Object.keys(sizePricing) as Array<keyof typeof sizePricing>).map(
    (size) => ({
      id: `${productId}-${size.toLowerCase()}`,
      title: `${size} / ${color}`,
      size,
      color,
      colorHex,
      price: basePrice + sizePricing[size],
      available: true,
    }),
  );
}

// ---------------------------------------------------------------------------
// HUGS COLLECTION
// ---------------------------------------------------------------------------
const hugsBase = 119;

const hugsProducts: Product[] = [
  {
    id: "prod-hugs-cream",
    handle: "cream-hugs",
    title: "Cream Hugs",
    description:
      "A blend of comfort and style in a warm, neutral cream. Our signature stretchy Hugs fabric wraps you in a blanket that truly feels like a hug.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#f0ebe3",
    accentHex: "#967952",
    variants: buildVariants("prod-hugs-cream", hugsBase, "Cream", "#f0ebe3"),
    tags: ["Bestseller", "Featured"],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-black",
    handle: "black-hugs",
    title: "Black Hugs",
    description:
      "Timeless and bold. The Black Hugs blanket pairs rich dark tones with the signature stretchy embrace of our Hugs fabric.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#1a1a1a",
    accentHex: "#e3c088",
    variants: buildVariants("prod-hugs-black", hugsBase, "Black", "#1a1a1a"),
    tags: ["Featured"],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-oatmeal",
    handle: "oatmeal-hugs",
    title: "Oatmeal Hugs",
    description:
      "Warm and earthy. Oatmeal Hugs brings a natural, lived-in elegance to the signature stretchy Hugs experience.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#d4c5a9",
    accentHex: "#8b6e5a",
    variants: buildVariants("prod-hugs-oatmeal", hugsBase, "Oatmeal", "#d4c5a9"),
    tags: [],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-mist",
    handle: "mist-hugs",
    title: "Mist Hugs",
    description:
      "Soft as morning fog. Mist Hugs combines a calming blue-grey tone with the plush stretch that makes Hugs unforgettable.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#b8c4cc",
    accentHex: "#6b7f8d",
    variants: buildVariants("prod-hugs-mist", hugsBase, "Mist", "#b8c4cc"),
    tags: [],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-alaskan-blue",
    handle: "alaskan-blue-hugs",
    title: "Alaskan Blue Hugs",
    description:
      "A soothing, icy blue hue inspired by glacial waters. Alaskan Blue Hugs is cool-toned luxury at its finest.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#7a9bb5",
    accentHex: "#f8f5f0",
    variants: buildVariants("prod-hugs-alaskan-blue", hugsBase, "Alaskan Blue", "#7a9bb5"),
    tags: ["New"],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-copper",
    handle: "copper-hugs",
    title: "Copper Hugs",
    description:
      "Rich and warm. Copper Hugs wraps you in an autumn-inspired tone that feels as luxurious as it looks.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#b87333",
    accentHex: "#f8f5f0",
    variants: buildVariants("prod-hugs-copper", hugsBase, "Copper", "#b87333"),
    tags: [],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
  {
    id: "prod-hugs-petal-pink",
    handle: "petal-pink-hugs",
    title: "Petal Pink Hugs",
    description:
      "Delicate and feminine. Petal Pink Hugs is a soft blush blanket that adds warmth and beauty to any space.",
    collection: "hugs",
    priceRange: { min: hugsBase, max: hugsBase + 80 },
    colorHex: "#e4b2a0",
    accentHex: "#967952",
    variants: buildVariants("prod-hugs-petal-pink", hugsBase, "Petal Pink", "#e4b2a0"),
    tags: [],
    material: "100% Minky Stretch Fabric",
    threadPoints: hugsBase * 2,
  },
];

// ---------------------------------------------------------------------------
// CLOUD COLLECTION
// ---------------------------------------------------------------------------
const cloudBase = 109;

const cloudProducts: Product[] = [
  {
    id: "prod-cloud-cream",
    handle: "cloud-cream",
    title: "Cloud Cream",
    description:
      "Like sleeping on a cloud. Ultra-fluffy bubbly texture in a warm cream — our softest, most indulgent blanket.",
    collection: "cloud",
    priceRange: { min: cloudBase, max: cloudBase + 80 },
    colorHex: "#f5f0e8",
    accentHex: "#e3c088",
    variants: buildVariants("prod-cloud-cream", cloudBase, "Cream", "#f5f0e8"),
    tags: ["Bestseller"],
    material: "100% Minky Cloud Fabric",
    threadPoints: cloudBase * 2,
  },
  {
    id: "prod-cloud-midnight",
    handle: "cloud-midnight",
    title: "Cloud Midnight",
    description:
      "Deep, dark luxury meets cloud-like softness. A dramatic blanket that commands attention and delivers unmatched comfort.",
    collection: "cloud",
    priceRange: { min: cloudBase, max: cloudBase + 80 },
    colorHex: "#1e232d",
    accentHex: "#e3c088",
    variants: buildVariants("prod-cloud-midnight", cloudBase, "Midnight", "#1e232d"),
    tags: ["App Exclusive"],
    material: "100% Minky Cloud Fabric",
    threadPoints: cloudBase * 2,
  },
  {
    id: "prod-cloud-blush",
    handle: "cloud-blush",
    title: "Cloud Blush",
    description:
      "Soft pink meets heavenly texture. Cloud Blush is a feminine, dreamy blanket perfect for gifting or treating yourself.",
    collection: "cloud",
    priceRange: { min: cloudBase, max: cloudBase + 80 },
    colorHex: "#e8c4b8",
    accentHex: "#967952",
    variants: buildVariants("prod-cloud-blush", cloudBase, "Blush", "#e8c4b8"),
    tags: ["New"],
    material: "100% Minky Cloud Fabric",
    threadPoints: cloudBase * 2,
  },
];

// ---------------------------------------------------------------------------
// PLUSH COLLECTION
// ---------------------------------------------------------------------------
const plushBase = 99;

const plushProducts: Product[] = [
  {
    id: "prod-plush-night-sky",
    handle: "plush-night-sky",
    title: "Plush Night Sky",
    description:
      "A deep navy plush blanket inspired by starlit evenings. Rich color meets everyday softness.",
    collection: "plush",
    priceRange: { min: plushBase, max: plushBase + 80 },
    colorHex: "#2e3547",
    accentHex: "#e3c088",
    variants: buildVariants("prod-plush-night-sky", plushBase, "Night Sky", "#2e3547"),
    tags: ["Featured"],
    material: "100% Minky Plush Fabric",
    threadPoints: plushBase * 2,
  },
  {
    id: "prod-plush-charcoal",
    handle: "plush-charcoal",
    title: "Premium Plush Charcoal",
    description:
      "Sophisticated and modern. Charcoal Plush is a timeless neutral that elevates any room.",
    collection: "plush",
    priceRange: { min: plushBase, max: plushBase + 80 },
    colorHex: "#4a4a4a",
    accentHex: "#c0c0c0",
    variants: buildVariants("prod-plush-charcoal", plushBase, "Charcoal", "#4a4a4a"),
    tags: [],
    material: "100% Minky Plush Fabric",
    threadPoints: plushBase * 2,
  },
  {
    id: "prod-feather-night-sky",
    handle: "feather-night-sky",
    title: "Feather Night Sky",
    description:
      "Delicate feather-pattern texture in deep navy. A unique take on our plush collection that catches the light beautifully.",
    collection: "plush",
    priceRange: { min: plushBase + 10, max: plushBase + 90 },
    colorHex: "#1a2030",
    accentHex: "#b8c4cc",
    variants: buildVariants("prod-feather-night-sky", plushBase + 10, "Night Sky", "#1a2030"),
    tags: ["New"],
    material: "100% Minky Feather Fabric",
    threadPoints: (plushBase + 10) * 2,
  },
];

// ---------------------------------------------------------------------------
// SORBET COLLECTION
// ---------------------------------------------------------------------------
const sorbetBase = 79;

const sorbetProducts: Product[] = [
  {
    id: "prod-sorbet-vanilla",
    handle: "sorbet-vanilla",
    title: "Sorbet Vanilla",
    description:
      "Light, silky, and smooth. Vanilla Sorbet is our thinnest blanket with short, flat fibers on both sides — perfect for warm nights.",
    collection: "sorbet",
    priceRange: { min: sorbetBase, max: sorbetBase + 80 },
    colorHex: "#f5f0dc",
    accentHex: "#967952",
    variants: buildVariants("prod-sorbet-vanilla", sorbetBase, "Vanilla", "#f5f0dc"),
    tags: ["Bestseller"],
    material: "100% Minky Sorbet Fabric",
    threadPoints: sorbetBase * 2,
  },
  {
    id: "prod-sorbet-silver-cloud",
    handle: "sorbet-silver-cloud",
    title: "Sorbet Silver Cloud",
    description:
      "Cool silver tones in our lightest fabric. Silky smooth comfort for warmer months or on-the-go luxury.",
    collection: "sorbet",
    priceRange: { min: sorbetBase, max: sorbetBase + 80 },
    colorHex: "#c8c8c8",
    accentHex: "#6b7f8d",
    variants: buildVariants("prod-sorbet-silver-cloud", sorbetBase, "Silver Cloud", "#c8c8c8"),
    tags: [],
    material: "100% Minky Sorbet Fabric",
    threadPoints: sorbetBase * 2,
  },
  {
    id: "prod-sorbet-black",
    handle: "sorbet-black",
    title: "Sorbet Black",
    description:
      "Sleek and minimal. Black Sorbet is our thinnest blanket in a bold, versatile hue.",
    collection: "sorbet",
    priceRange: { min: sorbetBase, max: sorbetBase + 80 },
    colorHex: "#1a1a1a",
    accentHex: "#e3c088",
    variants: buildVariants("prod-sorbet-black", sorbetBase, "Black", "#1a1a1a"),
    tags: [],
    material: "100% Minky Sorbet Fabric",
    threadPoints: sorbetBase * 2,
  },
  {
    id: "prod-sorbet-blush-pink",
    handle: "sorbet-blush-pink",
    title: "Sorbet Blush Pink",
    description:
      "Soft, feminine, and breathable. Blush Pink Sorbet adds a gentle pop of color to your lightest layer.",
    collection: "sorbet",
    priceRange: { min: sorbetBase, max: sorbetBase + 80 },
    colorHex: "#e8b4a8",
    accentHex: "#967952",
    variants: buildVariants("prod-sorbet-blush-pink", sorbetBase, "Blush Pink", "#e8b4a8"),
    tags: [],
    material: "100% Minky Sorbet Fabric",
    threadPoints: sorbetBase * 2,
  },
];

// ---------------------------------------------------------------------------
// PRINT COLLECTION
// ---------------------------------------------------------------------------
const printBase = 109;

const printProducts: Product[] = [
  {
    id: "prod-print-wildflower",
    handle: "print-wildflower",
    title: "Wildflower Print",
    description:
      "A vibrant wildflower pattern that brings the beauty of a meadow indoors. Soft plush fabric with a bold, joyful print.",
    collection: "print",
    priceRange: { min: printBase, max: printBase + 80 },
    colorHex: "#d4a078",
    accentHex: "#5a7a5a",
    variants: buildVariants("prod-print-wildflower", printBase, "Wildflower", "#d4a078"),
    tags: ["New"],
    material: "100% Minky Print Fabric",
    threadPoints: printBase * 2,
  },
  {
    id: "prod-print-leopard-luxe",
    handle: "print-leopard-luxe",
    title: "Leopard Luxe Print",
    description:
      "Fierce meets cozy. Our leopard print in luxurious Minky fabric makes a statement while keeping you wrapped in softness.",
    collection: "print",
    priceRange: { min: printBase, max: printBase + 80 },
    colorHex: "#c4a060",
    accentHex: "#3a2a1a",
    variants: buildVariants("prod-print-leopard-luxe", printBase, "Leopard Luxe", "#c4a060"),
    tags: ["Featured"],
    material: "100% Minky Print Fabric",
    threadPoints: printBase * 2,
  },
  {
    id: "prod-print-garden-party",
    handle: "print-garden-party",
    title: "Garden Party Print",
    description:
      "Lush florals on a cream background. Garden Party is the perfect gift blanket — beautiful enough to display, soft enough to live in.",
    collection: "print",
    priceRange: { min: printBase, max: printBase + 80 },
    colorHex: "#f0e8e0",
    accentHex: "#c4847a",
    variants: buildVariants("prod-print-garden-party", printBase, "Garden Party", "#f0e8e0"),
    tags: [],
    material: "100% Minky Print Fabric",
    threadPoints: printBase * 2,
  },
];

// ---------------------------------------------------------------------------
// LUXURY COLLECTION
// ---------------------------------------------------------------------------
const luxuryBase = 149;

const luxuryProducts: Product[] = [
  {
    id: "prod-luxury-champagne-toast",
    handle: "luxury-champagne-toast",
    title: "Champagne Toast",
    description:
      "Pop the cork on luxury. Champagne Toast is our most indulgent blanket — premium Minky fabric in a warm, celebratory hue with gold-threaded edge detailing.",
    collection: "luxury",
    priceRange: { min: luxuryBase, max: luxuryBase + 80 },
    colorHex: "#e8dcc4",
    accentHex: "#967952",
    variants: buildVariants("prod-luxury-champagne-toast", luxuryBase, "Champagne", "#e8dcc4"),
    tags: ["App Exclusive", "Featured"],
    material: "100% Premium Minky Luxury Fabric",
    threadPoints: luxuryBase * 2,
  },
  {
    id: "prod-luxury-founders-edition",
    handle: "luxury-founders-edition",
    title: "Founder's Edition",
    description:
      "Created to honor our founding members. The Founder's Edition features our richest gold and black colorway with an embossed MC monogram — limited to 500 pieces.",
    collection: "luxury",
    priceRange: { min: luxuryBase + 50, max: luxuryBase + 130 },
    colorHex: "#1a1a1a",
    accentHex: "#e3c088",
    variants: buildVariants("prod-luxury-founders-edition", luxuryBase + 50, "Gold & Black", "#1a1a1a"),
    tags: ["App Exclusive", "Limited"],
    material: "100% Premium Minky Luxury Fabric",
    threadPoints: (luxuryBase + 50) * 2,
  },
];

// ---------------------------------------------------------------------------
// ALL PRODUCTS
// ---------------------------------------------------------------------------

// Mark some variants as sold out for realism
function markSoldOut(products: Product[]): Product[] {
  return products.map((p) => {
    // Cream Hugs — Infant sold out
    if (p.id === "prod-hugs-cream") {
      return {
        ...p,
        variants: p.variants.map((v) =>
          v.size === "Infant" ? { ...v, available: false } : v,
        ),
      };
    }
    // Cloud Midnight — Grande sold out
    if (p.id === "prod-cloud-midnight") {
      return {
        ...p,
        variants: p.variants.map((v) =>
          v.size === "Grande" ? { ...v, available: false } : v,
        ),
      };
    }
    // Sorbet Vanilla — Monster sold out
    if (p.id === "prod-sorbet-vanilla") {
      return {
        ...p,
        variants: p.variants.map((v) =>
          v.size === "Monster" ? { ...v, available: false } : v,
        ),
      };
    }
    return p;
  });
}

// Product image paths — maps handle to generated product photo
const productImages: Record<string, string> = {
  "cream-hugs": "/images/products/cream-hugs.png",
  "black-hugs": "/images/products/black-hugs.png",
  "oatmeal-hugs": "/images/products/oatmeal-hugs.png",
  "mist-hugs": "/images/products/mist-hugs.png",
  "alaskan-blue-hugs": "/images/products/alaskan-blue-hugs.png",
  "copper-hugs": "/images/products/copper-hugs.png",
  "petal-pink-hugs": "/images/products/petal-pink-hugs.png",
  "cloud-cream": "/images/products/cloud-cream.png",
  "cloud-midnight": "/images/products/cloud-midnight.png",
  "cloud-blush": "/images/products/cloud-blush.png",
  "plush-night-sky": "/images/products/plush-night-sky.png",
  "plush-charcoal": "/images/products/plush-charcoal.png",
  "feather-night-sky": "/images/products/feather-night-sky.png",
  "sorbet-vanilla": "/images/products/sorbet-vanilla.png",
  "sorbet-silver-cloud": "/images/products/sorbet-silver-cloud.png",
  "sorbet-black": "/images/products/sorbet-black.png",
  "sorbet-blush-pink": "/images/products/sorbet-blush-pink.png",
  "print-wildflower": "/images/products/print-wildflower.png",
  "print-leopard-luxe": "/images/products/print-leopard-luxe.png",
  "print-garden-party": "/images/products/print-garden-party.png",
  "luxury-champagne-toast": "/images/products/luxury-champagne-toast.png",
  "luxury-founders-edition": "/images/products/luxury-founders-edition.png",
};

function addImages(products: Product[]): Product[] {
  return products.map((p) => ({
    ...p,
    image: productImages[p.handle] ?? undefined,
  }));
}

export const allProducts: Product[] = addImages(markSoldOut([
  ...hugsProducts,
  ...cloudProducts,
  ...plushProducts,
  ...sorbetProducts,
  ...printProducts,
  ...luxuryProducts,
]));

// ---------------------------------------------------------------------------
// VAULT DROPS
// ---------------------------------------------------------------------------
export const vaultDrops: VaultDrop[] = [
  {
    id: "drop-1",
    productId: "prod-cloud-midnight",
    name: "Cloud Midnight",
    description:
      "An app-exclusive dark luxury blanket with cloud-like bubbly texture. Deep navy meets heavenly softness.",
    price: "$189",
    colorHex: "#1e232d",
    accentHex: "#e3c088",
    tierRestriction: "Grand & Lush only",
    live: true,
    countdownHours: 3,
    countdownMinutes: 42,
  },
  {
    id: "drop-2",
    productId: "prod-luxury-founders-edition",
    name: "Founder's Edition",
    description:
      "Limited to 500 pieces. Gold & black luxury with embossed MC monogram.",
    price: "$249",
    colorHex: "#1a1a1a",
    accentHex: "#e3c088",
    tierRestriction: "Grand only",
    live: false,
    countdownHours: 11,
    countdownMinutes: 0,
  },
  {
    id: "drop-3",
    productId: "prod-luxury-champagne-toast",
    name: "Champagne Toast",
    description:
      "Premium luxury blanket in a warm celebratory hue with gold-threaded edge detailing.",
    price: "$199",
    colorHex: "#e8dcc4",
    accentHex: "#967952",
    tierRestriction: "All members",
    live: false,
    countdownHours: 23,
    countdownMinutes: 15,
  },
];

// ---------------------------------------------------------------------------
// DREAM FEED CONTENT
// ---------------------------------------------------------------------------
export const feedItems: FeedItem[] = [
  {
    id: "feed-1",
    title: "Sunday Morning Ritual",
    subtitle: "How to style your Minky",
    category: "Lifestyle",
    bgColor: "#2e3547",
    image: "/images/dream-feed-styling.png",
    navigateTo: "content-detail",
    content:
      "There's an art to the perfect Sunday morning. Start with your favorite Minky draped over the couch, a warm cup of coffee, and nowhere to be. Our styling guide shows you how to layer, fold, and display your Minky blankets like the luxury pieces they are — from the living room to the bedroom to the perfect gift wrap.",
  },
  {
    id: "feed-2",
    title: "Gift Guide 2026",
    subtitle: "For every person on your list",
    category: "Shopping",
    bgColor: "#967952",
    image: "/images/dream-feed-gift.png",
    navigateTo: "content-detail",
    content:
      "Finding the perfect gift shouldn't feel like a chore. Whether it's a new mom, your best friend, or the person who has everything — a Minky blanket is always the answer. Our curated guide matches every personality with their perfect Minky: Hugs for the homebody, Sorbet for the traveler, Cloud for the luxury lover.",
  },
  {
    id: "feed-3",
    title: "The Grand Collection",
    subtitle: "Vault drop incoming",
    category: "Vault",
    bgColor: "#1e232d",
    image: "/images/dream-feed-vault.png",
    navigateTo: "shop",
    content:
      "Something extraordinary is coming to The Vault. Our Grand Collection features the most premium Minky fabric we've ever created, in colors that will only be available through the app. Set your notifications and be ready — these drops sell out in minutes.",
  },
  {
    id: "feed-4",
    title: "Heart of Minky",
    subtitle: "155,000 blankets and counting",
    category: "Impact",
    bgColor: "#e4b2a0",
    image: "/images/dream-feed-heart.png",
    navigateTo: "heart",
    content:
      "Every blanket you buy helps a family in need. Through the Heart of Minky program, we've donated over 155,000 blankets — worth $5.5 million — to NICUs, hospitals, and families across all 50 states. When you wrap yourself in a Minky, you're wrapping someone else in comfort too.",
  },
];

// ---------------------------------------------------------------------------
// NOTIFICATIONS
// ---------------------------------------------------------------------------
export const notifications: Notification[] = [
  {
    id: "notif-1",
    title: "Vault Drop Live!",
    message: "Cloud Midnight is available now. Grand & Lush members only.",
    time: "2 min ago",
    read: false,
    icon: "lock",
    navigateTo: "shop",
  },
  {
    id: "notif-2",
    title: "+320 Thread Points",
    message: "You earned points for your Cream Hugs purchase.",
    time: "3 days ago",
    read: false,
    icon: "star",
    navigateTo: "loyalty",
  },
  {
    id: "notif-3",
    title: "Welcome to Couture Club!",
    message: "Your Founder Status badge and free shipping are active.",
    time: "1 week ago",
    read: true,
    icon: "heart",
    navigateTo: "loyalty",
  },
  {
    id: "notif-4",
    title: "Heart of Minky Update",
    message: "Your 3rd mini blanket was delivered to Primary Children's NICU.",
    time: "2 weeks ago",
    read: true,
    icon: "heart",
    navigateTo: "heart",
  },
];

// ---------------------------------------------------------------------------
// ORDER HISTORY
// ---------------------------------------------------------------------------
export const orderHistory: OrderItem[] = [
  {
    id: "order-1",
    productName: "Cream Hugs — Monster",
    date: "Feb 18, 2026",
    price: "$179",
    status: "Delivered",
    colorHex: "#f0ebe3",
  },
  {
    id: "order-2",
    productName: "Cloud Midnight — Adult",
    date: "Feb 10, 2026",
    price: "$149",
    status: "Shipping",
    colorHex: "#1e232d",
  },
  {
    id: "order-4",
    productName: "Sorbet Vanilla — Adult",
    date: "Jan 15, 2026",
    price: "$119",
    status: "Delivered",
    colorHex: "#f5f0dc",
  },
  {
    id: "order-5",
    productName: "Plush Night Sky — Monster",
    date: "Dec 22, 2025",
    price: "$159",
    status: "Delivered",
    colorHex: "#2e3547",
  },
];
