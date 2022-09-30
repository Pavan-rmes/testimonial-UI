import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);
if (isSignInWithEmailLink(auth, window.location.href)) {
  let email = window.localStorage.getItem('emailForSignIn');
  if (!email) {
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  signInWithEmailLink(auth, email, window.location.href)
    .then((result) => {
      window.localStorage.removeItem('emailForSignIn');
    })
    .catch((error) => {
        console.log(error)
    });
}