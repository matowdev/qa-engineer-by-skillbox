'use strict';

// Создайте веб-страницу с формой опроса для сбора данных о пользователе. В момент ввода часть полей проверяется на правильность заполнения пользователем. После заполнения формы информация о пользователе выводится на экран (подробнее, см. страницу практической работы).

const form = document.getElementById('form');
const rangeInput = document.getElementById('range');
const rangeValue = document.getElementById('range-value');

rangeInput.addEventListener('input', () => {
  rangeValue.textContent = rangeInput.value;
});

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const genderInput = form.querySelector('input[name="gender"]:checked');
  let genderText = 'Не указан';

  if (genderInput) {
    const label = form.querySelector(`label[for="${genderInput.id}"]`);
    genderText = label.textContent;
  }

  const rating = rangeInput.value;

  const checkedInterests = form.querySelectorAll(
    'input[name="sport"]:checked, input[name="music"]:checked, input[name="travel"]:checked, input[name="movie"]:checked',
  );

  const interestsList = [];

  checkedInterests.forEach((interest) => {
    const label = form.querySelector(`label[for="${interest.id}"]`);
    interestsList.push(label.textContent);
  });

  const interestsResult =
    interestsList.length > 0 ? interestsList.join(', ') : 'Нет интересов';

  const comment = document.getElementById('textarea').value;

  const existingResult = document.getElementById('result-container');

  if (existingResult) {
    existingResult.remove();
  }

  const resultContainer = document.createElement('div');
  resultContainer.classList.add('result-container', 'page__result-container');
  resultContainer.setAttribute('id', 'result-container');

  resultContainer.innerHTML = `
    <h2 class="result-container__header">Результаты опроса:</h2>
    <p class="result-container__info"><b>Имя пользователя:</b> ${name}</p>
    <p class="result-container__info"><b>Email:</b> ${email}</p>
    <p class="result-container__info"><b>Пол:</b> ${genderText}</p>
    <p class="result-container__info"><b>Оценка сервиса:</b> ${rating}</p>
    <p class="result-container__info"><b>Интересы пользователя:</b> ${interestsResult}</p>
    <p class="result-container__info"><b>Дополнительные комментарии:</b> ${comment ? comment : 'Нет комментариев'}</p>
  `;

  form.after(resultContainer);
});
