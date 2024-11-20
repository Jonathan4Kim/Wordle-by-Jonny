import '../../styles.css';


export default function Guess({letters}) {
    return (
        <div className="guess-container">
            {letters.map((letter) => (
                <h3 className="letterbox">{letter}</h3>
            ))}
        </div>
    )
};