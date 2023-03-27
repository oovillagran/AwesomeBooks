// array to keep the books

let stock = [];

// Add a new object into the array when user sends the form

function addBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const newBook = {title: title, author: author};
    stock.push(newBook);
  }