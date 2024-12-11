import React, { useState, useEffect } from 'react';
import './BookList.css'; // Подключаем стили
import ReviewList from './ReviewList'; // Подключаем отзывы

const BookList = () => {
    const [books, setBooks] = useState([]); // Список книг
    const [categories, setCategories] = useState(['All', 'Fiction', 'Adventure', 'Fantasy', 'Dystopian']); // Категории
    const [selectedCategory, setSelectedCategory] = useState('All'); // Выбранная категория
    const [author, setAuthor] = useState(''); //Текст, введений користувачем для пошуку за автором

    // Запрос к серверу при изменении категории или автора
    useEffect(() => { //Виконує запит до сервера щоразу, коли змінюється обрана категорія або текст автора.
        let url = 'http://localhost:3001/api/books';
        const params = [];

        if (selectedCategory !== 'All') {
            params.push(`category=${selectedCategory}`);
        }

        if (author) {
            params.push(`author=${author}`);
        }

        if (params.length > 0) {
            url += `?${params.join('&')}`;
        }

        //Використовується fetch для отримання списку книг
        fetch(url)
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error('Error fetching books:', err));
    }, [selectedCategory, author]);

    return (
        <div className="book-list-container">
            <h1 className="title">Каталог книг</h1>

            {/* Фильтры */}
            <div className="filters">
                {/* Фильтр по категории */}
                <div className="filter-item">
                    <label htmlFor="category" className="filter-label">Сортувати за категорією:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}//onChange оновлює стан selectedCategory
                        className="filter-select"
                    >
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Поиск по автору */}
                <div className="filter-item">
                    <label htmlFor="author" className="filter-label">Пошук за автором:</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)} //onChange оновлює стан author
                        placeholder="Enter author name"
                        className="filter-input"
                    />
                </div>
            </div>

            {/* Список книг */}
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        <h3 className="book-title">{book.title}</h3>
                        <p className="book-author">Автор: {book.author}</p>
                        <p className="book-category">Категорія: {book.category}</p>
                        <p className="book-price">Ціна: {book.price} $</p> 

                        {/* Отзывы */}
                        <ReviewList bookId={book.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
