export const showMessage = (text, isError = false) => {
  const messageEl = document.createElement('div');
  messageEl.className = 'message';
  messageEl.innerHTML = `
    <div class="message__content">
      <button class="message__close" type="button">
        <svg width="20" height="20" aria-hidden="true">
          <use xlink:href="images/sprite.svg#icon-close"></use>
        </svg>
      </button>
      <p class="message__text" style="${isError ? 'color: red;' : ''}">${text}</p>
    </div>
  `;

  document.body.appendChild(messageEl);

  const closeBtn = messageEl.querySelector('.message__close');
  closeBtn.addEventListener('click', () => {
    messageEl.remove();
  });

  messageEl.addEventListener('click', (e) => {
    if (e.target === messageEl) {
      messageEl.remove();
    }
  });
};
