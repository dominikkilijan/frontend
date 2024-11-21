import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Login from './components/Login';
import Register from './components/Register';
import MyAccount from './components/MyAccount';

function App() {
    return (
        <Router>
            <Header />
            <main style={mainStyle}>
                <Routes>
                    <Route path="/" element={<FileUpload />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account/:userId" element={<MyAccount />} />
                </Routes>
            </main>
        </Router>
    );
}

const mainStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '20px',
};

export default App;
