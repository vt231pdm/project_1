import { renderFooter } from "../components/footer.js";
import { renderHeader } from "../components/header.js";
import { books } from "../data/books.js";
import { storage } from "../modules/storage.js";
import { cart } from "../modules/cart.js";
import { ui } from "../modules/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();

  ui.updateBadges();

  const cartContent = document.getElementById("cart-content");
  const itemsContainer = document.getElementById("cart-items-container");
  const emptyState = document.getElementById("cart-empty");
  const totalCountEl = document.getElementById("summary-total-count");
  const totalPriceEl = document.getElementById("summary-total-price");
  const checkoutBtn = document.getElementById("checkout-button");

  function renderCart() {
    const cartItems = storage.getCart();

    if (cartItems.length === 0) {
      cartContent.classList.add("is-hidden");
      emptyState.classList.remove("is-hidden");
      return;
    }

    emptyState.classList.add("is-hidden");
    cartContent.classList.remove("is-hidden");

    itemsContainer.innerHTML = cartItems
      .map((item) => {
        const book = books.find((b) => b.id === item.id);
        return book ? ui.createCartItem(book, item.quantity) : "";
      })
      .join("");

    const { totalCount, totalPrice } = cart.calculateTotals(books);
    totalCountEl.textContent = `${totalCount} шт.`;
    totalPriceEl.textContent = `${totalPrice} грн`;
  }

  itemsContainer.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const action = btn.dataset.action;
    const id = Number(btn.dataset.id);

    if (action === "increase") {
      cart.updateQuantity(id, 1);
    } else if (action === "decrease") {
      cart.updateQuantity(id, -1);
    } else if (action === "remove") {
      cart.removeItem(id);
    }

    renderCart();
  });

  checkoutBtn.addEventListener("click", () => {
    alert("Замовлення успішно оформлено!");
    storage.clearCart();
    ui.updateBadges();
    renderCart();
  });

  renderCart();
});
