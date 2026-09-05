import { renderFooter } from "../components/footer.js";
import { renderHeader } from "../components/header.js";
import { books } from "../data/books.js";
import { storage } from "../modules/storage.js";
import { favorites } from "../modules/favorites.js";
import { cart } from "../modules/cart.js";
import { ui } from "../modules/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  ui.updateBadges();

  const grid = document.getElementById("favorites-grid");
  const emptyState = document.getElementById("favorites-empty");

  function renderFavorites() {
    const favIds = storage.getFavorites();
    const favBooks = books.filter((b) => favIds.includes(b.id));

    if (favBooks.length === 0) {
      grid.innerHTML = "";
      emptyState.classList.remove("is-hidden");
      return;
    }

    emptyState.classList.add("is-hidden");
    grid.innerHTML = favBooks.map((book) => ui.createCard(book, true)).join("");
  }

  grid.addEventListener("click", (e) => {
    const favBtn = e.target.closest("[data-fav-id]");
    if (favBtn) {
      const id = Number(favBtn.dataset.favId);
      favorites.toggle(id);
      renderFavorites();
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

  renderFavorites();
});
