importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.5/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDM_Mm5LywPMkkKjE6dCgNyMbC7rBl8DJI",
    authDomain: "jantagarage-96e2c.firebaseapp.com",
    databaseURL: "https://jantagarage-96e2c.firebaseio.com",
    projectId: "jantagarage-96e2c",
    storageBucket: "jantagarage-96e2c.appspot.com",
    messagingSenderId: "912186743385",
    appId: "1:912186743385:web:6f0b734aad18d8349d2f48",
    measurementId: "G-Y0D4LM2VDG"
  };

firebase.initializeApp(firebaseConfig);
const messaging  = firebase.messaging();
messaging.setBackgroundMessageHandler(payload=>{
  const title = payload.title;
  const notificationOptions = {
    body:payload.body,
    icon:paylaod.icon,
  };
  return self.registration.shwoNotification(title,notificationOptions);
})
