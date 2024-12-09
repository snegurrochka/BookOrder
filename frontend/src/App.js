import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import AuthPage from './components/AuthPage';
import './App.css';

function App() {
    return (
        <Router>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Books</Link></li>
                    <li><Link to="/order">Order</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/auth">Login/Register</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/orders" element={<OrderList />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default App;
