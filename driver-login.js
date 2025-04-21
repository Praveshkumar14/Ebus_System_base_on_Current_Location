import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

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

// Handle form submission
document.getElementById('driver-login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('driver-username').value.trim();
    const password = document.getElementById('driver-password').value.trim();
    const errorMessage = document.getElementById('login-error');

    // Validate input fields
    if (!username || !password) {
        errorMessage.textContent = "All fields are required!";
        return;
    }

    try {
        // Fetch the driver-login data from Firebase
        const response = await fetch("https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com/driver-login.json");

        if (!response.ok) {
            throw new Error("Failed to fetch data from Firebase.");
        }

        const drivers = await response.json();

        if (drivers) {
            // Check if credentials match any record in the driver-login collection
            let isValid = false;

            for (const key in drivers) {
                const driver = drivers[key];
                if (driver.email === username && driver.password === password) {
                    isValid = true;
                    break;
                }
            }

            if (isValid) {
                alert("Login successful!");
                window.location.href = "driver-profile.html"; // Redirect to driver profile
            } else {
                errorMessage.textContent = "Invalid username or password!";
            }
        } else {
            errorMessage.textContent = "No driver data found!";
        }
    } catch (error) {
        console.error("Error validating login:", error);
        errorMessage.textContent = "An error occurred. Please try again later.";
    }
});
