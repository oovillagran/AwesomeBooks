class LibraryList {
  constructor() {
    this.stock = [];
    this.loadBooks();
    this.displayBooks();
  }

  addBook(title, author) {
    if (title !== '' && author !== '') {
      const newBook = { title, author };
      // Save the book
      this.stock.push(newBook);
      // Save on local storage
      localStorage.setItem('stockedBooks', JSON.stringify(this.stock));
      // Reset form values
      document.getElementById('add-form').reset();
      this.displayBooks();
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
        const errorElement = document.getElementById('error');
        errorElement.innerText = messages.join(', ');
        // Remove the message after 3 seconds
        setTimeout(() => {
          errorElement.remove();
        }, 3000);
      }
    }
  }

  removeBook(index) {
    // Eliminar el libro del array
    this.stock.splice(index, 1);
    // Guardar el array actualizado en el localStorage
    localStorage.setItem('stockedBooks', JSON.stringify(this.stock));
    window.location.reload();
    this.displayBooks();
  }

  displayBooks() {
    const bookList = document.getElementById('library');
    bookList.innerHTML = '';
    this.stock.forEach((element, index) => {
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
        this.removeBook(index);
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

  loadBooks() {
    window.addEventListener('load', () => {
      if (localStorage.getItem('stockedBooks')) {
        this.stock = JSON.parse(localStorage.getItem('stockedBooks'));
      }
      this.displayBooks();
    });
  }
}

// Get HTML elements

const libraryList = new LibraryList();
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  libraryList.addBook(title, author);
});

// Add date & time

const date = new Date();
const timeDate = document.querySelector('#date');
timeDate.innerHTML = date.toString();

// For the single page functionality

// Get nav bar links
const linkList = document.querySelector('#link-list');
const linkAdd = document.querySelector('#link-add');
const linkContact = document.querySelector('#link-contact');

// Get page sections ID
const bookListSection = document.querySelector('#book-list');
const addSection = document.querySelector('#add-section');
const contactSection = document.querySelector('#contact-info');

// Listeners for the links events
linkList.addEventListener('click', (event) => {
  event.preventDefault();
  bookListSection.style.display = 'flex';
  addSection.style.display = 'none';
  contactSection.style.display = 'none';
});

linkAdd.addEventListener('click', (event) => {
  event.preventDefault();
  bookListSection.style.display = 'none';
  addSection.style.display = 'flex';
  contactSection.style.display = 'none';
});

linkContact.addEventListener('click', (event) => {
  event.preventDefault();
  bookListSection.style.display = 'none';
  addSection.style.display = 'none';
  contactSection.style.display = 'flex';
});
