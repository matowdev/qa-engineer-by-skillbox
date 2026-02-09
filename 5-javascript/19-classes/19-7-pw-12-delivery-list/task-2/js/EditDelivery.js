import Delivery from './Delivery.js';

export default class EditDelivery extends Delivery {
  constructor(name, address, distance, status = 'delivery') {
    super(name, address, distance); // конструктор родителя
    this._status = status;
  }

  get status() {
    return this._status;
  }

  set status(value) {
    this._status = value;
    this._updateStatusClass();
  }

  _updateStatusClass() {
    if (!this._element) return;

    this._element.classList.remove('delivery-card_status_delivered');
    this._element.classList.remove('delivery-card_status_canceled');

    if (this._status === 'delivered') {
      this._element.classList.add('delivery-card_status_delivered');
    } else if (this._status === 'canceled') {
      this._element.classList.add('delivery-card_status_canceled');
    }
  }

  // переопределение метода из Delivery.js
  createCard() {
    const card = super.createCard();

    this._updateStatusClass();

    const editBtn = document.createElement('button');
    editBtn.classList.add('delivery-card__edit-btn');
    editBtn.textContent = 'Изменить';
    editBtn.type = 'button';

    editBtn.addEventListener('click', () => {
      const popup = document.getElementById('popup');
      const form = document.getElementById('form');

      if (popup && form) {
        form.elements.name.value = this._name;
        form.elements.address.value = this._address;
        form.elements.distance.value = this._distance;
        form.elements.status.value = this._status;

        form.currentDeliveryInstance = this; // привязка текущего объекта к форме
        popup.classList.add('popup_opened'); // отображение popup
      }
    });

    card.append(editBtn);
    return card;
  }
}
