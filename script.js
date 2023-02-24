// TODO: - Fix algorithm for removing books from library
  
const form = document.getElementById("myForm");
const addBookButton = document.getElementById("add-book-button");
const cancelEntryButton = document.getElementById("cancel-add-button");
form.addEventListener("submit", addBookToLibrary);
addBookButton.addEventListener("click", toggleOpenClose);
cancelEntryButton.addEventListener("click", toggleOpenClose);


let myLibrary = [];

function Book(title, author, numPages, read, ...description) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
  this.bookNumber = myLibrary.length - 1;
  if (description.length > 0) {
    this.description = description[0];
  }
}

Book.prototype.printBook = function () {
  let book = document.createElement("article");
  book.setAttribute("class", "book");
  book.innerHTML = 
    `<div class=\"book-flip-inner\">
      <div class=\"book-flip-front\">
        <h2 class=\"title\">${this.title}</h2>
        <h3 class=\"author\">by ${this.author}</h3>
      </div>
      <div class=\"book-flip-back\">
        <p>${this.description}</p>
        <p>Page count: ${this.numPages}</p>
        <svg class="trash-button" onclick="deleteBook(${this.bookNumber})" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\">
          <title>trash-can-outline</title>
          <path d=\"M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z\" />
        </svg>  
      </div>
    </div>`
  document.querySelector(".book-grid").appendChild(book);
}

function addBookToLibrary(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const bookData = Object.fromEntries(formData);
  if (bookData.description != '') {
    const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read, bookData.description);
    book.bookNumber = myLibrary.length;
    myLibrary.push(book);
  }
  else {
    const book = new Book(bookData.title, bookData.author, bookData.pages, bookData.read);
    book.bookNumber = myLibrary.length;
    myLibrary.push(book);
  }
  form.reset();
  toggleOpenClose();
  displayLibrary();
}

function toggleOpenClose() {
  if (form.classList.contains("close")) {
    form.classList.remove("close");
    form.classList.add("open");
  }
  else {
    form.classList.remove("open");
    form.classList.add("close");
  }
}

function displayLibrary() {
  document.querySelector(".book-grid").innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary[i].printBook();
  }
  let books = document.querySelectorAll(".book-flip-inner");
  books.forEach(book => {
    book.addEventListener('click', () => {
      if (book.classList.contains("flip")) {
        book.classList.remove("flip");
      }
      else {
        book.classList.add("flip"); 
      }
    });
  });
}

function deleteBook(bookNumber) {
  myLibrary.splice(bookNumber, 1);
  displayLibrary();
}