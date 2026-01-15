'use strict';

/*
Создайте мини-приложение «Сортировка цен» со следующим функционалом:
1. HTML-страница должна содержать:
  - ненумерованный список <ul>, который будет отображать цены;
  - две кнопки: одна для сортировки списка цен по возрастанию, а вторая — по убыванию.
2. JavaScript-код должен включать в себя:
  - исходный массив с ценами, например: [100, 500, 250, 750, 300];
  - функцию для отображения цен на странице;
  - функции для сортировки массива цен по возрастанию и по убыванию;
  - обработчики событий для кнопок сортировки, которые будут вызывать соответствующие функции сортировки и обновлять отображаемый список.
3. Выполните минимальную CSS-стилизацию DOM-элементов.
*/

const priceList = document.querySelector('.price-list');
const btnSortUp = document.querySelector('.btn-sort-up');
const btnSortDown = document.querySelector('.btn-sort-down');

const prices = [100, 500, 250, 750, 300];

function renderPriceList(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  priceList.innerHTML = '';
  const documentFragment = document.createDocumentFragment();

  arr.forEach((price) => {
    const priceItem = document.createElement('li');
    priceItem.classList.add('price-item');
    priceItem.textContent = price;

    documentFragment.append(priceItem);
  });

  priceList.append(documentFragment);
}

renderPriceList(prices); // сразу отрисовка default массива/списка

function sortUp(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  return [...arr].sort((a, b) => a - b);
}

function sortDown(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  return [...arr].sort((a, b) => b - a);
}

btnSortUp.addEventListener('click', () => {
  const sortedUpArr = sortUp(prices);
  renderPriceList(sortedUpArr);
});

btnSortDown.addEventListener('click', () => {
  const sortedDownArr = sortDown(prices);
  renderPriceList(sortedDownArr);
});
