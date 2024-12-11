const db = require('../db');

// Отримання всіх книг
exports.getAllBooks = async (req, res) => {

  const { category, author } = req.query;
  let query = 'SELECT * FROM books';
  const params = [];

  // Фільтрація за категорією
  if (category) {
      query += ' WHERE category = ?';
      params.push(category);
  }

  // Фільтрація за автором
  if (author) {
      query += params.length ? ' AND author LIKE ?' : ' WHERE author LIKE ?';
      params.push(`%${author}%`); // Пошук за частковим збігом
  }

  try {
      const [books] = await db.promise().query(query, params);
      console.log('Fetched books:', books); // Друк результату запиту
      res.json(books);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch books' });
  }
};


// Додавання нової книги
exports.addBook = async (req, res) => {
  const { title, author, category, genre, price, description } = req.body;

  // Перевірка на порожні поля
  if (!title || !author || !category || !price) {
      return res.status(400).json({ error: 'Title, author, category, and price are required' });
  }

  try {
      // Вставка книги у базу даних
      const query = `
          INSERT INTO books (title, author, category, genre, price, description)
          VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [title, author, category, genre || null, price, description || null];
      await db.promise().query(query, params);

      res.status(201).json({ message: 'Книга додана успішно!' });
  } catch (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ error: 'Помилка видалення книги' });
  }
};

// Видалення книги
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
      // Видаляємо всі замовлення, пов'язані з цією книгою
      await db.promise().query('DELETE FROM orders WHERE book_id = ?', [id]);

      // Видаляємо книгу
      const [result] = await db.promise().query('DELETE FROM books WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Book not found' });
      }

      res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ error: 'Internal server error' });
  }
};
