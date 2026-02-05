// создание заголовка
function createTitle(text) {
  const title = document.createElement('h1');
  title.classList.add('app__title');
  title.textContent = text;

  return title;
}

// создание "обёртки" для кнопок формы
function createBtnWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('form__btn-wrap');

  return wrapper;
}

// создание "добавить" кнопки
function createPrimaryBtn(text, onClick, type = 'button') {
  const btn = document.createElement('button');
  btn.classList.add('app__btn', 'btn', 'btn_primary');
  btn.type = type; // "submit" или "button"
  btn.textContent = text;

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
}

// создание "удалить/отмена" кнопки
function createDangerBtn(text, onClick) {
  const btn = document.createElement('button');
  btn.classList.add('app__btn', 'btn', 'btn_danger');
  btn.type = 'button';
  btn.textContent = text;

  if (onClick) {
    btn.addEventListener('click', onClick);
  }

  return btn;
}

// создание формы
function createForm() {
  const form = document.createElement('form');
  form.classList.add('form', 'app__form');
  return form;
}

// создание "обёртки" для инпута
function createFormGroup(inputElement) {
  const group = document.createElement('div');
  group.classList.add('form__group');

  if (inputElement) {
    group.append(inputElement);
  }

  return group;
}

// создание инпута (универсально)
function createInput(name, placeholder, options = {}) {
  const input = document.createElement('input');
  input.classList.add('form__input');
  input.type = options.type || 'text'; // определение типа
  input.name = name;
  input.autocomplete = 'off';
  input.placeholder = placeholder;
  input.required = true;

  // добавление атрибутов
  if (options.pattern) input.pattern = options.pattern;
  if (options.maxLength) input.maxLength = options.maxLength;
  if (options.step) input.step = options.step;
  if (options.max) input.max = options.max;

  if (input.type === 'text') {
    input.classList.add('input_up');

    input.addEventListener('input', (event) => {
      const val = event.target.value;

      if (!val) return;

      event.target.value = val.charAt(0).toUpperCase() + val.slice(1); // в таблице с заглавной буквы
    });
  }

  return input;
}

// создание "обёртки" для таблицы
function createTableWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('app__table-wrap');

  return wrapper;
}

// создание структуры таблицы
function createTable() {
  const table = document.createElement('table');
  table.classList.add('table', 'app__table');

  const thead = document.createElement('thead');
  thead.classList.add('table__head');

  const tbody = document.createElement('tbody');
  tbody.classList.add('table__body');

  table.append(thead, tbody);

  return { table, thead, tbody };
}

// создание "шапки" таблицы
function createTableHeader(theadEl, columns, onSort) {
  const tr = document.createElement('tr');
  tr.classList.add('table__head-row');

  columns.forEach((col) => {
    const th = document.createElement('th');
    th.classList.add('table__header');
    th.textContent = col.title;

    if (col.key) {
      th.dataset.key = col.key;
      th.addEventListener('click', () => {
        onSort(col.key);
      });
    } else {
      th.style.pointerEvents = 'none'; // колонка с кнопками "удалить" (без сортировки и кликов)
    }

    tr.append(th);
  });

  theadEl.innerHTML = '';
  theadEl.append(tr);
}

// создание "строк" таблицы
function createTableRow(item, columns, onDelete) {
  const tr = document.createElement('tr');
  tr.classList.add('table__row');

  columns.forEach((col) => {
    const td = document.createElement('td');
    td.classList.add('table__cell');

    if (col.key) {
      td.textContent = item[col.key];
    } else if (col.action) {
      const delBtn = createDangerBtn('Удалить', () => {
        onDelete(item.id); // организация удаления записи
      });
      delBtn.classList.add('table__delete-btn');
      td.append(delBtn);
    }

    tr.append(td);
  });

  return tr;
}

// создание лоадера
function createLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');

  loader.innerHTML = '<div></div><div></div><div></div><div></div>';

  return loader;
}

export {
  createTitle,
  createBtnWrapper,
  createPrimaryBtn,
  createDangerBtn,
  createForm,
  createFormGroup,
  createInput,
  createTableWrapper,
  createTable,
  createTableHeader,
  createTableRow,
  createLoader,
};
