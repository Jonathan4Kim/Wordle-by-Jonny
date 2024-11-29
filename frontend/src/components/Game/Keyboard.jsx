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
                <Key letter={letter} color={color[letter]} onLetterChange={handleLetterChange}></Key>
                )}
                <div style={
                    {
                        backgroundColor: `#787c7f`,
                        width: 'var(--keyboard-width)',
                        height: 'var(--keyboard-height)',
                        maxwidth: 'var(--keyboard-width)',
                        maxheight: 'var(--keyboard-height)',
                        border: '0.25rem solid var(--gray-color)',
                        borderColor: `#787c7f`,
                        fill: 'var(--gray-color)',
                        fontSize: '2rem',
                        padding: '1em',
                        margin: '0.25em',
                        verticalAlign: 'middle',
                        alignItems: 'center',
                    }
                } onClick={e => handleLetterChange('Backspace')}>Delete</div>
            </div>
            <div className='keyboard-row-middle'>
                {middleKeys.map((key, index) => 
                    <div style={
                        {
                            backgroundColor: `${color[key]}`,
                            width: 'var(--keyboard-width)',
                            height: 'var(--keyboard-height)',
                            maxwidth: 'var(--keyboard-width)',
                            maxheight: 'var(--keyboard-height)',
                            border: '0.25rem solid var(--gray-color)',
                            borderColor: `${color[key]}`,
                            fill: 'var(--gray-color)',
                            fontSize: '2rem',
                            padding: '1em',
                            margin: '0.25em',
                            verticalAlign: 'middle',
                            alignItems: 'center',
                        }
                    }>{key}</div>
                )}
                <div style={
                    {
                        backgroundColor: `#787c7f`,
                        width: 'var(--keyboard-width)',
                        height: 'var(--keyboard-height)',
                        maxwidth: 'var(--keyboard-width)',
                        maxheight: 'var(--keyboard-height)',
                        border: '0.25rem solid var(--gray-color)',
                        borderColor: `#787c7f`,
                        fill: 'var(--gray-color)',
                        fontSize: '2rem',
                        padding: '1em',
                        margin: '0.25em',
                        verticalAlign: 'middle',
                        alignItems: 'center',
                    }
                } onClick={e => handleLetterChange('Enter')}>Enter</div>
            </div>
            <div className='keyboard-row-bottom'>
                {bottomKeys.map((key, index) => 
                <div style={
                    {
                        backgroundColor: `${color[key]}`,
                        width: 'var(--keyboard-width)',
                        height: 'var(--keyboard-height)',
                        maxwidth: 'var(--keyboard-width)',
                        maxheight: 'var(--keyboard-height)',
                        border: '0.25rem solid var(--gray-color)',
                        borderColor: `${color[key]}`,
                        fill: 'var(--gray-color)',
                        fontSize: '2rem',
                        padding: '1em',
                        margin: '0.25em',
                        verticalAlign: 'middle',
                        alignItems: 'center',
                    }
                }>{key}</div>
                )}
            </div>
        </div>
    )
};