import { storage } from "./storage.js";

export const favorites = {
  isFavorite(bookId) {
    const id = Number(bookId);

    return storage.getFavorites().includes(id);
  },

  toggle(bookId) {
    const id = Number(bookId);

    if (!Number.isInteger(id) || id <= 0) {
      return false;
    }

    const current = storage.getFavorites();

    const next = current.includes(id)
      ? current.filter((itemId) => itemId !== id)
      : [...current, id];

    storage.saveFavorites(next);

    return next.includes(id);
  },
};
