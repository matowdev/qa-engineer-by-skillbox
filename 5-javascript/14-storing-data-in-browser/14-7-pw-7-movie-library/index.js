'use strict';

// Доработайте функциональность приложения, с которым вы работали в видео "Практика работы с JSON и LocalStorage" (подробнее, см. страницу практической работы).

const form = document.getElementById('form');
const tableBody = document.getElementById('table-body');

function renderFilmsTable() {
  const filmsArr = JSON.parse(localStorage.getItem('films')) || [];

  tableBody.innerHTML = '';

  if (filmsArr.length === 0) {
    tableBody.innerHTML = `
      <tr class="table__row body-row">
        <td class="table__cell" colspan="4" style="text-align: center; color: gray;">Добавьте фильм..</td>
      </tr>
    `;
    return;
  }

  filmsArr.forEach((film) => {
    const bodyRow = document.createElement('tr');
    bodyRow.classList.add('table__row', 'body-row');

    const viewedText = film.viewed ? 'Да' : 'Нет';

    bodyRow.innerHTML = `
    <td class="table__cell">${film.title}</td>
    <td class="table__cell">${film.genre}</td>
    <td class="table__cell">${film.year}</td>
    <td class="table__cell">${viewedText}</td>
  `;

    tableBody.append(bodyRow);
  });
}

function addToStorage(film) {
  if (!film || typeof film !== 'object') {
    return;
  }

  const filmsArr = JSON.parse(localStorage.getItem('films')) || [];
  filmsArr.push(film);

  localStorage.setItem('films', JSON.stringify(filmsArr));
  renderFilmsTable(); // перерисовка таблицы
}

function submitMovieForm(event) {
  event.preventDefault();

  let title = document.getElementById('title').value.trim();
  let genre = document.getElementById('genre').value.trim();
  const year = document.getElementById('year').value;
  const viewed = document.getElementById('viewed').checked;

  if (title) title = title[0].toUpperCase() + title.slice(1);
  if (genre) genre = genre[0].toUpperCase() + genre.slice(1);

  const film = {
    title,
    genre,
    year,
    viewed,
  };

  addToStorage(film);
  form.reset(); // очистка формы после добавления
}

renderFilmsTable(); // сразу отрисовка таблицы
form.addEventListener('submit', submitMovieForm);
