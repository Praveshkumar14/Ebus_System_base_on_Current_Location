import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Firebase URL for users data
const usersUrl = "https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com/users.json";

// Get the login form and error message elements
const form = document.getElementById("user-login-form");
const errorMessage = document.getElementById("user-error");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get the values entered by the user
    const username = document.getElementById("user-username").value.trim();
    const password = document.getElementById("user-password").value.trim();

    // Check if the fields are empty
    if (username === '' || password === '') {
        errorMessage.textContent = 'Both fields are required!';
        return;
    }

    try {
        // Fetch user data from Firebase using the specified URL
        const response = await fetch(usersUrl);
        if (!response.ok) throw new Error('Failed to fetch users');

        const usersData = await response.json();

        let userFound = false;

        // Iterate through users data and check if any user matches the entered username and password
        for (const key in usersData) {
            const user = usersData[key];
            if (user.username === username && user.password === password) {
                // User found, login successful
                userFound = true;
                // Redirect to user profile page
                window.location.href = "user-profile.html"; // Redirect to profile page
                break;
            }
        }

        if (!userFound) {
            errorMessage.textContent = 'Invalid username or password!';
        }

    } catch (error) {
        console.error("Error validating login credentials:", error);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
});
