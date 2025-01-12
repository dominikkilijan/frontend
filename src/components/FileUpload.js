import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/FileUpload.css';

function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files[0];

        if (droppedFile) {
            if (droppedFile.type !== 'application/pdf') {
                alert('Można przesyłać tylko pliki PDF.');
                return;
            }
            setFile(droppedFile);
        }
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
            const token = localStorage.getItem('jwt');

            const headers = {
                'Content-Type': 'multipart/form-data',
            };

            if (token) {
                headers.Authorization = `Bearer ${token}`;
            }

            const response = await axios.post('http://localhost:8080/process', formData, {
                responseType: 'blob',
                headers,
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
        <div className="container">
            <h1>Prześlij plik PDF</h1>
            <div
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {file ? (
                    <p>{file.name}</p>
                ) : isMobile ? (
                    <p>Kliknij, aby wybrać plik PDF.</p>
                ) : (
                    <p>Przeciągnij i upuść plik PDF tutaj lub kliknij, aby wybrać.</p>
                )}
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="file-input"
                />
            </div>
            <button onClick={handleUpload} disabled={loading} className="button">
                {loading ? 'Przesyłanie...' : 'Prześlij'}
            </button>
        </div>
    );
}

export default FileUpload;
