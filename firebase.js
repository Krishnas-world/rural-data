// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyjMuc8ih5QipJ8zhnI1X-3CdR0Jhg5qI",
  authDomain: "datacollection-d02d1.firebaseapp.com",
  projectId: "datacollection-d02d1",
  storageBucket: "datacollection-d02d1.appspot.com",
  messagingSenderId: "856298187491",
  appId: "1:856298187491:web:747eb9f18a65b18d5fb3d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
