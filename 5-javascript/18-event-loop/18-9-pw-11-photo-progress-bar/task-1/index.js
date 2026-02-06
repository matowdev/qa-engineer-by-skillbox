'use strict';

const catImages = [
  './images/cat-1.jpg',
  './images/cat-2.jpg',
  './images/cat-3.jpg',
];
const dogImages = [
  './images/dog-1.jpg',
  './images/dog-2.jpg',
  './images/dog-3.jpg',
];

function getRandomDelay() {
  const min = 2000;
  const max = 5000;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fetchCats() {
  return new Promise((resolve) => {
    const delay = getRandomDelay();
    console.log(`Запрос котиков начат. Задержка: ${delay}мс`);

    setTimeout(() => {
      resolve(catImages);
    }, delay);
  });
}

function fetchDogs() {
  return new Promise((resolve) => {
    const delay = getRandomDelay();
    console.log(`Запрос собачек начат. Задержка: ${delay}мс`);

    setTimeout(() => {
      resolve(dogImages);
    }, delay);
  });
}

function renderImages(imagesArray) {
  if (!imagesArray || !Array.isArray(imagesArray) || imagesArray.length === 0) {
    console.warn('Передан пустой или некорректный массив!');
    return;
  }

  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    console.error('DOM элемент не найден!');
    return;
  }

  const rowElement = document.createElement('div');
  rowElement.className = 'gallery__row';

  imagesArray.forEach((imageUrl) => {
    const imgElement = document.createElement('img');
    imgElement.className = 'gallery__image';
    imgElement.src = imageUrl;
    imgElement.alt = 'Изображение питомца';

    rowElement.append(imgElement);
  });

  gallery.append(rowElement);
}

fetchCats().then((images) => {
  renderImages(images);
  console.log('Котики загружены и отрисованы!');
});

fetchDogs().then((images) => {
  renderImages(images);
  console.log('Собачки загружены и отрисованы!');
});
