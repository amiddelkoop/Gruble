import React, { useState, useEffect } from 'react';
import { Player } from "../types/Player";

type GameStep2Props = {
    players: Player[];
    onGameEnd: () => void;
    categories: string[];
    letters: string[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    onSubmit: () => void;
};

const GameStep2: React.FC<GameStep2Props> = ({
                                                 players,
                                                 onGameEnd,
                                                 categories,
                                                 letters,
                                                 setPlayers,
                                                 onSubmit,
                                             }) => {
    const [timeLeft, setTimeLeft] = useState(300);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsGameOver(true);
            onGameEnd();
        }
    }, [timeLeft, onGameEnd]);

    const handleCellChange = (
        playerIndex: number,
        rowIndex: number,
        letterIndex: number,
        value: string
    ) => {
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex] = {
            ...updatedPlayers[playerIndex],
            grid: updatedPlayers[playerIndex].grid.map((row, rIdx) =>
                rIdx === rowIndex
                    ? row.map((cell, cIdx) => (cIdx === letterIndex ? value : cell))
                    : row
            ),
        };
        setPlayers(updatedPlayers);
    };

    return (
        <div>
            <h2>Game Time - Fill Out Your Grid</h2>
            <p>Time Remaining: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>

            <div>
                <h3>Categories</h3>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        {letters.map((letter, letterIndex) => (
                            <th key={letterIndex}>{letter}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category, rowIndex) => (
                        <tr key={rowIndex}>
                            <th>{category}</th>
                            {letters.map((_letter, letterIndex) => (
                                <td key={letterIndex}>
                                    <input
                                        type="text"
                                        value={players[0]?.grid[rowIndex][letterIndex] || ''}
                                        onChange={(e) =>
                                            handleCellChange(
                                                0,
                                                rowIndex,
                                                letterIndex,
                                                e.target.value
                                            )
                                        }
                                        disabled={isGameOver}
                                        maxLength={30}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button onClick={onSubmit} disabled={isGameOver}>
                Submit Grid
            </button>
        </div>
    );
};

export default GameStep2;
