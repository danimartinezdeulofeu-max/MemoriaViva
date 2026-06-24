// Service Worker per Memòria Viva
const CACHE_NAME = 'memoria-viva-v1';

// 1. Instal·lació: Guardem els fitxers a la memòria cau
self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força que l'app s'actualitzi immediatament
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                '/',
                '/index.html'
                // Pots afegir aquí els noms dels teus fitxers CSS o imatges si vols
            ]);
        })
    );
});

// 2. Activació: Neteja velles versions de la memòria cau
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
});

// 3. Intercepció de peticions: Serveix el contingut des de la cau si no hi ha xarxa
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

