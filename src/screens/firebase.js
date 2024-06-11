import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7p_IrQ3C9wb4b3Vu27v0KNTzqxBaohDk",
  authDomain: "auth-5f103.firebaseapp.com",
  projectId: "nse-fantasy-new",
  storageBucket: "nse-fantasy-new.appspot.com",
  messagingSenderId: "682218343549",
  appId: "1:682218343549:android:c56295ef012c3ee4457514"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({   
  prompt : "select_account "
});

// Initialize Firebase Authentication
export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
