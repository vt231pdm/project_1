import { storage } from "./storage.js";

export const ui = {
  updateBadges() {
    const favBadge = document.getElementById("favorites-badge");
    const cartBadge = document.getElementById("cart-badge");

    if (favBadge) {
      favBadge.textContent = storage.getFavorites().length;
    }

    if (cartBadge) {
      const cartItems = storage.getCart();
      const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      cartBadge.textContent = count;
    }
  },

  createCard(book, isFav = false) {
    const heartSrc = isFav ? "img/icons/red_heart.png" : "img/icons/heart.png";

    return `
      <article class="card" data-id="${book.id}">
        <button type="button" class="card__favorite-btn ${isFav ? "is-active" : ""}" data-fav-id="${book.id}" aria-label="Улюблене">
          <img src="${heartSrc}" alt="Улюблене" class="card__favorite-icon">
        </button>
        <div class="card__image-wrap">
          <img src="${book.image}" alt="${book.title}" class="card__image" loading="lazy">
        </div>
        <div class="card__content">
          <h3 class="card__title">${book.title}</h3>
          <span class="card__author">${book.author}</span>
          <div class="card__footer">
            <span class="card__price">${book.price} грн</span>
            <button type="button" class="btn btn--primary btn--sm" data-cart-id="${book.id}">
              В кошик
            </button>
          </div>
        </div>
      </article>
    `;
  },

  createCartItem(book, quantity) {
    return `
      <div class="cart-item" data-id="${book.id}">
        <img src="${book.image}" alt="${book.title}" class="cart-item__image">
        <div class="cart-item__info">
          <h3 class="cart-item__title">${book.title}</h3>
          <p class="cart-item__author">${book.author}</p>
          <span class="cart-item__price">${book.price} грн</span>
        </div>
        <div class="cart-item__controls">
          <button type="button" class="cart-item__quantity-btn" data-action="decrease" data-id="${book.id}">-</button>
          <span class="cart-item__quantity">${quantity}</span>
          <button type="button" class="cart-item__quantity-btn" data-action="increase" data-id="${book.id}">+</button>
          <button type="button" class="cart-item__remove-btn" data-action="remove" data-id="${book.id}" title="Видалити">✕</button>
        </div>
      </div>
    `;
  },
};
