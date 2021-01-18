'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');

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

//////////////////////////////////////////////////////
// TABBED COMPONENT

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
// MENU FADE ANIMATION
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// Passing an argument into an handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

/////////////////////////////////////////////////////////
// STICKY NAVIGATION
/*
const initialCoords = section1.getBoundingClientRect();

// The scrool event is available on the window, not document
window.addEventListener('scroll', function (e) {
  if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/
// Sticky navigation with intersection observer API: this API allows our code to observe changes to the way a certain target intercets another element or the way it intercets the viewport
/*
const obsCallback = function (entries, observer) {
  if (entries.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsOptions = {
  root: null, // element we want our target element to intercept,null = the viewport
  threshold: 0.1, // the percent of interception at with the observer callback will be called
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // height of the navbar
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////
// REVEALING SECTIONS ON SCROLL - remove the class "section--hidden" as we approach the sections

const allSelections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSelections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////////////
// LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src (better quality images!):
  entry.target.src = entry.target.dataset.src;
  // Remove the class with the blurred filter:
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.5,
});

imgTargets.forEach(img => imgObserver.observe(img));

/////////////////////////////////////////////////////////
// SLIDER
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');

let currentSlide = 0;
const maxSlide = slides.length;
// Creating the dots:
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = function (slide) {
  // Remove the active class from all the buttons
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
activateDot(0);

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
goToSlide(0);

// Next and previous slide (it means to change the percentages of the translateX)
const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
  activateDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
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

/*
// DOM CONTENT LOADED - fired as soon as the HTML has been parsed
// Listen to this event:
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built', e);
});

// We want our code to be executed after the DOM is ready, we can use the <script> putting it at the end of the HTML

// Load event: fired as soon as also the images and the other external resources are loaded
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// BEFOREUNLOAD event - Fired immediately before the user is leaving the page
// We can use it to ask if they are sure they want to leave the page
window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';  // Gives a generic message
});
*/
