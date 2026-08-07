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

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

const adminBtn = document.getElementById("adminBtn");

if (currentUser.role === "admin") {
  adminBtn.style.display = "block";
} else {
  adminBtn.style.display = "none";
}

adminBtn.addEventListener("click", () => {
  window.location.href = "admin.html";
});

let books = JSON.parse(localStorage.getItem("books")) || [];

window.onload = () => {
  displayBooks(books);
};
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

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

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

function deleteBook(index) {
  books.splice(index, 1);

  saveBooks();

  displayBooks(books);
}

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

function toggleStatus(index) {
  books[index].status =
    books[index].status === "Available" ? "Borrowed" : "Available";

  saveBooks();

  displayBooks(books);
}

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

function updateSummary() {
  totalBooks.textContent = books.length;

  availableBooks.textContent = books.filter(
    (book) => book.status === "Available",
  ).length;

  borrowedBooks.textContent = books.filter(
    (book) => book.status === "Borrowed",
  ).length;
}

clearLibrary.addEventListener("click", () => {
  if (!confirm("Delete all books?")) return;

  books = [];

  saveBooks();

  displayBooks(books);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");

  window.location.href = "login.html";
});

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
    const category = getCategory(book);

    document.getElementById("category").value = category;
  } catch (error) {
    console.error(error);

    alert("Unable to search for the book.");
  }
});

function getCategory(book) {
  const subjects = book.subject ? book.subject.join(" ").toLowerCase() : "";

  const title = book.title ? book.title.toLowerCase() : "";

  // Science
  if (
    subjects.includes("science") ||
    subjects.includes("physics") ||
    subjects.includes("chemistry") ||
    subjects.includes("biology") ||
    title.includes("physics") ||
    title.includes("chemistry") ||
    title.includes("biology")
  ) {
    return "Science";
  }

  // Technology
  if (
    subjects.includes("technology") ||
    subjects.includes("computer") ||
    subjects.includes("programming") ||
    subjects.includes("software") ||
    subjects.includes("engineering") ||
    title.includes("programming") ||
    title.includes("computer") ||
    title.includes("javascript") ||
    title.includes("python")
  ) {
    return "Technology";
  }

  // History
  if (
    subjects.includes("history") ||
    subjects.includes("historical") ||
    title.includes("history")
  ) {
    return "History";
  }

  
  if (
    subjects.includes("biography") ||
    subjects.includes("autobiography") ||
    subjects.includes("memoir")
  ) {
    return "Biography";
  }

  
  if (
    subjects.includes("juvenile") ||
    subjects.includes("children") ||
    subjects.includes("child")
  ) {
    return "Children";
  }


  return "Fiction";
}
