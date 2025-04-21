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
const db = getDatabase(app);


document.getElementById("admin-login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();
    const errorMessage = document.getElementById("admin-error");

    if (!username || !password) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    try {
        // Fetch all admin data
        const response = await fetch("https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com/EMBLS.json");
        const data = await response.json();

        // Check if credentials match
        const matchedAdmin = Object.values(data || {}).find(
            (admin) => admin.username === username && admin.password === password
        );

        if (matchedAdmin) {
            alert("Login successful!");
            window.location.href = "admin-profile.html"; // Redirect to admin profile
        } else {
            errorMessage.textContent = "Username or password is incorrect!";
        }
    } catch (error) {
        console.error("Error during login:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
