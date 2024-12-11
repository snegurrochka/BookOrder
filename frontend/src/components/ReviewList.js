import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

    //Функція для отримання відгуків
    const fetchReviews = async () => {
        try {
            // Виконує запит до API для отримання відгуків для конкретної книги
            const response = await axios.get(`http://localhost:3001/api/reviews/${bookId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    //Оновлює значення полів rating і comment у стані newReview, коли користувач вводить дані
    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    //Додавання нового відгуку
    const handleAddReview = async () => {
        try {
            const userId = 1; 
            await axios.post(`http://localhost:3001/api/reviews/${bookId}`, {
                userId,
                ...newReview,
            });
            fetchReviews(); //Оновлює список відгуків
            setNewReview({ rating: '', comment: '' }); // Очищає форму
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [bookId]);

    return (
        <div className="review-list">
            <h3>Відгуки</h3>
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <strong>{review.user_name}</strong> rated {review.rating}/5
                        <p>{review.comment}</p>
                        <small>{new Date(review.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
            <div className="add-review">
                <h4>Додати відгук</h4>
                <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                >
                    <option value="">Оцінка</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
                <textarea
                    name="comment"
                    value={newReview.comment}
                    onChange={handleInputChange}
                    placeholder="Напиши свій відгук тут"
                ></textarea>
                <button onClick={handleAddReview}>Відправити</button>
            </div>
        </div>
    );
};

export default ReviewList;
