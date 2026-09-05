export function renderHeader({ showSearch = false } = {}) {
  const header = document.querySelector("header");

  header.innerHTML = `
      <div class="container header__container">
        <a href="index.html" class="logo">
          <img src="img/icons/book.png" alt="BookStore" class="logo__icon-img">
          <span>BookStore</span> 
        </a>

        ${
          showSearch
            ? `<div class="search-bar">
          <input
            type="text"
            id="search-input"
            class="search-bar__input"
            placeholder="Пошук за назвою або автором..."
            autocomplete="off"
          />
          <button type="button" class="search-bar__button" aria-label="Знайти">
                <img src="img/icons/search.png" alt="Пошук" class="icon-img icon-img--search">
              </button>
          
          </div>`
            : ""
        } 
        
        <nav class="header__nav">
          <a href="favorites.html" class="nav-button" title="Улюблені">
            <img src="/img/icons/heart.png" alt="Улюблені" class="icon-img nav-button__icon-img"/>
            <span class="nav-button__text">Улюблені</span>
            <span class="badge" id="favorites-badge">0</span>
          </a>
          <a href="cart.html" class="nav-button" title="Кошик">
            <img src="/img/icons/shopping-cart.png" alt="Кошик" class="icon-img nav-button__icon-img"/>
            <span class="nav-button__text">Кошик</span>
            <span class="badge" id="cart-badge">0</span>
          </a>
        </nav>
      </div>
  `;
}
