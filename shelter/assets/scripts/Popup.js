'use strict';
function Popup(data) {
  this.data = data;
  this.generatePopup = function () {
    return `
    <div class="popup">
    <div class="popup__image">
      <img src="${this.data.url}" alt="${this.data.name}__image">
    </div>
    <section class="description">
      <h3 class="description__title">${this.data.name}</h3>
      <h4 class="description__subtitle">${this.data.type} - ${this.data.breed}</h4>
      <p class="description__text">${this.data.description}</p>
      <ul class="props">
        <li class="props__age"><span class="props__first">Age:</span> <span class="props__second">${this.data.age}</span></li>
        <li class="props__inoculations"><span class="props__first">Inoculations:</span> <span class="props__second">${this.data.inoculations}</span></li>
        <li class="props__diseases"><span class="props__first">Diseases:</span> <span class="props__second">${this.data.diseases}</span></li>
        <li class="props__parasites"><span class="props__first">Parasites:</span> <span class="props__second">${this.data.parasites}</span></li>
      </ul>
    </section>
  </div>
  <div class="popup__button">
  <img src="../../assets/images/popoup/popup__button.svg"/>
  </div>`
  }
}

const popupButtonToggleColor = e => {
  const btn = document.querySelector('.popup__button');
  if (e.target.closest('.overlay') || e.target.closest('.popup__button')) {
    btn.style.backgroundColor = 'rgba(253, 220, 196, 1)';
  } else {
    btn.style.backgroundColor = 'transparent';
  }
}
const createOverlay = () => {
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  body.prepend(overlay);
  body.classList.toggle('unscroll');
  body.addEventListener('mouseover', popupButtonToggleColor);
  body.addEventListener('click', e => {
    const OVERLAY = document.querySelector('.overlay');
    const POPOUP = document.querySelector('.popup');
    const POPOUP_BUTTON = document.querySelector('.popup__button');
    if (e.target.closest('.overlay') || e.target.closest('.popup__button')) {
      body.classList.remove('unscroll');
      body.removeEventListener('mouseover', popupButtonToggleColor);
      if (POPOUP) {
        POPOUP.remove();
      }
      if (OVERLAY) {
        OVERLAY.remove();
      }
      if (POPOUP_BUTTON) {
        POPOUP_BUTTON.remove();
      }
    }
  })
};

