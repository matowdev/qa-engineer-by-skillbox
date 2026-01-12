'use strict';

// Задание 1:
// Реализуйте поиск по библиотеке автомобилей:
// Напишите функцию getCar, которая:
// - принимает в себя параметр с маркой автомобиля;
// - если автомобиль найден, то выводит на экран объект авто;
// - если нет, то выводит сообщение, что Авто не найдено.
// На вход будет подаваться объект cars с объектами автомобилей.

const cars = {
  mercedes: {
    name: 'Mercedes',
    doors: 4,
    wheel: 4,
    hp: 220,
    isStarted: false,
  },
  bmw: {
    name: 'BMW',
    doors: 4,
    wheel: 4,
    hp: 330,
    isStarted: false,
  },
  audi: {
    name: 'AUDI',
    doors: 4,
    wheel: 4,
    hp: 260,
    isStarted: false,
  },
};

function getCar(carName) {
  if (!cars[carName.toLowerCase()]) {
    console.log('Авто не найдено!');
    return null;
  }

  return cars[carName.toLowerCase()];
}

const carObj = getCar('BMW');
console.log(carObj); // { name: 'BMW', doors: 4, wheel: 4, hp: 330, isStarted: false }

const carObj2 = getCar('tesla');
console.log(carObj2); // 'Авто не найдено!' null

// Задание 2:
// Напишите функцию getName, которая с помощью цикла пройдёт по объекту cars и выведет в консоль названия всех автомобилей.

function getName() {
  Object.keys(cars).forEach((name) => console.log(name));
}

getName();

// Задание 3:
// Напишите функцию, которая хранит в теле функции объект автомобиля:
// - { wheels: 4, doors: 4, isStarted: false }
// - принимает в качестве параметра объект с совпадающими или любыми другими дополнительными полями;
// - объединяет эти два объекта в один и возвращает полученный объект.

function createCar(carObj) {
  const initCar = {
    wheels: 4,
    doors: 4,
    isStarted: false,
  };

  return { ...initCar, ...carObj };
}

console.log(createCar({ name: 'Haval', hp: 198 })); // { wheels: 4, doors: 4, isStarted: false, name: 'Haval', hp: 198 }
