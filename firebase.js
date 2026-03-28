// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCREdxSPT6BYh7TXISSgYPXka7fQ2xD8-8",
  authDomain: "nishverse.firebaseapp.com",
  projectId: "nishverse",
  storageBucket: "nishverse.firebasestorage.app",
  messagingSenderId: "522510581544",
  appId: "1:522510581544:web:442867fbdea205df449a1d",
  measurementId: "G-6802T1J0TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GithubAuthProvider();
export { auth, provider };
