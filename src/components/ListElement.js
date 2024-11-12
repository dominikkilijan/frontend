import React from 'react';
import deleteIcon from '../assets/delete.svg';
import downloadIcon from '../assets/download.svg';

function ListElement({ file }) {
    const truncateName = (name) => {
        return name.length > 25 ? `${name.slice(0, 25)}...` : name;
    };

    return (
        <li style={fileItemStyle}>
            <span style={fileNameStyle}>{truncateName(file.name)}</span>
            <span style={fileDateStyle}>{file.dateAdded}</span>
            <img
                src={downloadIcon}
                alt="Pobierz"
                style={iconStyle}
                onClick={() => handleDownload(file.file)}
            />
            <img
                src={deleteIcon}
                alt="Usuń"
                style={iconStyle}
                onClick={() => handleDelete(file.name)}
            />
        </li>
    );
}

const handleDownload = (filePath) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = filePath.split('/').pop();
    link.click();
};

const handleDelete = (fileName) => {
    const confirmed = window.confirm(`Czy na pewno chcesz usunąć plik "${fileName}"?`);
    if (confirmed) {
        console.log(`Plik "${fileName}" został usunięty`);
    }
};

const fileItemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #ccc',
    fontSize: '16px',
};

const fileNameStyle = {
    flex: 1,
    textAlign: 'left',
};

const fileDateStyle = {
    flex: 1,
    textAlign: 'center',
};

const iconStyle = {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    paddingLeft: '5px',
    paddingRight: '5px',
};

export default ListElement;
