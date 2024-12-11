const db = require('../db');

// Створення замовлення
exports.createOrder = async (req, res) => {
  const { customer_name, customer_phone, book_id } = req.body;

  if (!customer_name || !customer_phone || !book_id) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      const [result] = await db.promise().query(
          'INSERT INTO orders (customer_name, customer_phone, book_id) VALUES (?, ?, ?)',
          [customer_name, customer_phone, book_id]
      );
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
  } catch (err) {
      console.error('Error inserting order:', err);
      res.status(500).json({ error: 'Failed to create order' });
  }
};

// Отримання всіх замовлень
exports.getAllOrders = async (req, res) => {
  try {
      const [orders] = await db.promise().query(`
          SELECT 
              o.id AS order_id, 
              o.customer_name, 
              o.customer_phone, 
              b.title AS book_title
          FROM orders o
          JOIN books b ON o.book_id = b.id
      `);
      res.json(orders || []); // Завжди повертаємо масив
  } catch (err) {
      console.error('Error fetching orders:', err);
      res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

