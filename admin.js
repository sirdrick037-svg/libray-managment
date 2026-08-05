// Check login

if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

const books = JSON.parse(localStorage.getItem("books")) || [];

const users = JSON.parse(localStorage.getItem("users")) || [];

// Statistics

document.getElementById("totalBooks").textContent = books.length;

document.getElementById("availableBooks").textContent =
books.filter(book => book.status === "Available").length;

document.getElementById("borrowedBooks").textContent =
books.filter(book => book.status === "Borrowed").length;

// Users

const userTable = document.getElementById("userTable");

users.forEach(user => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="border p-3">${user.username}</td>
    `;

    userTable.appendChild(row);

});