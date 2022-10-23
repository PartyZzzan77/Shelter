'use strict';



window.onload = function () {
  // reset links
  const resetLinks = document.querySelectorAll('.reset-click');
  for (let elem of resetLinks) {
    elem.addEventListener('click', event => event.preventDefault());
  }

  // slider
  //!refactor
  const SLIDER_BUTTON_LEFT = document.querySelector('.pets__Arrow-left');
  const SLIDER_BUTTON_RIGHT = document.querySelector('.pets__Arrow-right');
  const SLIDER = document.querySelector('.slider');
  let UPDATE_PETS_DATA;

  const getContainer = className => {
    const container = document.querySelector(`.${className}`)
    container.innerHTML = '';
    return container;
  };

  const renderCards = (className, data) => {
    let container = getContainer(className);
    let dataPairs = _.chunk(data, 3);
    dataPairs.forEach(elem => {
      let carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      elem.forEach(obj => {

        carouselItem.innerHTML += new CardFactory(obj).generateCard();
      })
      container.append(carouselItem);
    })
    return container;
  };

  const assignAnimationClasses = collectionClass => {
    const list = document.querySelectorAll(`.${collectionClass}`);
    list[0].classList.add('item-left');
    list[1].classList.add('item-active');
    list[2].classList.add('item-right');
  }
  if (SLIDER && petsData) {
    UPDATE_PETS_DATA = JSON.parse(JSON.stringify(petsData));
    const CHAPA = {
      "id": 9,
      "name": "Chapa",
      "url": "../../assets/images/main-images/pets-card-remove_bg/pets-chapa-removebg-preview.png",
      "type": "Cat",
      "breed": "British Shorthair",
      "description": "This breed is one of the oldest. It originated in ancient China over 2000 years ago. Initially, these powerful and strong animals were used for hunting and performing security functions. Over time, the hunting purpose of the Chow Chow faded into the background, and these dogs began to be perceived as decorative dogs or as companion dogs.",
      "age": "2 months",
      "inoculations": ["rabies"],
      "diseases": ["none"],
      "parasites": ["none"]
    };
    if (!!UPDATE_PETS_DATA.length % 2) {
      UPDATE_PETS_DATA.push(CHAPA);
    }
    renderCards('slider', UPDATE_PETS_DATA);
    assignAnimationClasses('carousel-item');
  }
  const ITEM_LEFT = document.querySelector('.item-left');
  const ITEM_ACTIVE = document.querySelector('.item-active');
  const ITEM_RIGHT = document.querySelector('.item-right');


  const randomCards = (data, activeClass) => {
    let fragment = '';
    let activeCards = Array.from(document.querySelector(`.${activeClass}`).children);
    let activeID = activeCards.map(active => +active.id);
    let allID = _.shuffle(data.map(card => +card.id).filter(card => !activeID.includes(card)));

    let exclusiveID = [];
    for (let i = 0; i < 3; i++) {
      exclusiveID.push(allID[i]);
    }

    exclusiveID.forEach(id => {
      fragment += new CardFactory(data[id - 1]).generateCard();
    })
    return fragment;
  }

  const moveLeft = () => {
    SLIDER.classList.add('transition-left');
    SLIDER_BUTTON_LEFT.removeEventListener('click', moveLeft);
    SLIDER_BUTTON_RIGHT.removeEventListener('click', moveRight);
  }
  const moveRight = () => {
    SLIDER.classList.add('transition-right');
    SLIDER_BUTTON_RIGHT.removeEventListener('click', moveRight);
    SLIDER_BUTTON_LEFT.removeEventListener('click', moveLeft);
  }

  //!refactor
  if (SLIDER) {
    SLIDER_BUTTON_LEFT.addEventListener('click', moveLeft);
    SLIDER_BUTTON_RIGHT.addEventListener('click', moveRight);
    SLIDER.addEventListener('animationend', (event) => {
      if (event.animationName === 'move-left' || event.animationName === 'move-left-middle' || event.animationName === 'move-left-mobile') {
        SLIDER.classList.remove('transition-left');
        ITEM_ACTIVE.innerHTML = ITEM_LEFT.innerHTML;
        ITEM_LEFT.innerHTML = randomCards(petsData, 'item-active');
      } else {
        SLIDER.classList.remove('transition-right');
        ITEM_ACTIVE.innerHTML = ITEM_RIGHT.innerHTML;
        ITEM_RIGHT.innerHTML = randomCards(petsData, 'item-active');
      }
      SLIDER_BUTTON_LEFT.addEventListener('click', moveLeft);
      SLIDER_BUTTON_RIGHT.addEventListener('click', moveRight);
    });
  }

  if (SLIDER) {
    SLIDER.addEventListener('click', e => {
      if (!!e.target.closest('.slider__card')) {
        createOverlay();
        const PETS = document.querySelector('.pets');
        let currentCard = e.target.closest('.slider__card').id - 1;
        const CARD = new Popup(UPDATE_PETS_DATA[currentCard]).generatePopup();
        PETS.insertAdjacentHTML('afterbegin', CARD);
      }
    })
  }
}








