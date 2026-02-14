import { renderCard } from './render-card.js';
import { getProducts } from './api.js';
import { initTooltips } from './tooltip.js';

export const initCatalog = async () => {
  const catalogList = document.querySelector('.catalog__list');
  const paginationList = document.querySelector('.catalog__pagination');
  const filterForm = document.querySelector('.catalog-form');
  const sortSelect = document.querySelector('.catalog__sort-select');

  if (!catalogList) return;

  let allProducts = [];
  let filteredProducts = [];
  const itemsPerPage = 6;
  let currentPage = 1;

  const fetchProducts = async () => {
    allProducts = await getProducts();
    filteredProducts = [...allProducts];
    updateFilterCounts();
    applyFiltersAndSort();
  };

  const updateFilterCounts = () => {
    const checkboxes = filterForm.querySelectorAll(
      '.custom-checkbox__field[name="type"]',
    );
    checkboxes.forEach((checkbox) => {
      const type = checkbox.value;
      const count = allProducts.filter((p) => p.type.includes(type)).length;
      const countElement = checkbox
        .closest('.custom-checkbox')
        .querySelector('.custom-checkbox__count');
      if (countElement) {
        countElement.textContent = count;
      }
    });
  };

  const applyFiltersAndSort = () => {
    const checkedTypes = Array.from(
      filterForm.querySelectorAll(
        '.custom-checkbox__field[name="type"]:checked',
      ),
    ).map((cb) => cb.value);
    const status = filterForm.querySelector(
      '.custom-radio__field[name="status"]:checked',
    ).value;
    const sortBy = sortSelect.value;

    filteredProducts = allProducts.filter((product) => {
      const typeMatch =
        checkedTypes.length === 0 ||
        product.type.some((t) => checkedTypes.includes(t));

      let statusMatch = true;
      if (status === 'instock') {
        statusMatch = Object.values(product.availability).some(
          (count) => count > 0,
        );
      }

      return typeMatch && statusMatch;
    });

    // Sorting
    if (sortBy === 'price-min') {
      filteredProducts.sort((a, b) => a.price.new - b.price.new);
    } else if (sortBy === 'price-max') {
      filteredProducts.sort((a, b) => b.price.new - a.price.new);
    } else if (sortBy === 'rating-max') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }

    currentPage = 1;
    renderCatalog();
  };

  const renderCatalog = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageProducts = filteredProducts.slice(start, end);

    catalogList.innerHTML = pageProducts
      .map(
        (product) => `
      <li class="catalog__item">
        ${renderCard(product)}
      </li>
    `,
      )
      .join('');

    renderPagination();
    initTooltips();
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    paginationList.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li');
      li.className = 'catalog__pagination-item';
      li.innerHTML = `
        <button class="catalog__pagination-link" ${i === currentPage ? 'disabled' : ''}>${i}</button>
      `;
      li.querySelector('button').addEventListener('click', () => {
        currentPage = i;
        renderCatalog();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationList.appendChild(li);
    }
  };

  filterForm.addEventListener('change', applyFiltersAndSort);
  filterForm.addEventListener('reset', () => {
    setTimeout(applyFiltersAndSort, 0);
  });
  sortSelect.addEventListener('change', applyFiltersAndSort);

  await fetchProducts();
};
