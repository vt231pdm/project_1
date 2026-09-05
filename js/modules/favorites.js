import { storage } from "./storage.js";
import { ui } from "./ui.js";

export const favorites = {
  isFavorite(bookId) {
    return storage.getFavorites().includes(bookId);
  },

  toggle(bookId) {
    let favs = storage.getFavorites();
    if (favs.includes(bookId)) {
      favs = favs.filter((id) => id !== bookId);
    } else {
      favs.push(bookId);
    }
    storage.saveFavorites(favs);
    ui.updateBadges();
    return favs.includes(bookId);
  },
};
