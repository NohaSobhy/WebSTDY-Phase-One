function register() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert("Email already registered! Please use another email.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
}

function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Both fields are required!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.email === email && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful!");
        window.location.href = "profile.html";
    } else {
        alert("Invalid email or password!");
    }
}

window.onload = function() {
    if (window.location.pathname.includes("profile.html")) {
        let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Please log in first!");
            window.location.href = "login.html";
        } else {
            document.getElementById("userName").innerText = loggedInUser.name;
            document.getElementById("userEmail").innerText = loggedInUser.email;
        }
    }
};

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}