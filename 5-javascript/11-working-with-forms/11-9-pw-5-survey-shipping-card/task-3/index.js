'use strict';

// Создайте веб-приложение, где пользователь сможет настроить оформление своей банковской карты, а именно: ввести текст, выбрать цвет из выпадающего списка и увидеть финальный дизайн карты.

const textInput = document.getElementById('info');
const colorSelect = document.getElementById('select-options');
const card = document.getElementById('card-preview-info');

textInput.addEventListener('input', () => {
  if (textInput.value === '') {
    card.textContent = 'BANK CARD';
  } else {
    card.textContent = textInput.value;
  }
});

textInput.addEventListener('focus', () => {
  textInput.style.backgroundColor = '#f4faff';
  textInput.style.borderColor = '#37107e';
});

textInput.addEventListener('blur', () => {
  textInput.style.backgroundColor = '';
  textInput.style.borderColor = '';
});

colorSelect.addEventListener('change', () => {
  const selectedColor = colorSelect.value;
  card.style.backgroundColor = selectedColor;
});
