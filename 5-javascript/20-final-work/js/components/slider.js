import { renderCard } from './render-card.js';
import { getProducts } from './api.js';
import { initTooltips } from './tooltip.js';

export const initSlider = async () => {
  const sliderWrapper = document.querySelector('.day-products__list');
  if (!sliderWrapper) return;

  const products = await getProducts();
  const dayProducts = products.filter((p) => p.goodsOfDay);

  sliderWrapper.innerHTML = dayProducts
    .map(
      (product) => `
    <li class="day-products__item swiper-slide">
      ${renderCard(product, 'product-card--small')}
    </li>
  `,
    )
    .join('');

  initTooltips('.day-products__item .tooltip__btn');

  if (window.Swiper) {
    new Swiper('.day-products__slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.day-products__navigation-btn--next',
        prevEl: '.day-products__navigation-btn--prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
  }
};
