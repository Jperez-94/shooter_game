'use strict';

// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v9';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/offline.html',
  '/index.html',
  '/assets/css/main.css',
  '/assets/img/bueno_muerto.png',
  '/assets/img/bueno.png',
  '/assets/img/game_over.png',
  '/assets/img/jefe_muerto.png',
  '/assets/img/jefe.png',
  '/assets/img/malo_muerto.png',
  '/assets/img/malo.png',
  '/assets/img/shot1.png',
  '/assets/img/shot2.png',
  '/assets/img/you_win.png',
  '/assets/img/player_shot_150.png',
  '/assets/img/player_shot_520.png',
  '/app/Animations.js',
  '/app/main.js',
  '/app/Navigation.js',
  '/app/UI.js',
  '/app/install.js',
  '/app/Game/Boss.js',
  '/app/Game/Character.js',
  '/app/Game/Entity.js',
  '/app/Game/Game.js',
  '/app/Game/Opponent.js',
  '/app/Game/Player.js',
  '/app/Game/Shot.js',
  '/app/Game/utils.js',
  '/app/libs/anime.min.js',
  '/app/libs/swiper.css',
  '/app/libs/swiper.min.js',
  'assets/fonts/material-icons/materialdesignicons-webfont.eot',
  'assets/fonts/material-icons/materialdesignicons-webfont.ttf',
  'assets/fonts/material-icons/materialdesignicons-webfont.woff',
  'assets/fonts/material-icons/materialdesignicons-webfont.woff2',
  'assets/css/materialdesignicons.css'
];

self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // CODELAB: Add fetch event handler here.
  // if (evt.request.mode !== 'navigate') {
  //   // Not a page navigation, bail.
  //   console.log("Fetch no navigate");
  //   return;
  // }
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});
