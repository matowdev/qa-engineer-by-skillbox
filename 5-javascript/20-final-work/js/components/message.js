export const showMessage = (title, text, isError = false) => {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${isError ? 'message--error' : 'message--success'}`;
  
  const icon = isError 
    ? `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="20" cy="20" r="19" stroke="#FF4D4D" stroke-width="2"/>
         <path d="M20 12V24" stroke="#FF4D4D" stroke-width="2" stroke-linecap="round"/>
         <circle cx="20" cy="28" r="1.5" fill="#FF4D4D"/>
       </svg>`
    : `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
         <circle cx="20" cy="20" r="19" stroke="#6FC76C" stroke-width="2"/>
         <path d="M12 20L18 28L28 14" stroke="#6FC76C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`;
  
  messageEl.innerHTML = `
    <div class="message__content">
      <button class="message__close" type="button">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L13 13M1 13L13 1" stroke="#A5A5A5" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
      <div class="message__icon">${icon}</div>
      <h3 class="message__title">${title}</h3>
      <p class="message__text">${text}</p>
    </div>
  `;

  document.body.appendChild(messageEl);

  // Компенсация ширины скроллбара для предотвращения "прыжка" верстки
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.paddingRight = `${scrollBarWidth}px`;
  document.body.style.overflow = 'hidden';

  const closeMessage = () => {
    messageEl.remove();
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const closeBtn = messageEl.querySelector('.message__close');
  closeBtn.addEventListener('click', closeMessage);

  messageEl.addEventListener('click', (e) => {
    if (e.target === messageEl) {
      closeMessage();
    }
  });
};
