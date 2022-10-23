'use strict';
//pagination


function Pagination(data, containerClass) {
  this.data = data;
  this.PAGINATION_CONTAINER = document.querySelector(`.${containerClass}`);
  this.LAST_LEFT_PAGE = document.querySelector('.navigation__last-left-page');
  this.PREV_PAGE = document.querySelector('.navigation__prev-page');
  this.NEXT_PAGE = document.querySelector('.navigation__next-page');
  this.LAST_RIGHT_PAGE = document.querySelector('.navigation__last-right-page');
  this.CURRENT_PAGE = document.querySelector('.navigation__current-page');
  this.count = 0;

  this.generateCard = function (elem) {
    return `<div id="${elem.id}" class="slider__card">
    <div class="slider__image"><img
      src=${elem.url}
      alt="${elem.name}__image">
    </div>
    <p class="slider__heading">${elem.name}</p>
    <a href="#" class="button-secondary slider__button reset-click" onclick="return false"">Learn more</a>
</div >`
  };
  this.renderPagination = function (data) {
    const paginationWrapper = document.createElement('div');
    paginationWrapper.className = 'pagination__wrapper';
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    data.forEach(elem => {
      pagination.innerHTML += this.generateCard(elem);
    });
    paginationWrapper.append(pagination);
    return paginationWrapper;
  }
  this.randomPaginationPages = (data, amount) => {
    const buffer = [];
    for (let i = 0; i < amount; i++)
      buffer.push(_.shuffle(data));
    return buffer;
  }


  this.switchesPages = (data) => {
    const reRenderCards = () => {
      this.CURRENT_PAGE.innerHTML = this.count + 1;
      this.PAGINATION_CONTAINER.innerHTML = '';
      this.PAGINATION_CONTAINER.append(this.renderPagination(data[this.count]));
    }
    this.PREV_PAGE.classList.add('button-third_disabled');
    this.LAST_LEFT_PAGE.classList.add('button-third_disabled');

    const showNextPage = () => {
      this.PREV_PAGE.classList.remove('button-third_disabled');
      this.LAST_LEFT_PAGE.classList.remove('button-third_disabled');
      if (this.count < data.length - 2) {
        this.count++;
        reRenderCards();
        this.PREV_PAGE.addEventListener('click', showPrevPage);
        this.LAST_LEFT_PAGE.addEventListener('click',showFirstPage);
      }
      else {
        this.count = data.length - 1;
        reRenderCards();
        this.NEXT_PAGE.removeEventListener('click', showNextPage);
        this.PREV_PAGE.addEventListener('click', showPrevPage);
        this.LAST_RIGHT_PAGE.classList.add('button-third_disabled');
        this.NEXT_PAGE.classList.add('button-third_disabled')
      }
    };
    const showPrevPage = () => {
      this.NEXT_PAGE.classList.remove('button-third_disabled');
      this.LAST_RIGHT_PAGE.classList.remove('button-third_disabled');
      if (this.count > 1) {
        this.count--;
        reRenderCards();
        this.NEXT_PAGE.addEventListener('click', showNextPage);
        this.LAST_RIGHT_PAGE.addEventListener('click',showLastPage);
      } else {
        this.count = 0;
        reRenderCards();
        this.PREV_PAGE.removeEventListener('click', showPrevPage);
        this.NEXT_PAGE.addEventListener('click', showNextPage);
        this.LAST_LEFT_PAGE.classList.add('button-third_disabled');
        this.PREV_PAGE.classList.add('button-third_disabled');
      }
    };

    const showFirstPage = () => {
      this.count = 0;
      reRenderCards();
      this.LAST_LEFT_PAGE.removeEventListener('click', showFirstPage);
      this.LAST_LEFT_PAGE.classList.add('button-third_disabled');
      this.PREV_PAGE.removeEventListener('click', showPrevPage);
      this.PREV_PAGE.classList.add('button-third_disabled');
      this.LAST_RIGHT_PAGE.addEventListener('click', showLastPage);
      this.LAST_RIGHT_PAGE.classList.remove('button-third_disabled');
      this.NEXT_PAGE.addEventListener('click', showNextPage);
      this.NEXT_PAGE.classList.remove('button-third_disabled');

    }

    const showLastPage = () => {
      this.count = data.length - 1;
      reRenderCards();
      this.LAST_RIGHT_PAGE.removeEventListener('click', showLastPage);
      this.LAST_RIGHT_PAGE.classList.add('button-third_disabled');
      this.NEXT_PAGE.removeEventListener('click', showNextPage);
      this.NEXT_PAGE.classList.add('button-third_disabled');
      this.LAST_LEFT_PAGE.addEventListener('click', showFirstPage);
      this.LAST_LEFT_PAGE.classList.remove('button-third_disabled');
      this.PREV_PAGE.addEventListener('click', showPrevPage);
      this.PREV_PAGE.classList.remove('button-third_disabled');
    }
    this.NEXT_PAGE.addEventListener('click', showNextPage);
    this.PREV_PAGE.addEventListener('click', showPrevPage);
    this.LAST_RIGHT_PAGE.addEventListener('click', showLastPage);
    this.LAST_LEFT_PAGE.addEventListener('click', showFirstPage);
  }
}

const pagination = new Pagination(petsData, 'our-pets___container');
const paginationContainer = pagination.PAGINATION_CONTAINER;
let shufflePages;
if (document.documentElement.clientWidth >= 1280) {
  shufflePages = pagination.randomPaginationPages(petsData, 6);
}

if (document.documentElement.clientWidth < 1280 && document.documentElement.clientWidth >= 768) {
  shufflePages = pagination.randomPaginationPages(petsData, 8);
}
if(document.documentElement.clientWidth < 768){
  shufflePages = pagination.randomPaginationPages(petsData, 16);
}
paginationContainer.append(pagination.renderPagination(shufflePages[0]));
pagination.switchesPages(shufflePages);


//!refactor
  paginationContainer.addEventListener('click', e => {
    createOverlay();
    //!refactor
    const PETS = document.querySelector('.pets');
    const CARD = new Popup(petsData[e.target.closest('.slider__card').id - 1]).generatePopup();
    PETS.insertAdjacentHTML('afterbegin', CARD);
  })








