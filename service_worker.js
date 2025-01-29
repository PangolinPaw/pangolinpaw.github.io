const VERSION = '0.1'

const CACHE_NAME = `pokechat_${VERSION}`;

const APP_STATIC_RESOURCES = [
	'/',
	'/style.css',
	'/chat.js',
	'/icon/android-launchericon-48-48.png'
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});