'use strict';

/*
Создайте веб-приложение «Домашняя библиотека» со следующим функционалом:
- На странице должен выводиться список книг библиотеки из массива.
- Предусмотрите возможность добавления новой книги в массив. Для этого создайте кнопку «Добавить книгу». Ввод названия книги осуществляется в окне prompt(), которое отображается при клике на кнопку добавления. Перед добавлением книги в массив обязательно сделайте проверку ввода. Если пользователь ничего не ввёл, покажите alert() с сообщением: «Название книги не введено!»
- Для поиска книги в списке создайте кнопку «Поиск», при клике на которую отображается окно ввода prompt() c вводом названия для поиска. Найденная книга в списке должна быть выделена цветом. Если книга не найдена, покажите alert() с сообщением: «Книга не найдена!»
- Выполните минимальную CSS-стилизацию DOM-элементов.
*/

const books = [
  'Мистер и Маргарита',
  'Гарри Поттер',
  'Над пропастью во ржи',
  'Властелин колец',
  'Дюна',
  'Отцы и дети',
];

const page = document.getElementById('page');

const header = document.createElement('h1');
header.classList.add('header');
header.textContent = 'Домашняя библиотека';

const btnsWrap = document.createElement('div');
btnsWrap.classList.add('btns-wrap');

const addBtn = document.createElement('button');
addBtn.classList.add('btn', 'add-btn');
addBtn.textContent = 'Добавить книгу';

const findBtn = document.createElement('button');
findBtn.classList.add('btn', 'find-btn');
findBtn.textContent = 'Найти';

const booksList = document.createElement('ul');
booksList.classList.add('books-list');

btnsWrap.append(addBtn, findBtn);
page.append(header, btnsWrap, booksList);

// ** отрисовка списка книг (согласно default массива)
function renderLibraryList(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  booksList.innerHTML = ''; // сразу очистка списка
  const documentFragment = document.createDocumentFragment();

  arr.forEach((book, index) => {
    const booksItem = document.createElement('li');
    booksItem.classList.add('books-item');
    booksItem.textContent = `${index + 1}) ${book}`;

    documentFragment.append(booksItem);
  });

  booksList.append(documentFragment);
}

renderLibraryList(books); // !! запуск отрисовки

// ** очистка выделения книги
function clearHighlight() {
  const allItems = document.querySelectorAll('.books-item');
  allItems.forEach((item) => item.classList.remove('highlighted'));
}

// ** поиск книги
function findBooks(booksArr, bookName) {
  clearHighlight(); // очистка предыдущего выделения

  // определение индекса (совпадения)
  const index = booksArr.findIndex((book) =>
    book.toLowerCase().includes(bookName)
  );

  if (index !== -1) {
    const allItems = document.querySelectorAll('.books-item');
    allItems[index].classList.add('highlighted'); // выделение книги/элемента через индекс
  } else {
    alert('Книга не найдена!');
  }
}

// прослушка "Добавить.." кнопки
addBtn.addEventListener('click', () => {
  const value = prompt('Введи название книги');

  if (value === null) {
    return;
  }

  if (value.trim() === '') {
    alert('Название книги не введено!');
    return;
  }

  let bookName = value.trim().toLowerCase();
  bookName = bookName[0].toUpperCase() + bookName.slice(1);

  books.push(bookName); // добавление в default массив
  renderLibraryList(books); // последующая отрисовки/перерисовка
});

// прослушка "Найти" кнопки
findBtn.addEventListener('click', () => {
  const value = prompt('Введи название книги для поиска');

  if (value === null) {
    return;
  }

  if (value.trim() === '') {
    alert('Название книги не введено!');
    clearHighlight(); // очистка предыдущего выделения
    return;
  }

  const searchName = value.trim().toLowerCase();

  findBooks(books, searchName); // запуск поиска книги
});
