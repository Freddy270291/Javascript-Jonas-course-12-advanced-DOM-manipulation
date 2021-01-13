'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////
// SELECTING ELEMENTS

// Elements that we can select WITHOUT SELECTORS:
// console.log(document.documentElement); // documentElement to select all the document
// console.log(document.head);
// console.log(document.body);

// WITH SELECTORS (not only on the document but also on the elements):
const header = document.querySelector('.header'); // returns first element
const allSelections = document.querySelectorAll('.selection'); // Returns all elements that matches

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // All the elements with the tag of button
// This method returns an HTMLcollection: if the DOM changes, this collection is immediately updated

document.getElementsByClassName('btn'); // returns a HTMLcollection

// CREATING AND INSERTING ELEMENTS
// .insertAdjacentHTML  to create movements

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'We use cookies for improved funtionality and analytics.';
message.innerHTML =
  'We use cookies for improved funtionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message); // .prepend insert the element as the first child
// header.append(message); // .append insert the element as the last child

// TO Insert a copy of the message:
// header.append(message.cloneNode(true));

// INSERT BEFORE AND AFTER (not as a child):
header.before(message);
header.after(message);

// DELETE ELEMENTS:
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
  });
