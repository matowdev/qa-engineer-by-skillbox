import createLoginCard from './loginCard.js';
import createRegCard from './regCard.js';
import createHomeCard from './homeCard.js';

// отрисовка карточки
export default function navigate(cardName) {
  const appEl = document.getElementById('app');
  appEl.innerHTML = '';

  switch (cardName) {
    case 'login':
      createLoginCard(appEl);
      break;
    case 'reg':
      createRegCard(appEl);
      break;
    default:
      createHomeCard(appEl);
  }
}
