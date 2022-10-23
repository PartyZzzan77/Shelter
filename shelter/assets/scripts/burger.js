const burgerLines = document.querySelector('.burger span');
const burgerMenu = document.querySelector('.burger__menu');
const body = document.body;
const headerBox = document.querySelector('.header-box');
const headerSticky = document.querySelector('.header_sticky');

const activateBurger = elem => {
  elem.classList.remove('deActive');
  elem.classList.toggle('active');
};

const deActiveBurger = elem => {
  elem.classList.toggle('deActive');
  elem.classList.remove('active');
};

const activateMenu = elem => {
  elem.classList.toggle('burger__menu_animate');
}
const deActiveMenu = elem => {
  elem.classList.remove('burger__menu_animate');
}

body.addEventListener('click', e => {
  let event = e.target;
  if (event.closest('.burger')) {
    headerBox.classList.toggle('overlay');
    activateBurger(burgerLines);
    activateMenu(burgerMenu);
    body.classList.toggle('unscroll');
    if(headerSticky){
      headerSticky.classList.toggle('header_transparent');
    }
  }
  if (event.closest('.header-box') || event.closest('.burger__link')) {
    headerBox.classList.remove('overlay');
    deActiveBurger(burgerLines);
    deActiveMenu(burgerMenu);
    body.classList.toggle('unscroll');
    headerSticky.classList.toggle('header_transparent');
  }
});
