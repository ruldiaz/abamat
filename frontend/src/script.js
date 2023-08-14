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

// tabs menu
const tabs = document.querySelectorAll('.tab');

tabs.forEach((tab) => {
  tab.addEventListener('click', (event) => {
    const showThisTab = event.currentTarget.dataset.content;
    const tabContent = document.querySelector(showThisTab);
    document.querySelector('.show')?.classList.remove('show');
    document.querySelector('.active')?.classList.remove('active');
    event.currentTarget.classList.add('active');
    tabContent.classList.add('show');
  });
});

// ocultando el boton ok y el consentimiento de cookies

const cookieButton = document.querySelector('#cookie-ok');
const cookieConsent = document.querySelector('#cookies-consent');

cookieButton.addEventListener('click', () => {
  cookieConsent.style.display = 'none';
});

const listadoProductos = document.querySelector('#listado-productos');

(async () => {
  try {
    const { data } = await axios.get(
      'https://main--shimmering-lollipop-9c20f8.netlify.app/abamat/products'
    );
    // const data = await response.json();
    console.log('Fetched data: ', data);

    data.forEach((item) => {
      listadoProductos.insertAdjacentHTML(
        'afterbegin',
        `
        <table>
          <tr>
            <td id="item-title">${
              item.title
            }<i class="fa-solid fa-circle-plus"></i></td>
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

    const itemTitles = document.querySelectorAll('i');

    itemTitles.forEach((item) => {
      item.addEventListener('click', (event) => {
        console.log(event.currentTarget.parentElement.textContent);
      });
    });
  } catch (error) {
    console.error('Error fetching products: ', error);
  }
})();

// cotizador formulario

const formularioCotizador = document.querySelector('#cotizador-form');
formularioCotizador.addEventListener('submit', (event) => {
  event.preventDefault();

  const cementoGris = document.querySelector('#cementogris').value;
  const calidra = document.querySelector('#calidra').value;
  const var3 = document.querySelector('#var3').value;
  const var4 = document.querySelector('#var4').value;
  const alambron = document.querySelector('#alambron').value;
  const recocido = document.querySelector('#recocido').value;
  const clavo2 = document.querySelector('#clavo2').value;
  const clavo4 = document.querySelector('#clavo4').value;
  const armex1520 = document.querySelector('#armex1520').value;
  const armex1515 = document.querySelector('#armex1515').value;
  const malla10 = document.querySelector('#malla10').value;
  const malla4 = document.querySelector('#malla4').value;
});

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
