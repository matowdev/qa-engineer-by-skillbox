export const initBurger = () => {
  const burgerBtn = document.querySelector('.header__catalog-btn');
  const mainMenu = document.querySelector('.main-menu');
  const closeBtn = document.querySelector('.main-menu__close');

  if (!burgerBtn || !mainMenu || !closeBtn) return;

  burgerBtn.addEventListener('click', () => {
    mainMenu.classList.add('main-menu--active');
  });

  closeBtn.addEventListener('click', () => {
    mainMenu.classList.remove('main-menu--active');
  });

  // Закрытие при клике на оверлей
  mainMenu.addEventListener('click', (e) => {
    if (e.target === mainMenu) {
      mainMenu.classList.remove('main-menu--active');
    }
  });
};
