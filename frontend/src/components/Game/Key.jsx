import {motion} from "framer-motion";

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
        <motion.div whileFocus={{scale: 1.3}} whileHover={{scale: 1.1}} onClick={e => onLetterChange(letter.toUpperCase())} style={style}>{letter}</motion.div>
    );
}