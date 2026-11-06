// Bump this whenever app.js and index.html change together: a new name makes the install below
// fetch every file as one set, so a new app.js never runs against an old cached index.html.
const CACHE_NAME = 'spine-safe-v15';
const ASSETS = ['./', './index.html', './style.css', './app.js', './manifest.json'];

self.addEventListener('install', e => {
  // 'reload' skips the browser's HTTP cache, which could otherwise hand back an old copy of one file
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' })))));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Answer from the cache straight away, then refresh the cache in the background.
// A deploy that changes one file shows up the next time the app is opened, with no CACHE_NAME bump.
// Files refreshed this way update one at a time, which is why paired changes need the bump above.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(e.request).then(cached => {
        const fresh = fetch(e.request).then(res => {
          if (res.ok) cache.put(e.request, res.clone());
          return res;
        });
        if (!cached) return fresh;
        e.waitUntil(fresh.catch(() => {}));
        return cached;
      })
    )
  );
});
