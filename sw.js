const staticCache = 'Static-cache-v1';
const dynamicCache = 'Dynamic-cache-v1';

const assets = [
    "/",
    "/index.html",
    "/App.js",
    "/app.css",
    "/pages/about.html",
    "/pages/dashboard.html",
    "/pages/login.html",
    "/pages/resetpassword.html",
    "/pages/signup.html",
    "/img/box.jpg",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
];

self.addEventListener("install", function (event) {
    console.log(`Event fired: ${event.type}`);
    event.waitUntil(
        caches.open(staticCache).then(function (cache){
            console.log("SW: Precaching App shell");
            cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                .filter(key => key != staticCache)
                .map((key) => caches.delete(key))
            );
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response || 
                fetch(event.request).then(fetchRes => {
                    return caches.open(dynamicCache).then((cache) => {
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                })
            );
        }).catch(() => caches.match('/pages/fallback.html'))
    );
});
