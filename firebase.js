import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCREdxSPT6BYh7TXISSgYPXka7fQ2xD8-8",
  authDomain: "nishverse.firebaseapp.com"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GithubAuthProvider();
