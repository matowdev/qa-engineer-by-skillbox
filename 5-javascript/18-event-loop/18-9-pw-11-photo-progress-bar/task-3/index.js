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

function renderImages(imagesArray, containerId) {
  if (!imagesArray || !Array.isArray(imagesArray) || imagesArray.length === 0) {
    console.warn('Передан пустой или некорректный массив!');
    return;
  }

  const gallery = document.getElementById(containerId);

  if (!gallery) {
    console.error('DOM элемент не найден!');
    return;
  }

  imagesArray.forEach((imageUrl) => {
    const imgElement = document.createElement('img');
    imgElement.className = 'gallery__image';
    imgElement.src = imageUrl;
    imgElement.alt = 'Изображение питомца';
    gallery.append(imgElement);
  });
}

const progress = (time, progressBarId, timerId) => {
  if (typeof time !== 'number' || isNaN(time)) {
    console.warn('Передан некорректный формат времени/секунд!');
    return Promise.resolve(); // что бы цепочка .then не сломалась
  }

  const progressBar = document.getElementById(progressBarId);
  const timerText = document.getElementById(timerId);

  if (!progressBar || !timerText) {
    console.error('DOM элемент(ы) не найден(ы)!');
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const duration = time < 2 ? 2 : time;
    const container = progressBar.closest('.gallery__progress-wrap');

    if (
      container &&
      container.classList.contains('gallery__progress-wrap_hidden')
    ) {
      container.classList.remove('gallery__progress-wrap_hidden');
    }

    progressBar.style.transition = `transform ${duration}s linear`;

    // плавная отрисовка
    requestAnimationFrame(() => {
      progressBar.style.transform = 'scaleX(1)'; // движение к 100% ширины
    });

    let currentSeconds = 0;
    timerText.textContent = '0 с';

    const timerInterval = setInterval(() => {
      currentSeconds += 1;

      if (currentSeconds <= Math.round(duration)) {
        timerText.textContent = `${currentSeconds} с`;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(timerInterval);
      timerText.textContent = `${Math.round(duration)} с`;
      resolve();
    }, duration * 1000);
  });
};

// возможно перевести в async..
function mockRequest(images, progressBarId, timerId, galleryId) {
  const delayMs = getRandomDelay();
  const delaySec = delayMs / 1000; // перевод в секунды

  console.log(`Начинаем загрузку для ${galleryId}. Время: ${delaySec}с`);

  return progress(delaySec, progressBarId, timerId).then(() => {
    renderImages(images, galleryId);
    console.log(`Загрузка для ${galleryId} завершена!`);
  });
}

// запуск цепочки, сразу котики.. потом/then собачки
mockRequest(catImages, 'progress-bar-cats', 'timer-cats', 'gallery-cats').then(
  () => {
    return mockRequest(
      dogImages,
      'progress-bar-dogs',
      'timer-dogs',
      'gallery-dogs',
    );
  },
);
