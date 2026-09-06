const CART_KEY = "bookstore_cart";
const FAVORITES_KEY = "bookstore_favorites";

const MAX_QUANTITY = 99;

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return fallback;
    }

    const value = JSON.parse(raw);

    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function sanitizeCart(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const uniqueItems = new Map();

  for (const item of value) {
    const id = Number(item?.id);
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(id) || id <= 0) {
      continue;
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      continue;
    }

    uniqueItems.set(id, Math.min(quantity, MAX_QUANTITY));
  }

  return [...uniqueItems].map(([id, quantity]) => ({
    id,
    quantity,
  }));
}

function sanitizeFavorites(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [
    ...new Set(
      value.map(Number).filter((id) => Number.isInteger(id) && id > 0),
    ),
  ];
}

export const storage = {
  getCart() {
    const cart = sanitizeCart(readJson(CART_KEY, []));

    this.saveCart(cart);

    return cart;
  },

  saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(sanitizeCart(cart)));
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
  },

  getFavorites() {
    const favorites = sanitizeFavorites(readJson(FAVORITES_KEY, []));

    this.saveFavorites(favorites);

    return favorites;
  },

  saveFavorites(favorites) {
    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(sanitizeFavorites(favorites)),
    );
  },
};

export { MAX_QUANTITY };
