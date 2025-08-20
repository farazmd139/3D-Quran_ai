// sw.js

const CACHE_NAME = 'quran-app-cache-v1';

// Yeh woh zaroori files hain jo app ko shuru karne ke liye lazmi hain.
const STATIC_ASSETS = [
    '/',
    'index.html',
    'manifest.json'
    // Agar aap icon banate hain to unka naam yahan add karein, maslan:
    // 'icon-512x512.png'
];

// Install event: Jab service worker install hota hai, to static assets ko cache kar lo.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('App shell ko cache kiya ja raha hai');
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate event: Purane caches ko saaf karo.
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event: Har network request ko handle karo.
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Agar request Quran API ya Google Fonts ke liye hai,
    // to pehle cache mein dekho, agar na mile to network se lao.
    if (url.hostname === 'api.alquran.cloud' || url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com')) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return cache.match(request).then(cachedResponse => {
                    const fetchedResponsePromise = fetch(request).then(networkResponse => {
                        // Network se milne wale response ko cache mein save kar lo.
                        cache.put(request, networkResponse.clone());
                        return networkResponse;
                    });
                    // Agar cache mein response hai to woh foran dikhao, warna network ka intezar karo.
                    return cachedResponse || fetchedResponsePromise;
                });
            })
        );
    } else {
        // Baaki sabhi requests ke liye, pehle cache mein dekho.
        event.respondWith(
            caches.match(request).then(cachedResponse => {
                return cachedResponse || fetch(request); // Agar cache mein na ho to network se fetch karo.
            })
        );
    }
});
