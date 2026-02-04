export default async function navigate(pageName) {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = '';

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
}
