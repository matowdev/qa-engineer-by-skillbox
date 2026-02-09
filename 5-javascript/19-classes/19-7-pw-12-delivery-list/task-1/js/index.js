import Delivery from './Delivery.js';

const deliveryArr = [
  new Delivery('Ольга', 'ул. Вымыслов, д. 12', 8),
  new Delivery('Дмитрий', 'ул. Задачная, д. 7', 3),
  new Delivery('Оля', 'ул. Ткачей, д. 43', 11),
];

const deliveryList = document.getElementById('delivery-list');

function renderDeliveryList(items, list) {
  if (!list || !Array.isArray(items) || items.length === 0) {
    console.warn('Нет данных для отображения!');
    return;
  }

  items.forEach((item) => {
    const cardElement = item.createCard(); // создание карточки (в/из Delivery.js)
    list.append(cardElement);
  });
}

renderDeliveryList(deliveryArr, deliveryList); // отрисовка
