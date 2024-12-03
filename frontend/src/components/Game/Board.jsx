import LetterBox from "./LetterBox";
import { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Keyboard from "./Keyboard";
import GameEndPopup from "./GameEndPopup";
import {motion} from "framer-motion";

export default function Board() {
    const boardRef = useRef(null);
    const [table, setTable] = useState(Array(6).fill().map(() => Array(5).fill('')));
    const [colorTable, setColorTable] = useState(Array(6).fill().map(() => Array(5).fill('#787c7f')));
    const [position, setPosition] = useState({ row: 0, col: 0 });
    const [isNotValidGuess, setIsNotValidGuess] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const keys = "qwertyuiopasdfghjklzxcvbnm".toUpperCase().split("");
    const [keyColors, setKeyColors] = useState(
        keys.reduce((acc, key) => {
                acc[key] = "#787c7f";
                return acc;
        }, {})
    );
    const [animateRow, setAnimateRow] = useState(-1);

    const colorMap = {
        'green': '#6ca965',
        'yellow': '#c8b653',
        'gray': '#787c7f'
    };

    // for the keyboard, colors must stay a certain color after pressed.
    const colorPriority = {
        '#6ca965': 3,
        '#c8b653': 2,
        '#787c7f': 1,
        'green': 3,
        'yellow': 2,
        'gray': 1
    };

    useEffect(() => {
        if (position.row > 5) {
            setIsEnd(true);
        }
    }, [position]);

    const initial = async () => {
        // set all initial values
        setTable(Array(6).fill().map(() => Array(5).fill('')));
        setColorTable(Array(6).fill().map(() => Array(5).fill('#787c7f')));
        setPosition({row: 0, col: 0});
        setIsEnd(false);
        setKeyColors(
            keys.reduce((acc, key, index) => {
                acc[key] = "#787c7f";
                return acc;
            }, {})
        );
        const url = 'http://127.0.0.1:5000/api/initialize_wordle';
        try {
            const response = await axios.post(url);
            if (response.status === 200) {
                console.log('success: wordle game initialized');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLetterChange = (key) => {
        key = key.toUpperCase();
        // console.log(key)

        if (key === 'BACKSPACE' && position.col > 0 || key === 'DEL' && position.col > 0) {
            setTable(prevTable => {
                const newTable = prevTable.map(row => [...row]);
                newTable[position.row][position.col - 1] = '';
                return newTable;
            });
            setPosition(prev => ({ ...prev, col: prev.col - 1 }));
        } else if (key === "ENTER" && position.col == 5) {
            handleGuess(key);
        } else if (/[a-zA-Z]/.test(key) && key.length === 1 && position.col < 5) {
            setTable(prevTable => {
                const newTable = prevTable.map(row => [...row]);
                newTable[position.row][position.col] = key;
                return newTable;
            });
            setPosition(prev => ({ ...prev, col: prev.col + 1 }));
        }
    };

    const letterChange = (event) => {
        event.preventDefault();
        // console.log('letter change')
        const key = event.key.toUpperCase();
        handleLetterChange(event.key);
    };


    useEffect(() =>
        {
            // initializes boardRef
            if (boardRef.current) {
                boardRef.current.focus();
            }
            const initGame = async () => {
                await initial();
            };

            
            initGame();
        }
    , []);

    const newGame = async () => {
        console.log('creating new game...');
        // clear board/initialize
        initial();
    };


    const handleGuess = async (key) => {
        console.log(key)
        if (key === 'ENTER' && position.row < 6) {
            const guess = table[position.row].join('').toLowerCase();
            // console.log(`guess: ${guess}`)
            if (guess.length != 5) {
                return;
            }
            try {
                const url = `http://127.0.0.1:5000/api/check_word/${guess}`;
                const response = await axios.post(url);
                if (response.status === 200) {
                    // Trigger animation for current row
                    setAnimateRow(position.row);
                    
                    // color the guesses
                    const arr = colorTable.map((row, rowIndex) =>
                        rowIndex === position.row ? 
                    row.map((col, colIndex) => col === response.data.guess[colIndex][1] ? col : 
                colorMap[response.data.guess[colIndex][1]])
                    : row
                    )
                    setColorTable(arr);
                    setKeyColors((prevColor) => {
                        const newColors = response.data.guess.reduce((acc, [k, v]) => {
                            k = k.toUpperCase();
                            const currVal = colorPriority[prevColor[k]] || 0;
                            const newVal = colorPriority[v] || 0;
                            if (newVal > currVal) {
                                return {
                                    ...acc,
                                    [k]: colorMap[v]
                                };
                            }
                            return acc;
                        }, {...prevColor});
                        return newColors;
                    });
                    console.log('keycolor');
                    console.log(keyColors['A']);
                    
                    // Reset animation state after moving to next row
                    setTimeout(() => {
                        setAnimateRow(-1);
                    }, 1000);
                    
                    setPosition(prev => ({row: prev.row + 1, col: 0}));
                } 
            } catch (error) {
                setIsNotValidGuess(true);
                setTimeout(() =>
                    {setIsNotValidGuess(false);
                    console.log('setting error')}, 2500
                );
                console.error(error);
            }
        }
    };
    return (
        <div tabIndex={0} ref={boardRef} onKeyDown={e => letterChange(e)} className="whole-board">
            <div className="title">Wordle By Jonny</div>
            <div>
                {isNotValidGuess && 
                    <p style={{display: isNotValidGuess ? 'block': 'none', visibility: isNotValidGuess ? 'visible' : 'hidden'}} className="wrong-guess">Not a valid Guess! Try Again!</p>
                }
                {
                    isEnd && (<div>
                        <GameEndPopup initial={initial}></GameEndPopup>
                        </div>)
                }
            </div>
            {/* <motion.button whileHover={{scale: 1.1}} onClick={newGame}>New Game</motion.button> */}
            {table.map((row, rowIndex) => (
            <div className="guess" key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <LetterBox 
                        key={cellIndex}
                        value={cell}
                        color={colorTable[rowIndex][cellIndex]}
                        animate={rowIndex === animateRow}
                    />
                ))}
            </div>
            ))}
            <Keyboard color={keyColors} handleLetterChange={handleLetterChange}></Keyboard>
        </div>
    );
};