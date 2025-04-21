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


document.getElementById("admin-register-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const email = document.getElementById("admin-email").value.trim();
    const password = document.getElementById("admin-password").value.trim();
    const confirmPassword = document.getElementById("admin-confirm-password").value.trim();
    const errorMessage = document.getElementById("admin-error");

    if (!username || !email || !password || !confirmPassword) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match!";
        return;
    }

    try {
        const adminData = {
            username,
            email,
            password,
        };

        // Sending data to Firebase
        const response = await fetch("https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com/EMBLS.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });

        if (response.ok) {
            alert("Registration successful! You can now log in.");
            window.location.href = "admin-login.html"; // Redirect to login page
        } else {
            throw new Error("Failed to save data.");
        }
    } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.textContent = "An error occurred. Please try again.";
    }
});
