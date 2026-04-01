// firebase.js (or your main auth file)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// 🔹 Firebase config
const firebaseConfig = {
  apiKey: "-8",
  authDomain: "nishverse.firebaseapp.com"
};

// 🔹 Initialize
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
export const googleProvider = new GoogleAuthProvider();

// 🔐 Session config
const MAX_SESSION_TIME = 60 * 60 * 1000; // 1 hour

// 🧠 Track login time
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Only set once (avoid reset on refresh)
    if (!localStorage.getItem("loginTime")) {
      localStorage.setItem("loginTime", Date.now());
    }
  } else {
    localStorage.removeItem("loginTime");
  }
});

// 🔒 Logout function
export async function logoutUser() {
  try {
    await signOut(auth);

    localStorage.removeItem("loginTime");
    sessionStorage.clear();

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed:", error);
  }
}

// ⏱️ Check session expiry
function checkSessionExpiry() {
  const loginTime = localStorage.getItem("loginTime");

  if (!loginTime) return;

  const now = Date.now();

  // Optional warning (5 mins before logout)
  if (now - loginTime > MAX_SESSION_TIME - 5 * 60 * 1000) {
    console.log("⚠️ Session expiring soon");
  }

  if (now - loginTime > MAX_SESSION_TIME) {
    logoutUser();
  }
}

// ▶️ Run checks
checkSessionExpiry();
setInterval(checkSessionExpiry, 60 * 1000);

// 🔘 Optional: expose logout globally for button
window.logout = logoutUser;
