'use strict';

const address = document.querySelector('#address');
console.log(address?.textContent);

const paragraphs = document.querySelectorAll('p');
console.log(paragraphs);

paragraphs.forEach((paragraph) => {
  console.log(paragraph.textContent);
});

console.log(paragraphs.length);
