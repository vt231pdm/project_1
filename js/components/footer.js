export function createFooter() {
  const footer = document.querySelector(".footer");

  if (!footer) {
    return;
  }

  const container = document.createElement("div");

  container.className = "footer__container container";

  const top = document.createElement("div");

  top.className = "footer__top";

  const logo = document.createElement("a");

  logo.className = "footer__logo";
  logo.href = "index.html";
  logo.textContent = "BookStore";

  const description = document.createElement("p");

  description.className = "footer__description";

  description.textContent = "Книги, які хочеться читати.";

  top.append(logo, description);

  const bottom = document.createElement("div");

  bottom.className = "footer__bottom";

  const text = document.createElement("p");

  text.className = "footer__text";

  text.textContent = `© ${new Date().getFullYear()} BookStore. Навчальний проєкт.`;

  bottom.append(text);

  container.append(top, bottom);

  footer.replaceChildren(container);
}
