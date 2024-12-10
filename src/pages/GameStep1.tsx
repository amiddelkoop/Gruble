import React, { useState } from 'react';

type GameStep1Props = {
    onStartGame: (
        numPlayers: number,
        selectedCategories: string[],
        selectedLetters: string[],
        playerNames: string[]
    ) => void;
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
};

const GameStep1: React.FC<GameStep1Props> = ({ onStartGame, setCategories }) => {
    const [numPlayers, setNumPlayers] = useState(5);
    const [categories, setCategoriesState] = useState<string[]>([]);
    const [letters, setLettersState] = useState<string[]>([]);
    const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']);
    const [numCategories, setNumCategories] = useState(5);
    const [numLetters, setNumLetters] = useState(5);

    const handleSubmit = () => {
        setCategories(categories);
        setCategoriesState(categories);
        setLettersState(letters);
        onStartGame(numPlayers, categories, letters, playerNames);
    };

    return (
        <div>
            <h2>Game Setup</h2>
            <label>
                Number of players:
                <input
                    type="number"
                    value={numPlayers}
                    onChange={(e) => setNumPlayers(Number(e.target.value))}
                    min={1}
                    max={10}
                />
            </label>
            <div>
                {Array.from({ length: numPlayers }, (_, index) => (
                    <div key={index}>
                        <label>{`Player ${index + 1} Name:`}</label>
                        <input
                            type="text"
                            value={playerNames[index]}
                            onChange={(e) => {
                                const updatedNames = [...playerNames];
                                updatedNames[index] = e.target.value;
                                setPlayerNames(updatedNames);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                <h3>Categories</h3>
                <label>
                    Number of Categories:
                    <input
                        type="number"
                        value={numCategories}
                        onChange={(e) => setNumCategories(Number(e.target.value))}
                        min={1}
                        max={10}
                    />
                </label>
                {Array.from({ length: numCategories }, (_, index) => (
                    <div key={index}>
                        <label>{`Category ${index + 1}:`}</label>
                        <input
                            type="text"
                            value={categories[index] || ""}
                            onChange={(e) => {
                                const updatedCategories = [...categories];
                                updatedCategories[index] = e.target.value;
                                setCategoriesState(updatedCategories);
                            }}
                        />
                    </div>
                ))}
            </div>
            <div>
                <h3>Letters</h3>
                <label>
                    Number of Letters:
                    <input
                        type="number"
                        value={numLetters}
                        onChange={(e) => setNumLetters(Number(e.target.value))}
                        min={1}
                        max={10}
                    />
                </label>
                {Array.from({ length: numLetters }, (_, index) => (
                    <div key={index}>
                        <label>{`Letter ${index + 1}:`}</label>
                        <input
                            type="text"
                            value={letters[index] || ""}
                            onChange={(e) => {
                                const updatedLetters = [...letters];
                                updatedLetters[index] = e.target.value;
                                setLettersState(updatedLetters);
                            }}
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Start Game</button>
        </div>
    );
};

export default GameStep1;

