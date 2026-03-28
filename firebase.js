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

window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  // ✅ Handle redirect result FIRST
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        console.log("Login successful:", result.user);
        window.location.href = "/dashboard.html";
      }
    })
    .catch((error) => {
      console.error("Redirect error:", error);
    });

  // ✅ Fallback session check
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "/dashboard.html";
    }
  });

  // ✅ Attach click safely
  if (loginBtn) {
    loginBtn.onclick = async () => {
      await signInWithRedirect(auth, provider);
    };
  }
});
