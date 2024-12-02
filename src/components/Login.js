import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import openEyeIcon from '../assets/open-eye.svg';
import closedEyeIcon from '../assets/closed-eye.svg';

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

            // Zapisz token JWT w localStorage
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
        <div style={loginContainerStyle}>
            <h2>Zaloguj się</h2>
            <form onSubmit={handleLogin} style={formStyle}>
                <input
                    type="email"
                    placeholder="Adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    required
                />
                <div style={passwordContainerStyle}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Hasło"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        required
                    />
                    <img
                        src={showPassword ? openEyeIcon : closedEyeIcon}
                        alt={showPassword ? "Ukryj hasło" : "Pokaż hasło"}
                        onClick={togglePasswordVisibility}
                        style={eyeIconStyle}
                    />
                </div>
                <button type="submit" style={buttonStyle}>Zaloguj się</button>
                <p onClick={handleRegisterClick} style={registerTextStyle}>
                    Nie masz konta? <span>Zarejestruj się</span>
                </p>
            </form>
        </div>
    );
}

const loginContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    backgroundColor: '#e0f2f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '400px',
    marginTop: '40px',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '400px',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
};

const passwordContainerStyle = {
    position: 'relative',
    width: '100%',
};

const eyeIconStyle = {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    width: '20px',
    height: '20px',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#66bb6a',
    color: '#fff',
    borderRadius: '5px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
};

const registerTextStyle = {
    marginTop: '15px',
    fontSize: '14px',
    color: '#388e3c',
    cursor: 'pointer',
    textDecoration: 'underline',
    textAlign: 'center',
};

export default Login;
