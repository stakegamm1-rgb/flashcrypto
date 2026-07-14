import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4GSFD5Nt7TzXrCs6gws51xvQ4XPDlUQU",
  authDomain: "landingpage-8941d.firebaseapp.com",
  projectId: "landingpage-8941d",
  storageBucket: "landingpage-8941d.firebasestorage.app",
  messagingSenderId: "835234637132",
  appId: "1:835234637132:web:c33e1da854d418531adbe9",
  measurementId: "G-46VC234Y6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, analytics };
