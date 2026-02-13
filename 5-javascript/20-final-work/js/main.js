import { initBurger } from './components/burger.js';
import { initLocation } from './components/location.js';
import { initAccordion } from './components/accordion.js';
import { initCatalog } from './components/catalog.js';
import { initSlider } from './components/slider.js';
import { initCart } from './components/cart.js';
import { initFormValidation } from './components/form-validation.js';

window.addEventListener('DOMContentLoaded', async () => {
  initBurger();
  initLocation();
  initAccordion();
  initFormValidation();

  // Эти модули асинхронные, так как загружают данные
  await initCatalog();
  await initSlider();
  await initCart();
});
