const myLibrary = [];

const dialog = document.querySelector(".dialog-new");
const btnNew = document.querySelector(".btn-new");
const btnConfirm = document.querySelector(".btn-confirm");
const btnCancel = document.querySelector(".btn-cancel");
const containerBooks = document.querySelector(".container-books");

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

myLibrary.push(new Book("Patrick Rothfuss", "The Name of the Wind", 793, false));
myLibrary.push(new Book("J.K. Rowling", "Harry Potter and the Deathly Hallows", 1302, true));
myLibrary.push(new Book("Brandon Sanderson", "The Final Empire", 980, false));
myLibrary.push(new Book("George R.R. Martin", "A Storm of Swords", 2031, true));
myLibrary.push(new Book("Scott Lynch", "The Lies of Locke Lamora", 698, false));

function addBookToLibrary() {

}

btnNew.addEventListener("click", () => {
    dialog.showModal();
});

btnCancel.addEventListener("click", () => {
    dialog.close();
});

myLibrary.forEach(eachBook => {
    const newCard = document.createElement("card");
    const newList = document.createElement("ul");
    for (let key in eachBook) {
        const newContent = document.createElement("li");
        const keyFormatted = key === "read" ? "Have you read it?" : key[0].toUpperCase() + key.slice(1) + ":";
        const value = key === "read" ? (eachBook[key] === true ? "Yes" : "No") : eachBook[key];
        newContent.textContent = `${keyFormatted} ${value}`;
        newList.appendChild(newContent);
    }
    newCard.appendChild(newList);
    containerBooks.appendChild(newCard);
});