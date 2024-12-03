import '../../styles.css';
import Key from './Key';

export default function Keyboard({color, handleLetterChange}) {
    const topKeys = "QWERTYUIOP".split('');
    const middleKeys = "ASDFGHJKL".split('');
    const bottomKeys = "ZXCVBNM".split('');

    return (
        <div className='keyboard-container'>
            <div className='keyboard-row-top'>
                {topKeys.map((letter, index) => 
                    <Key key={letter} letter={letter} color={color[letter]} onLetterChange={handleLetterChange} />
                )}
                <Key key="Delete" letter="Del" color={'#787c7f'} onLetterChange={handleLetterChange} />
            </div>
            <div className='keyboard-row-middle'>
                {middleKeys.map((letter, index) => 
                    <Key key={letter} letter={letter} color={color[letter]} onLetterChange={handleLetterChange} />
                )}
                <Key key="enter" letter="Enter" color={'#787c7f'} onLetterChange={handleLetterChange} />
            </div>
            <div className='keyboard-row-bottom'>
                {bottomKeys.map((letter, index) => 
                    <Key key={letter} letter={letter} color={color[letter]} onLetterChange={handleLetterChange} />
                )}
            </div>
        </div>
    )
};