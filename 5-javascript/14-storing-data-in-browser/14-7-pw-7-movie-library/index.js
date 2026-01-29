'use strict';

// Доработайте функциональность приложения, с которым вы работали в видео "Практика работы с JSON и LocalStorage" (подробнее, см. страницу практической работы).

const form = document.getElementById('form');
const tableBody = document.getElementById('table-body');

const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const sortBtn = document.getElementById('sort-btn');
const sortSelect = document.getElementById('sort-select');

let editingId = null;

function getFilmsFromStorage() {
  return JSON.parse(localStorage.getItem('films')) || [];
}

function saveFilmsToStorage(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  localStorage.setItem('films', JSON.stringify(arr));
}

function generateUniqueId(length = 8) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function resetFormState() {
  editingId = null;
  submitBtn.textContent = 'Добавить';
  cancelBtn.classList.add('hidden');
}

function renderFilmsTable() {
  const filmsArr = getFilmsFromStorage();

  tableBody.innerHTML = '';

  if (filmsArr.length === 0) {
    tableBody.innerHTML = `
      <tr class="table__row body-row">
        <td class="table__cell" colspan="5" style="text-align: center; color: gray;">Добавьте фильм..</td>
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
    <td class="table__cell">
      <button class="action-btn action-edit" data-action="edit" data-id="${film.id}">Редактировать</button>
      <button class="action-btn action-delete" data-action="delete" data-id="${film.id}">Удалить</button>
    </td>
  `;

    tableBody.append(bodyRow);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  let title = document.getElementById('title').value.trim();
  let genre = document.getElementById('genre').value.trim();
  const year = document.getElementById('year').value;
  const viewed = document.getElementById('viewed').checked;

  if (!title || !genre || !year) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  title = title[0].toUpperCase() + title.slice(1);
  genre = genre[0].toUpperCase() + genre.slice(1);

  const filmsArr = getFilmsFromStorage();

  if (editingId) {
    const filmIndex = filmsArr.findIndex((film) => film.id === editingId);

    if (filmIndex !== -1) {
      filmsArr[filmIndex] = {
        id: editingId,
        title,
        genre,
        year,
        viewed,
      };
    }

    resetFormState();
  } else {
    const newFilm = {
      id: generateUniqueId(), // генерация уникального ID
      title,
      genre,
      year,
      viewed,
    };

    filmsArr.push(newFilm);
  }

  saveFilmsToStorage(filmsArr);
  renderFilmsTable();
  form.reset();
}

function sortFilms() {
  const sortBy = sortSelect.value;
  const filmsArr = getFilmsFromStorage();

  filmsArr.sort((a, b) => {
    if (sortBy === 'year') {
      return a.year - b.year;
    }
    if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) return -1;
    if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) return 1;

    return 0;
  });

  saveFilmsToStorage(filmsArr); // сохранение отсортированного порядка
  renderFilmsTable(); // перерисовка согласно сортировки
}

function editFilm(id) {
  const filmsArr = getFilmsFromStorage();
  const filmToEdit = filmsArr.find((film) => film.id === id);

  if (!filmToEdit) return;

  document.getElementById('title').value = filmToEdit.title;
  document.getElementById('genre').value = filmToEdit.genre;
  document.getElementById('year').value = filmToEdit.year;
  document.getElementById('viewed').checked = filmToEdit.viewed;

  editingId = id;
  submitBtn.textContent = 'Обновить';
  cancelBtn.classList.remove('hidden');
}

cancelBtn.addEventListener('click', () => {
  resetFormState();
  form.reset();
});

function deleteFilm(id) {
  const isConfirmed = confirm('Вы уверены, что хотите удалить этот фильм?');

  if (!isConfirmed) return;

  let filmsArr = getFilmsFromStorage();
  filmsArr = filmsArr.filter((film) => film.id !== id);

  saveFilmsToStorage(filmsArr);
  renderFilmsTable();

  // если удаляется фильм который редактируется.. (сброс состояний/формы)
  if (editingId === id) {
    resetFormState();
    form.reset();
  }
}

renderFilmsTable(); // сразу отрисовка таблицы

form.addEventListener('submit', handleFormSubmit);
sortBtn.addEventListener('click', sortFilms);

tableBody.addEventListener('click', (event) => {
  if (event.target.classList.contains('action-edit')) {
    const id = event.target.dataset.id;
    editFilm(id);
  }

  if (event.target.classList.contains('action-delete')) {
    const id = event.target.dataset.id;
    deleteFilm(id);
  }
});
