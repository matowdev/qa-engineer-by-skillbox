import { getProducts } from './api.js';

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
    cartList.innerHTML = cartData.map((item) => `
      <li class="basket__item" data-id="${item.id}">
        <div class="basket__img">
          <img src="${item.image.replace('../', '')}" alt="${item.name}" height="60" width="60">
        </div>
        <span class="basket__name">${item.name}</span>
        <span class="basket__price">${item.price.new.toLocaleString()} руб</span>
        <button class="basket__item-close" type="button">
          <svg width="24" height="24" aria-hidden="true">
            <use xlink:href="images/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </li>
    `).join('');

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
      cartData.push(product);
      updateCart();
    }
  };

  const removeFromCart = (id) => {
    cartData = cartData.filter((item) => item.id !== parseInt(id));
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

    const removeBtn = e.target.closest('.basket__item-close');
    if (removeBtn) {
      const id = removeBtn.closest('.basket__item').dataset.id;
      removeFromCart(id);
    }
  });

  // Закрытие корзины при клике вне её
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header__user-item') && !e.target.closest('.basket__item-close')) {
      cartMenu.classList.remove('basket--active');
    }
  });

  updateCart();
};
