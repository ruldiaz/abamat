'use strict';

const address = document.querySelector('#address');
console.log(address?.textContent);

const paragraphs = document.querySelectorAll('p');
console.log(paragraphs);

paragraphs.forEach((paragraph) => {
  console.log(paragraph.textContent);
});

console.log(paragraphs.length); // amount of paragraphs

// toggle dark mode button
const darkModeBtn = document.querySelector('#dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// converting node list into array and printing the content
const newArray = [...paragraphs].map((e) => {
  return e.textContent;
});

console.log(newArray);

// using select

function getSelectedMaterial() {
  return document.querySelector('#materiales-dropdown').value;
}

const dropdown = document.querySelector('#materiales-dropdown');
dropdown.addEventListener('change', () => {
  console.log(getSelectedMaterial());
});

// using textarea

const comments = document.querySelector('#user-comment');

function getUserComment() {
  return comments.value;
}

comments.addEventListener('keyup', () => {
  console.log(getUserComment());
});

// updating the h2 with the full name

const fullName = document.querySelector('#full-name');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');

function getFullName() {
  return firstName.value + ' ' + lastName.value;
}

// shows a message if name is raul diaz
function updateFullName() {
  fullName.textContent = getFullName();
  if (fullName.textContent === 'raul diaz') {
    document.querySelector('#greetings-raul').style.display = '';
  }
}

firstName.addEventListener('keyup', () => {
  return updateFullName();
});

lastName.addEventListener('keyup', () => {
  return updateFullName();
});

// remove permanently your name is header
const removeBtn = document.querySelector('#remove-btn');
const nameHeader = document.querySelector('#your-name-is');

removeBtn.addEventListener('click', () => {
  nameHeader.remove();
});

// sidebar
const menuSidebar = document.querySelector('#menu-sidebar');

function openSidebar() {
  const element = document.querySelector('#app-sidebar');
  element.classList.toggle('show');
}
menuSidebar.addEventListener('click', () => {
  openSidebar();
});

// enable sidebar button
const enableButton = document.querySelector('#enable-sidebar-btn');
enableButton.addEventListener('click', () => {
  menuSidebar.removeAttribute('disabled');
});

// disable sidebar button
const disableButton = document.querySelector('#disable-sidebar-btn');
disableButton.addEventListener('click', () => {
  menuSidebar.setAttribute('disabled', 'disabled');
});

// highlighted item in shopping list
const handleItemClick = (li) => {
  li.classList.toggle('highlighted');
};

document.querySelectorAll('#shopping-list li').forEach((li) => {
  li.addEventListener('click', (event) => {
    handleItemClick(event.currentTarget);
  });
});

// validate if button is disabled

function isDisabled() {
  return menuSidebar.hasAttribute('disabled');
}

menuSidebar.setAttribute('disabled', 'disabled');
menuSidebar.removeAttribute('disabled');

console.log(isDisabled(menuSidebar));

// console.log(menuSidebar.style);

// ocultando el boton ok y el consentimiento de cookies

const cookieButton = document.querySelector('#cookie-ok');
const cookieConsent = document.querySelector('#cookies-consent');

cookieButton.addEventListener('click', () => {
  cookieConsent.style.display = 'none';
});

// adding dataset to menusidebar button
menuSidebar.dataset.testingData = 'true';
console.log(menuSidebar.dataset.testingData === 'true');

// looking or searching for the parent element of the menuSidebar
console.log('parent element of menusidebar', menuSidebar.parentElement);

console.log('closest css selector', menuSidebar.closest('#navbar'));

// productos header y array
const productos = [
  'Cemento',
  'Varilla',
  'Alambron',
  'Alambre Recocido',
  'Clavos',
  'Malla electrosoldada',
  'Armex',
];

const listadoProductos = document.querySelector('#listado-productos');

productos.forEach((producto) => {
  listadoProductos.insertAdjacentHTML('beforeend', `<li>${producto}</li>`);
});

fetch('http://localhost:3001/abamat/products')
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      listadoProductos.insertAdjacentHTML(
        'beforeend',
        `
        <table>
          <tr>
            <td>${item.title}</td>
          </tr>
          <tr>
            <td><img src="${item.image}" /></td>
          </tr>
          <tr>
            <td>$ ${item.price} ${item.unit.toLowerCase()}</td>
          </tr>
        </table>
        `
      );
    });
  });

listadoProductos.style.color = 'blue';
listadoProductos.style.textAlign = 'center';

// productos sugeridos
async function agregarItem(item) {
  const productosSugeridos = document.querySelector(
    '#listado-productos-sugeridos'
  );
  await productosSugeridos.insertAdjacentHTML('beforeend', `<li>${item}</li>`);
}

const formProductosSugeridos = document.querySelector('#sugeridos-form');
const itemName = document.querySelector('#item-name');

formProductosSugeridos.addEventListener('submit', (event) => {
  event.preventDefault();
  agregarItem(itemName.value);
});

// fetching news

const newsList = document.querySelector('#news-list');

try {
  fetch(`http://localhost:3001/abamat/news`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((e) => {
        console.log(e.title);
        newsList.insertAdjacentHTML(
          'beforeend',
          `<li><a href="${e.url}" target="_blank">${e.title}</a></li>`
        );
      });
    });
} catch (error) {
  console.log(error);
}

// using createElement
const newsDiv = document.querySelector('#news');
const newImg = document.createElement('img');
newImg.setAttribute(
  'src',
  'https://www.crsi.org/wp-content/uploads/black-bar-stacked.jpg'
);
newsDiv.appendChild(newImg);

// create product form

const createProductForm = document.querySelector('#create-product-form');

createProductForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const code = document.querySelector('#code').value;
  const title = document.querySelector('#title').value;
  const brand = document.querySelector('#brand').value;
  const image = document.querySelector('#image').value;
  const price = document.querySelector('#price').value;
  const unit = document.querySelector('#unit').value;
  const category = document.querySelector('#category').value;

  try {
    const response = await fetch('http://localhost:3001/abamat/newproduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        title,
        brand,
        image,
        price,
        unit,
        category,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});
