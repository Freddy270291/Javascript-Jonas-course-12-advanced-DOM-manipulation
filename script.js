'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window

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
// PAGE NAVIGATION

// SMOOTH SCROLLING

// 1° METHOD (OLD ONE)

// a. select the button and the section were we want to go once clicked:

// b.add event listener to the button
btnScrollTo.addEventListener('click', function (e) {
  // we have to get the coordinates of were we want to go
  const s1coords = section1.getBoundingClientRect();
  // Scrooling

  /*
  window.scrollTo(
    s1coords.left + window.pageXOffset, // Current position + current scroll
    s1coords.top + window.pageYOffset
  );
  
  // Make the animation smooth:
  window.scrollTo({
    left: s1coords.left + window.pageXOffset, // Current position + current scroll
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  */

  // 2° METHOD:
  section1.scrollIntoView({ behavior: 'smooth' });
});

/*
// Smooth scrolling without event delegation
document.querySelectorAll('.nav__link').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
*/

//Event delegation: Implementing Page Navigation
// 1. We add the event Listener to a common parent Element of all the elements we are interested in
// 2. Determine what element originated the event (so we can work with the element where the event was created)

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy:
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab'); // Search for the closest operation tab!

  // Active class button

  if (!clicked) return; // GUARD CLAUSE: If stated that returns earlier if some condition is not matched, so we don't have an error
  tabs.forEach(t => t.classList.remove('operations__tab--active')); // Clearing the class on all of them
  clicked.classList.add('operations__tab--active'); // Add the active class to the clicked tab

  // Activate the content area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active'); // Senza questa classe, la tab ha "display: none". con questa classe invece è Grid, quindi si vede
});

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// SELECTING ELEMENTS

/*
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

// STYLES
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message)); // To have all the properties of an element
console.log(getComputedStyle(message).color); // We can take just one!
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// Changing the value of the CSS variables:
// document.documentElement.style.setProperty('--color-primary', 'orange');

// ATTRIBUTES (src, alt, class, id, ..)
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);

// Non-standard
console.log(logo.designer); // Undefined perché non è standard!
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Apple');

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // gives: http://127.0.0.1:5500/#
console.log(link.getAttribute('href')); // gives:  #

// Data attributes: special attributes that starts with the word "data-"
// to have it, we need to transform the name in camelcase
// data-version-number  --> dataset.versionNumber
console.log(logo.dataset.versionNumber);
*/

// EVENTS AND EVENT LISTENERS (https://developer.mozilla.org/it/docs/Web/Events)
// An event is a signal that is generated by a DOM Node. A signal means that something has happened.
const h1 = document.querySelector('h1');

/*
// 'MOUSEENTER' : It is triggered when we hover the element with the mouse
h1.addEventListener('mouseenter', function (e) {
  console.log('addEventListener: mouse enter');
});

// Another way to add event handler (old school):
h1.onmouseenter = function (e) {
  console.log('addEventListener: mouse enter 2');
};
*/

/*
// We use the AddeventLister because:
// 1. we can add multiple event handlers;
// 2. we can remove an event handler if not needed anymore:

// a. we export the function outside and we pass in the eventlistener the nameof the function:
const alertH1 = function (e) {
  console.log('addEventListener: mouse enter');

  // b. we remove the eventlistener (inside the function) once it has been triggered once:
  h1.removeEventListener('mouseenter', alertH1);
};
h1.addEventListener('mouseenter', alertH1);

// We can remove the eventlistener everywhere, for example after some time is passed:
setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

// EVENT PROPAGATION: BUBBLING AND CAPTURING
/* 01: Capturing Phase: When an event is generated, it is not generated on the target (for example, where we click) but it is generated on the root (main document) - the eventListeners do not capture the function in this phase!;
   02: Target Phase: Once it is generated in the root, it starts to pass down each element of the document until it reaches the target element;
   03: Bubbling Phase: Once it reaches the target element, it pass up each element back to the root

  This is important because it is as if as the event happened in all the parent element. If we attach the same event at a parent element, it would happen twice!


// Example:
// Random colour:
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// Attach the event handlers to parent elements:
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255);

  // STOP PROPAGATION (not a good idea in practice)
  e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor(0, 255);
});
// Quando si clicca sul child vengono triggerati anche le funzioni dei parent

// We can stop the event propagation: in the event, call: e.stopPropagation()
*/

/*
// DOM TRAVERSING
// It is like walking through the DOM: we can select an element based on another element.
// For example, a direct child/parent element, or sometimes we don't know the structure of the DOM at that time

// Going downwards: selecting child element
// first method: querySelector on the element (not the document)
console.log(h1.querySelector('.highlight'));
// second method: childNodes (we get every single Nodes)
console.log(h1.childNodes);
console.log(h1.children); // We get the 3 elements inside the h1, not all the Nodes
// third method: first and last element child
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// Going upwards: selecting parent element
console.log(h1.parentNode);
console.log(h1.parentElement);

// Also NOT direct parent:  closest()
console.log(h1.closest('.header'));

// Going sideways: selecting siblings element (only previous and next one)
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
// with nodes:
console.log(h1.previousSibling);
console.log(h1.nextSibling);
*/
