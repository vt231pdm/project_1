export function renderFooter() {
  const footer = document.querySelector("footer");

  footer.innerHTML = `
      <div class="container footer__container">
        <p class="footer__copyright">© 2026 BookStore. Усі права захищені.</p>
        <div class="footer__contacts">
          <span>Контакти: info@bookstore.ua</span>
        </div>
      </div>
  `;
}
