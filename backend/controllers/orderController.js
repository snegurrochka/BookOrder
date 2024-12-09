const db = require('../db');

// Створення замовлення
exports.createOrder = async (req, res) => {
    const { customer_name, customer_phone, book_id } = req.body;

    // Перевірка на порожні поля
    if (!customer_name || !customer_phone || !book_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Вставка замовлення у базу даних
        const [result] = await db.promise().query(
            'INSERT INTO orders (customer_name, customer_phone, book_id) VALUES (?, ?, ?)',
            [customer_name, customer_phone, book_id]
        );

        // Повернення успішного результату
        res.status(201).json({
            message: 'Order created successfully',
            orderId: result.insertId, // ID створеного замовлення
        });
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
                b.title AS book_title, 
                b.author AS book_author, 
                b.category AS book_category
            FROM orders o
            JOIN books b ON o.book_id = b.id
        `);

        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Отримання замовлення за ID (за потреби)
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const [order] = await db.promise().query(`
            SELECT 
                o.id AS order_id, 
                o.customer_name, 
                o.customer_phone, 
                b.title AS book_title, 
                b.author AS book_author, 
                b.category AS book_category
            FROM orders o
            JOIN books b ON o.book_id = b.id
            WHERE o.id = ?
        `, [id]);

        if (order.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order[0]);
    } catch (err) {
        console.error('Error fetching order by ID:', err);
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};
