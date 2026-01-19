'use strict';

// Создайте мини-приложение «Галерея кошек».

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
