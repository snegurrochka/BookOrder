import React, { useState, useEffect } from 'react';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/orders')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setOrders(data); // Якщо це масив, зберігаємо його
                } else {
                    setOrders([]); // Інакше встановлюємо порожній масив
                }
            })
            .catch((err) => console.error('Error fetching orders:', err));
    }, []);

    return (
        <div className="order-list-container">
            <h1 className="order-list-title">Order List</h1>
            <table className="order-list">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Book Title</th>
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
    );
};

export default OrderList;
