import { books } from "../data/books.js";
import { cart } from "../modules/cart.js";
import { favorites } from "../modules/favorites.js";
import { storage } from "../modules/storage.js";
import { ui } from "../modules/ui.js";

import { createHeader } from "../components/header.js";
import { createFooter } from "../components/footer.js";

const grid = document.getElementById("favorites-grid");

const emptyState = document.getElementById("favorites-empty");

createHeader();
createFooter();

function render() {
  const favoriteIds = new Set(storage.getFavorites());

  const favoriteBooks = books.filter((book) => favoriteIds.has(book.id));

  const fragment = document.createDocumentFragment();

  for (const book of favoriteBooks) {
    fragment.append(ui.createCard(book, true));
  }

  grid.replaceChildren(fragment);

  emptyState.classList.toggle("is-hidden", favoriteBooks.length !== 0);
}

grid.addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-fav-id]");

  if (favoriteButton) {
    favorites.toggle(Number(favoriteButton.dataset.favId));

    ui.updateBadges();
    render();

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

render();
