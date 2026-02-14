export const initTooltips = () => {
  if (window.tippy) {
    tippy('.tooltip__btn', {
      content(reference) {
        const content = reference.nextElementSibling;
        return content.innerHTML;
      },
      allowHTML: true,
      interactive: true,
      theme: 'lightwhite',
      placement: 'top-end',
      maxWidth: 'none', // Отключаем ограничение по умолчанию
      onShow(instance) {
        instance.popper.style.width = '224px';
      },
    });
  }
};
