'use strict';

// Доработайте функциональность приложения, с которым вы работали в видео "Практика работы с JSON и LocalStorage" (подробнее, см. страницу практической работы).

const form = document.getElementById('form');
const tableBody = document.getElementById('table-body');

const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const filterTitle = document.getElementById('filter-title');
const filterGenre = document.getElementById('filter-genre');
const filterYear = document.getElementById('filter-year');
const filterViewed = document.getElementById('filter-viewed');
const deleteAllBtn = document.getElementById('delete-all-btn');

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

function resetFilters() {
  filterTitle.value = '';
  filterGenre.value = '';
  filterYear.value = '';
  filterViewed.value = 'all';
}

function renderFilmsTable(filmsList) {
  const filmsArr = filmsList || getFilmsFromStorage();

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
  resetFilters(); // очистка фильтрационных полей (возврат к default состояниям)
}

function filterFilms() {
  const films = getFilmsFromStorage();

  const titleValue = filterTitle.value.trim().toLowerCase();
  const genreValue = filterGenre.value.trim().toLowerCase();
  const yearValue = filterYear.value.trim();
  const viewedValue = filterViewed.value; // может быть all, true или false (согласно атрибута value)

  const filtered = films.filter((film) => {
    const matchTitle = film.title.toLowerCase().includes(titleValue);
    const matchGenre = film.genre.toLowerCase().includes(genreValue);
    const matchYear =
      yearValue === '' || film.year.toString().startsWith(yearValue); // проверка с первой цифры (а не целиком)

    let matchViewed = true;

    if (viewedValue === 'true') {
      matchViewed = film.viewed === true;
    } else if (viewedValue === 'false') {
      matchViewed = film.viewed === false;
    } // если viewedValue === 'all', то matchViewed остается true

    return matchTitle && matchGenre && matchYear && matchViewed; // учитываются "все" проверки
  });

  renderFilmsTable(filtered); // перерисовка согласно фильтрации
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

function deleteAllFilms() {
  const films = getFilmsFromStorage();

  if (films.length === 0) {
    alert('Нечего удалять..');
    return;
  }

  const isConfirmed = confirm(
    'Вы уверены, что хотите удалить ВСЕ фильмы? Это действие нельзя отменить!',
  );

  if (!isConfirmed) return;

  saveFilmsToStorage([]);
  renderFilmsTable();
  resetFormState();
  form.reset();
  resetFilters();
}

renderFilmsTable(); // сразу отрисовка таблицы

form.addEventListener('submit', handleFormSubmit);
filterTitle.addEventListener('input', filterFilms);
filterGenre.addEventListener('input', filterFilms);
filterYear.addEventListener('input', filterFilms);
filterViewed.addEventListener('change', filterFilms);
deleteAllBtn.addEventListener('click', deleteAllFilms);

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
