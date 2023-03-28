// array to keep the books

let stock = [];

// Get HTML elements
const title = document.getElementById('title');
const author = document.getElementById('author');
const addButton = document.getElementById('add-button');
const bookList = document.getElementById('library');
const errorElement = document.getElementById('error');

// Add a new book to the collection
function addBook(title, author) {
  if (title !== '' && author !== '') {
    const newBook = { title, author };
    // Local storage actual value
    //let stock = JSON.parse(localStorage.getItem("stockedBooks")) || [];
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
  // Obtener los libros del localStorage o un array vacío
  let books = JSON.parse(localStorage.getItem("books")) || [];
  // Eliminar el libro del array
  stock.splice(index, 1);
   // Guardar el array actualizado en el localStorage
  localStorage.setItem("stockedBooks", JSON.stringify(stock));
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
  event.preventDefault(); // evita que el formulario se envíe por defecto
  const title = document.querySelector('#title').value; // obtiene el valor del input 'title'
  const author = document.querySelector('#author').value; // obtiene el valor del input 'author'
  addBook(title, author);
  // To display the book
  displayBooks();
});

// To show the book in the stock \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// esto es para la informacion del libro
let book = '';

// here i put the books one by one
stock.forEach((element, index) => {
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
