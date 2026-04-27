const CACHE_NAME = 'qulanshop-v4';
const assets = ['/', 'index.html', 'profile.html', 'manifest.json'];

self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        ))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request).catch(() => {}))
    );
});

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => self.registration.unregister());
  self.skipWaiting(); // Ескі SW-ді бірден өшіру
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );


self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {});
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
          // Егер интернет жоқ болса және кэште табылмаса
          console.log("Оффлайн режим немесе жүктеу қатесі");
      });
    })
  );
});
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyDyRiRE8tgUF-OANANOYQUzYSfl9vtsjuM",
    authDomain: "qulanmedia-96282.firebaseapp.com",
    projectId: "qulanmedia-96282",
    messagingSenderId: "1085151021799",
    appId: "1:1085151021799:web:4475b38903d829c560b042"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: 'https://i.yapx.ru/ddHXU.png',
        data: { url: payload.data ? payload.data.url : '/news.html' }
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});