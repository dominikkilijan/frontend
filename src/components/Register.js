import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import openEyeIcon from '../assets/open-eye.svg';
import closedEyeIcon from '../assets/closed-eye.svg';
import axios from "axios";

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
        <div style={registerContainerStyle}>
            <h2>Zarejestruj się</h2>
            <form onSubmit={handleRegister} style={formStyle}>
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
                        onChange={handlePasswordChange}
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
                <div style={passwordContainerStyle}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Powtórz hasło"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={{ ...inputStyle, borderColor: passwordMatch ? '#ccc' : 'red' }}
                        required
                    />
                    <img
                        src={showConfirmPassword ? openEyeIcon : closedEyeIcon}
                        alt={showConfirmPassword ? "Ukryj hasło" : "Pokaż hasło"}
                        onClick={toggleConfirmPasswordVisibility}
                        style={eyeIconStyle}
                    />
                </div>
                {!passwordMatch && (
                    <p style={errorTextStyle}>Hasła nie są identyczne</p>
                )}
                <button type="submit" style={buttonStyle}>Zarejestruj się</button>
            </form>
        </div>
    );
}

const registerContainerStyle = {
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

const errorTextStyle = {
    color: 'red',
    fontSize: '14px',
    margin: '5px 0',
};

export default Register;
