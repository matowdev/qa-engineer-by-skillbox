// import createLoginCard from './loginCard.js';
// import createRegCard from './regCard.js';
// import createHomeCard from './homeCard.js';

// отрисовка карточки
export default async function navigate(cardName) {
  const appEl = document.getElementById('app');
  appEl.innerHTML = '';

  switch (cardName) {
    case 'login':
      // переход на динамический/ленивый импорт (в начале добавление async)
      const loginCardModule = await import('./loginCard.js'); // загружаем модуль в переменную loginCardModule
      loginCardModule.default(appEl); // вызываем дефолтную функцию
      break;
    case 'reg':
      const regCardModule = await import('./regCard.js');
      regCardModule.default(appEl);
      break;
    default:
      const homeCardModule = await import('./homeCard.js');
      homeCardModule.default(appEl);
  }
}
