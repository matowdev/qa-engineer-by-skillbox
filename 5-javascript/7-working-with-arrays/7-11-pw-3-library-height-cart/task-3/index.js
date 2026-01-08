'use strict';

/*
Создайте веб-приложение «Корзина покупателя» со следующим функционалом:
- На странице из массива должен выводиться отсортированный по возрастанию список товаров.
- Предусмотрите возможность добавления нового товара в массив. Для этого создайте кнопку «Добавить товар». Ввод названия осуществляется в окне prompt(), которое отображается при клике на кнопку добавления. Перед добавлением товара в массив обязательно сделайте проверку ввода. Если пользователь ничего не ввёл, покажите alert() с сообщением: «Название товара не введено!»
- После добавления нового товара список должен обновиться в DOM-дереве в отсортированном виде по возрастанию.
*/

const cart = [
  'Арбуз',
  'Книга',
  'Кофе',
  'Макароны',
  'Молоко',
  'Сахар',
  'Яблоки',
];

const page = document.getElementById('page');

const header = document.createElement('h1');
header.classList.add('header');
header.textContent = 'Корзина покупателя';

const btnsWrap = document.createElement('div');
btnsWrap.classList.add('btns-wrap');

const addBtn = document.createElement('button');
addBtn.classList.add('btn', 'add-btn');
addBtn.textContent = 'Добавить товар';

const cartList = document.createElement('ul');
cartList.classList.add('cart-list');

btnsWrap.append(addBtn);
page.append(header, btnsWrap, cartList);

// ** отрисовка списка/корзины продуктов (согласно default массива)
function renderCartList(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  cartList.innerHTML = ''; // сразу очистка списка
  const documentFragment = document.createDocumentFragment();

  arr.forEach((item, index) => {
    const cartItem = document.createElement('li');
    cartItem.classList.add('cart-item');
    cartItem.textContent = `${index + 1}) ${item}`;

    documentFragment.append(cartItem);
  });

  cartList.append(documentFragment);
}

// ** сортировка списка/корзины продуктов
function sortCart(cartArr) {
  if (!cartArr || !Array.isArray(cartArr)) {
    return;
  }

  cartArr.sort((a, b) => a.localeCompare(b)); // сортировка (без return/без доп. переменной, т.к. данный метод мутирует исходный массив)
}

sortCart(cart); // сортировка.. сразу (default массива)
renderCartList(cart); // !! запуск отрисовки

// прослушка "Добавить.." кнопки
addBtn.addEventListener('click', () => {
  const value = prompt('Введи название товара');

  if (value === null) {
    return;
  }

  if (value.trim() === '') {
    alert('Название товара не введено!');
    return;
  }

  let productName = value.trim().toLowerCase();
  productName = productName[0].toUpperCase() + productName.slice(1);

  cart.push(productName); // добавление в default массив

  sortCart(cart); // сортировка списка/корзины
  renderCartList(cart); // последующая отрисовки/перерисовка
});
