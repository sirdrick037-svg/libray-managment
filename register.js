const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", register);

function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  
const usernamePattern = /^[A-Za-z]+$/;
const passwordPattern = /^[A-Za-z0-9]{6,}$/;

if (!usernamePattern.test(username)) {
    document.getElementById("message").textContent =
        "Username must contain letters only.";
    return;
}

if (!passwordPattern.test(password)) {
    document.getElementById("message").textContent =
        "Password must contain only letters and numbers and be at least 6 characters.";
    return;
}

  if (!username || !password) {
    alert("Please fill in all fields.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.find((user) => user.username === username);

  if (exists) {
    alert("Username already exists.");
    return;
  }

  users.push({
    username,
    password,
    role: "user",
  });

  users.push(newUser);  

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");

  window.location.href = "login.html";
}
