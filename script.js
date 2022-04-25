let myLibrary = [];
const library = document.querySelector(".library");
const newBookButton = document.querySelector(".add-book");
const overlay = document.querySelector("#overlay");
const modal = document.querySelector(".form-wrapper");
const form = document.querySelector("#book-form");

newBookButton.addEventListener("click", openBookModal);

overlay.addEventListener("click", function (event) {
  const isOutside = !event.target.closest(".form-wrapper");
  if (isOutside) {
    closeBookModal();
  }
});

form.addEventListener("submit", makeNewBook);

class aBook {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function makeBookCards() {
  for (let book of myLibrary) {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    library.appendChild(newCard);

    let title = document.createElement("div");
    let author = document.createElement("div");
    let pages = document.createElement("div");
    let read = document.createElement("button");
    let remove = document.createElement("button");
    read.classList.add("read-button");
    remove.classList.add("remove-button");
    title.textContent = `"${book.title}"`;
    author.textContent = `By ${book.author}`;
    pages.textContent = `${book.pages} pages`;
    read.textContent = book.read;
    remove.textContent = "Remove";
    newCard.appendChild(title);
    newCard.appendChild(author);
    newCard.appendChild(pages);
    newCard.appendChild(read);
    newCard.appendChild(remove);
  }
}

function openBookModal() {
  document.getElementById("overlay").style.display = "block";
}

function closeBookModal() {
  document.getElementById("overlay").style.display = "none";
}

function addBook(book) {
  myLibrary.push(book);
}

function resetLibrary() {
  library.innerHTML = "";
}

function updateLibrary() {
  resetLibrary();
  makeBookCards();
  let readButtons = document.querySelectorAll(".read-button");
  readButtons.forEach((button) =>
    button.addEventListener("click", readFlipper)
  );
  let removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) =>
    button.addEventListener("click", removeBook)
  );
}

function readFlipper(e) {
  let thisBook = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  let thisRead =
    myLibrary[myLibrary.findIndex((object) => object.title == thisBook)].read;
  if (thisRead == "Read") {
    myLibrary[myLibrary.findIndex((object) => object.title == thisBook)].read =
      "Not Read";
  } else if (thisRead == "Not Read") {
    myLibrary[myLibrary.findIndex((object) => object.title == thisBook)].read =
      "Read";
  }
  updateLibrary();
}

function removeBook(e) {
  let thisBook = e.target.parentNode.firstChild.textContent.replaceAll('"', "");
  myLibrary.splice(
    myLibrary.findIndex((object) => object.title == thisBook),
    1
  );
  updateLibrary();
}

function convertToRead(read) {
  if (read) {
    return "Read";
  } else {
    return "Not Read";
  }
}

function makeNewBook(e) {
  e.preventDefault();
  let newTitle = document.querySelector("#title");
  let newAuthor = document.querySelector("#author");
  let newPages = document.querySelector("#pages");
  let newRead = document.querySelector("#read");
  closeBookModal();
  let newBook = new aBook(
    newTitle.value,
    newAuthor.value,
    newPages.value,
    convertToRead(newRead.checked)
  );
  addBook(newBook);
  updateLibrary();
}
