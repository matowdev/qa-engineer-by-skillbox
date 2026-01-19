'use strict';

// Создайте мини-приложение «Сортировка цен».

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
