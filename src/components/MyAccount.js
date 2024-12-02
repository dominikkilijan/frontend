import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ListElement from './ListElement';
import '../styles/MyAccount.css';

function MyAccount() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();
    const filesPerPage = 10;
    const totalPages = Math.ceil(files.length / filesPerPage);

    const startIndex = (currentPage - 1) * filesPerPage;
    const currentFiles = files.slice(startIndex, startIndex + filesPerPage);

    useEffect(() => {
        const fetchFiles = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                alert('Musisz być zalogowany, aby zobaczyć swoje pliki.');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/account', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

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
    }, [navigate]);

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
        <div className="account-container">
            <h2 className="account-header">Moje nuty</h2>
            <ul className="file-list">
                {currentFiles.map((file) => (
                    <ListElement key={file.id} file={file} onFileDelete={(fileId) =>
                        setFiles((prevFiles) => prevFiles.filter((f) => f.id !== fileId))
                    } />
                ))}
            </ul>
            <div className="pagination">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-button"
                >
                    Poprzednia
                </button>
                <span className="page-indicator">
                    Strona {currentPage} z {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                >
                    Następna
                </button>
            </div>
        </div>
    );
}

export default MyAccount;
