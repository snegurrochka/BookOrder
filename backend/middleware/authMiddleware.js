const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey'; // Используйте тот же ключ, что и в auth

// Middleware для проверки роли admin
const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        console.log('Payload:', payload);

        if (payload.role !== 'admin') {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        req.user = payload; // Можно добавить пользователя в запрос для дальнейшего использования
        next();
    } catch (err) {
      return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateAdmin;
