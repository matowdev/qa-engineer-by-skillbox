'use strict';

// Создайте всплывающее попап-окно уведомления о подарке для посетителей сайта (подробнее, см. страницу практической работы).

const giftArr = [
  {
    title: 'Скидка 20% на первую покупку в нашем магазине!',
    icon: './images/discount.svg',
  },
  {
    title: 'Скидка 10% на всё!',
    icon: './images/cart.svg',
  },
  {
    title: 'Подарок при первой покупке в нашем магазине!',
    icon: './images/gift.svg',
  },
  {
    title: 'Бесплатная доставка для вас!',
    icon: './images/delivery.svg',
  },
  {
    title: 'Сегодня день больших скидок!',
    icon: './images/sale.svg',
  },
];

const popupEl = document.querySelector('.popup');

function getRandomGift(arr) {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function closePopup() {
  popupEl.classList.remove('popup_open');

  setTimeout(() => {
    popupEl.innerHTML = '';
  }, 300);
}

function openPopup() {
  const gift = getRandomGift(giftArr);

  if (!gift) {
    return;
  }

  const cardTemplate = `
    <div class="popup__card">
      <div class="popup__icon-wrap">
        <img class="popup__icon" src="${gift.icon}" alt="Иконка подарка">
      </div>
      <div class="popup__content-wrap">
        <h2 class="popup__title">${gift.title}</h2>
        <button class="popup__btn" type="button">Отлично!</button>
      </div>
    </div>
  `;

  popupEl.innerHTML = cardTemplate;
  popupEl.classList.add('popup_open');

  const closeBtn = popupEl.querySelector('.popup__btn');
  closeBtn.addEventListener('click', closePopup);
}

// появление/отрисовка popup окна, через задержку
setTimeout(() => {
  openPopup();
}, 3000);
