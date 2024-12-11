const db = require('../db');
const bcrypt = require('bcrypt'); // хешування паролів
const jwt = require('jsonwebtoken');// Генерація токенів для авторизації

// Секретний ключ для шифрування токенів
const SECRET_KEY = 'secretkey';

// Реєстрація користувача
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [existingUser] = await db.promise().query('SELECT * FROM clients WHERE email = ?', [email]);
        if (existingUser.length) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        // Пароль хешується
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.promise().query('INSERT INTO clients (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Авторизація користувача
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [user] = await db.promise().query('SELECT * FROM clients WHERE email = ?', [email]);
        if (!user.length) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // чи збігається введений пароль із хешованим у базі даних
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        // Генерація токена
        const token = jwt.sign({ id: user[0].id, role: user[0].role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
