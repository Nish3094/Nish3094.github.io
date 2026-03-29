import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCREdxSPT6BYh7TXISSgYPXka7fQ2xD8-8",
  authDomain: "nishverse.firebaseapp.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

// ✅ Handle redirect result
getRedirectResult(auth)
  .then((result) => {
    if (result?.user) {
      window.location.href = "/dashboard.html";
    }
  })
  .catch(console.error);

// ✅ Export ONLY auth + provider
export { auth, provider, signInWithRedirect };
