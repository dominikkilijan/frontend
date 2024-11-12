import React, { useState } from 'react';

function FileUpload() {
    const [uploadStatus, setUploadStatus] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleFileUpload = (e) => {
        e.preventDefault();
        const file = e.target.fileInput.files[0];

        if (file && file.type === 'application/pdf') {
            setUploadStatus(`Plik ${file.name} został pomyślnie wybrany.`);
        } else {
            setUploadStatus('Proszę wybrać plik PDF.');
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];

        if (file && file.type === 'application/pdf') {
            setUploadStatus(`Plik ${file.name} został pomyślnie wybrany.`);
        } else {
            setUploadStatus('Proszę wybrać plik PDF.');
        }
    };

    return (
        <div style={containerStyle}>
            <h2 style={headerStyle}>Dodaj plik PDF</h2>
            <div
                style={{
                    ...uploadBoxStyle,
                    borderColor: isDragging ? '#66bb6a' : '#ccc'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <form onSubmit={handleFileUpload}>
                    <input type="file" id="fileInput" accept=".pdf" style={{ display: 'none' }} />
                    <label htmlFor="fileInput" style={fileLabelStyle}>
                        <span>WYBIERZ PLIK</span>
                    </label>
                </form>
                <p>lub upuść pliki tutaj</p>
                <div style={{ marginTop: '10px', color: '#66bb6a' }}>{uploadStatus}</div>
            </div>
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
};

const uploadBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    maxWidth: '600px',
    padding: '40px',
    borderRadius: '10px',
    border: '2px dashed #ccc',
    backgroundColor: '#f8f8f8',
    color: '#666',
    textAlign: 'center',
    transition: 'border-color 0.3s',
    cursor: 'pointer',
};

const headerStyle = {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '20px',
};

const fileLabelStyle = {
    padding: '10px 20px',
    backgroundColor: '#66bb6a',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginBottom: '10px',
};

export default FileUpload;
