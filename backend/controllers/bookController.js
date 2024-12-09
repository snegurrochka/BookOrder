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
    const { title, author, category } = req.body;

    if (!title || !author || !category) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        await db.promise().query('INSERT INTO books (title, author, category) VALUES (?, ?, ?)', [title, author, category]);
        res.status(201).json({ message: 'Book added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add book' });
    }
};
