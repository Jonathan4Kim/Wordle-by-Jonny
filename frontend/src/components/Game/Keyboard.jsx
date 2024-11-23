import '../../styles.css';

export default function Keyboard() {
    const topKeys = "QWERTYUIOP".split('');
    const middleKeys = "ASDFGHJKL".split('');
    const bottomKeys = "ZXCVBNM".split('');
    const colorMap = {
        'green': '#6ca965',
        'yellow': '#c8b653',
        'gray': '#787c7f'
    }

    const style = {

    };

    return (
        <div className='keyboard-container'>
            <div className='keyboard-row-top'>
                {topKeys.map((key, index) => 
                    <div>{key}</div>
                )}
            </div>
            <div className='keyboard-row-middle'>
                {middleKeys.map((key, index) => 
                    <div>{key}</div>
                )}
            </div>
            <div className='keyboard-row-bottom'>
                {bottomKeys.map((key, index) => 
                <div>{key}</div>
                )}
            </div>
            <p>Keyboard</p>
        </div>
    )
};