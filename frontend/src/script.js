'use strict';

const address = document.querySelector('#address');
console.log(address?.textContent);

const paragraphs = document.querySelectorAll('p');
console.log(paragraphs);

paragraphs.forEach((paragraph) => {
  console.log(paragraph.textContent);
});

console.log(paragraphs.length); // amount of paragraphs

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

function updateFullName() {
  fullName.textContent = getFullName();
}

firstName.addEventListener('keyup', () => {
  return updateFullName();
});

lastName.addEventListener('keyup', () => {
  return updateFullName();
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
