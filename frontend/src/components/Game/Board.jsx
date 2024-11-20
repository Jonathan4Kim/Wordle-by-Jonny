import LetterBox from "./LetterBox";
import { useState } from "react";

export default function Board() {
    const [table, setTable] = useState(Array(6).fill(Array(5).fill('')));
    const handleLetterChange = (key, r, c) => {
        console.log('handling letter change');
        console.log(key)
        const arr = table.map((row, rowIndex) =>
            rowIndex === r
            ? row.map((cell, cellIndex) => (cellIndex === c ? key : cell))
            : row);
        setTable(arr);
    };
    return (
     <div>
        {table.map((row, rowIndex) => (
        <div className="guess" key={rowIndex}>
            {row.map((cell, cellIndex) => (
                <LetterBox key={cellIndex}
                value={cell}
                onLetterChange={e => handleLetterChange(e, rowIndex, cellIndex)}
                ></LetterBox>
            ))}
        </div>
        ))}
    </div>
    )
};