'use strict';

// modal

const btnOpenModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelectorAll('.close-modal');
const overlay = document.querySelector('.overlay');

const openModal = function () {
  document.querySelector('.modal')?.classList.remove('hidden');
  document.querySelector('.overlay')?.classList.remove('hidden');
};

const closeModal = function () {
  document.querySelectorAll('.modal').forEach((button) => {
    button?.classList.add('hidden');
  });
  document.querySelector('.overlay')?.classList.add('hidden');
};

btnOpenModal.forEach((button) => {
  button.addEventListener('click', openModal);
});

btnCloseModal.forEach((button) => {
  button.addEventListener('click', closeModal);
});

overlay.addEventListener('click', closeModal);

document.documentElement.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// toggle dark mode button
const darkModeBtn = document.querySelector('#dark-mode-btn');
darkModeBtn.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// form register
const formRegister = document.querySelector('#form-register');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const messageRegister = document.querySelector('.form-register');

formRegister.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(username.value, password.value);
  const userData = {
    username: username.value,
    password: password.value,
    admin: 'false',
  };
  try {
    const response = await axios.post(
      'https://abamat-backend.onrender.com/abamat/users/register',
      userData
    );
    console.log('Response', response.data);
    if (response.data) {
      messageRegister.insertAdjacentHTML(
        'beforeend',
        `<p>Usuario registrado correctamente.</p>`
      );
    }
  } catch (error) {
    console.error(error);
  }
});

// registro modal
const openRegisterModal = document.querySelector('.registro-btn');

openRegisterModal.addEventListener('click', () => {
  document.querySelector('.form-register').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

// login modal
const openLoginModal = document.querySelector('.login-btn');

openLoginModal.addEventListener('click', () => {
  document.querySelector('.form-login').classList.remove('hidden');
  document.querySelector('.overlay').classList.remove('hidden');
});

// form login
const formLogin = document.querySelector('#form-login');
const usernameLogin = document.querySelector('#usernameLogin');
const passwordLogin = document.querySelector('#passwordLogin');
const messageLogin = document.querySelector('.form-login');

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log(usernameLogin.value, passwordLogin.value);
  const userData = {
    username: usernameLogin.value,
    password: passwordLogin.value,
  };
  try {
    const response = await axios.post(
      'https://abamat-backend.onrender.com/abamat/users/login',
      userData
    );
    console.log('Response', response.data);
    if (response.data) {
      localStorage.setItem('username', usernameLogin.value);
      localStorage.setItem('token', response.data.token);
      document.querySelector('.form-register').classList.add('hidden');
      document.querySelector('.form-login').classList.add('hidden');
      document.querySelector('#register').classList.add('hidden');
      document.querySelector('#login').classList.add('hidden');
      document
        .querySelector('#navbar')
        .insertAdjacentHTML(
          'beforeend',
          `<li>Bienvenido ${usernameLogin.value.toUpperCase()} !</li>`
        );
      closeModal();
      document.querySelector('#cerrar-sesion').classList.remove('hidden');
      messageLogin.insertAdjacentHTML(
        'beforeend',
        `<p>Usuario loggeado correctamente.</p>`
      );
    }
  } catch (error) {
    console.error(error);
  }
});

// cerrar sesion btn
const closeSessionBtn = document.querySelector('#cerrar-sesion-btn');
closeSessionBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  window.location.reload();
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

const listadoProductos = document.querySelector('#listado-productos');

(async () => {
  try {
    const { data } = await axios.get(
      'https://abamat-backend.onrender.com/abamat/products'
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

// adding css to input error or success class

const colors = document.querySelector('#cementogris');
colors.addEventListener('blur', () => {
  if (colors.value.length < 1) {
    colors.classList.remove('success');
    colors.classList.add('error');
  } else if (colors.value.length > 0) {
    colors.classList.remove('error');
    colors.classList.add('success');
  }
});

// cotizador formulario

const formularioCotizador = document.querySelector('#cotizador-form');
formularioCotizador.addEventListener('submit', (event) => {
  event.preventDefault();

  const cementoGris = document.querySelector('#cementogris').value || 0;
  const calidra = document.querySelector('#calidra').value || 0;
  const var3 = document.querySelector('#var3').value || 0;
  const var4 = document.querySelector('#var4').value || 0;
  const alambron = document.querySelector('#alambron').value || 0;
  const recocido = document.querySelector('#recocido').value || 0;
  const clavo2 = document.querySelector('#clavo2').value || 0;
  const clavo4 = document.querySelector('#clavo4').value || 0;
  const armex1520 = document.querySelector('#armex1520').value || 0;
  const armex1515 = document.querySelector('#armex1515').value || 0;
  const malla10 = document.querySelector('#malla10').value || 0;
  const malla4 = document.querySelector('#malla4').value || 0;

  const total = [
    cementoGris * 245 +
      calidra * 95 +
      var3 * 151 +
      var4 * 288 +
      alambron * 26 +
      recocido * 27 +
      clavo2 * 46 +
      clavo4 * 46 +
      armex1520 * 150 +
      armex1515 * 150 +
      malla10 * 2300 +
      malla4 * 6500,
  ];

  const totalCotizador = document.querySelector('#total-cotizador');
  totalCotizador.textContent = total.reduce((acc, current) => {
    return acc + current;
  }, 0);
});

// piezas por varilla

const piezasVarilla = {
  piezas: {
    var3: '150',
    var4: '83',
    var5: '53',
    var6: '37',
    var8: '21',
  },
};

function getPiezasVarilla(calibre) {
  return piezasVarilla.piezas[calibre];
}

const select = document.querySelector('#piezas-varilla');
const resultadoSelect = document.querySelector('#resultado-piezas-varilla');

select.addEventListener('change', () => {
  resultadoSelect.textContent = getPiezasVarilla(select.value) + ' piezas';
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
    const response = await fetch(
      'https://abamat-backend.onrender.com/abamat/newproduct',
      {
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
      }
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

// products list from bind

const productsListA = document.querySelector('#products-list-a');
const productsListAButton = document.querySelector('#products-list-a-btn');

productsListAButton.addEventListener('click', async () => {
  try {
    const { data } = await axios.get(
      'http://localhost:3001/abamat/bind-products'
    );
    console.log(data);
    data.forEach((item) => {
      productsListA.insertAdjacentHTML(
        'beforeend',
        `<li>${item.title.toLowerCase()}</li>`
      );
    });
  } catch (error) {
    console.error(error);
  }
});
