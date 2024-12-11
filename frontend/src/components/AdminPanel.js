import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css'; // Підключення CSS для стилізації

const AdminPanel = () => {
    const [books, setBooks] = useState([]);
    const [orders, setOrders] = useState([]); // Додано для списку замовлень
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        category: '',
        genre: '',
        price: '',
        description: '',
    });

    useEffect(() => {
        fetchBooks();
        fetchOrders(); // Отримання замовлень при завантаженні
    }, []);

    // Отримання списку книг
    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/books');
            setBooks(response.data);
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    };

    // Отримання списку замовлень
    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3001/api/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    // Додавання книги
    const handleAddBook = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3001/api/books', newBook, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBooks();
            setNewBook({
                title: '',
                author: '',
                category: '',
                genre: '',
                price: '',
                description: '',
            });
        } catch (err) {
            console.error('Error adding book:', err);
        }
    };

    // Видалення книги
    const handleDeleteBook = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3001/api/books/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchBooks();
        } catch (err) {
            console.error('Error deleting book:', err);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>

            {/* Форма додавання книги */}
            <div className="book-management">
                <h2>Додати Нову Книгу</h2>
                <input
                    type="text"
                    placeholder="Назва"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Автор"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Категорія"
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Жанр"
                    value={newBook.genre}
                    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Ціна"
                    value={newBook.price}
                    onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                />
                <textarea
                    placeholder="Опис"
                    value={newBook.description}
                    onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                ></textarea>
                <button onClick={handleAddBook}>Додати книгу</button>
            </div>

            {/* Список книг */}
            <div className="book-list">
                <h2>Список Книг</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <strong>{book.title}</strong> - {book.author}{' '}
                            <button onClick={() => handleDeleteBook(book.id)}>Видалити</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Список замовлень */}
            <div className="order-list">
                <h2>Список Замовлень</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID Замовлення</th>
                            <th>Ім'я Клієнта</th>
                            <th>Телефон</th>
                            <th>Книга</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_phone}</td>
                                <td>{order.book_title}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPanel;
