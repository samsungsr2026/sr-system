const CACHE_VER = 'sr-v202606100445';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => clients.claim())
  );
});
self.addEventListener('fetch', e => {
  // 항상 네트워크 우선, 실패시에만 캐시
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
