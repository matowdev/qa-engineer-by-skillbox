export const initTooltips = (selector = '.tooltip__btn', options = {}) => {
  if (window.tippy) {
    const targets =
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : selector;

    // Фильтруем элементы, чтобы не инициализировать их повторно
    const uninitializedTargets = Array.from(targets).filter((el) => !el._tippy);

    if (uninitializedTargets.length === 0) return;

    tippy(uninitializedTargets, {
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
      ...options,
    });
  }
};
