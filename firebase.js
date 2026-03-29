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
export const auth = getAuth(app);  // âœ… exported so dashboard.html can import it
const provider = new GithubAuthProvider();

window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");

  // âœ… Handle redirect result FIRST (runs after GitHub redirects back)
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

  // âœ… Fallback: if session already exists, go to dashboard
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "/dashboard.html";
    }
  });

  // âœ… Attach login click safely (loginBtn only exists on index.html)
  if (loginBtn) {
    loginBtn.onclick = async () => {
      await signInWithRedirect(auth, provider);
    };
  }
});
