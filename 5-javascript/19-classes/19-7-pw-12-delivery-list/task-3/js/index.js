import EditDelivery from './EditDelivery.js';

const deliveryArr = [
  new EditDelivery('Ольга', 'ул. Вымыслов, д. 12', 8, 'delivery'),
  new EditDelivery('Дмитрий', 'ул. Задачная, д. 7', 3, 'delivered'),
  new EditDelivery('Оля', 'ул. Ткачей, д. 43', 11, 'canceled'),
];

const deliveryList = document.getElementById('delivery-list');
const popup = document.getElementById('popup');
const editForm = document.getElementById('form');
const popupCloseBtn = document.getElementById('close-btn');

const totalBtn = document.getElementById('total-btn');
const totalResult = document.getElementById('total-result');

function renderDeliveryList(items, list) {
  if (!list || !Array.isArray(items) || items.length === 0) {
    console.warn('Нет данных для отображения!');
    return;
  }

  list.innerHTML = '';

  items.forEach((item) => {
    const cardElement = item.createCard(); // создание карточки (в/из Delivery.js)
    list.append(cardElement);
  });
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

if (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', closePopup);
}

if (editForm) {
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const currentInstance = editForm.currentDeliveryInstance; // получение ссылки на редактируемый объект

    if (currentInstance) {
      currentInstance.name = editForm.elements.name.value;
      currentInstance.address = editForm.elements.address.value;
      currentInstance.distance = Number(editForm.elements.distance.value);
      currentInstance.status = editForm.elements.status.value;
    }

    closePopup();
    totalResult.textContent = '';
  });
}

popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    closePopup();
  }
});

if (totalBtn && totalResult) {
  totalBtn.addEventListener('click', () => {
    const totalDistance = EditDelivery.getTotalDistance(deliveryArr);
    totalResult.textContent = `Общее расстояние: ${totalDistance}\u00A0км`;
  });
}

renderDeliveryList(deliveryArr, deliveryList); // отрисовка
