const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "Admin123";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value.trim();

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");

    window.location.href = "admin.html";
  } else {
    document.getElementById("message").textContent =
      "Incorrect admin username or password.";
  }
});
