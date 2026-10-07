// ========================================
// ALREADY LOGGED IN? GO STRAIGHT TO DASHBOARD
// (only redirects when a valid session exists,
//  so it can never bounce back and forth)
// ========================================

if (localStorage.getItem("smartHomeAuth") === "true") {
    window.location.replace("index.html");
}

const form = document.getElementById("loginForm");
const message = document.getElementById("loginMessage");


// ========================================
// LOGIN
// ========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document
        .getElementById("loginEmail")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("loginPassword")
        .value;


    // Get registered users
    let users = [];
    try {
        users = JSON.parse(
            localStorage.getItem("smartHomeUsers")
        ) || [];
    } catch (error) {
        users = [];
    }


    // Find user
    const user = users.find(function (account) {

        return (
            account.email === email &&
            account.password === password
        );

    });


    // ========================================
    // LOGIN SUCCESS
    // ========================================

    if (user) {

        // Save login status
        localStorage.setItem(
            "smartHomeAuth",
            "true"
        );


        // Save user details
        localStorage.setItem(
            "smartHomeUser",
            user.name
        );

        localStorage.setItem(
            "smartHomeEmail",
            user.email
        );


        message.textContent =
            "Login successful! Opening Smart Home...";

        message.className =
            "login-message success";


        // IMPORTANT:
        // Change this filename if your main file
        // has a different name.

        setTimeout(function () {

            window.location.replace("index.html");

        }, 500);

    }


    // ========================================
    // LOGIN FAILED
    // ========================================

    else {

        message.textContent =
            "Invalid email or password.";

        message.className =
            "login-message error";

    }

});
