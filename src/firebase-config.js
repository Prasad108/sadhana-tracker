// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5UD-Xn7QGZar6n4qr3udOnL3NB1EN08Q",
  authDomain: "sadhana-tracker-63377.firebaseapp.com",
  projectId: "sadhana-tracker-63377",
  storageBucket: "sadhana-tracker-63377.firebasestorage.app",
  messagingSenderId: "917883979728",
  appId: "1:917883979728:web:ad691e3912ab910c7edbd5",
  measurementId: "G-6XXZB7WJCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
    prompt : "select_account "
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
