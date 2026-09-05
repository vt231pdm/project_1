export const search = {
  byQuery(booksList, query) {
    if (!query || query.trim() === "") {
      return booksList; // Якщо поле порожнє, повертаємо весь масив
    }

    const q = query.toLowerCase().trim();

    return booksList.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q),
    );
  },
};
