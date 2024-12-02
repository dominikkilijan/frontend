import React from 'react';
import { useNavigate } from 'react-router-dom';

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
        <header style={headerStyle}>
            <h1 onClick={handleHomeClick} style={homeStyle}>Praca inżynierska</h1>
            <div style={buttonGroupStyle}>
                {
                    <button onClick={handleAccountClick} style={accountButtonStyle}>
                        Moje konto
                    </button>
                }
                {isLoggedIn && (
                    <button onClick={handleLogout} style={accountButtonStyle}>
                        Wyloguj się
                    </button>
                )}
            </div>
        </header>
    );
}

const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#66bb6a',
    color: '#fff',
};

const homeStyle = {
    cursor: 'pointer',
};

const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
};

const accountButtonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
};

export default Header;
