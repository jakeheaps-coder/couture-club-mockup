const CACHE_NAME = "couture-club-v2";
const ASSETS = [
  "/",
  "/images/hero-blanket.png",
  "/images/vault-box.png",
  "/images/dream-feed.png",
  "/images/dream-feed-styling.png",
  "/images/dream-feed-gift.png",
  "/images/dream-feed-vault.png",
  "/images/dream-feed-heart.png",
  "/images/heart-giving.png",
  "/images/loyalty-bg.png",
  "/images/collection-hugs.png",
  "/images/collection-cloud.png",
  "/images/collection-plush.png",
  "/images/collection-sorbet.png",
  "/icon-192.png",
  "/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
