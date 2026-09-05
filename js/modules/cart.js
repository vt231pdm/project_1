import { storage } from "./storage.js";
import { ui } from "./ui.js";

export const cart = {
  addItem(bookId) {
    const cartItems = storage.getCart();
    const existing = cartItems.find((item) => item.id === bookId);

    if (existing) {
      existing.quantity += 1; // Збільшення на одиницю при повторному натисканні
    } else {
      cartItems.push({ id: bookId, quantity: 1 });
    }

    storage.saveCart(cartItems);
    ui.updateBadges(); // Миттєве оновлення лічильника
  },

  updateQuantity(bookId, delta) {
    let cartItems = storage.getCart();
    const item = cartItems.find((i) => i.id === bookId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cartItems = cartItems.filter((i) => i.id !== bookId);
    }

    storage.saveCart(cartItems);
    ui.updateBadges();
  },

  removeItem(bookId) {
    const cartItems = storage.getCart().filter((item) => item.id !== bookId);
    storage.saveCart(cartItems);
    ui.updateBadges();
  },

  calculateTotals(booksList) {
    const cartItems = storage.getCart();
    let totalCount = 0;
    let totalPrice = 0;

    cartItems.forEach((cartItem) => {
      const book = booksList.find((b) => b.id === cartItem.id);
      if (book) {
        totalCount += cartItem.quantity;
        totalPrice += book.price * cartItem.quantity;
      }
    });

    return { totalCount, totalPrice };
  },
};
