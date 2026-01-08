'use strict';

/*
Создайте веб-приложение «Рост учеников» со следующим функционалом:
- На странице из массива должен выводиться список чисел, которые определяют рост каждого ученика.
- Предусмотрите возможность добавления нового числа (роста ученика) в массив. Для этого создайте кнопку «Добавить рост». Ввод числа осуществляется в окне prompt(), которое отображается при клике на кнопку добавления. Перед добавлением роста в массив обязательно сделайте проверку ввода. Если пользователь ничего не ввёл, покажите alert() с сообщением: «Рост не введён!»
- Для фильтрации чисел в массиве по минимальному значению создайте кнопку «Фильтровать», при клике на которую отображается окно ввода prompt() c вводом числа. Список роста должен быть перерисован в DOM-дереве. Если пользователь ничего не ввёл, покажите весь список без учёта фильтрации.
- Выполните минимальную CSS-стилизацию DOM-элементов.
*/

const heights = [164, 157, 160, 143, 170];

const page = document.getElementById('page');

const header = document.createElement('h1');
header.classList.add('header');
header.textContent = 'Рост учеников';

const btnsWrap = document.createElement('div');
btnsWrap.classList.add('btns-wrap');

const addBtn = document.createElement('button');
addBtn.classList.add('btn', 'add-btn');
addBtn.textContent = 'Добавить рост';

const filterBtn = document.createElement('button');
filterBtn.classList.add('btn', 'filter-btn');
filterBtn.textContent = 'Фильтровать';

const heightsList = document.createElement('ul');
heightsList.classList.add('heights-list');

btnsWrap.append(addBtn, filterBtn);
page.append(header, btnsWrap, heightsList);

// ** отрисовка списка/роста учеников (согласно default массива)
function renderHeightsList(arr) {
  if (!arr || !Array.isArray(arr)) {
    return;
  }

  heightsList.innerHTML = ''; // сразу очистка списка
  const documentFragment = document.createDocumentFragment();

  arr.forEach((height, index) => {
    const heightsItem = document.createElement('li');
    heightsItem.classList.add('heights-item');
    heightsItem.textContent = `${index + 1}) ${height}`;

    documentFragment.append(heightsItem);
  });

  heightsList.append(documentFragment);
}

renderHeightsList(heights); // !! запуск отрисовки

// ** фильтрация списка/роста учеников
function filterHeights(heightsArr, filterHeight) {
  const filteredArr = heightsArr.filter((height) => height >= filterHeight); // фильтрация (через return/доп. переменную, т.к. данный метод не мутирует исходный массив)
  return filteredArr;
}

// ** обработка/проверка вводимого значения/роста
function getValidHeight(value) {
  const height = parseInt(value); // выборка числа из строки (или NaN)

  if (Number.isNaN(height) || height.toString().length > 3) {
    return null; // возврат null (как ошибки)
  }

  return height;
}

// прослушка "Добавить.." кнопки
addBtn.addEventListener('click', () => {
  const value = prompt('Введи рост ученика');

  if (value === null) {
    return;
  }

  if (value.trim() === '') {
    alert('Рост не введён!');
    return;
  }

  const height = getValidHeight(value); // проверка значения

  if (height === null) {
    alert('Введён не корректный рост!');
    return;
  }

  heights.push(height); // добавление в default массив
  renderHeightsList(heights); // последующая отрисовки/перерисовка
});

// прослушка "Фильтровать" кнопки
filterBtn.addEventListener('click', () => {
  const value = prompt('Введите минимальный рост');

  if (value === null) {
    return;
  }

  if (value.trim() === '') {
    alert('Рост не введён!');
    renderHeightsList(heights); // перерисовка (сброс предыдущей фильтрации)
    return;
  }

  const height = getValidHeight(value); // проверка значения

  if (height === null) {
    alert('Введён не корректный рост!');
    renderHeightsList(heights); // перерисовка (сброс предыдущей фильтрации)
    return;
  }

  const filtered = filterHeights(heights, height); // фильтрация списка/роста учеников
  renderHeightsList(filtered); // последующая отрисовки/перерисовка (уже отфильтрованного массива)
});
