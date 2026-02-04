const STORAGE_KEY = 'warehouse_data';

function getItems() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function addItem(item) {
  if (!item || typeof item !== 'object') {
    console.error('Ошибка! Передан невалидный объект.');
    return;
  }

  const items = getItems();
  item.id = Date.now().toString();
  items.push(item);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function removeItem(id) {
  if (!id) {
    console.error('Ошибка! ID не передан.');
    return;
  }

  const items = getItems();
  const newItems = items.filter((item) => item.id !== id);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
}

export { getItems, addItem, removeItem };
