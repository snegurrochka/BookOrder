import React, { useState, useEffect } from 'react';
import './OrderForm.css';

const OrderForm = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [bookId, setBookId] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Завантаження книг для випадаючого списку
        fetch('http://localhost:3001/api/books')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error('Error fetching books:', err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Перевірка на порожні поля
        if (!name || !phone || !bookId) {
            setError('All fields are required');
            return;
        }

        // Надсилання даних на сервер
        const token = localStorage.getItem('token');
        fetch('http://localhost:3001/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                customer_name: name,
                customer_phone: phone,
                book_id: bookId,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setSuccess('');
                } else {
                    setError('');
                    setSuccess(`Order created successfully! Order ID: ${data.orderId}`);
                    setName('');
                    setPhone('');
                    setBookId('');
                }
            })
            .catch(() => {
                setError('Something went wrong. Please try again.');
                setSuccess('');
            });
    };

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <h2>Order a Book</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <div className="form-group">
                <label>Your Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Your Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Book:</label>
                <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                >
                    <option value="">Select a Book</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Submit Order</button>
        </form>
    );
};

export default OrderForm;
