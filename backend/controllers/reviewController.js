const db = require('../db');

// Отримати відгуки для книги
exports.getReviewsForBook = (req, res) => {
    const { bookId } = req.params;

    const query = `
        SELECT r.id, r.rating, r.comment, r.created_at, c.name AS user_name
        FROM reviews r
        JOIN clients c ON r.user_id = c.id
        WHERE r.book_id = ?
        ORDER BY r.created_at DESC
    `;

    db.query(query, [bookId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch reviews' });
        }

        res.json(results);
    });
};

// Додати відгук
exports.addReview = (req, res) => {
    const { bookId } = req.params;
    const { userId, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const query = `
        INSERT INTO reviews (book_id, user_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [bookId, userId, rating, comment], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to add review' });
        }

        res.status(201).json({ message: 'Review added successfully' });
    });
};
