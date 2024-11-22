import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import Board from "./Board";

function Game() {
    const {email} = useParams();
    // create 6 guesses

    // Initial call for the backend to be initialized, getting a wordle instance
    // useState for every cell
    // useState upon enter and a row is full
    

    return <>
    <div className="game-container">
        <h1 className="game-title"><strong>Wordle</strong> by Jonny</h1>
        <h2 className="game-email">Email: {email}</h2>
        <Board/>
        <Keyboard/>
    </div>
    </>
};

export default Game;
