import { storage } from "./storage.js";

const ICONS = Object.freeze({
  heart: "img/icons/heart.png",
  heartActive: "img/icons/red_heart.png",
  cart: "img/icons/shopping-cart.png",
});

function createElement(tag, className = "", text = "") {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }

  if (text) {
    element.textContent = text;
  }

  return element;
}

function createImage(src, alt, className) {
  const element = document.createElement("img");

  element.src = src;
  element.alt = alt;
  element.className = className;

  element.addEventListener(
    "error",
    () => {
      element.hidden = true;
    },
    { once: true },
  );

  return element;
}

export const ui = {
  icons: ICONS,

  updateBadges() {
    const favoritesBadge = document.getElementById("favorites-badge");

    const cartBadge = document.getElementById("cart-badge");

    if (favoritesBadge) {
      favoritesBadge.textContent = String(storage.getFavorites().length);
    }

    if (cartBadge) {
      const count = storage
        .getCart()
        .reduce((sum, item) => sum + item.quantity, 0);

      cartBadge.textContent = String(count);
    }
  },

  createCard(book, isFavorite = false) {
    const article = createElement("article", "card");

    article.dataset.id = String(book.id);

    const favoriteButton = createElement(
      "button",
      `card__favorite-btn${isFavorite ? " is-active" : ""}`,
    );

    favoriteButton.type = "button";
    favoriteButton.dataset.favId = String(book.id);

    favoriteButton.setAttribute("aria-pressed", String(isFavorite));

    favoriteButton.setAttribute(
      "aria-label",
      isFavorite
        ? `Видалити «${book.title}» з улюбленого`
        : `Додати «${book.title}» до улюбленого`,
    );

    const favoriteIcon = createImage(
      isFavorite ? ICONS.heartActive : ICONS.heart,
      "",
      "card__favorite-icon",
    );

    favoriteButton.append(favoriteIcon);

    const imageWrap = createElement("div", "card__image-wrap");

    const cover = createImage(
      book.image,
      `Обкладинка: ${book.title}`,
      "card__image",
    );

    cover.loading = "lazy";

    imageWrap.append(cover);

    const content = createElement("div", "card__content");

    content.append(createElement("h3", "card__title", book.title));

    content.append(createElement("span", "card__author", book.author));

    const footer = createElement("div", "card__footer");

    footer.append(createElement("span", "card__price", `${book.price} грн`));

    const cartButton = createElement(
      "button",
      "btn btn--primary btn--sm",
      "В кошик",
    );

    cartButton.type = "button";

    cartButton.dataset.cartId = String(book.id);

    cartButton.setAttribute("aria-label", `Додати «${book.title}» до кошика`);

    footer.append(cartButton);
    content.append(footer);

    article.append(favoriteButton, imageWrap, content);

    return article;
  },

  createCartItem(book, quantity) {
    const article = createElement("article", "cart-item");

    article.dataset.id = String(book.id);

    const cover = createImage(
      book.image,
      `Обкладинка: ${book.title}`,
      "cart-item__image",
    );

    cover.loading = "lazy";

    const info = createElement("div", "cart-item__info");

    info.append(
      createElement("h3", "cart-item__title", book.title),
      createElement("p", "cart-item__author", book.author),
      createElement("span", "cart-item__price", `${book.price} грн за шт.`),
    );

    const controls = createElement("div", "cart-item__controls");

    const decrease = createElement("button", "cart-item__quantity-btn", "−");

    decrease.type = "button";
    decrease.dataset.action = "decrease";
    decrease.dataset.id = String(book.id);

    decrease.setAttribute("aria-label", `Зменшити кількість «${book.title}»`);

    const quantityElement = createElement(
      "output",
      "cart-item__quantity",
      String(quantity),
    );

    quantityElement.setAttribute("aria-label", `Кількість «${book.title}»`);

    const increase = createElement("button", "cart-item__quantity-btn", "+");

    increase.type = "button";
    increase.dataset.action = "increase";
    increase.dataset.id = String(book.id);

    increase.setAttribute("aria-label", `Збільшити кількість «${book.title}»`);

    const remove = createElement("button", "cart-item__remove-btn", "✕");

    remove.type = "button";
    remove.dataset.action = "remove";
    remove.dataset.id = String(book.id);

    remove.setAttribute("aria-label", `Видалити «${book.title}» з кошика`);

    controls.append(decrease, quantityElement, increase, remove);

    article.append(cover, info, controls);

    return article;
  },
};
