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

const API_URL = 'https://sb-film.skillbox.cc/films';
const MY_EMAIL = 'siarhei.stuk@gmail.com';

let editingId = null;
let filmsData = [];

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
  const filmsArr = filmsList || filmsData;

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

    const viewedText = film.isWatched ? 'Да' : 'Нет';

    bodyRow.innerHTML = `
      <td class="table__cell">${film.title}</td>
      <td class="table__cell">${film.genre}</td>
      <td class="table__cell">${film.releaseYear}</td>
      <td class="table__cell">${viewedText}</td>
      <td class="table__cell">
        <button class="action-btn action-edit" data-action="edit" data-id="${film.id}">Редактировать</button>
        <button class="action-btn action-delete" data-action="delete" data-id="${film.id}">Удалить</button>
      </td>
   `;

    tableBody.append(bodyRow);
  });
}

async function fetchFilms() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { email: MY_EMAIL },
    });

    if (!response.ok) {
      throw new Error('Ошибка получения данных!');
    }

    filmsData = await response.json();
    filmsData.sort((a, b) => a.title.localeCompare(b.title)); // default сортировка по алфавиту (для хака/редактирования.. исключение добавления в конец списка)

    renderFilmsTable(filmsData); // отрисовка
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось загрузить список фильмов!');
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  let title = document.getElementById('title').value.trim();
  let genre = document.getElementById('genre').value.trim();
  const year = document.getElementById('year').value;
  const viewed = document.getElementById('viewed').checked;

  if (!title || !genre || !year) {
    alert('Пожалуйста, заполните все поля!');
    return;
  }

  const filmData = {
    title: title[0].toUpperCase() + title.slice(1),
    genre: genre[0].toUpperCase() + genre.slice(1),
    releaseYear: parseInt(year), // перевод/выборка числа
    isWatched: viewed,
  };

  // хак, сохранение возможности.. "как бы" редактирования (сразу удаление, потом добавление.. т.к. напрямую с PUT/PATCH не работает)
  try {
    if (editingId) {
      const deleteResponse = await fetch(`${API_URL}/${editingId}`, {
        method: 'DELETE',
        headers: { email: MY_EMAIL },
      });

      if (!deleteResponse.ok) {
        throw new Error(
          'Не удалось удалить старую версию фильма при редактировании!',
        );
      }
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        email: MY_EMAIL,
      },
      body: JSON.stringify(filmData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка от сервера:', errorData);
      throw new Error(errorData.message || 'Ошибка при добавлении фильма!');
    }

    await fetchFilms();
    resetFormState();
    form.reset();
    resetFilters();
  } catch (error) {
    console.error('Произошла ошибка:', error);
    alert('Что-то пошло не так: ' + error.message);
  }
}

function filterFilms() {
  const films = filmsData;

  const titleValue = filterTitle.value.trim().toLowerCase();
  const genreValue = filterGenre.value.trim().toLowerCase();
  const yearValue = filterYear.value.trim();
  const viewedValue = filterViewed.value; // может быть all, true или false (согласно атрибута value)

  const filtered = films.filter((film) => {
    const matchTitle = film.title.toLowerCase().includes(titleValue);
    const matchGenre = film.genre.toLowerCase().includes(genreValue);
    const matchYear =
      yearValue === '' || film.releaseYear.toString().startsWith(yearValue); // проверка с первой цифры (а не целиком)

    let matchViewed = true;

    if (viewedValue === 'true') {
      matchViewed = film.isWatched === true;
    } else if (viewedValue === 'false') {
      matchViewed = film.isWatched === false;
    } // если viewedValue === 'all', то matchViewed остается true

    return matchTitle && matchGenre && matchYear && matchViewed; // учитываются "все" проверки
  });

  renderFilmsTable(filtered); // перерисовка согласно фильтрации
}

function editFilm(id) {
  const filmsArr = filmsData;
  const filmToEdit = filmsArr.find((film) => film.id == id);

  if (!filmToEdit) return;

  document.getElementById('title').value = filmToEdit.title;
  document.getElementById('genre').value = filmToEdit.genre;
  document.getElementById('year').value = filmToEdit.releaseYear;
  document.getElementById('viewed').checked = filmToEdit.isWatched;

  editingId = id;
  submitBtn.textContent = 'Обновить';
  cancelBtn.classList.remove('hidden');
}

async function deleteFilm(id) {
  const isConfirmed = confirm('Вы уверены, что хотите удалить этот фильм?');

  if (!isConfirmed) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { email: MY_EMAIL },
    });

    if (!response.ok) {
      throw new Error('Ошибка удаления!');
    }

    await fetchFilms();

    // если удаляется фильм который редактируется.. (сброс состояний/формы)
    if (editingId === id) {
      resetFormState();
      form.reset();
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось удалить фильм!');
  }
}

async function deleteAllFilms() {
  if (filmsData.length === 0) {
    alert('Нечего удалять..');
    return;
  }

  const isConfirmed = confirm(
    'Вы уверены, что хотите удалить ВСЕ фильмы? Это действие нельзя отменить!',
  );

  if (!isConfirmed) return;

  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: { email: MY_EMAIL },
    });

    if (!response.ok) {
      throw new Error('Ошибка очистки списка!');
    }

    await fetchFilms();

    resetFormState();
    form.reset();
    resetFilters();
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось удалить фильмы!');
  }
}

fetchFilms(); // сразу получение данных с сервера/отрисовка

form.addEventListener('submit', handleFormSubmit);
filterTitle.addEventListener('input', filterFilms);
filterGenre.addEventListener('input', filterFilms);
filterYear.addEventListener('input', filterFilms);
filterViewed.addEventListener('change', filterFilms);
deleteAllBtn.addEventListener('click', deleteAllFilms);

cancelBtn.addEventListener('click', () => {
  resetFormState();
  form.reset();
});

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
