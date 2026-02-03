import navigate from './navigate.js';
import {
  getCardEl,
  getTiteEl,
  getFormEl,
  getInputEl,
  getButtonEl,
  getCenterWrapEl,
  getLinkEl,
} from './components.js'; // берем только конкретные инструменты (для примера)

// создание карточки входа
export default function createLoginCard(containerEl) {
  let cardEl = getCardEl();
  const titleEl = getTiteEl('Вход в аккаунт');
  const formEl = getFormEl();

  let loginInputEl = getInputEl('text', 'email', 'E-mail');
  let passwordInputEl = getInputEl('password', 'password', 'Пароль');
  let loginButtonEl = getButtonEl('Войти');

  const centerWrapEl = getCenterWrapEl();
  const homeLinkEl = getLinkEl('На главную');
  const regLinkEl = getLinkEl('Регистрация');

  homeLinkEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigate();
  });

  regLinkEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigate('reg');
  });

  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Вход в аккаунт');
  });

  centerWrapEl.append(homeLinkEl, regLinkEl);
  formEl.append(loginInputEl, passwordInputEl, loginButtonEl);
  cardEl.append(titleEl, formEl, centerWrapEl);
  containerEl.append(cardEl);
}
