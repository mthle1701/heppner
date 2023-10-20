import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function App() {
    const [data, setData] = useState<string[][]>([]);
    const query = useQuery();
    const id = query.get('id');  // change 'id' to 'Nom fruit'

    useEffect(() => {
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTMx94V7eSHtqjJaH1Hn5kIbMKdUq-KTjDQ4-ekoZIDtWDncLZ87AHjYoLJxPBqcCYTB6eWOA6nX_Fg/pub?output=csv';

        fetch(url)
            .then(response => response.text())
            .then(csvData => {
                const rows = csvData.split('\n').map(row => row.split(',').map(cell => cell.trim()));  // Ajoutez trim() ici
                setData(rows);
                console.log(rows);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    const columnIndex = data[0]?.indexOf('id');
    const filteredData = columnIndex !== undefined && columnIndex !== -1 && id !== null
        ? [data[0], ...data.slice(1).filter(row => row[columnIndex].trim() === id.trim())] // Ajoutez [data[0], ... ici
        : data;



    return (
        <div className="container">
            <h1>Données de ma feuille Google Sheets</h1>
            <table>
                <thead>
                <tr>
                    {filteredData.length > 0 && filteredData[0].map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {filteredData.slice(1).map((row, index) => (
                    <tr key={index}>
                        {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
