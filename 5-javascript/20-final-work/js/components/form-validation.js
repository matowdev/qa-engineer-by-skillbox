import { showMessage } from './message.js';

export const initFormValidation = () => {
  const form = document.querySelector('.questions__form');
  if (!form) return;

  const validator = new window.JustValidate(form);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите имя',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимум 3 символа',
      },
      {
        rule: 'maxLength',
        value: 20,
        errorMessage: 'Максимум 20 символов',
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage: 'Введите почту',
      },
      {
        rule: 'email',
        errorMessage: 'Некорректный email',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Нужно согласие',
      },
    ])
    .onSuccess(async (event) => {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          showMessage('Заявка успешно отправлена!');
          event.target.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        showMessage('Произошла ошибка при отправке формы', true);
      }
    });
};
