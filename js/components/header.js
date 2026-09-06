import { ui } from "../modules/ui.js";

function createNavLink({ href, label, icon, badgeId, badgeLabel }) {
  const link = document.createElement("a");

  link.className = "nav-button";
  link.href = href;
  link.setAttribute("aria-label", label);

  const iconElement = document.createElement("img");

  iconElement.className = "nav-button__icon-img";
  iconElement.src = icon;
  iconElement.alt = "";

  link.append(iconElement);

  if (badgeId) {
    const badge = document.createElement("span");

    badge.className = "nav-button__badge";
    badge.id = badgeId;
    badge.textContent = "0";
    badge.setAttribute("aria-label", badgeLabel);

    link.append(badge);
  }

  return link;
}

export function createHeader() {
  const header = document.querySelector(".header");

  if (!header) {
    return;
  }

  const container = document.createElement("div");

  container.className = "header__container container";

  /*
   * Logo
   */

  const logo = document.createElement("a");

  logo.className = "logo";
  logo.href = "index.html";
  logo.textContent = "BookStore";
  logo.setAttribute("aria-label", "BookStore — головна");

  /*
   * Search
   */

  const searchWrapper = document.createElement("div");

  searchWrapper.className = "header__search";

  const search = document.createElement("input");

  search.className = "search-input";
  search.type = "";
  search.id = "search-input";
  search.placeholder = "Знайти книгу або автора...";
  search.setAttribute("aria-label", "Пошук книг");

  const searchIcon = document.createElement("span");

  searchIcon.className = "search-input__icon";
  searchIcon.textContent = "⌕";
  searchIcon.setAttribute("aria-hidden", "true");

  const clearButton = document.createElement("button");

  clearButton.className = "search-clear";
  clearButton.type = "button";
  clearButton.textContent = "×";
  clearButton.setAttribute("aria-label", "Очистити пошук");

  clearButton.addEventListener("click", () => {
    search.value = "";

    search.dispatchEvent(
      new Event("input", {
        bubbles: true,
      }),
    );

    search.focus();
  });

  searchWrapper.append(search, searchIcon, clearButton);

  /*
   * Navigation
   */

  const nav = document.createElement("nav");

  nav.className = "header__nav";
  nav.setAttribute("aria-label", "Основна навігація");

  nav.append(
    createNavLink({
      href: "favorites.html",
      label: "Улюблені книги",
      icon: ui.icons.heart,
      badgeId: "favorites-badge",
      badgeLabel: "Кількість улюблених книг",
    }),

    createNavLink({
      href: "cart.html",
      label: "Кошик",
      icon: ui.icons.cart,
      badgeId: "cart-badge",
      badgeLabel: "Кількість товарів у кошику",
    }),
  );

  container.append(logo, searchWrapper, nav);

  header.replaceChildren(container);

  ui.updateBadges();

  return {
    searchInput: search,
  };
}
