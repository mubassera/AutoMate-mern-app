const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyDOD0qXU0hMPj2NF92PFr8bTbgY_oaxlpM",
  authDomain: "automate-1ee72.firebaseapp.com",
  projectId: "automate-1ee72",
  storageBucket: "automate-1ee72.appspot.com",
  messagingSenderId: "655293728200",
  appId: "1:655293728200:web:5b5a1bf5ca94484ee1acfd",
  measurementId: "G-PM33G3XQQN",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = { storage };
