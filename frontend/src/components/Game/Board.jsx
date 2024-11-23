import LetterBox from "./LetterBox";
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Board({}) {
    const [table, setTable] = useState(Array(6).fill(Array(5).fill('')));
    const [colorTable, setColorTable] = useState(Array(6).fill(Array(5).fill('#787c7f')));
    const [availRow, setAvailRow] = useState(0);
    const [availCol, setAvailCol] = useState(0);

    const colorMap = {
        'green': '#6ca965',
        'yellow': '#c8b653',
        'gray': '#787c7f'
    };

    const initial = async () => {
        const url = 'http://127.0.0.1:5000/api/initialize_wordle';
        try {
            const response = await axios.post(url);
            if (response.status === 200) {
                console.log('success: wordle game initialized');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => initial, []);

    const handleLetterChange = (key) => {
        console.log('handling letter change');
        // console.log(key);
        // console.log('before');
        // console.log(availRow);
        // console.log(availCol);
        if (key === 'BACKSPACE') {
            setAvailCol(prevCol => Math.max(0, prevCol - 1));
            const arr = table.map((row, rowIndex) =>
            rowIndex === availRow
            ? row.map((cell, cellIndex) => (cellIndex === availCol ? '' : cell))
            : row);
            setTable(arr);
            // console.log('after back');
            // console.log(availRow);
            // console.log(availCol);
        } else if (/[a-zA-Z]/.test(key) && key.length === 1) {
            const arr = table.map((row, rowIndex) =>
            rowIndex === availRow
            ? row.map((cell, cellIndex) => (cellIndex === availCol ? key : cell))
            : row);
            setTable(arr);
            setAvailCol(prevCol => Math.min(prevCol + 1, 4));
            // console.log('after reg'
        }
    };




    const handleGuess = async (event) => {
        event.preventDefault();
        console.log(event.key)
        if (event.key === 'Enter' && availRow < 6) {
            const guess = table[availRow].join('').toLowerCase();
            console.log(`guess: ${guess}`)
            if (guess.length != 5) {
                return;
            }
            try {
                const url = `http://127.0.0.1:5000/api/check_word/${guess}`;
                const response = await axios.post(url);
                if (response.status === 200) {
                    // color the guesses
                    console.log('word guess used')
                    console.log(response.data.guess);
                    const arr = colorTable.map((row, rowIndex) =>
                        rowIndex === availRow ? 
                    row.map((col, colIndex) => col === response.data.guess[colIndex][1] ? col : 
                colorMap[response.data.guess[colIndex][1]])
                    : row
                    )
                    setColorTable(arr);
                    setAvailRow(prevRow => Math.min(prevRow + 1, 6));
                    setAvailCol(0);
                } 
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div onKeyDown={event => handleGuess(event)} clas>
        {table.map((row, rowIndex) => (
        <div className="guess" key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <LetterBox key={cellIndex}
                value={cell}
                onLetterChange={key => handleLetterChange(key)}
                color={colorTable[rowIndex][cellIndex]}
                ></LetterBox>
            ))}
        </div>
        ))}
        </div>
    );
};