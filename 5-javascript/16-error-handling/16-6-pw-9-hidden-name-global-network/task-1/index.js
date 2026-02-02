'use strict';

// Отредактируйте код, чтобы проблема перестала быть скрытой. Удалять конструкцию try..catch запрещено.

function hello() {
  console.log('Skill');
}

try {
  helo(); // опечатка.. должно быть hello()
} catch (error) {
  console.error('Произошла ошибка:', error);
}

console.log('complete');
