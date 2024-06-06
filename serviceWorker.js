const staticPage = "dev-user-site-v1"
const assets = [
    "/",
    "/index.html",
    "/styles.css",
    "/script.js",
]

self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
        caches.open(staticPage).then((cache) => {
            cache.addAll(assets)
        })
    )

})

self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(response => response || fetch(fetchEvent.request)
        )
    )
})

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/serviceWorker.js").then(response => console.log("serviceWorker registrado")).catch(err => console.log("serviceWorker no registrado"))
    })
}
// .then() para manejar promesas, async awayt o callbacks

// Como recuperar una peticion: con un fetch (  )