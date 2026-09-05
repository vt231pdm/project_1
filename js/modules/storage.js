const CART_KEY = "bookstore_cart";
const FAVORITES_KEY = "bookstore_favorites";

export const storage = {
  getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  getFavorites() {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveFavorites(favs) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
  },
};
