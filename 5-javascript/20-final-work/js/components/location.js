export const initLocation = () => {
  const locationBtn = document.querySelector('.location__city');
  const locationList = document.querySelector('.location__sublist');
  const cityName = document.querySelector('.location__city-name');

  if (!locationBtn || !locationList || !cityName) return;

  locationBtn.addEventListener('click', () => {
    locationBtn.classList.toggle('location__city--active');
  });

  locationList.addEventListener('click', (e) => {
    const sublink = e.target.closest('.location__sublink');
    if (sublink) {
      cityName.textContent = sublink.textContent;
      locationBtn.classList.remove('location__city--active');
    }
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.location')) {
      locationBtn.classList.remove('location__city--active');
    }
  });
};
