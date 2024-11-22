import LetterBox from "./LetterBox";
import { useState } from "react";
import {axios} from "axios";

export default function Board() {
    const [table, setTable] = useState(Array(6).fill(Array(5).fill('')));
    const [ColorTable, setColorTable] = useState(Array(6).fill(Array(5).fill('')));
    const [availRow, setAvailRow] = useState(0);
    const [availCol, setAvailCol] = useState(0);
    const handleLetterChange = (key) => {
        console.log('handling letter change');
        console.log(key);
        console.log('before');
        console.log(availRow);
        console.log(availCol);
        if (key === 'BACKSPACE') {
            setAvailCol(prevCol => Math.max(0, prevCol - 1));
            const arr = table.map((row, rowIndex) =>
            rowIndex === availRow
            ? row.map((cell, cellIndex) => (cellIndex === availCol ? '' : cell))
            : row);
            setTable(arr);
            console.log('after back');
            console.log(availRow);
            console.log(availCol);
        } else if (/[a-zA-Z]/.test(key) && key.length === 1) {
            const arr = table.map((row, rowIndex) =>
            rowIndex === availRow
            ? row.map((cell, cellIndex) => (cellIndex === availCol ? key : cell))
            : row);
            setTable(arr);
            setAvailCol(prevCol => Math.min(prevCol + 1, 4));
            console.log('after reg');
            console.log(availRow);
            console.log(availCol);
        }
    };
    const handleGuess = async (event) => {
        event.preventDefault();
        if (availRow < 6) {
            const guess = table[row].join('');
            if (guess.length != 5) {
                return;
            }
            const url = `http://127.0.0.1:5000/check_words/${guess}`;
            const response = await axios.post(url);
            setAvailRow(prevRow => prevRow + 1);
        }
    };
    return (
     <div>
        {table.map((row, rowIndex) => (
        <div className="guess" key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <LetterBox key={cellIndex}
                value={cell}
                onLetterChange={e => handleLetterChange(e)}
                ></LetterBox>
            ))}
        </div>
        ))}
    </div>
    )
};