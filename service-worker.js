const CACHE_NAME = 'pwa-cache-v1';
const OFFLINE_URLS = [
  '/idb.js',
  '/alpine.js',
  '/navigo.min.js',
  '/',
  '/index.html',
  '/app.js',
  '/router.js',
  '/pages/home.html',
  '/pages/inbound.html'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
