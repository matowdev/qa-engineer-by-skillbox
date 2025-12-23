// Нужно создать веб-приложение для интернет-магазина, где пользователь сможет добавлять товары в корзину. При нажатии на кнопку «Добавить в корзину» у соответствующего товара должна создаваться новая строка в корзине, содержащая информацию о нём. Для этого можно использовать document.querySelector, createElement, createTextNode, append, textContent, classList.add и событие onclick.

'use strict';

const cartList = document.getElementById('cart');

function addToCart(item) {
  if (!item || typeof item !== 'string') {
    return;
  }

  const cartItem = document.createElement('li');
  cartItem.classList.add('cart-item');
  cartItem.textContent = item;

  cartList.append(cartItem);
}
