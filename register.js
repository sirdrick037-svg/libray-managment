const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

function register() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.username === username)) {
        alert("Username already exists.");
        return;
    }

    const newUser = {
        username: username,
        password: password,
        role: "user"
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");

    window.location.href = "login.html";
}