import { books } from "../data/books.js";
import { cart } from "../modules/cart.js";
import { favorites } from "../modules/favorites.js";
import { filter } from "../modules/filter.js";
import { search } from "../modules/search.js";
import { ui } from "../modules/ui.js";

import { createHeader } from "../components/header.js";
import { createFooter } from "../components/footer.js";

const grid = document.getElementById("catalog-grid");

const emptyState = document.getElementById("catalog-empty");

const countElement = document.getElementById("catalog-count");

const filtersForm = document.getElementById("filters-form");

const sortSelect = document.getElementById("sort-select");

const priceMinInput = document.getElementById("price-min");

const priceMaxInput = document.getElementById("price-max");

const priceError = document.getElementById("price-error");

const header = createHeader();

createFooter();

function getPrice(value) {
  if (value.trim() === "") {
    return null;
  }

  const price = Number(value);

  if (!Number.isFinite(price) || price < 0) {
    return null;
  }

  return price;
}

function showPriceError(message = "") {
  priceError.textContent = message;

  priceError.classList.toggle("is-hidden", !message);
}

function render() {
  const query = header?.searchInput?.value ?? "";

  const minPrice = getPrice(priceMinInput.value);

  const maxPrice = getPrice(priceMaxInput.value);

  const hasInvalidPrice =
    (priceMinInput.value.trim() !== "" && minPrice === null) ||
    (priceMaxInput.value.trim() !== "" && maxPrice === null);

  const invalidRange =
    minPrice !== null && maxPrice !== null && minPrice > maxPrice;

  if (hasInvalidPrice) {
    showPriceError("Вкажіть коректну ціну.");
  } else if (invalidRange) {
    showPriceError("Мінімальна ціна не може бути більшою за максимальну.");
  } else {
    showPriceError();
  }

  if (hasInvalidPrice || invalidRange) {
    grid.replaceChildren();

    emptyState.classList.remove("is-hidden");

    emptyState.querySelector("p").textContent =
      "Перевірте значення фільтра ціни.";

    countElement.textContent = "Знайдено: 0";

    return;
  }

  const searchedBooks = search.byQuery(books, query);

  const filteredBooks = filter.apply(searchedBooks, {
    minPrice,
    maxPrice,
    sort: sortSelect.value,
  });

  const fragment = document.createDocumentFragment();

  for (const book of filteredBooks) {
    fragment.append(ui.createCard(book, favorites.isFavorite(book.id)));
  }

  grid.replaceChildren(fragment);

  countElement.textContent = `Знайдено: ${filteredBooks.length}`;

  emptyState.classList.toggle("is-hidden", filteredBooks.length !== 0);

  if (filteredBooks.length === 0) {
    emptyState.querySelector("p").textContent =
      "За вашим запитом нічого не знайдено";
  }
}

/*
 * Favorite / cart actions
 */

grid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-fav-id]");

  if (favoriteButton) {
    const bookId = Number(favoriteButton.dataset.favId);

    const isFavorite = favorites.toggle(bookId);

    favoriteButton.classList.toggle("is-active", isFavorite);

    favoriteButton.setAttribute("aria-pressed", String(isFavorite));

    const book = books.find((item) => item.id === bookId);

    if (book) {
      favoriteButton.setAttribute(
        "aria-label",
        isFavorite
          ? `Видалити «${book.title}» з улюбленого`
          : `Додати «${book.title}» до улюбленого`,
      );

      const icon = favoriteButton.querySelector("img");

      if (icon) {
        icon.src = isFavorite ? ui.icons.heartActive : ui.icons.heart;
      }
    }

    ui.updateBadges();

    return;
  }

  const cartButton = event.target.closest("[data-cart-id]");

  if (cartButton) {
    const bookId = Number(cartButton.dataset.cartId);

    if (!cart.addItem(bookId)) {
      return;
    }

    cartButton.disabled = true;
    cartButton.textContent = "Додано ✓";

    ui.updateBadges();

    window.setTimeout(() => {
      cartButton.disabled = false;
      cartButton.textContent = "В кошик";
    }, 700);
  }
});

/*
 * Search
 */

header?.searchInput?.addEventListener("input", render);

/*
 * Filters
 */

filtersForm.addEventListener("input", render);

sortSelect.addEventListener("change", render);

filtersForm.addEventListener("reset", () => {
  window.requestAnimationFrame(render);
});

render();
