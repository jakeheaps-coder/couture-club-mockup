export type Size = "Grande" | "Monster" | "Adult" | "Travel" | "Tween" | "Infant";

export type CollectionHandle =
  | "hugs"
  | "cloud"
  | "plush"
  | "sorbet"
  | "print"
  | "luxury";

export interface Variant {
  id: string;
  title: string;
  size: Size;
  color: string;
  colorHex: string;
  price: number;
  available: boolean;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  collection: CollectionHandle;
  priceRange: { min: number; max: number };
  colorHex: string;
  accentHex: string;
  variants: Variant[];
  tags: string[];
  material: string;
  threadPoints: number;
  image?: string;
  thumbnailImage?: string;
}

export interface Collection {
  id: string;
  handle: CollectionHandle;
  title: string;
  description: string;
  tagline: string;
  colorHex: string;
  productIds: string[];
}

export interface VaultDrop {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: string;
  colorHex: string;
  accentHex: string;
  tierRestriction: string;
  live: boolean;
  countdownHours: number;
  countdownMinutes: number;
}

export interface FeedItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  bgColor: string;
  image: string | null;
  navigateTo?: string;
  content?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  navigateTo?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  size: Size;
  quantity: number;
  price: number;
  colorHex: string;
  accentHex: string;
}

export interface OrderItem {
  id: string;
  productName: string;
  date: string;
  price: string;
  status: "Delivered" | "Shipping" | "In Production" | "Processing";
  colorHex: string;
}
