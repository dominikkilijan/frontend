import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListElement from './ListElement';

function MyAccount() {
    const { userId } = useParams(); // Pobiera userId z parametru ścieżki

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Fetching files for userId:', userId);

        const fetchFiles = async () => {
            try {
                const response = await fetch(`http://localhost:8080/account?userId=${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setFiles(data);
            } catch (err) {
                console.error('Error fetching files:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchFiles();
        }
    }, [userId]);

    if (!userId) {
        return <div>Błąd: Brak identyfikatora użytkownika w ścieżce URL.</div>;
    }

    if (loading) {
        return <div>Ładowanie danych...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    if (files.length === 0) {
        return <div>Brak plików dla tego użytkownika.</div>;
    }

    return (
        <div style={accountContainerStyle}>
            <h2 style={headerStyle}>Moje nuty</h2>
            <ul style={fileListStyle}>
                {files.map((file) => (
                    <ListElement key={file.id} file={file} />
                ))}
            </ul>
        </div>
    );
}

const accountContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '80vh',
    padding: '20px',
    width: '100%',
    maxWidth: '600px',
    marginTop: '40px',
};

const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const fileListStyle = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
};

export default MyAccount;
