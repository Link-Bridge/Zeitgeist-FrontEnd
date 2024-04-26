importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: true,
  authDomain: true,
  projectId: true,
  storageBucket: true,
  messagingSenderId: true,
  appId: true,
};

const app = firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging(app);

messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || payload.notification.image,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
