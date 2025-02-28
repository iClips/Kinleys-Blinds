const CACHE_NAME = "kinleys-cache-v1";
const OFFLINE_URL = "/offline.html";
const assetsToCache = [
  "/",
  "index.html",
  "assets/css/styles.css",
  "assets/js/jquery-1.12.1.min.js",
  "assets/js/bootstrap.min.js",
  "assets/js/script.js",
  "assets/js/jquery.fancybox.min.js",
  "assets/js/jquery.scrollUp.min.js",
  "assets/images/kinleys_logo.png",
  "offline.html"
];

// Use the 'cache-first' strategy
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cacheResponse => {
      return cacheResponse || fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(error => {
      console.error("Error fetching resource:", error);
      return caches.match(OFFLINE_URL);
    })
  );
});

// Install event: cache assets and skip waiting
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache).then(() => {
        return self.skipWaiting();
      });
    })
  );
});

// Activate event: delete old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});
