/**
 * Data access layer — Shopify Storefront API-ready shape.
 *
 * Currently reads from local mock data. To switch to live Shopify:
 * 1. Add NEXT_PUBLIC_SHOPIFY_DOMAIN + NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN to .env.local
 * 2. Replace each function body with a GraphQL fetch to the Storefront API
 * 3. Map Shopify response shapes to our Product / Collection types
 *
 * Zero component changes required — only this file needs updating.
 */

import { allProducts, vaultDrops, feedItems, notifications, orderHistory } from "@/data/products";
import { collections } from "@/data/collections";
import type { Product, Collection, VaultDrop, FeedItem, Notification, OrderItem } from "@/types";

// ── Products ────────────────────────────────────────────────────────────────

export function getProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductByHandle(handle: string): Product | undefined {
  return allProducts.find((p) => p.handle === handle);
}

export function getFeaturedProducts(): Product[] {
  return allProducts.filter((p) => p.tags.includes("Featured"));
}

export function getAppExclusives(): Product[] {
  return allProducts.filter((p) => p.tags.includes("App Exclusive"));
}

export function getProductsByCollection(handle: string): Product[] {
  return allProducts.filter((p) => p.collection === handle);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.material.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}

export function getProductsByTag(tag: string): Product[] {
  const t = tag.toLowerCase().trim();
  return allProducts.filter((p) => p.tags.some((pt) => pt.toLowerCase() === t));
}

// ── Collections ─────────────────────────────────────────────────────────────

export function getCollections(): Collection[] {
  return collections;
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

// ── Vault ───────────────────────────────────────────────────────────────────

export function getVaultDrops(): VaultDrop[] {
  return vaultDrops;
}

export function getLiveVaultDrop(): VaultDrop | undefined {
  return vaultDrops.find((d) => d.live);
}

// ── Content ─────────────────────────────────────────────────────────────────

export function getFeedItems(): FeedItem[] {
  return feedItems;
}

export function getFeedItemById(id: string): FeedItem | undefined {
  return feedItems.find((f) => f.id === id);
}

// ── Notifications ───────────────────────────────────────────────────────────

export function getNotifications(): Notification[] {
  return notifications;
}

// ── Orders ──────────────────────────────────────────────────────────────────

export function getOrderHistory(): OrderItem[] {
  return orderHistory;
}
