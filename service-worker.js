const CACHE_NAME = "newnormalid";
var urlsToCache = [
  "/",
  "/images/negative.webp",
  "/images/new-normal.webp",
  "/images/positive.webp",
  "/images/profile.webp",
  "/images/sosdis.webp",
  "/images/android-chrome-512x512.webp",
  "/images/android-chrome-384x384.webp",
  "/images/android-chrome-256x256.webp",
  "/images/android-chrome-192x192.webp",
  "/images/android-chrome-144x144.webp",
  "/images/android-chrome-96x96.webp",
  "/images/android-chrome-36x36.webp",
  "/fonts/material-icons.woff2",
  "/fonts/Poppins-Medium.ttf",
  "/nav.html",
  "/index.html",
  "/pages/about-devs.html",
  "/pages/definition.html",
  "/pages/protocol.html",
  "/pages/side-effect-pos.html",
  "/pages/side-effect-neg.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/js/nav.js"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});