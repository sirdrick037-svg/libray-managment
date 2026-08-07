const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();

  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill in all fields.");

    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const exists = users.some((user) => user.username === username);

  if (exists) {
    alert("Username already exists.");

    return;
  }

  const newUser = {
    username: username,

    password: password,

    approved: false,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful. Please wait for admin approval.");

  window.location.href = "user-login.html";
});
