'use strict';

function progress(time) {
  if (typeof time !== 'number' || isNaN(time)) {
    console.warn('Передан некорректный формат времени/секунд!');
    return;
  }

  const progressBar = document.getElementById('progress-bar');
  const timerText = document.getElementById('timer-text');

  if (!progressBar || !timerText) {
    console.error('DOM элемент(ы) не найден(ы)!');
    return;
  }

  const duration = time < 2 ? 2 : time; // минимум 2 секунды.. или больше

  progressBar.style.transition = `transform ${duration}s linear`;

  // плавная отрисовка
  requestAnimationFrame(() => {
    progressBar.style.transform = 'scaleX(1)'; // движение к 100% ширины
  });

  let currentSeconds = 0;
  timerText.textContent = '0 с';

  const timerInterval = setInterval(() => {
    currentSeconds += 1;
    timerText.textContent = `${currentSeconds} с`;

    if (currentSeconds >= duration) {
      clearInterval(timerInterval);
    }
  }, 1000); // запуск/перезапуск каждую секунду (до условия)
}

progress(3); // вызов/передача секунд
