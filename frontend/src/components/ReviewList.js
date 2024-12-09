import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewList.css';

const ReviewList = ({ bookId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/reviews/${bookId}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };

    const handleAddReview = async () => {
        try {
            const userId = 1; // Замените на текущий userId из токена
            await axios.post(`http://localhost:3001/api/reviews/${bookId}`, {
                userId,
                ...newReview,
            });
            fetchReviews();
            setNewReview({ rating: '', comment: '' });
        } catch (error) {
            console.error('Error adding review:', error);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [bookId]);

    return (
        <div className="review-list">
            <h3>Reviews</h3>
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
                <h4>Add a Review</h4>
                <select
                    name="rating"
                    value={newReview.rating}
                    onChange={handleInputChange}
                >
                    <option value="">Rating</option>
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
                    placeholder="Write your review here"
                ></textarea>
                <button onClick={handleAddReview}>Submit</button>
            </div>
        </div>
    );
};

export default ReviewList;
