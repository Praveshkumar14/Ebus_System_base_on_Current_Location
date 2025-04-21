import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, child, query, equalTo } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxSmbqVPToHIhe6GVFNQEYkEXJwRE1UPY",
  authDomain: "ebus-management-system-1a7a5.firebaseapp.com",
  databaseURL: "https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com",
  projectId: "ebus-management-system-1a7a5",
  storageBucket: "ebus-management-system-1a7a5.firebasestorage.app",
  messagingSenderId: "899131047423",
  appId: "1:899131047423:web:45cef4512fe28c88697bca",
  measurementId: "G-RMYCWDLBB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
