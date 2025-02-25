const CACHE_NAME = "kinleys-cache-v1";
const OFFLINE_URL = "/offline.html";
const assetsToCache = [
    "/",
    "/index.html",
    "/assets/css/styles.css",
    "/assets/js/jquery-1.12.1.min.js",
    "/assets/js/bootstrap.min.js",
    "/assets/js/jquery-1.12.1.min.js",
    "/assets/js/script.js",
    "/assets/js/jquery.fancybox.min.js",
    "/assets/js/jquery.scrollUp.min.js",
    "/assets/images/kinleys_logo.png",
    "/offline.html"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assetsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request) || caches.match(OFFLINE_URL);
        })
    );
});
