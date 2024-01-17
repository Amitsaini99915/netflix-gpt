// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyClDcg2VEg19pS8e1ioYQ_vozFAfbaJnXs",
  authDomain: "netflixgpt-f5335.firebaseapp.com",
  projectId: "netflixgpt-f5335",
  storageBucket: "netflixgpt-f5335.appspot.com",
  messagingSenderId: "661532932288",
  appId: "1:661532932288:web:2b71a7ada604795d2a5525",
  measurementId: "G-VTJ53JMFV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
