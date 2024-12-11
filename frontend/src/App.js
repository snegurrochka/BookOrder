import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import AuthPage from './components/AuthPage';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
    const [userRole, setUserRole] = useState(null); // Стан для ролі користувача

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const payload = JSON.parse(atob(token.split('.')[1])); // Розшифровуємо токен
              if (Date.now() < payload.exp * 1000) {
                  setUserRole(payload.role); // Встановлюємо роль
              } else {
                  localStorage.removeItem('token'); // Видаляємо протермінований токен
              }
          } catch (error) {
              console.error('Invalid token:', error);
              setUserRole(null);
          }
      }
  }, []);
  
  

    return (
        <Router>
            <nav className="navbar">
                <ul className="nav-links">
                    <li><Link to="/">Books</Link></li>
                    <li><Link to="/order">Order</Link></li>
                    <li><Link to="/auth">Login/Register</Link></li>
                    {userRole === 'admin' ? (
                        <li><Link to="/admin">Admin Panel</Link></li>
                    ) : null}
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<BookList />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/auth" element={<AuthPage />} />
                {userRole === 'admin' ? (
                    <Route path="/admin" element={<AdminPanel />} />
                ) : (
                    <Route path="/admin" element={<Navigate to="/auth" replace />} />
                )}

            </Routes>
        </Router>
    );
}

export default App;
