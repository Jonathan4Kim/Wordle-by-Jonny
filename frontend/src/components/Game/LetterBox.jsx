import {useState, useRef} from 'react';

export default function LetterBox({value, onLetterChange}) {
    const handleKeyDown = (e) => {
        if ((/[a-zA-Z]/.test(e.key))) {
            onLetterChange(e.key.toUpperCase());
        }
    };

    return (
        <div tabIndex={0} className="letterbox" onKeyDown={handleKeyDown}>
            {value}
        </div>
    );
}