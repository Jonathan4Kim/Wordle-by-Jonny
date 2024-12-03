import {motion} from "framer-motion";

export default function Key({letter, color, onLetterChange}) {
    const style = {
        backgroundColor: color,
        borderColor: color,
    };

    return (
        <motion.div 
            className="key"
            whileHover={{scale: 1.05}}
            onClick={e => onLetterChange(letter.toUpperCase())} 
            style={style}
            data-key={letter}
        >
            {letter}
        </motion.div>
    );
}