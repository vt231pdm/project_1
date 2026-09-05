import { renderFooter } from "../components/footer.js";
import { renderHeader } from "../components/header.js";
import { books } from "../data/books.js";
import { search } from "../modules/search.js";
import { filter } from "../modules/filter.js";
import { cart } from "../modules/cart.js";
import { favorites } from "../modules/favorites.js";
import { ui } from "../modules/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader({ showSearch: true });
  renderFooter();

  ui.updateBadges();

  const grid = document.getElementById("catalog-grid");
  const countEl = document.getElementById("catalog-count");
  const emptyEl = document.getElementById("catalog-empty");
  const searchInput = document.getElementById("search-input");
  const filtersForm = document.getElementById("filters-form");
  const sortSelect = document.getElementById("sort-select");
  const priceMin = document.getElementById("price-min");
  const priceMax = document.getElementById("price-max");

  function render() {
    const filterParams = {
      minPrice: priceMin.value ? Number(priceMin.value) : null,
      maxPrice: priceMax.value ? Number(priceMax.value) : null,
      sort: sortSelect.value,
    };

    // Крок 1: Текстовий пошук
    let processedBooks = search.byQuery(books, searchInput.value);

    // Крок 2: Фільтрація за ціною та сортування
    processedBooks = filter.apply(processedBooks, filterParams);

    // Оновлення лічильника
    countEl.textContent = `Знайдено: ${processedBooks.length}`;

    // Перевірка на порожній результат
    if (processedBooks.length === 0) {
      grid.innerHTML = "";
      emptyEl.classList.remove("is-hidden");
      return;
    }

    // Рендеринг карток
    emptyEl.classList.add("is-hidden");
    grid.innerHTML = processedBooks
      .map((book) => ui.createCard(book, favorites.isFavorite(book.id)))
      .join("");
  }

  searchInput.addEventListener("input", render);
  sortSelect.addEventListener("change", render);
  priceMin.addEventListener("input", render);
  priceMax.addEventListener("input", render);

  filtersForm.addEventListener("reset", () => {
    setTimeout(render, 0);
  });

  grid.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-fav-id]");
    if (favBtn) {
      const id = Number(favBtn.dataset.favId);
      const isFav = favorites.toggle(id);
      favBtn.classList.toggle("is-active", isFav);

      const favImg = favBtn.querySelector(".card__favorite-icon");
      if (favImg) {
        favImg.src = isFav ? "img/icons/red_heart.png" : "img/icons/heart.png";
      }
      return;
    }

    const cartBtn = e.target.closest("[data-cart-id]");
    if (cartBtn) {
      const id = Number(cartBtn.dataset.cartId);
      cart.addItem(id);
      cartBtn.textContent = "Додано ✓";
      setTimeout(() => {
        cartBtn.textContent = "В кошик";
      }, 1000);
    }
  });

  render();
});
