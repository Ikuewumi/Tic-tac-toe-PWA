const staticCache = 'static-tic-tac-toe-v10'
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/index.js',
  '/js/Game.js',
  '/assets/logo.svg',
  '/assets/OverpassMono-Regular.ttf',
  '/manifest.json'
]

self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(staticCache)
      .then(cache => {
         cache.addAll(assets)
      })
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => {
        return Promise.all(
          keys.filter(key => key !== staticCache)
            .map(key => caches.delete(key))
        )
      })
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(fetchRes => {
        return fetchRes || fetch(event.request)
          .then((res) => res)
          .catch(() => console.log('did not work'))
      })
  )
})
