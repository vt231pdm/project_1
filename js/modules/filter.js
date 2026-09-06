function isValidPrice(value) {
  return value === null || (Number.isFinite(value) && value >= 0);
}

export const filter = {
  apply(
    booksList,
    { minPrice = null, maxPrice = null, sort = "default" } = {},
  ) {
    let result = [...booksList];

    if (isValidPrice(minPrice) && minPrice !== null) {
      result = result.filter((book) => book.price >= minPrice);
    }

    if (isValidPrice(maxPrice) && maxPrice !== null) {
      result = result.filter((book) => book.price <= maxPrice);
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title, "uk-UA"));
        break;

      default:
        break;
    }

    return result;
  },
};
