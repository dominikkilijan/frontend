import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import openEyeIcon from '../assets/open-eye.svg';
import closedEyeIcon from '../assets/closed-eye.svg';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/auth/login', null, {
                params: {
                    email: email,
                    password: password,
                },
            });

            const token = response.data;

            localStorage.setItem('jwt', token);

            alert('Zalogowano pomyślnie!');
            navigate('/account');
        } catch (error) {
            if (error.response?.status === 401) {
                alert('Nieprawidłowe dane logowania.');
            } else {
                alert('Wystąpił błąd podczas logowania: ' + error.message);
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Zaloguj się</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    required
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                        required
                    />
                    <img
                        src={showPassword ? openEyeIcon : closedEyeIcon}
                        alt={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                        onClick={togglePasswordVisibility}
                        className="eye-icon"
                    />
                </div>
                <button type="submit" className="login-button">Zaloguj się</button>
                <p onClick={handleRegisterClick} className="register-text">
                    Nie masz konta? <span>Zarejestruj się</span>
                </p>
            </form>
        </div>
    );
}

export default Login;
