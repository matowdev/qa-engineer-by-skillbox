'use strict';

// Создайте веб-страницу для калькуляции стоимости доставки товаров.

const form = document.getElementById('form');
const tableBody = document.getElementById('table-body');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const product = document.getElementById('product').value.trim();
  const weight = parseFloat(document.getElementById('weight').value);
  const distance = parseFloat(document.getElementById('distance').value);

  if (
    !product ||
    isNaN(weight) ||
    weight <= 0 ||
    isNaN(distance) ||
    distance <= 0
  ) {
    errorMessage.classList.remove('hidden');
    form.reportValidity(); // добавление/возврат default валидации для формы (т.к. в html сразу указывалось novalidate, что бы показывать сразу custom err-сообщение.. потом, всплывающие браузерные подсказки)

    return;
  }

  errorMessage.classList.add('hidden');

  const cost = (weight * distance) / 10;

  const newRow = document.createElement('tr');
  newRow.classList.add('product-table__row');

  newRow.innerHTML = `
    <td class="product-table__cell">${product}</td>
    <td class="product-table__cell">${weight}</td>
    <td class="product-table__cell">${distance}</td>
    <td class="product-table__cell">${cost.toFixed(2)} руб.</td>
  `;

  tableBody.append(newRow);
  form.reset();
});
