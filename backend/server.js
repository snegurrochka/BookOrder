const express = require('express'); // бібліотека для створення серверного додатка на Node.js
const cors = require('cors');//дозволяє обходити обмеження між джерелами 
const bodyParser = require('body-parser');//Обробляє тіло HTTP-запитів, дозволяючи працювати з JSON-даними
const booksRoute = require('./routes/books');
const ordersRoute = require('./routes/orders');
const clientsRoute = require('./routes/clients');
const reviewsRoute = require('./routes/reviews');

const app = express();

// підключення middleware
app.use(cors());
app.use(bodyParser.json());

// Простий маршрут для перевірки сервера
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Маршрути
app.use('/api/books', booksRoute);
app.use('/api/orders', ordersRoute); 
app.use('/api/clients', clientsRoute);
app.use('/api/reviews', reviewsRoute);

// Запуск сервера
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

