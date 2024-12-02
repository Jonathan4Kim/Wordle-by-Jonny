import '../../styles.css';
import Key from './Key';
import {motion} from "framer-motion";

export default function Keyboard({color, handleLetterChange}) {
    const topKeys = "QWERTYUIOP".split('');
    const middleKeys = "ASDFGHJKL".split('');
    const bottomKeys = "ZXCVBNM".split('');

    return (
        <div className='keyboard-container'>
            <div className='keyboard-row-top'>
                {topKeys.map((letter, index) => 
                <Key letter={letter} color={color[letter]} onLetterChange={handleLetterChange}></Key>
                )}
                <Key letter={"Backspace"} color={'#787c7f'} onLetterChange={handleLetterChange}></Key>
            </div>
            <div className='keyboard-row-middle'>
                {middleKeys.map((letter, index) => 
                    <Key letter={letter} color={color[letter]} onLetterChange={handleLetterChange}></Key>
                )}
                <Key letter={"Enter"} color={'#787c7f'} onLetterChange={handleLetterChange}></Key>
            </div>
            <div className='keyboard-row-bottom'>
                {bottomKeys.map((letter, index) => 
                    <Key letter={letter} color={color[letter]} onLetterChange={handleLetterChange}></Key>
                )}
            </div>
        </div>
    )
};