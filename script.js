// array to keep the books

let stock = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
];

// Add a new object into the array when user sends the form

function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const newBook = {title: title, author: author};
  stock.push(newBook);
}

// Funcionalidad del boton Agregar
/*
const form = document.getElementById('add-form');

form.addEventListener('click', (event) => {
  //event.preventDefault();
  console.log();

  if(title.value !== '' && author.value !== '') {
    addBook(title.value, author.value)
  }
  
});
*/




// To show the book in the stock \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// esto es para la informacion del libro
let book = '';

//here i put the books one by one
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

//call the father element
const section = document.getElementById('library');

section.innerHTML = book;

