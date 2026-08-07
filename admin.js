const currentUser = JSON.parse(localStorage.getItem("currentUser"));

console.log(currentUser);

alert(JSON.stringify(currentUser));

const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {

    window.location.href = "login.html";

}

if (currentUser.role !== "admin") {

    alert("Access Denied!");

    window.location.href = "index.html";

}

const books = JSON.parse(localStorage.getItem("books")) || [];

const users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("totalBooks").textContent = books.length;

document.getElementById("availableBooks").textContent =
books.filter(book => book.status === "Available").length;

document.getElementById("borrowedBooks").textContent =
books.filter(book => book.status === "Borrowed").length;

const userTable = document.getElementById("userTable");

users.forEach(user => {

    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="border p-2">${user.username}</td>
    `;

    userTable.appendChild(row);

});




const bookTable = document.getElementById("bookTable");

books.forEach((book,index)=>{

const row=document.createElement("tr");

row.innerHTML=`

<td class="border p-2">${book.bookId}</td>

<td class="border p-2">${book.title}</td>

<td class="border p-2">${book.author}</td>

<td class="border p-2">${book.category}</td>

<td class="border p-2">${book.status}</td>

<td class="border p-2">

<button
onclick="deleteBook(${index})"
class="bg-red-500 text-white px-3 py-1 rounded">

Delete

</button>

</td>

`;

bookTable.appendChild(row);

});


function deleteUser(index){

users.splice(index,1);

localStorage.setItem("users",JSON.stringify(users));

location.reload();

}




function deleteBook(index){

books.splice(index,1);

localStorage.setItem("books",JSON.stringify(books));

location.reload();

}




document.getElementById("logoutBtn").addEventListener("click",()=>{

localStorage.removeItem("loggedIn");

localStorage.removeItem("currentUser");

window.location.href="login.html";

});