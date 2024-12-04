// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYz-nf_0baujtZtrSRfRaNYKY13KRhHeQ",
  authDomain: "perfumslight.firebaseapp.com",
  projectId: "perfumslight",
  storageBucket: "perfumslight.firebasestorage.app",
  messagingSenderId: "1043281692484",
  appId: "1:1043281692484:web:49d87a44451cedde4d3911",
  measurementId: "G-JXT2RDEP45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);