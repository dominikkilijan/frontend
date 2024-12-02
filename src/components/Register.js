import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import openEyeIcon from '../assets/open-eye.svg';
import closedEyeIcon from '../assets/closed-eye.svg';
import axios from "axios";
import './Register.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Hasła nie są identyczne!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', {
                email: email,
                password: password,
            });

            if (response.status === 201) {
                alert('Rejestracja zakończona sukcesem!');
                navigate('/login');
            }
        } catch (error) {
            alert('Wystąpił błąd podczas rejestracji: ' + error.response?.data?.message || error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordMatch(password === e.target.value);
    };

    return (
        <div className="register-container">
            <h2>Zarejestruj się</h2>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="email"
                    placeholder="Adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                    required
                />
                <div className="password-container">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Hasło"
                        value={password}
                        onChange={handlePasswordChange}
                        className="register-input"
                        required
                    />
                    <img
                        src={showPassword ? openEyeIcon : closedEyeIcon}
                        alt={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                        onClick={togglePasswordVisibility}
                        className="eye-icon"
                    />
                </div>
                <div className="password-container">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Powtórz hasło"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        className={`register-input ${passwordMatch ? '' : 'input-error'}`}
                        required
                    />
                    <img
                        src={showConfirmPassword ? openEyeIcon : closedEyeIcon}
                        alt={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
                        onClick={toggleConfirmPasswordVisibility}
                        className="eye-icon"
                    />
                </div>
                {!passwordMatch && (
                    <p className="error-text">Hasła nie są identyczne</p>
                )}
                <button type="submit" className="register-button">Zarejestruj się</button>
            </form>
        </div>
    );
}

export default Register;
