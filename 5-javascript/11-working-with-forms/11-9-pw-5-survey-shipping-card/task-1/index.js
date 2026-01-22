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

  const name = document.getElementById('text').value;
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
  resultContainer.id = 'result-container';
  resultContainer.style.marginTop = '30px';
  resultContainer.style.maxWidth = '350px';

  resultContainer.innerHTML = `
    <h2 style="margin-bottom: 20px; font-weight: 600; font-size: 24px; color: #459b52">Результаты опроса:</h2>
    <p style="margin-bottom: 10px;"><b>Имя пользователя:</b> ${name}</p>
    <p style="margin-bottom: 10px;"><b>Email:</b> ${email}</p>
    <p style="margin-bottom: 10px;"><b>Пол:</b> ${genderText}</p>
    <p style="margin-bottom: 10px;"><b>Оценка сервиса:</b> ${rating}</p>
    <p style="margin-bottom: 10px;"><b>Интересы пользователя:</b> ${interestsResult}</p>
    <p style="margin-bottom: 10px;"><b>Дополнительные комментарии:</b> ${comment ? comment : 'Нет комментариев'}</p>
  `;

  form.after(resultContainer);
});
