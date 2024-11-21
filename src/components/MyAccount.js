import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListElement from './ListElement';

function MyAccount() {
    const { userId } = useParams();

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const filesPerPage = 10;
    const totalPages = Math.ceil(files.length / filesPerPage);

    const startIndex = (currentPage - 1) * filesPerPage;
    const currentFiles = files.slice(startIndex, startIndex + filesPerPage);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`http://localhost:8080/account?userId=${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setFiles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFiles();
    }, [userId]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

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
                {currentFiles.map((file) => (
                    <ListElement key={file.id} file={file} />
                ))}
            </ul>
            <div style={paginationStyle}>
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    style={paginationButtonStyle}
                >
                    Poprzednia
                </button>
                <span style={pageIndicatorStyle}>
                    Strona {currentPage} z {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    style={paginationButtonStyle}
                >
                    Następna
                </button>
            </div>
        </div>
    );
}

const accountContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '80vh',
    backgroundColor: '#e0f2f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    width: '100%',
    maxWidth: '600px',
    marginTop: '40px',
    position: 'relative',
};

const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    width: '100%',
};

const fileListStyle = {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    maxWidth: '500px',
};

const paginationStyle = {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '500px',
};

const paginationButtonStyle = {
    padding: '8px 16px',
    backgroundColor: '#66bb6a',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
};

const pageIndicatorStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
};

export default MyAccount;
