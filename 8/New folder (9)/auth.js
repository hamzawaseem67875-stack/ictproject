// Toggle between Login and Signup pages
function showSignup(event) {
    event.preventDefault();
    document.getElementById("loginWrapper").style.display = "none";
    document.getElementById("signupWrapper").style.display = "block";
}

function showLogin(event) {
    event.preventDefault();
    document.getElementById("signupWrapper").style.display = "none";
    document.getElementById("loginWrapper").style.display = "block";
}

// Handle signup form submission
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const fullName = this.querySelector("input[placeholder='Full Name']").value;
    const email = this.querySelector("input[placeholder='Email Address']").value;
    const userId = this.querySelector("input[placeholder='User ID']").value;
    const password = this.querySelectorAll("input[type='password']")[0].value;
    const confirmPassword = this.querySelectorAll("input[type='password']")[1].value;
    const termsAccepted = this.querySelector("input[type='checkbox']").checked;

    // Validation
    if (!fullName || !email || !userId || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    if (!termsAccepted) {
        alert("Please accept Terms & Conditions");
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    // Check if user ID already exists
    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[userId]) {
        alert("User ID already exists. Please choose a different one.");
        return;
    }

    // Store user data in localStorage
    users[userId] = {
        fullName: fullName,
        email: email,
        password: password
    };
    localStorage.setItem("users", JSON.stringify(users));

    // Success message
    alert("Sign up successful! Please login with your credentials.");
    this.reset();
    showLogin(event);
});

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const userId = this.querySelector("input[placeholder='User ID']").value;
    const password = this.querySelector("input[type='password']").value;

    if (!userId || !password) {
        alert("Please enter User ID and Password");
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if user exists and password is correct
    if (!users[userId]) {
        alert("User ID not found. Please sign up first.");
        return;
    }

    if (users[userId].password !== password) {
        alert("Incorrect password. Please try again.");
        return;
    }

    // Login successful - store current user and redirect
    localStorage.setItem("currentUser", userId);
    window.location.href = "ICTLabProject.html";
});
