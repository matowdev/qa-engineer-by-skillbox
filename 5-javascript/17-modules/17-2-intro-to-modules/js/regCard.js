import navigate from './navigate.js';
import * as UI from './components.js'; // забираем ВСЕ компоненты сразу в объект UI

// создание карточки регистрации
export default function createRegCard(containerEl) {
  let cardEl = UI.getCardEl();
  const titleEl = UI.getTiteEl('Регистрация');
  const formEl = UI.getFormEl();

  let loginInputEl = UI.getInputEl('text', 'email', 'E-mail');
  let passwordInputEl = UI.getInputEl('password', 'password', 'Пароль');
  let nameInputEl = UI.getInputEl('text', 'name', 'Имя');
  let surnameInputEl = UI.getInputEl('text', 'surname', 'Фамилия');
  let regButtonEl = UI.getButtonEl('Зарегистрироваться');

  const centerWrapEl = UI.getCenterWrapEl();
  const homeLinkEl = UI.getLinkEl('На главную');
  const loginLinkEl = UI.getLinkEl('Вход');

  homeLinkEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigate();
  });

  loginLinkEl.addEventListener('click', function (event) {
    event.preventDefault();
    navigate('login');
  });

  formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Регистрация');
  });

  centerWrapEl.append(homeLinkEl, loginLinkEl);
  formEl.append(
    loginInputEl,
    passwordInputEl,
    nameInputEl,
    surnameInputEl,
    regButtonEl,
  );

  cardEl.append(titleEl, formEl, centerWrapEl);
  containerEl.append(cardEl);
}
