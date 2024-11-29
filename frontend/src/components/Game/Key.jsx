export default function Key({letter, color, onLetterChange}) {

    const style = {
        backgroundColor: color,
        width: 'var(--keyboard-width)',
        height: 'var(--keyboard-height)',
        maxwidth: 'var(--keyboard-width)',
        maxheight: 'var(--keyboard-height)',
        border: '0.25rem solid var(--gray-color)',
        borderColor: color,
        fill: 'var(--gray-color)',
        fontSize: '2rem',
        padding: '1em',
        margin: '0.25em',
        verticalAlign: 'middle',
        alignItems: 'center',
    };

    return (
        <div onClick={e => onLetterChange(letter)} style={style}>{letter}</div>
    );
}