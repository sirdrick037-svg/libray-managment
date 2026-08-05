// Redirect to login if user is not logged in
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");
const searchBook = document.getElementById("searchBook");

const apiSearch = document.getElementById("apiSearch");
const searchApiBtn = document.getElementById("searchApiBtn");

const totalBooks = document.getElementById("totalBooks");
const availableBooks = document.getElementById("availableBooks");
const borrowedBooks = document.getElementById("borrowedBooks");

const clearLibrary = document.getElementById("clearLibrary");
const logoutBtn = document.getElementById("logoutBtn");

let books = JSON.parse(localStorage.getItem("books")) || [];

// Load books when page opens
window.onload = () => {
  displayBooks(books);
};

// ---------------- DISPLAY BOOKS ----------------
function displayBooks(bookArray) {
  bookList.innerHTML = "";

  bookArray.forEach((book, index) => {
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
                    onclick="editBook(${index})">
                    Edit
                </button>

                <button
                    class="bg-yellow-500 text-white px-2 py-1 rounded"
                    onclick="toggleStatus(${index})">
                    ${book.status === "Available" ? "Borrow" : "Return"}
                </button>

                <button
                    class="bg-red-500 text-white px-2 py-1 rounded"
                    onclick="deleteBook(${index})">
                    Delete
                </button>

            </td>
        `;

    bookList.appendChild(row);
  });

  updateSummary();
}

// ---------------- SAVE BOOKS ----------------
function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

// ---------------- ADD BOOK ----------------
bookForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newBook = {
    bookId: document.getElementById("bookId").value,
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value,
  };

  books.push(newBook);

  saveBooks();

  displayBooks(books);

  bookForm.reset();
});

// ---------------- DELETE ----------------
function deleteBook(index) {
  books.splice(index, 1);

  saveBooks();

  displayBooks(books);
}

// ---------------- EDIT ----------------
function editBook(index) {
  const book = books[index];

  const title = prompt("Title", book.title);
  const author = prompt("Author", book.author);
  const bookId = prompt("Book ID", book.bookId);
  const category = prompt("Category", book.category);

  if (!title || !author || !bookId || !category) return;

  book.title = title;
  book.author = author;
  book.bookId = bookId;
  book.category = category;

  saveBooks();

  displayBooks(books);
}

// ---------------- BORROW / RETURN ----------------
function toggleStatus(index) {
  books[index].status =
    books[index].status === "Available" ? "Borrowed" : "Available";

  saveBooks();

  displayBooks(books);
}

// ---------------- SEARCH ----------------
searchBook.addEventListener("keyup", function () {
  const search = this.value.toLowerCase();

  const filtered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search) ||
      book.category.toLowerCase().includes(search),
  );

  displayBooks(filtered);
});

// ---------------- SUMMARY ----------------
function updateSummary() {
  totalBooks.textContent = books.length;

  availableBooks.textContent = books.filter(
    (book) => book.status === "Available",
  ).length;

  borrowedBooks.textContent = books.filter(
    (book) => book.status === "Borrowed",
  ).length;
}

// ---------------- CLEAR LIBRARY ----------------
clearLibrary.addEventListener("click", () => {
  if (!confirm("Delete all books?")) return;

  books = [];

  saveBooks();

  displayBooks(books);
});

// ---------------- LOGOUT ----------------
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");

  window.location.href = "login.html";
});

// ---------------- OPEN LIBRARY API ----------------
searchApiBtn.addEventListener("click", async () => {
  const title = apiSearch.value.trim();

  if (!title) {
    alert("Please enter a book title.");
    return;
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`,
    );

    const data = await response.json();

    if (data.docs.length === 0) {
      alert("Book not found.");
      return;
    }

    const book = data.docs[0];

    document.getElementById("title").value = book.title || "";

    document.getElementById("author").value = book.author_name
      ? book.author_name[0]
      : "";

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
      } else if (subject.includes("Children")) {
        document.getElementById("category").value = "Children";
      } else {
        document.getElementById("category").value = "Fiction";
      }
    }
  } catch (error) {
    alert("Unable to connect to Open Library API.");
  }
});
