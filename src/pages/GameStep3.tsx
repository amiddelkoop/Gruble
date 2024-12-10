import React from 'react';

type Player = {
    name: string;
    grid: string[][];
};

type GameStep3Props = {
    players: Player[];
};

const GameStep3: React.FC<GameStep3Props> = ({ players }) => {
    return (
        <div>
            <h2>Revealed Boards</h2>
            {players.map((player, index) => (
                <div key={index}>
                    <h3>{player.name}'s Board</h3>
                    <table>
                        <tbody>
                        {player.grid.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default GameStep3;
