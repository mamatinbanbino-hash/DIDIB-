const CACHE_NAME = 'didib-v1';
const ASSETS = [
    './',
    './index.html',
    './brain.js',
    './cover.jpg'
];

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(response => {
                return caches.open(CACHE_NAME).then(cache => {
                    // On met en cache chaque nouveau son écouté pour le hors-connexion
                    if (e.request.url.includes('.mp3')) {
                        cache.put(e.request, response.clone());
                    }
                    return response;
                });
            });
        })
    );
});
