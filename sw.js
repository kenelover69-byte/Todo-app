const CACHE_NAME = "todoapp-v1";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./manifest.webmanifest"
];


self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );

});


self.addEventListener("fetch", event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );

});