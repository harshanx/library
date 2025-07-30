const booksContainer = document.getElementById("books-container");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookStatusInput = document.getElementById("book-status");
const borrowerNameInput = document.getElementById("borrower-name");
const modal = document.getElementById("modal");

let books = JSON.parse(localStorage.getItem("books")) || [];
let borrowers = JSON.parse(localStorage.getItem("borrowers")) || [];


function openModal() {
    modal.style.display = "block";
}


function closeModal() {
    modal.style.display = "none";
}


bookStatusInput.addEventListener("change", function () {
    if (bookStatusInput.value === "borrowed") {
        borrowerNameInput.style.display = "block";
    } else {
        borrowerNameInput.style.display = "none";
        borrowerNameInput.value = ""; 
    }
});


function addBook() {
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const status = bookStatusInput.value;
    let borrower = borrowerNameInput.value.trim();
    let dueDate = null;

    if (!title || !author) {
        alert("Please enter both book title and author.");
        return;
    }

    if (status === "borrowed") {
        if (!borrower) {
            alert("Please enter the borrower's name.");
            return;
        }
        dueDate = prompt("Enter due date (DD-MM-YYYY):");
        if (!dueDate) {
            alert("Due date is required when borrowing a book.");
            return;
        }

        borrowers.push({ name: borrower, book: title, dueDate, status: "borrowed" });
        localStorage.setItem("borrowers", JSON.stringify(borrowers));
    }

    const newBook = {
        title,
        author,
        status,
        borrower: status === "borrowed" ? borrower : null,
        dueDate: status === "borrowed" ? dueDate : null
    };

    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books)); 
    displayBooks();
    closeModal();
}


function displayBooks() {
    booksContainer.innerHTML = ""; 

    books.forEach((book, index) => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");

        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p class="status ${book.status === 'available' ? 'available' : 'borrowed'}">
                ${book.status === 'available' ? "🟢 Available" : "🔴 Borrowed"}
            </p>
            ${book.borrower ? `<p>Borrowed by: ${book.borrower}</p>` : ""}
            ${book.dueDate ? `<p>Due Date: ${book.dueDate}</p>` : ""}
            <div class="book-buttons">
                <button class="change-status-btn" onclick="toggleAvailability(${index})">🔄 Change Status</button>
                <button class="delete-btn" onclick="deleteBook(${index})">🗑️ Delete</button>
            </div>
        `;

        booksContainer.appendChild(bookElement);
    });
}


function toggleAvailability(index) {
    if (books[index].status === "available") {
        const borrower = prompt("Enter borrower's name:");
        if (borrower) {
            let dueDate = prompt("Enter due date (DD-MM-YYYY):");
            if (!dueDate) {
                alert("Due date is required when borrowing a book.");
                return;
            }

            books[index].status = "borrowed";
            books[index].borrower = borrower;
            books[index].dueDate = dueDate;

            borrowers.push({ name: borrower, book: books[index].title, dueDate, status: "borrowed" });
            localStorage.setItem("borrowers", JSON.stringify(borrowers));
        }
    } else {
        const confirmReturn = confirm("Mark this book as returned?");
        if (confirmReturn) {
            books[index].status = "available";
            books[index].borrower = null;
            books[index].dueDate = null;

            borrowers = borrowers.filter(borrower => borrower.book !== books[index].title);
            localStorage.setItem("borrowers", JSON.stringify(borrowers));
        }
    }
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}


function deleteBook(index) {
    borrowers = borrowers.filter(borrower => borrower.book !== books[index].title);
    localStorage.setItem("borrowers", JSON.stringify(borrowers));

    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}


displayBooks();
