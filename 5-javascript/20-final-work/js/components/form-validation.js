import { showMessage } from './message.js';

export const initFormValidation = () => {
  const form = document.querySelector('.questions__form');
  if (!form) return;

  const validator = new window.JustValidate(form);

  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
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
        errorMessage: 'Введите вашу почту',
      },
      {
        rule: 'email',
        errorMessage: 'Почта введена неверно',
      },
    ])
    .addField('#agree', [
      {
        rule: 'required',
        errorMessage: 'Согласие обязательно',
      },
    ])
    .onSuccess(async (event) => {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(event.target.action, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          showMessage(
            'Заявка отправлена',
            'Благодарим за обращение! Мы получили вашу заявку и свяжемся с вами в ближайшее время',
          );
          event.target.reset();
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        showMessage(
          'Ошибка отправки',
          'Что-то пошло не так, попробуйте отправить форму еще раз. Если ошибка повторится — свяжитесь со службой поддержки.',
          true,
        );
      }
    });
};
