// Check whether admin allows login

if (localStorage.getItem("loginAllowed") !== "true") {
  alert("User login is currently disabled by the administrator.");

  window.location.href = "landing.html";
}

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    document.getElementById("message").textContent =
      "Incorrect username or password.";

    return;
  }

  // Check admin approval

  if (!user.approved) {
    document.getElementById("message").textContent =
      "Your account is waiting for admin approval.";

    return;
  }

  // Login

  localStorage.setItem("loggedIn", "true");

  localStorage.setItem("currentUser", JSON.stringify(user));

  window.location.href = "index.html";
});
