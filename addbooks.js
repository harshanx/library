const booksTableBody = document.getElementById("books-table-body");
const bookIdInput = document.getElementById("book-id");
const bookTitleInput = document.getElementById("book-title");
const bookAuthorInput = document.getElementById("book-author");
const bookCoverInput = document.getElementById("book-cover");
const modal = document.getElementById("modal");

let books = JSON.parse(localStorage.getItem("books")) || [];

function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}



function addBook() {
    const id = bookIdInput.value.trim();
    const title = bookTitleInput.value.trim();
    const author = bookAuthorInput.value.trim();
    const genre = document.getElementById("genre").value.trim();
    const cover = bookCoverInput.value.trim();
    const edition = document.getElementById("book-edition").value.trim();
    const copies = document.getElementById("book-copies").value.trim();
    
    if (!id || !title || !author || !cover || !edition || !copies) {
        alert("Please fill all fields.");
        return;
    }

    // If editing, update existing book
    if (editingIndex !== null) {
        books[editingIndex] = { id, title, author, cover, edition, copies };
        editingIndex = null; // reset
    } else {
        // prevent duplicate IDs when adding new
        if (books.some(book => book.id === id)) {
            alert("Book ID must be unique.");
            return;
        }

        const newBook = { 
            id, 
            title, 
            author,
            genre, 
            cover, 
            edition, 
            copies,
            status: "available",   // ✅ default
            borrower: null,        // ✅ default
            dueDate: null          // ✅ default
        };

        books.push(newBook);
    }

    localStorage.setItem("books", JSON.stringify(books));
    

    displayBooks();
    closeModal();
    clearForm();
}



function clearForm() {
    bookIdInput.value = "";
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookCoverInput.value = "";
    document.getElementById("book-edition").value = "";
    document.getElementById("book-copies").value = "";
    editingIndex = null;
}


function displayBooks() {
    booksTableBody.innerHTML = "";
    books.forEach((book, index) => {

        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${book.cover}" alt="cover"></td>
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.edition}</td>
            <td>${book.copies}</td>
            <td>
                <button onclick="editBook(${index})">✏️ Edit</button>
                <button onclick="deleteBook(${index})">🗑️ Delete</button>
            </td>
        `;

        booksTableBody.appendChild(row);
    });
}
let editingIndex = null; // track which book is being edited

function editBook(index) {
    const book = books[index];

    // Pre-fill modal with book data
    document.getElementById("book-id").value = book.id;
    document.getElementById("book-title").value = book.title;
    document.getElementById("book-author").value = book.author;
    document.getElementById("book-edition").value = book.edition;
    document.getElementById("book-copies").value = book.copies;
    document.getElementById("book-cover").value = book.cover;

    // Remove old entry temporarily
    books.splice(index, 1);
    localStorage.setItem("books", JSON.stringify(books));

    openModal(); // Reuse your modal
}

function deleteBook(index) {
    if (confirm("Are you sure you want to delete this book?")) {
        books.splice(index, 1);
        localStorage.setItem("books", JSON.stringify(books));
        displayBooks();
    }
    

}



function toggleAvailability(index) {
    if (books[index].status === "available") {
        const borrower = prompt("Enter borrower name:");
        if (!borrower) return;
        let dueDate = prompt("Enter due date (DD-MM-YYYY):");
        if (!dueDate) return;
        books[index].status = "borrowed";
        books[index].borrower = borrower;
        books[index].dueDate = dueDate;
    } else {
        const confirmReturn = confirm("Mark this book as returned?");
        if (confirmReturn) {
            books[index].status = "available";
            books[index].borrower = null;
            books[index].dueDate = null;
        }
    }
    localStorage.setItem("books", JSON.stringify(books));
    displayBooks();
}


// Initial render
displayBooks();

// Enable Enter key navigation between inputs in modal
const inputs = document.querySelectorAll('.modal-content input');

inputs.forEach((input, index) => {
  input.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent accidental form submit
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus(); // move to next input
      } else {
        // If last input, trigger Save button
        document.querySelector('.modal-content .add-btn').click();
      }
    }
  });
});
