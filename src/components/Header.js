import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
    const navigate = useNavigate();

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        navigate('/login');
    };

    const isLoggedIn = !!localStorage.getItem('jwt');

    return (
        <header className="header">
            <h1 onClick={handleHomeClick} className="home">Praca inżynierska</h1>
            <div className="button-group">
                <button onClick={handleAccountClick} className="button">
                    Moje konto
                </button>
                {isLoggedIn && (
                    <button onClick={handleLogout} className="button">
                        Wyloguj się
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
