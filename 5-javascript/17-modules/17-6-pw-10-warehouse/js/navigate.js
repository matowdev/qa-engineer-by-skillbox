import { createLoader } from './components.js';

export default async function navigate(pageName) {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

  const loader = createLoader(); // создание лоадера
  appContainer.append(loader);

  try {
    switch (pageName) {
      case 'add':
        const addItemModule = await import('./add-item.js'); // динамическая загрузка модуля
        addItemModule.default(appContainer);
        break;
      case 'warehouse':
      default:
        const warehouseModule = await import('./warehouse.js'); // динамическая загрузка модуля
        warehouseModule.default(appContainer);
        break;
    }
  } catch (error) {
    console.error('Ошибка загрузки страницы:', error); // если произошла ошибка сети/скрипта
    appContainer.innerHTML =
      '<p class="app__err-message">Не удалось загрузить страницу! Упс..</p>';
  } finally {
    loader.remove();
  }
}
