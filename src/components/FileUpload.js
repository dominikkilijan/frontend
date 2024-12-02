import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

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
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="input" />
            <button onClick={handleUpload} disabled={loading} className="button">
                {loading ? 'Przesyłanie...' : 'Prześlij'}
            </button>
        </div>
    );
}

export default FileUpload;
