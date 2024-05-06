const myLibrary = [];

const dialog = document.querySelector(".dialog-new");
const btnNew = document.querySelector(".btn-new");
const btnConfirm = document.querySelector(".btn-confirm");
const btnCancel = document.querySelector(".btn-cancel");
const containerBooks = document.querySelector(".container-books");
const newInput = document.querySelector("#new-input");
const infoTags = {
    author: "Author:",
    title: "Title:",
    pages: "Pages:",
    read: "Have you read it?"
};

class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }
    toggleRead() {
        this.read = !this.read;
    }
}

myLibrary.push(new Book("Patrick Rothfuss", "The Name of the Wind", 793, false));
myLibrary.push(new Book("J.K. Rowling", "Harry Potter and the Deathly Hallows", 1302, true));
myLibrary.push(new Book("Brandon Sanderson", "The Final Empire", 980, false));
myLibrary.push(new Book("George R.R. Martin", "A Storm of Swords", 2031, true));
myLibrary.push(new Book("Scott Lynch", "The Lies of Locke Lamora", 698, false));

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

btnNew.addEventListener("click", () => {
    dialog.showModal();
});

btnCancel.addEventListener("click", () => {
    dialog.close();
});

myLibrary.forEach(showBookCard);

btnConfirm.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(newInput);
    const data = Object.fromEntries(formData);
    const newBook = new Book(data.newAuthor, data.newTitle, data.newPages, Boolean(data.newRead));
    addBookToLibrary(newBook);
    showBookCard(newBook);

    dialog.close();
});

function showBookCard(book) {
    const newCard = document.createElement("card");
    const newList = document.createElement("ul");
    for (let key in book) {
        if (book.hasOwnProperty(key)) {
            const newContent = document.createElement("li");
            const keyFormatted = infoTags[key];
            const value = key === "read" ? (book[key] === true ? "Yes" : "No") : book[key];
            newContent.textContent = `${keyFormatted} ${value}`;
            newList.appendChild(newContent);
        }
    }
    newCard.appendChild(newList);

    const btnDelete = document.createElement("button");
    btnDelete.textContent = "Delete";
    newCard.appendChild(btnDelete);

    const btnToggleRead = document.createElement("button");
    btnToggleRead.textContent = showIsRead(book);
    newCard.appendChild(btnToggleRead);

    containerBooks.appendChild(newCard);

    btnDelete.addEventListener("click", () => {
        containerBooks.removeChild(newCard);
        const indexDelete = myLibrary.indexOf(book);
        myLibrary.splice(indexDelete, 1);
    });

    btnToggleRead.addEventListener("click", () => {
        book.toggleRead();
        newCard.firstElementChild.lastElementChild.textContent = `${infoTags.read} ${book.read === true ? "Yes" : "No"}`;
        btnToggleRead.textContent = showIsRead(book);
    });
}

function showIsRead(book) {
    return book.read ? "Not Read" : "Read";
}

