'use strict';

// Функция в обоих случаях отображает сообщение в консоли "Обнаружена локальная ошибка". Необходимо исправить функцию testErrorScope так, чтобы во втором случае отображалось сообщение "Обнаружена глобальная ошибка".

function globalError() {
  const error = Error('Глобальная ошибка');
  error.name = 'GlobalError';
  throw error;
}

function localError() {
  const error = Error('Локальная ошибка');
  error.name = 'LocalError';
  throw error;
}

function testErrorScope(fn) {
  try {
    try {
      fn();
    } catch (error) {
      console.log('Обнаружена локальная ошибка');
      console.error(error);
    }
  } catch (error) {
    console.log('Обнаружена глобальная ошибка');
    console.error(error);
  }
}

testErrorScope(localError);
testErrorScope(globalError);
