'use strict';

// toggle dark mode button
const darkModeBtn = document.querySelector('#dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
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

// ocultando el boton ok y el consentimiento de cookies

const cookieButton = document.querySelector('#cookie-ok');
const cookieConsent = document.querySelector('#cookies-consent');

cookieButton.addEventListener('click', () => {
  cookieConsent.style.display = 'none';
});

const listadoProductos = document.querySelector('#listado-productos');

async function fetchAndRenderProducts() {
  try {
    const response = await fetch('http://localhost:3001/abamat/products');
    const data = await response.json();
    console.log('Fetched data: ', data);

    data.forEach((item) => {
      listadoProductos.insertAdjacentHTML(
        'afterbegin',
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
    listadoProductos.style.color = 'blue';
    listadoProductos.style.textAlign = 'center';
  } catch (error) {
    console.error('Error fetching products: ', error);
  }
}

fetchAndRenderProducts();

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
