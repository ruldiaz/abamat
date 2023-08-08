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
