export const initAccordion = () => {
  const accordionElements = document.querySelectorAll('.accordion__element');

  accordionElements.forEach((element) => {
    const btn = element.querySelector('.accordion__btn');

    btn.addEventListener('click', () => {
      const isActive = btn.classList.contains('accordion__btn--active');

      // Закрываем все открытые аккордеоны
      document.querySelectorAll('.accordion__btn').forEach((otherBtn) => {
        otherBtn.classList.remove('accordion__btn--active');
      });

      // Если текущий не был активен, открываем его
      if (!isActive) {
        btn.classList.add('accordion__btn--active');
      }
    });
  });
};
