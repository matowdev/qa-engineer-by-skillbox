import navigate from './navigate.js';
import * as UI from './components.js';
import { addItem } from './storage.js';

export default function createAddPage(container) {
  if (!container) return;

  const titleEl = UI.createTitle('Добавить запись');
  titleEl.classList.add('form-title');

  const formEl = UI.createForm();

  // паттерны для валидации
  const textPattern = '^[a-zA-Zа-яА-ЯёЁ0-9\\s\\-]+$'; // рус + eng
  const shelfPattern = '^[a-zA-Z0-9\\s\\-]+$'; // только Eng

  // создание обёрток/инпутов
  const nameInput = UI.createInput('name', 'Название', {
    pattern: textPattern,
    maxLength: 55,
  });
  const nameGroup = UI.createFormGroup(nameInput);

  const shelfInput = UI.createInput('shelf', 'Полка (eng)', {
    pattern: shelfPattern,
  });
  const shelfGroup = UI.createFormGroup(shelfInput);

  const weightInput = UI.createInput('weight', 'Вес', {
    type: 'number',
    step: '0.1',
    min: 0,
    max: 999,
  });
  const weightGroup = UI.createFormGroup(weightInput);

  // создание даты
  const dateGroup = document.createElement('div');
  dateGroup.classList.add('form__group');

  const dateInput = UI.createInput('date', 'дд.мм.гггг', {
    type: 'date',
  });

  dateGroup.append(dateInput);

  // создание обёртки/кнопок
  const btnWrapper = UI.createBtnWrapper();

  const submitBtn = UI.createPrimaryBtn('Добавить запись', null, 'submit');
  submitBtn.classList.add('form__submit-btn');

  const cancelBtn = UI.createDangerBtn('Отмена', () => {
    navigate('warehouse');
  });
  cancelBtn.classList.add('form__cancel-btn');

  btnWrapper.append(submitBtn, cancelBtn);

  // добавление элементов в форму
  formEl.append(nameGroup, shelfGroup, weightGroup, dateGroup, btnWrapper);

  // отправка формы
  formEl.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameVal = nameInput.value.trim();
    const shelfVal = shelfInput.value.trim();

    if (!nameVal || !shelfVal || !weightInput.value || !dateInput.value) {
      alert('Пожалуйста, заполните обязательные поля!');
      return;
    }

    const newItem = {
      name: nameVal.charAt(0).toUpperCase() + nameVal.slice(1),
      shelf: shelfVal.charAt(0).toUpperCase() + shelfVal.slice(1),
      weight: weightInput.value,
      date: dateInput.value,
    };

    addItem(newItem);
    navigate('warehouse');
  });

  container.append(titleEl, formEl); // наполнение
}
