import React, { useState } from 'react'; //стан для перемикання між логіном і реєстрацією
import axios from 'axios'; //відправки http-запитів до бекенду 
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // true — логин, false — регистрация
    const [formData, setFormData] = useState({ email: '', password: '', name: '' }); //Об'єкт для зберігання введених даних 
    const [message, setMessage] = useState(''); // Сообщение об ошибке или успехе

    //Функція перемикання між формами
    const handleToggle = () => {
        setIsLogin(!isLogin);// Перемикає між логіном і реєстрацією
        setMessage(''); // Очистка сообщений при переключении
    };

    //Обробка зміни полів вводу
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value }); //Оновлює значення у стані formData під час введення даних користувачем.
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            if (isLogin) {
                const response = await axios.post('http://localhost:3001/api/clients/login', {
                    email: formData.email,
                    password: formData.password,
                });
                setMessage('Авторизація успішна!');
                localStorage.setItem('token', response.data.token); // Зберігаємо токен
                window.location.reload();
            } else {
                const response = await axios.post('http://localhost:3001/api/clients/register', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                setMessage('Реєстрація успішна!');
            }
        } catch (error) {
            setMessage(error.response?.data?.error || 'Щось пішло не так. Спробуйте знову.');
        }
    };
  

    return (
        <div className="auth-container">
            {/* динамічний заголовок*/}
            <h1>{isLogin ? 'Login' : 'Register'}</h1> 
            <form onSubmit={handleSubmit} className="auth-form">
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
                    {/* динамічна кнопка */} 
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>

            {/* Сообщение об успехе или ошибке */}
            {message && <p className="auth-message">{message}</p>}

            {/* Переключение между логином и регистрацией */}
            <p className="auth-toggle">
                {isLogin ? (
                    <>
                        Немає аккаунту?{' '}
                        <span onClick={handleToggle} className="auth-link">
                            Зареєструйтеся!
                        </span>
                    </>
                ) : (
                    <>
                        Вже є аккаунт?{' '}
                        <span onClick={handleToggle} className="auth-link">
                            Увійдіть тут!
                        </span>
                    </>
                )}
            </p>
        </div>
    );
};

export default AuthPage;
