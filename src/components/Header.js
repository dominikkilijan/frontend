import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const handleAccountClick = () => {
        navigate('/login');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <header style={headerStyle}>
            <h1 onClick={handleHomeClick} style={homeStyle}>Praca inżynierska</h1>
            <button onClick={handleAccountClick} style={accountButtonStyle}>
                Moje konto
            </button>
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

const accountButtonStyle = {
    backgroundColor: 'transparent',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
};

export default Header;
