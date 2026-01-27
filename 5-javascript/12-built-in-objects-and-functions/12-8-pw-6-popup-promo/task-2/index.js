'use strict';

// Создайте для потенциального интернет-магазина форму для ввода подарочного промокода с возможностью проверки введённого значения.
// !! Уточнение: чтобы корректно взаимодействовать с cookie браузера, нужно работать через "Live Server"

const promocodeObj = {
  promocode: 'PROM50',
  gift: 'Скидка 50%',
};

const promoForm = document.querySelector('.promo__form');
const promoInput = promoForm.querySelector('.promo__input');
const promoStatus = promoForm.querySelector('.promo__status');

function getCookie() {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=');
    acc[name] = value;

    return acc;
  }, {});
}

function activatePromo(giftText) {
  if (!giftText) {
    return;
  }

  promoStatus.textContent = `Промокод применён. ${giftText}`;
  promoStatus.classList.add('promo__status_active', 'promo__status_success');
  promoInput.classList.add('promo__input_success');
  promoInput.value = promocodeObj.promocode;
}

function resetPromo() {
  promoStatus.textContent = '';
  promoStatus.classList.remove('promo__status_active', 'promo__status_success');
  promoInput.classList.remove('promo__input_success');
}

function submitPromo(event) {
  event.preventDefault();

  const userValue = promoInput.value.trim().toUpperCase();

  if (userValue === promocodeObj.promocode) {
    activatePromo(promocodeObj.gift);
    document.cookie = `promocode=${promocodeObj.promocode}; max-age=3600; path=/`; // указываем время хранение cookie.. (max-age=3600, это 1 час)
  } else {
    resetPromo();
    promoInput.value = '';
    document.cookie = `promocode=; max-age=0; path=/`; // очищаем cookie после некорректного ввода (что бы после reload не вывести что было успешным ранее)
  }
}

function checkCookie() {
  const cookies = getCookie();

  if (cookies.promocode === promocodeObj.promocode) {
    activatePromo(promocodeObj.gift);
  }
}

checkCookie(); // сразу проверка cookie
promoForm.addEventListener('submit', submitPromo);
