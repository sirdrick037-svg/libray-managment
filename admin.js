
if (localStorage.getItem("adminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}

let books = JSON.parse(localStorage.getItem("books")) || [];

let users = JSON.parse(localStorage.getItem("users")) || [];


if (localStorage.getItem("registrationAllowed") === null) {
    localStorage.setItem("registrationAllowed", "true");
}

if (localStorage.getItem("loginAllowed") === null) {
    localStorage.setItem("loginAllowed", "true");
}

function updateStatistics() {

    document.getElementById("totalBooks").textContent =
        books.length;

    document.getElementById("availableBooks").textContent =
        books.filter(book => book.status === "Available").length;

    document.getElementById("borrowedBooks").textContent =
        books.filter(book => book.status === "Borrowed").length;
}

const registrationBtn =
    document.getElementById("registrationBtn");

const loginBtn =
    document.getElementById("loginBtn");


function updateAccessButtons() {

    const registrationAllowed =
        localStorage.getItem("registrationAllowed") === "true";

    const loginAllowed =
        localStorage.getItem("loginAllowed") === "true";


    if (registrationAllowed) {

        registrationBtn.textContent = "Enabled";

        registrationBtn.className =
            "bg-green-500 text-white px-4 py-2 rounded";

    } else {

        registrationBtn.textContent = "Disabled";

        registrationBtn.className =
            "bg-red-500 text-white px-4 py-2 rounded";

    }

    if (loginAllowed) {

        loginBtn.textContent = "Enabled";

        loginBtn.className =
            "bg-green-500 text-white px-4 py-2 rounded";

    } else {

        loginBtn.textContent = "Disabled";

        loginBtn.className =
            "bg-red-500 text-white px-4 py-2 rounded";

    }

}

registrationBtn.addEventListener("click", () => {

    const current =
        localStorage.getItem("registrationAllowed") === "true";

    localStorage.setItem(
        "registrationAllowed",
        String(!current)
    );

    updateAccessButtons();

});

loginBtn.addEventListener("click", () => {

    const current =
        localStorage.getItem("loginAllowed") === "true";

    localStorage.setItem(
        "loginAllowed",
        String(!current)
    );

    updateAccessButtons();

});

function displayUsers() {

    const userTable =
        document.getElementById("userTable");

    userTable.innerHTML = "";

    users.forEach((user, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `

            <td class="border p-3">
                ${user.username}
            </td>

            <td class="border p-3">
                ${
                    user.approved
                        ? "Approved"
                        : "Pending"
                }
            </td>

            <td class="border p-3 space-x-2">

                ${
                    user.approved

                    ?

                    `<button
                        onclick="blockUser(${index})"
                        class="bg-yellow-500 text-white px-3 py-1 rounded">

                        Block

                    </button>`

                    :

                    `<button
                        onclick="approveUser(${index})"
                        class="bg-green-500 text-white px-3 py-1 rounded">

                        Approve

                    </button>`
                }

                <button
                    onclick="deleteUser(${index})"
                    class="bg-red-500 text-white px-3 py-1 rounded">

                    Delete

                </button>

            </td>
        `;

        userTable.appendChild(row);

    });

}

function approveUser(index) {

    users[index].approved = true;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayUsers();

}




function blockUser(index) {

    users[index].approved = false;

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayUsers();

}

function deleteUser(index) {

    const user = users[index];

    if (user.username === "admin") {

        alert("You cannot delete the administrator.");

        return;
    }

    if (!confirm(`Delete ${user.username}?`)) {
        return;
    }

    users.splice(index, 1);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    displayUsers();

}


document
    .getElementById("logoutBtn")
    ?.addEventListener("click", () => {

        localStorage.removeItem("adminLoggedIn");

        window.location.href =
            "admin-login.html";

    });

updateStatistics();

updateAccessButtons();

displayUsers();