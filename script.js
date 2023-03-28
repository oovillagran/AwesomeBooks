// array to keep the books

let stock = [];

// Get HTML elements
const addButton = document.getElementById('add-button');
const bookList = document.getElementById('library');
const errorElement = document.getElementById('error');

// Add a new book to the collection
function addBook(title, author) {
  if (title !== '' && author !== '') {
    const newBook = { title, author };
    // Save the book
    stock.push(newBook);
    // Save on local storage
    localStorage.setItem('stockedBooks', JSON.stringify(stock));
    // Reset form values
    document.getElementById('add-form').reset();
  } else {
    const messages = [];
    if (title === '' && author === '') {
      messages.push('Please enter the book\'s title and author.');
    } else if (author === '' && title !== '') {
      messages.push('Please enter the book\'s author.');
    } else if (title === '' && author !== '') {
      messages.push('Please enter the book\'s title.');
    }

    if (messages.length > 0) {
      errorElement.innerText = messages.join(', ');
      // Remove the message after 3 seconds
      setTimeout(() => {
        errorElement.remove();
      }, 3000);
    }
  }
}

// Remove a book from the collection
function removeBook(index) {
  // Eliminar el libro del array
  stock.splice(index, 1);
  // Guardar el array actualizado en el localStorage
  localStorage.setItem('stockedBooks', JSON.stringify(stock));
  window.location.reload();
}

// Display all books in collection
function displayBooks() {
  bookList.innerHTML = '';
  stock.forEach((element, index) => {
    // Create a book element
    const aBook = document.createElement('div');
    const idBook = document.createElement('span');
    const titleBook = document.createElement('h2');
    const authorBook = document.createElement('p');
    idBook.textContent = `${index}`;
    titleBook.textContent = `${element.title}`;
    authorBook.textContent = `${element.author}`;
    const removeButton = document.createElement('button');
    const line = document.createElement('hr');

    // Delete the book
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(index);
      aBook.remove();
    });

    // Create the book view
    aBook.appendChild(idBook);
    aBook.appendChild(titleBook);
    aBook.appendChild(authorBook);
    bookList.appendChild(aBook);
    aBook.appendChild(removeButton);
    aBook.appendChild(line);
  });
}

// Add book when form is submitted
addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  addBook(title, author);
  // To display the book
  displayBooks();
});

// To show the book in the stock \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let book = '';

stock.forEach((element) => {
  book += `
    <div>
    <h4>${element.title}</h4>
    <p>${element.author}</p>
    </div>
    <button class="remove" type="button" onclick="removeBook">Remove</button>
    <hr>
  `;
});

// call the father element
const section = document.getElementById('library');

section.innerHTML = book;

window.addEventListener('load', () => {
  if (localStorage.getItem('stockedBooks')) {
    stock = JSON.parse(localStorage.getItem('stockedBooks'));
  }
  displayBooks();
});
