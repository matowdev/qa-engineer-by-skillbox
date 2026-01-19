'use strict';

// Создайте мини-приложение «Динамический список».

const page = document.querySelector('.page');

const list = document.createElement('ul');
list.classList.add('list');

const btnsWrap = document.createElement('div');
btnsWrap.classList.add('btns-wrap');

const addBtn = document.createElement('button');
addBtn.classList.add('btn', 'add-btn');
addBtn.textContent = 'Добавить элемент';

const deleteBtn = document.createElement('button');
deleteBtn.classList.add('btn', 'delete-btn');
deleteBtn.textContent = 'Удалить элемент';

btnsWrap.append(addBtn, deleteBtn);
page.append(list, btnsWrap);

function addItem() {
  const itemEl = document.createElement('li');
  itemEl.classList.add('item');
  itemEl.textContent = 'Новый элемент списка';

  list.append(itemEl);
}

function deleteItem() {
  const lastItemEl = list.lastElementChild;

  if (lastItemEl) {
    lastItemEl.remove();
  }
}

addBtn.addEventListener('click', addItem);
deleteBtn.addEventListener('click', deleteItem);
