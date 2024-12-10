import React, { useState, useEffect } from 'react';

type Player = {
    name: string;
    grid: string[][];
};

type GameStep2Props = {
    players: Player[];
    onGameEnd: () => void;
    categories: string[];
    letters: string[];
};

const GameStep2: React.FC<GameStep2Props> = ({
                                                 players,
                                                 onGameEnd,
                                                 categories,
                                                 letters,
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

    const handleCellChange = (playerIndex: number, rowIndex: number, colIndex: number, value: string) => {
        const updatedPlayers = [...players];
        updatedPlayers[playerIndex].grid[rowIndex][colIndex] = value;
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
                            {players.map((player, playerIndex) => (
                                <td key={playerIndex}>
                                    <input
                                        type="text"
                                        value={player.grid[rowIndex][playerIndex]}
                                        onChange={(e) =>
                                            handleCellChange(playerIndex, rowIndex, playerIndex, e.target.value)
                                        }
                                        disabled={isGameOver}
                                        maxLength={1}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GameStep2;
