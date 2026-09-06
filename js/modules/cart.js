import { storage, MAX_QUANTITY } from "./storage.js";

export const cart = {
  addItem(bookId) {
    const id = Number(bookId);

    if (!Number.isInteger(id) || id <= 0) {
      return false;
    }

    const items = storage.getCart();

    const existing = items.find((item) => item.id === id);

    if (existing) {
      existing.quantity = Math.min(existing.quantity + 1, MAX_QUANTITY);
    } else {
      items.push({
        id,
        quantity: 1,
      });
    }

    storage.saveCart(items);

    return true;
  },

  updateQuantity(bookId, delta) {
    const id = Number(bookId);
    const change = Number(delta);

    if (!Number.isInteger(id) || !Number.isInteger(change) || change === 0) {
      return false;
    }

    const items = storage.getCart();

    const item = items.find((entry) => entry.id === id);

    if (!item) {
      return false;
    }

    item.quantity += change;

    const nextItems =
      item.quantity <= 0
        ? items.filter((entry) => entry.id !== id)
        : items.map((entry) =>
            entry.id === id
              ? {
                  ...entry,
                  quantity: Math.min(entry.quantity, MAX_QUANTITY),
                }
              : entry,
          );

    storage.saveCart(nextItems);

    return true;
  },

  removeItem(bookId) {
    const id = Number(bookId);

    if (!Number.isInteger(id)) {
      return false;
    }

    const nextItems = storage.getCart().filter((item) => item.id !== id);

    storage.saveCart(nextItems);

    return true;
  },

  clear() {
    storage.clearCart();
  },

  calculateTotals(booksList) {
    const booksById = new Map(booksList.map((book) => [book.id, book]));

    let totalCount = 0;
    let totalPrice = 0;

    for (const item of storage.getCart()) {
      const book = booksById.get(item.id);

      if (!book) {
        continue;
      }

      totalCount += item.quantity;
      totalPrice += book.price * item.quantity;
    }

    return {
      totalCount,
      totalPrice,
    };
  },
};
