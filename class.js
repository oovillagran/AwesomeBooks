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
          window.location.reload();
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

// Set Date and Time

const date = new Date();
const timeDate = document.querySelector('#date');
timeDate.innerHTML = date.toString();

// Contact section

const objectSection = [
  {
    title: 'Contact Information',
    message: 'Do you have any question or you just want to say hello?<br>You can reach out to us!',
    email: 'Our e-mail: ruth_abreu@gmail.com',
    phone: 'Our phone #: +43 45 564 3455',
    address: 'Our address: Cazuarina N3456 Av. y Buganvillas',
  }
]

const contactMenu = document.querySelector('.nav-contact');
const contactSection = document.querySelector('#contact');
const sectionDiv = document.createElement('div');

objectSection.map((data) => {
  contactMenu.addEventListener('click', () => {
    sectionDiv.classList.add('section-div');
    contactSection.classList.remove('invisible');
    addBookSection.classList.add('invisible');
    librarySection.classList.add('invisible');
    contactSection.appendChild(sectionDiv);
      sectionDiv.innerHTML = `
      <h4 class="section-title">${data.title}</h4>
      <p class="section-paragrah">${data.message}</p>
      <p class="section-email">${data.email}</p>
      <p class="section-phone">${data.phone}</p>
      <p class="section-address">${data.address}</p>
      `
  })
})

// Add a Book Section

const addBookSection = document.querySelector('#add-section');
const addMenu = document.querySelector('.nav-add');

addMenu.addEventListener(('click'), () => {
  addBookSection.classList.remove('invisible');
  contactSection.classList.add('invisible');
  librarySection.classList.add('invisible');
})


// Add a library Section

const librarySection = document.querySelector('#library');
const addList = document.querySelector('.nav-list');

addList.addEventListener(('click'), () => {
  librarySection.classList.remove('invisible');
  addBookSection.classList.add('invisible');
  contactSection.classList.add('invisible');
})
