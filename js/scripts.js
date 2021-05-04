const randomUserApi = 'https://randomuser.me/api/?results=12&nat=gb';

const formContainer = document.querySelector('.search-container');

const gallery = document.querySelector('.gallery');

let employees = [];

const formHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
formContainer.insertAdjacentHTML('beforeend', formHTML);

const form = document.querySelector('form');

// Fetch data from an url, parse to json and call  callback functions

fetch(randomUserApi)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(generateHTML)
  .catch((error) => console.log('Looks like there was a problem!', error));

// create a function to generate the HTML

function generateHTML(data) {
  // Store the employees in the employees array
  employees = data;
  //   Loop through the data array
  employees.forEach((employee, index) => {
    //   Create a card for each employee
    const card = `
        <div class="card" data-index=${index}>
        <div class="card-img-container">
            <img class="card-img" src=${employee.picture.large} alt=${employee.name.last}>
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
        </div>
        </div>
`;
    // Append the card to the gallery div
    gallery.insertAdjacentHTML('beforeend', card);
  });
  console.log(employees);
}

// Generate a modal window
function generateModalWindow(index) {
  let { email, location, name, phone, picture, dob } = employees[index];
  let month = new Date(dob.date).getMonth();
  let day = new Date(dob.date).getDay();
  let year = new Date(dob.date).getFullYear();

  const modalHTML = `
<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
            <p class="modal-text">${email}</p>
            <p class="modal-text cap">${location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city},  ${location.postcode}</p>
            <p class="modal-text">Birthday: ${day}/${month}/${year}</p>
        </div>
    </div>
`;

  // Insert the modal window in the body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const closeBtn = document.getElementById('modal-close-btn');

  //   Handler close button
  closeBtn.addEventListener('click', () => {
    //   target the div
    const el = document.querySelector('.modal-container');
    // remove the div
    el.remove();
  });
}

// Handler open modal window

gallery.addEventListener('click', (e) => {
  // Check if the clicked element is a card
  if (e.target !== gallery) {
    //   get the closest card element from the clicked point
    const card = e.target.closest('.card');
    // Get the card data-index
    const index = card.getAttribute('data-index');
    // call the generate modal function passing the data-index as argument
    generateModalWindow(index);
  }
});

// Filter Handler

function searchEmployee(input) {
  const filteredEmployees = [];

  employees.forEach((employee) => {
    const fullName = employee.name.first + employee.name.last;
    console.log(fullName);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('search-input');
  searchEmployee(input.value);
});
