import navigate from './navigate.js';
import * as UI from './components.js'; // Забираем "ВСЕ" компоненты сразу в объект UI

// создание главной карточки
export default function createHomeCard(containerEl) {
  let cardEl = UI.getCardEl(); // обращаемся через точку UI.getCardEl()

  const titleEl = UI.getTiteEl('Добро пожаловать на сайт');
  const descEl = UI.getDescEl(
    'Войдите в личный кабинет. Если Вы, еще не зарегистрированы, пройдите регистрацию!',
  );
  const centerWrapEl = UI.getCenterWrapEl();
  const loginButtonEl = UI.getButtonEl('Войти');
  const regButtonEl = UI.getButtonEl('Регистрация');

  loginButtonEl.addEventListener('click', function () {
    navigate('login');
  });

  regButtonEl.addEventListener('click', function () {
    navigate('reg');
  });

  centerWrapEl.append(loginButtonEl, regButtonEl);
  cardEl.append(titleEl, descEl, centerWrapEl);
  containerEl.append(cardEl);
}
