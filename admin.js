
if (localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}

const books = JSON.parse(localStorage.getItem("books")) || [];


let users = JSON.parse(localStorage.getItem("users")) || [];


document.getElementById("totalBooks").textContent = books.length;

document.getElementById("availableBooks").textContent = books.filter(
  (book) => book.status === "Available",
).length;

document.getElementById("borrowedBooks").textContent = books.filter(
  (book) => book.status === "Borrowed",
).length;


function displayUsers() {

    const userTable = document.getElementById("userTable");

    userTable.innerHTML = "";

    users.forEach((user, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="border p-3">
                ${user.username}
            </td>

            <td class="border p-3">
                ${user.approved ? "Approved" : "Pending"}
            </td>

            <td class="border p-3">

                <button
                    onclick="deleteUser(${index})"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">

                    Delete

                </button>

            </td>

        `;

        userTable.appendChild(row);

    });

}

function deleteUser(index) {

    const user = users[index];

    // Don't allow deleting the admin
    if (user.username === "admin") {

        alert("You cannot delete the administrator.");

        return;
    }

    const confirmDelete = confirm(
        `Delete user "${user.username}"?`
    );

    if (!confirmDelete) {
        return;
    }

    users.splice(index, 1);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayUsers();

}

function approveUser(index) {
  users[index].approved = true;

  localStorage.setItem("users", JSON.stringify(users));

  displayUsers();
}

function blockUser(index) {
  users[index].approved = false;

  localStorage.setItem("users", JSON.stringify(users));

  displayUsers();
}

// Admin logout

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("adminLoggedIn");

  window.location.href = "admin-login.html";
});

displayUsers();
