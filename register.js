
if (localStorage.getItem("registrationAllowed") !== "true") {
  alert("Registration is currently disabled by the administrator.");

  window.location.href = "user-login.html";
}

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value.trim();


  if (!username || !password) {
    document.getElementById("message").textContent =
      "Please fill in all fields.";

    return;
  }

  const usernamePattern = /^[A-Za-z]+$/;

  if (!usernamePattern.test(username)) {
    document.getElementById("message").textContent =
      "Username can only contain letters.";

    return;
  }


  const passwordPattern = /^[A-Za-z0-9]+$/;

  if (!passwordPattern.test(password)) {
    document.getElementById("message").textContent =
      "Password can only contain letters and numbers.";

    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];


  if (users.some((user) => user.username === username)) {
    document.getElementById("message").textContent = "Username already exists.";

    return;
  }

  const newUser = {
    username: username,

    password: password,

    approved: false,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Wait for admin approval.");

  window.location.href = "user-login.html";
});
