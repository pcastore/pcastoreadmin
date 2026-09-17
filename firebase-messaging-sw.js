// firebase-messaging-sw.js
// Deploy this file at the ROOT of the ADMIN domain (e.g.
// https://pcastoreadmin.vercel.app/firebase-messaging-sw.js) — service
// workers only apply to the origin they're served from, so this is a
// separate copy from the one already deployed on the store/customer domain,
// even though the Firebase config is identical (same project).
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyA2mwdZ2tAoZ3_6HNl43fUSi9t_ZkRita4",
    authDomain: "pca-game-store.firebaseapp.com",
    projectId: "pca-game-store",
    storageBucket: "pca-game-store.firebasestorage.app",
    messagingSenderId: "666629360027",
    appId: "1:666629360027:web:23dcf1dc1f9ebeb86cb93e"
});

const messaging = firebase.messaging();

// Shows the OS-level notification when a push arrives while the admin
// panel tab isn't open/focused. (When it IS open/focused, the FCM SDK
// delivers the message to the page directly instead of through here.)
messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'PCA Store Admin';
    const body = (payload.notification && payload.notification.body) || '';
    self.registration.showNotification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        data: payload.data || {}
    });
});

// Tapping the notification focuses an already-open admin tab if there is
// one, otherwise opens a new one at the site root.
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if ('focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
