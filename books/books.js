const books = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    image: "alchemist.jpg"
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Programming",
    image: "clean.webp"
  },
  {
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam",
    genre: "Biography",
    image: "wings.webp"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    image: "download.jpg"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    image: "harry.jpg"
  },
  {
    title: "You Can Win",
    author: "Shiv Khera",
    genre: "Self-help",
    image: "win.jpg"
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    genre: "Motivation",
    image: "think.jpg"
  },
  {
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    genre: "Science",
    image: "brief.jpg"
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    image: "rich.jpg"
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    image: "1984.jpg"
  },
  {
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance",
    image: "dd.webp"
  },
  {
    title: "Ikigai",
    author: "Francesc Miralles & Hector Garcia",
    genre: "Philosophy",
    image: "oo.webp"
  }
];

const bookList = document.getElementById("book-list");

books.forEach(book => {
  const col = document.createElement("div");
  col.className = "col-md-4 mb-4";
  col.innerHTML = `
    <div class="card h-100">
      <img src="${book.image}" class="card-img-top" alt="${book.title}" style="height: 200px; width: 100%; object-fit: contain; padding: 10px;">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text"><strong>Author:</strong> ${book.author}</p>
        <p class="card-text"><strong>Genre:</strong> ${book.genre}</p>
        <a href="borrow.html" class="btn btn-primary mt-auto">Borrow</a>
      </div>
    </div>
  `;
  bookList.appendChild(col);
});