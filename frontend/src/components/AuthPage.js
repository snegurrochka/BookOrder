import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // true — логин, false — регистрация
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [message, setMessage] = useState(''); // Сообщение об ошибке или успехе

    const handleToggle = () => {
        setIsLogin(!isLogin);
        setMessage(''); // Очистка сообщений при переключении
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isLogin) {
                // Логика логина
                const response = await axios.post('http://localhost:3001/api/clients/login', {
                    email: formData.email,
                    password: formData.password,
                });
                setMessage('Login successful!');
                localStorage.setItem('token', response.data.token); // Сохранение токена
            } else {
                // Логика регистрации
                const response = await axios.post('http://localhost:3001/api/clients/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                setMessage('Registration successful!');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                {/* Поле для имени только при регистрации */}
                {!isLogin && (
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit" className="auth-button">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>

            {/* Сообщение об успехе или ошибке */}
            {message && <p className="auth-message">{message}</p>}

            {/* Переключение между логином и регистрацией */}
            <p className="auth-toggle">
                {isLogin ? (
                    <>
                        Don't have an account?{' '}
                        <span onClick={handleToggle} className="auth-link">
                            Register here!
                        </span>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <span onClick={handleToggle} className="auth-link">
                            Login here!
                        </span>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthPage;
