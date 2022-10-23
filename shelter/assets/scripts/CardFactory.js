function CardFactory(data) {
  this.data = data;
  this.generateCard = function () {
    return `<div id="${this.data.id}" class="slider__card">
    <div class="slider__image"><img
        src=${this.data.url}
        alt="${this.data.name}__image">
    </div>
    <p class="slider__heading">${this.data.name}</p>
    <a href="#" class="button-secondary slider__button reset-click" onclick="return false"">Learn more</a>
  </div>`
  }
}