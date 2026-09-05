export const filter = {
  apply(
    booksList,
    { minPrice = null, maxPrice = null, sort = "default", query = "" },
  ) {
    let result = [...booksList];

    // Фільтрація за ціною (від/до)
    if (minPrice !== null && !isNaN(minPrice)) {
      result = result.filter((book) => book.price >= minPrice);
    }
    if (maxPrice !== null && !isNaN(maxPrice)) {
      result = result.filter((book) => book.price <= maxPrice);
    }

    // Сортування
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  },
};
