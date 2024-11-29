export default function LetterBox({value, color}) {



    
    const styles = {
        backgroundColor: `${color}`,
        // width: 'var(--letterbox-dim)',
        // height: 'var(--letterbox-dim)',
        // maxWidth: 'var(--letterbox-dim)',
        // maxHeight: 'var(--letterbox-dim)',
        border: '0.25rem solid var(--gray-color)',
        borderColor: `${color}`,
        fill: 'var(--gray-color)',
        fontSize: '2rem',
        padding: '1em',
        margin: '0.25em',
        verticalAlign: 'middle',
        alignItems: 'center',
      };
      

    return (
        <div tabIndex={0} className="letterbox" style={styles}>
            {value}
        </div>
    );
};