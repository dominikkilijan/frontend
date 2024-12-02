import React from 'react';
import deleteIcon from '../assets/delete.svg';
import downloadIcon from '../assets/download.svg';
import '../styles/ListElement.css';

function ListElement({ file, onFileDelete }) {
    const truncateName = (name) => {
        return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    };

    const formatDate = (dateString) => {
        return dateString.replace('T', ' ').slice(0, 16);
    };

    const handleDownload = async (fileUrl, fileName) => {
        try {
            const token = localStorage.getItem('jwt');
            if (!token) {
                alert('Musisz być zalogowany, aby pobierać pliki.');
                return;
            }

            const response = await fetch(fileUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        } catch (err) {
            alert('Wystąpił błąd podczas pobierania pliku.');
            console.error(err);
        }
    };

    const handleDelete = async (fileId) => {
        const confirmed = window.confirm('Czy na pewno chcesz usunąć ten plik?');
        if (!confirmed) return;

        const token = localStorage.getItem('jwt');
        if (!token) {
            alert('Musisz być zalogowany, aby usuwać pliki.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/account/delete-file?fileId=${fileId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            onFileDelete(fileId);
        } catch (err) {
            alert('Wystąpił błąd podczas usuwania pliku.');
            console.error(err);
        }
    };

    return (
        <li className="file-item">
            <span className="file-name">{truncateName(file.name)}</span>
            <span className="file-date">{formatDate(file.date)}</span>
            <img
                src={downloadIcon}
                alt="Pobierz"
                className="icon"
                onClick={() => handleDownload(file.url, `${file.name}.mxl`)}
            />
            <img
                src={deleteIcon}
                alt="Usuń"
                className="icon"
                onClick={() => handleDelete(file.id)}
            />
        </li>
    );
}

export default ListElement;
