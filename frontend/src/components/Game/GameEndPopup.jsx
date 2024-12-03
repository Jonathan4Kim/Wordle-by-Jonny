import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function GameEndPopup({ initial }) {
    const [answer, setAnswer] = useState('');

    useEffect(() => {
        const getAnswer = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/get_answer');
                setAnswer(response.data.message);
            } catch (error) {
                console.error('Error fetching answer:', error);
            }
        };
        getAnswer();
    }, []);

    return (
        <motion.div 
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div 
                className="popup-content"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h2>Game Over!</h2>
                <p>The word was: <strong>{answer}</strong></p>
                <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={initial}
                >
                    Play Again
                </motion.button>
            </motion.div>
        </motion.div>
    );
}