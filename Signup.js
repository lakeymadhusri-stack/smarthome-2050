// Already logged in? Skip signup.
if (localStorage.getItem("smartHomeAuth") === "true") {
    window.location.replace("index.html");
}


// Show / hide password (used by the eye buttons)
function togglePassword(inputId, button) {

    const input = document.getElementById(inputId);

    if (!input) return;

    const show = input.type === "password";

    input.type = show ? "text" : "password";

    button.textContent = show ? "🙈" : "👁️";

}


const signupForm =
    document.getElementById("signupForm");

const signupMessage =
    document.getElementById("message");


signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById("full")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim()
                .toLowerCase();


        const mobile =
            document
                .getElementById("mobile")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const confirmPassword =
            document
                .getElementById("confirmPassword")
                .value;


        // Check fields

        if (
            !name ||
            !email ||
            !mobile ||
            !password ||
            !confirmPassword
        ) {

            signupMessage.textContent =
                "Please fill all fields.";

            signupMessage.className =
                "login-message error";

            return;
        }


        // Mobile number

        if (!/^[0-9+\-\s]{7,15}$/.test(mobile)) {

            signupMessage.textContent =
                "Please enter a valid mobile number.";

            signupMessage.className =
                "login-message error";

            return;
        }


        // Password length

        if (password.length < 6) {

            signupMessage.textContent =
                "Password must contain at least 6 characters.";

            signupMessage.className =
                "login-message error";

            return;
        }


        // Password match

        if (password !== confirmPassword) {

            signupMessage.textContent =
                "Passwords do not match.";

            signupMessage.className =
                "login-message error";

            return;
        }


        // Get existing users

        let users = [];

        try {
            users = JSON.parse(
                localStorage.getItem("smartHomeUsers")
            ) || [];
        } catch (error) {
            users = [];
        }


        // Check existing email

        const exists =
            users.some(function (user) {

                return user.email === email;

            });


        if (exists) {

            signupMessage.textContent =
                "Email already registered.";

            signupMessage.className =
                "login-message error";

            return;
        }


        // New user

        const newUser = {

            name: name,

            email: email,

            mobile: mobile,

            password: password

        };


        // Add user

        users.push(newUser);


        // Save users

        localStorage.setItem(
            "smartHomeUsers",
            JSON.stringify(users)
        );


        signupMessage.textContent =
            "Account created! Opening Login...";

        signupMessage.className =
            "login-message success";


        // Go Login

        setTimeout(function () {

            window.location.replace("Login.html");

        }, 1000);

    }
);
