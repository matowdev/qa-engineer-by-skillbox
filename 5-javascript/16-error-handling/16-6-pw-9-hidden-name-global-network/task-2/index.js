'use strict';

// Скорректируйте функцию greeting так, чтобы при пустом username сработал alert из catch-блока с сообщением «Имя обязательно для заполнения».

function greeting() {
  const username = prompt('Введите имя пользователя!');
}

try {
  greeting();
} catch (error) {
  alert(error.message);
}
