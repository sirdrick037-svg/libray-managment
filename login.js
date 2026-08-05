// Create a default account if no users exist
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

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password,
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
