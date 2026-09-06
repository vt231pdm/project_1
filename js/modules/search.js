function normalize(value) {
  return String(value ?? "")
    .trim()
    .toLocaleLowerCase("uk-UA");
}

export const search = {
  byQuery(booksList, query) {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) {
      return [...booksList];
    }

    return booksList.filter((book) => {
      const title = normalize(book.title);

      const author = normalize(book.author);

      return (
        title.includes(normalizedQuery) || author.includes(normalizedQuery)
      );
    });
  },
};
