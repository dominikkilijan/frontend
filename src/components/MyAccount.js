import React, { useState } from 'react';
import ListElement from './ListElement';

function MyAccount() {
    const files = Array.from({ length: 25 }, (_, i) => ({
        name: `Test${i + 1}`,
        dateAdded: "2023-11-12",
        file: '/Test.xml'
    }));

    const filesPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(files.length / filesPerPage);
    const startIndex = (currentPage - 1) * filesPerPage;
    const currentFiles = files.slice(startIndex, startIndex + filesPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div style={accountContainerStyle}>
            <h2 style={headerStyle}>Moje nuty</h2>
            <ul style={fileListStyle}>
                {currentFiles.map((file, index) => (
                    <ListElement key={index} file={file} />
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
                <span style={pageIndicatorStyle}>Strona {currentPage} z {totalPages}</span>
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

const fileItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
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
