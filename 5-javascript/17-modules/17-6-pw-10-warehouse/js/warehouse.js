import navigate from './navigate.js';
import * as UI from './components.js';
import { getItems, removeItem } from './storage.js';

const COLUMNS = [
  { key: 'name', title: 'Название' },
  { key: 'shelf', title: 'Полка' },
  { key: 'weight', title: 'Вес' },
  { key: 'date', title: 'Время хранения' },
  { action: true, title: '' },
];

let currentData = [];
let sortDirectionUpDown = true; // флаг направления сортировки

export default function createWarehousePage(container) {
  if (!container) return;

  currentData = getItems();

  const appHeaderWrap = document.createElement('div');
  appHeaderWrap.classList.add('app__header-wrap');

  const titleEl = UI.createTitle('Склад');
  const addBtn = UI.createPrimaryBtn('Добавить запись', () => {
    navigate('add');
  });

  addBtn.classList.add('header-btn');

  appHeaderWrap.append(titleEl, addBtn);

  // создание таблицы
  const tableWrapperEl = UI.createTableWrapper();
  const tableElements = UI.createTable();

  const table = tableElements.table;
  const thead = tableElements.thead;
  const tbody = tableElements.tbody;

  tableWrapperEl.append(table);

  function renderRows(data) {
    tbody.innerHTML = '';

    if (data.length === 0) {
      const allThs = thead.querySelectorAll('th');
      allThs.forEach((th) => {
        th.classList.remove('sort-asc', 'sort-desc');
      }); // очистка от "стрелочек" сортировки

      const tr = document.createElement('tr');
      const td = document.createElement('td');

      td.classList.add('table__empty-cell');
      td.textContent = 'Склад пуст..';
      td.colSpan = COLUMNS.length;

      tr.append(td);
      tbody.append(tr);

      return;
    }

    data.forEach((item) => {
      const row = UI.createTableRow(item, COLUMNS, (id) => {
        if (confirm('Вы уверены, что хотите удалить эту запись?')) {
          removeItem(id);
          currentData = getItems();
          renderRows(currentData);
        }
      });
      tbody.append(row);
    });
  }

  // сортировка (по возрастанию/убыванию.. туда-сюда)
  function handleSort(key) {
    if (currentData.length === 0) return;

    sortDirectionUpDown = !sortDirectionUpDown; // изменение направления

    const allThs = thead.querySelectorAll('th');
    allThs.forEach((th) => {
      th.classList.remove('sort-asc', 'sort-desc');
    });

    const activeTh = thead.querySelector(`th[data-key="${key}"]`); // определение активного заголовка

    if (activeTh) {
      if (sortDirectionUpDown) {
        activeTh.classList.add('sort-asc');
      } else {
        activeTh.classList.add('sort-desc');
      }
    }

    currentData.sort((a, b) => {
      if (key === 'weight') {
        const numA = parseFloat(a[key]);
        const numB = parseFloat(b[key]);
        return sortDirectionUpDown ? numA - numB : numB - numA;
      }

      return sortDirectionUpDown
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });

    renderRows(currentData); // перерисовка
  }

  // создание/отрисовка
  UI.createTableHeader(thead, COLUMNS, handleSort);
  renderRows(currentData);

  container.append(appHeaderWrap, tableWrapperEl);
}
