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

// Get the form and error message elements
const form = document.getElementById('user-register-form');
const errorMessage = document.getElementById('register-error');

// Firebase URL for storing user registration data
const FIREBASE_URL = "https://ebus-management-system-1a7a5-default-rtdb.firebaseio.com/users.json";

// Handle form submission
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Get the form values
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();

    // Validate input values
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
        errorMessage.textContent = 'All fields are required!';
    } else if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
    } else {
        // Clear error message
        errorMessage.textContent = '';

        // Prepare user data
        const newUser = {
            username,
            email,
            password
        };

        try {
            // Send user data to Firebase
            const response = await fetch(FIREBASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Registration Successful! You can now log in.');
                window.location.href = 'user-login.html'; // Redirect to login page
            } else {
                throw new Error('Failed to register user.');
            }
        } catch (error) {
            console.error('Error saving user data:', error);
            errorMessage.textContent = 'Registration failed. Please try again.';
        }
    }
});
