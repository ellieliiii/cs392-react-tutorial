// src/utilities/firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEr17xUJ0ZS61DkL2oFR9mS7la-E1uSco",
  authDomain: "cs392-react-tutorial-80c55.firebaseapp.com",
  databaseURL: "https://cs392-react-tutorial-80c55-default-rtdb.firebaseio.com",
  projectId: "cs392-react-tutorial-80c55",
  storageBucket: "cs392-react-tutorial-80c55.appspot.com",
  messagingSenderId: "1067922315413",
  appId: "1:1067922315413:web:d24e4f3fa8715c787ce39c",
  measurementId: "G-1HTY21DLNE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Realtime Database and Auth
const database = getDatabase(app);
const auth = getAuth(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to sign in with Google
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
};

// Function to sign out
export const signOutUser = () => {
  firebaseSignOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
    })
    .catch((error) => {
      console.error("Error during sign out:", error);
    });
};

// Custom hook to track authentication state
export const useAuthState = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return [user];
};

// Export the database and auth instances
export { database, auth };
