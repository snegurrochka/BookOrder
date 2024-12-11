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
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Будь ласка, увійдіть до системи, щоб створити замовлення.');
            return;
        }
    
        fetch('http://localhost:3001/api/books', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => {
                console.error('Error fetching books:', err);
                setError('Не вдалося завантажити список книг.');
            });
    }, []);
  

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Ви не авторизовані. Будь ласка, увійдіть у систему.');
            return;
        }
    
        if (!name || !phone || !bookId) {
            setError('Заповніть всі поля');
            return;
        }
    
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
                    setSuccess(`Замовлення успішно створене! ID замовлення: ${data.orderId}`);
                    setName('');
                    setPhone('');
                    setBookId('');
                }
            })
            .catch(() => {
                setError('Щось пішло не так. Будь ласка, спробуйте ще раз.');
                setSuccess('');
            });
    };
  

    return (
        <form className="order-form" onSubmit={handleSubmit}>
            <h2>Order a Book</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
            <div className="form-group">
                <label>Ваше ім'я:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Номер телефону:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Книга:</label>
                <select
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    required
                >
                    <option value="">Оберіть книгу:</option>
                    {books.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.title}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Створити замовлення</button>
        </form>
    );
};

export default OrderForm;
