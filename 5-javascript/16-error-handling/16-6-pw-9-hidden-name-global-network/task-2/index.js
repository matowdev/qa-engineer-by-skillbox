'use strict';

// Скорректируйте функцию greeting так, чтобы при пустом username сработал alert из catch-блока с сообщением «Имя обязательно для заполнения».

function greeting() {
  const username = prompt('Введите имя пользователя!');

  if (!username) {
    throw new Error('Имя обязательно для заполнения!');
  }
}

try {
  greeting();
} catch (error) {
  alert(error.message);
}
