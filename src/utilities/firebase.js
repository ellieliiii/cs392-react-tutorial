import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; // Import getDatabase

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

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

// Export the database instance
export { database };
