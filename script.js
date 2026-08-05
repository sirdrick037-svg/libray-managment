if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

const API_URL = "http://localhost:3000/books";


const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchBook = document.getElementById("searchBook");

const apiSearch = document.getElementById("apiSearch");
const searchApiBtn = document.getElementById("searchApiBtn");

const totalBooks = document.getElementById("totalBooks");
const availableBooks = document.getElementById("availableBooks");
const borrowedBooks = document.getElementById("borrowedBooks");

const clearLibrary = document.getElementById("clearLibrary");

let books = [];

window.onload = loadBooks;

async function loadBooks() {
  const response = await fetch(API_URL);

  books = await response.json();

  displayBooks(books);
}
function displayBooks(bookArray) {
  bookList.innerHTML = "";

  bookArray.forEach((book) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td class="border p-2">${book.bookId}</td>
            <td class="border p-2">${book.title}</td>
            <td class="border p-2">${book.author}</td>
            <td class="border p-2">${book.category}</td>
            <td class="border p-2">${book.status}</td>

            <td class="border p-2 space-x-2">

                <button
                    class="bg-blue-500 text-white px-2 py-1 rounded"
                    onclick="editBook(${book.id})">
                    Edit
                </button>

                <button
                    class="bg-yellow-500 text-white px-2 py-1 rounded"
                    onclick="toggleStatus(${book.id})">

                    ${book.status === "Available" ? "Borrow" : "Return"}

                </button>

                <button
                    class="bg-red-500 text-white px-2 py-1 rounded"
                    onclick="deleteBook(${book.id})">

                    Delete

                </button>

            </td>
        `;

    bookList.appendChild(row);
  });

  updateSummary();
}
bookForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const newBook = {
    bookId: document.getElementById("bookId").value,
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category:document.getElementById("category").value,
    status: document.getElementById("status").value,
  };

 books.push(newBook);

localStorage.setItem("books", JSON.stringify(books));

displayBooks(books);

bookForm.reset();

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(newBook),
  });

  bookForm.reset();

  loadBooks();
});
async function deleteBook(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  loadBooks();
}

async function editBook(id) {
  const book = books.find((b) => b.id === id);

  const title = prompt("Title", book.title);

  const author = prompt("Author", book.author);

  const bookId = prompt("Book ID", book.bookId);

  const category = prompt("Category", book.category);

  if (title && author && bookId && category) {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        ...book,

        title,
        author,
        bookId,
        category
      }),
    });

    loadBooks();
  }
}
async function toggleStatus(id) {
  const book = books.find((b) => b.id === id);

  const newStatus = book.status === "Available" ? "Borrowed" : "Available";

  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      status: newStatus,
    }),
  });

  loadBooks();
}
searchBook.addEventListener("keyup", function () {
  const search = this.value.toLowerCase();

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.category.toLowerCase().includes(search)
  );

  displayBooks(filtered);
});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedIn");

    window.location.href = "login.html";

});

function updateSummary() {
  totalBooks.textContent = books.length;

  availableBooks.textContent = books.filter(
    (book) => book.status === "Available",
  ).length;

  borrowedBooks.textContent = books.filter(
    (book) => book.status === "Borrowed",
  ).length;
}

clearLibrary.addEventListener("click", async () => {
  if (!confirm("Delete all books?")) return;

  for (const book of books) {
    await fetch(`${API_URL}/${book.id}`, {
      method: "DELETE",
    });
  }

  loadBooks();
});
searchApiBtn.addEventListener("click", async () => {

    const title = apiSearch.value.trim();

    if (!title) {
        alert("Please enter a book title.");
        return;
    }

    const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
    );

    const data = await response.json();

    if (data.docs.length === 0) {
        alert("Book not found.");
        return;
    }

    const book = data.docs[0];

    document.getElementById("title").value = book.title || "";

    document.getElementById("author").value =
        book.author_name ? book.author_name[0] : "";


    if (book.subject && book.subject.length > 0) {

        const subject = book.subject[0];

        if (subject.includes("Science")) {

            document.getElementById("category").value = "Science";

        } else if (subject.includes("History")) {

            document.getElementById("category").value = "History";

        } else if (subject.includes("Technology")) {

            document.getElementById("category").value = "Technology";

        } else if (subject.includes("Biography")) {

            document.getElementById("category").value = "Biography";

        } else {

            document.getElementById("category").value = "Fiction";

        }

    }

});