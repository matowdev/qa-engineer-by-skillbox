import { getProducts } from './api.js';
import { showMessage } from './message.js';

export const initCart = async () => {
  const cartBtn = document.querySelector('.header__user-btn');
  const cartMenu = document.querySelector('.basket');
  const cartList = document.querySelector('.basket__list');
  const cartCounter = document.querySelector('.header__user-count');
  const emptyBlock = document.querySelector('.basket__empty-block');
  const checkoutBtn = document.querySelector('.basket__link');

  if (!cartBtn || !cartMenu || !cartList) return;

  let cartData = [];
  const products = await getProducts();

  const toggleCart = () => {
    cartMenu.classList.toggle('basket--active');
  };

  const updateCart = () => {
    cartList.innerHTML = cartData
      .map(
        (item, index) => `
      <li class="basket__item" data-index="${index}">
        <div class="basket__img">
          <img src="${item.image.replace('../', '')}" alt="${item.name}" height="60" width="60">
        </div>
        <span class="basket__name">${item.name}</span>
        <span class="basket__price">${item.price.new.toLocaleString()} руб</span>
        <button class="basket__close" type="button">
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `,
      )
      .join('');

    cartCounter.textContent = cartData.length;

    if (cartData.length > 0) {
      emptyBlock.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'flex';
    } else {
      emptyBlock.style.display = 'block';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
    }
  };

  const addToCart = (id) => {
    const product = products.find((p) => p.id === parseInt(id));
    if (product) {
      // Считаем общее количество в наличии
      const totalAvailable = Object.values(product.availability).reduce(
        (acc, curr) => acc + curr,
        0,
      );

      // Считаем сколько уже в корзине
      const inCartCount = cartData.filter(
        (item) => item.id === product.id,
      ).length;

      if (inCartCount < totalAvailable) {
        cartData.push(product);
        updateCart();
      } else {
        showMessage(
          'Не удалось добавить товар',
          `К сожалению, "${product.name}" закончился на складе (доступно: ${totalAvailable} шт.)`,
          true,
        );
      }
    }
  };

  const removeFromCart = (index) => {
    cartData.splice(index, 1);
    updateCart();
  };

  cartBtn.addEventListener('click', toggleCart);

  // Делегирование для кнопок "В корзину" (в каталоге и слайдере)
  document.addEventListener('click', (e) => {
    const addBtn = e.target.closest('.product-card__link.btn--icon');
    if (addBtn) {
      e.preventDefault();
      const id = addBtn.dataset.id;
      addToCart(id);
    }

    const removeBtn = e.target.closest('.basket__close');
    if (removeBtn) {
      const index = removeBtn.closest('.basket__item').dataset.index;
      removeFromCart(parseInt(index));
    }
  });

  // Закрытие корзины при клике вне её
  document.addEventListener('click', (e) => {
    if (
      !e.target.closest('.header__user-item') &&
      !e.target.closest('.basket__close')
    ) {
      cartMenu.classList.remove('basket--active');
    }
  });

  updateCart();
};
