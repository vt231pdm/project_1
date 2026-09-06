import { books } from "../data/books.js";
import { cart } from "../modules/cart.js";
import { storage } from "../modules/storage.js";
import { ui } from "../modules/ui.js";

import { createHeader } from "../components/header.js";
import { createFooter } from "../components/footer.js";

const content = document.getElementById("cart-content");

const itemsContainer = document.getElementById("cart-items-container");

const emptyState = document.getElementById("cart-empty");

const totalCountElement = document.getElementById("summary-total-count");

const totalPriceElement = document.getElementById("summary-total-price");

const checkoutButton = document.getElementById("checkout-button");

createHeader();
createFooter();

const booksById = new Map(books.map((book) => [book.id, book]));

function removeUnknownItems() {
  const validItems = storage.getCart().filter((item) => booksById.has(item.id));

  storage.saveCart(validItems);

  return validItems;
}

function render() {
  const items = removeUnknownItems();

  const fragment = document.createDocumentFragment();

  for (const item of items) {
    const book = booksById.get(item.id);

    if (!book) {
      continue;
    }

    fragment.append(ui.createCartItem(book, item.quantity));
  }

  itemsContainer.replaceChildren(fragment);

  const totals = cart.calculateTotals(books);

  totalCountElement.textContent = `${totals.totalCount} шт.`;

  totalPriceElement.textContent = `${totals.totalPrice} грн`;

  const isEmpty = totals.totalCount === 0;

  content.classList.toggle("is-hidden", isEmpty);

  emptyState.classList.toggle("is-hidden", !isEmpty);

  checkoutButton.disabled = isEmpty;

  ui.updateBadges();
}

itemsContainer.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");

  if (!button) {
    return;
  }

  const bookId = Number(button.dataset.id);

  switch (button.dataset.action) {
    case "increase":
      cart.updateQuantity(bookId, 1);
      break;

    case "decrease":
      cart.updateQuantity(bookId, -1);
      break;

    case "remove":
      cart.removeItem(bookId);
      break;

    default:
      return;
  }

  render();
});

checkoutButton.addEventListener("click", () => {
  const totals = cart.calculateTotals(books);

  if (totals.totalCount <= 0) {
    return;
  }

  const confirmed = window.confirm(
    `Оформити замовлення на ${totals.totalPrice} грн?`,
  );

  if (!confirmed) {
    return;
  }

  cart.clear();

  render();

  window.alert("Замовлення оформлено. Це демонстраційна версія магазину.");
});

render();
