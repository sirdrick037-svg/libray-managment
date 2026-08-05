
if (!localStorage.getItem("users")) {

    const defaultUsers = [
        {
            username: "admin",
            password: "1234"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));

}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Username: letters only
    const usernamePattern = /^[A-Za-z]+$/;

    // Password: letters and numbers only
    const passwordPattern = /^[A-Za-z0-9]+$/;

    if (!usernamePattern.test(username)) {
        document.getElementById("message").textContent =
            "Username can only contain letters.";
        return;
    }

    if (!passwordPattern.test(password)) {
        document.getElementById("message").textContent =
            "Password can only contain letters and numbers.";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);

        window.location.href = "index.html";

    } else {

        document.getElementById("message").textContent =
            "Invalid username or password.";

    }

}

  if (user) {
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUser", username);

    window.location.href = "index.html";
  } else {
    document.getElementById("message").textContent =
      "Invalid username or password.";
  }
}
