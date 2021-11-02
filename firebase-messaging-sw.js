// [START initialize_firebase_in_sw]
// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

var firebaseConfig = {
        apiKey: "AIzaSyClhLYPAJLMf82fp8IWvrAiqIHRo0XT5Sw",
        authDomain: "browser-notification-dc698.firebaseapp.com",
        databaseURL: "https://browser-notification-dc698-default-rtdb.firebaseio.com",
        projectId: "browser-notification-dc698",
        storageBucket: "browser-notification-dc698.appspot.com",
        messagingSenderId: "592848149775",
        appId: "1:592848149775:web:d2457328960ec99653727a",
        measurementId: "G-1WZ7HZ2G39"
    };
	
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  var notification = payload.notification
  var notificationTitle = notification.title;
  var notificationOptions = {
    body: notification.body,
    icon: '/static/images/logo.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});