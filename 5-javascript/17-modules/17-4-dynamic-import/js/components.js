// получение элемента карточки
function getCardEl() {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');
  return cardEl;
}

// получение элемента заголовка
function getTiteEl(text) {
  const titleEl = document.createElement('h1');
  titleEl.textContent = text;
  titleEl.classList.add('main-title');
  return titleEl;
}

// получение элемента описания
function getDescEl(text) {
  const descEl = document.createElement('p');
  descEl.textContent = text;
  descEl.classList.add('desc');
  return descEl;
}

// получение элемента блока для центрирования
function getCenterWrapEl() {
  let buttonsWrapEl = document.createElement('div');
  buttonsWrapEl.classList.add('center-wrap');
  return buttonsWrapEl;
}

// получение элемента кнопки
function getButtonEl(text) {
  const buttonEl = document.createElement('button');
  buttonEl.textContent = text;
  buttonEl.classList.add('btn');
  return buttonEl;
}

// получение элемента формы
function getFormEl() {
  const formEl = document.createElement('form');
  formEl.classList.add('form');
  return formEl;
}

// получение элемента текстового поля
function getInputEl(type, name, placeholder) {
  const inputEl = document.createElement('input');
  inputEl.type = type;
  inputEl.name = name;
  inputEl.placeholder = placeholder;
  inputEl.classList.add('text-field');
  return inputEl;
}

// получение элемента ссылки
function getLinkEl(text, href) {
  const linkEl = document.createElement('a');
  linkEl.textContent = text;
  linkEl.href = href;
  linkEl.classList.add('link');
  return linkEl;
}

// групповой экспорт
export {
  getCardEl,
  getTiteEl,
  getDescEl,
  getCenterWrapEl,
  getButtonEl,
  getFormEl,
  getInputEl,
  getLinkEl,
};
