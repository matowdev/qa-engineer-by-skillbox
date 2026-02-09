export default class Delivery {
  constructor(name, address, distance) {
    this._name = name;
    this._address = address;
    this._distance = distance;
    this._element = null; // для ссылки на DOM-элемент
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;

    if (this._element) {
      this._element.querySelector(
        '.delivery-card__value_type_name',
      ).textContent = this._name;
    }
  }

  get address() {
    return this._address;
  }

  set address(value) {
    this._address = value;

    if (this._element) {
      this._element.querySelector(
        '.delivery-card__value_type_address',
      ).textContent = this._address;
    }
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    this._distance = value;

    if (this._element) {
      this._element.querySelector(
        '.delivery-card__value_type_distance',
      ).textContent = `${this._distance} км`;
    }
  }

  // создание карточки
  createCard() {
    const cardElement = document.createElement('article');
    cardElement.classList.add('delivery-card', 'delivery-list__card');

    cardElement.innerHTML = `
      <div class="delivery-card__group">
        <span class="delivery-card__label">Имя</span>
        <span class="delivery-card__value delivery-card__value_type_name">${this._name}</span>
      </div>
      <div class="delivery-card__group">
        <span class="delivery-card__label">Адрес</span>
        <span class="delivery-card__value delivery-card__value_type_address">${this._address}</span>
      </div>
      <div class="delivery-card__group">
        <span class="delivery-card__label">Расстояние</span>
        <span class="delivery-card__value delivery-card__value_type_distance">${this._distance} км</span>
      </div>
    `;

    this._element = cardElement;
    return cardElement;
  }
}
