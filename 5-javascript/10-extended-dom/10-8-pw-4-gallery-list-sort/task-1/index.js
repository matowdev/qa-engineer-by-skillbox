'use strict';

/*
Создайте мини-приложение «Галерея кошек» со следующим функционалом:
- Разместите на вашей странице несколько миниатюр изображений в ряд. Можете взять любые изображения по вашему выбору или использовать из примера. При этом каждая миниатюра должна иметь уникальный идентификатор или класс для идентификации.
- Рядом с миниатюрами создайте большой блок, который будет использоваться для отображения изображения в полном размере. По умолчанию этот блок пуст.
- Добавьте событие click для каждой миниатюры.
- При клике на миниатюру используйте DOM-методы для получения URL этой миниатюры.
- После получения URL миниатюры измените содержимое блока для полноразмерного изображения так, чтобы отображалось большое изображение.
- Если у вас нет отдельных изображений большого размера, то просто используйте URL миниатюры.
- Выполните минимальную CSS-стилизацию DOM-элементов.
*/

const galleryList = document.querySelector('.gallery-list');
const galleryPreview = document.querySelector('.gallery-preview');

function addImgToPreview(event) {
  const target = event.target;

  if (target.tagName === 'IMG') {
    const targetSrc = target.getAttribute('src');
    galleryPreview.style.background = `url('${targetSrc}') no-repeat center / cover`;
  }
}

galleryList.addEventListener('click', addImgToPreview);
