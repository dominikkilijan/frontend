import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Wybierz plik PDF, który chcesz przesłać.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const token = localStorage.getItem('jwt'); // Pobierz token JWT z localStorage, jeśli istnieje

            // Przygotowanie nagłówków
            const headers = {
                'Content-Type': 'multipart/form-data',
            };

            if (token) {
                headers.Authorization = `Bearer ${token}`; // Dodaj nagłówek Authorization tylko, jeśli token istnieje
            }

            const response = await axios.post('http://localhost:8080/process', formData, {
                responseType: 'blob',
                headers, // Przekazanie dynamicznych nagłówków
            });

            const contentDisposition = response.headers['content-disposition'];
            let filename = 'converted.mxl';

            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                }
            }

            const blob = new Blob([response.data], { type: 'application/vnd.recordare.musicxml+xml' });
            const downloadUrl = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();

        } catch (error) {
            alert('Wystąpił problem podczas przesyłania pliku: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <h1>Prześlij plik PDF</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} style={inputStyle} />
            <button onClick={handleUpload} disabled={loading} style={buttonStyle}>
                {loading ? 'Przesyłanie...' : 'Prześlij'}
            </button>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    width: '100%',
    maxWidth: '300px',
};

const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '150px',
    textAlign: 'center',
    transition: 'background-color 0.3s ease',
    outline: 'none',
};

export default FileUpload;
