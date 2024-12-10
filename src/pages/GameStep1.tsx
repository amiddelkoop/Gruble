import React, { useState } from 'react';

type GameStep1Props = {
    onStartGame: (
        numPlayers: number,
        selectedCategories: string[],
        selectedLetters: string[],
        playerNames: string[]
    ) => void;
    setCategories: React.Dispatch<React.SetStateAction<string[]>>;
    setLetters: React.Dispatch<React.SetStateAction<string[]>>;
    playerNames: string[];
    updatePlayerNames: (updatedNames: string[]) => void;
};

const GameStep1: React.FC<GameStep1Props> = ({
                                                 onStartGame,
                                                 setCategories,
                                                 setLetters,
                                                 playerNames,
                                             }) => {
    const [newCategory, setNewCategory] = useState('');
    const [newLetter, setNewLetter] = useState('');
    const [categories, setCategoriesState] = useState<string[]>([]);
    const [letters, setLettersState] = useState<string[]>([]);

    const handleCategoryAdd = () => {
        if (newCategory.trim()) {
            setCategoriesState([...categories, newCategory]);
            setNewCategory('');
        }
    };

    const handleLetterAdd = () => {
        if (newLetter.length === 1 && /^[a-zA-Z]$/.test(newLetter)) {
            setLettersState([...letters, newLetter]);
            setNewLetter('');
        }
    };

    const handleSubmit = () => {
        setCategories(categories);
        setLetters(letters);
        onStartGame(playerNames.length, categories, letters, playerNames);
    };

    return (
        <div>
            <h2>Game Setup</h2>

            <div>
                <h3>Players:</h3>
                {playerNames.map((name, index) => (
                    <div key={index}>
                        <h4>{`Player ${index + 1}: ${name}`}</h4>
                    </div>
                ))}
            </div>

            <div>
                <h3>Categories</h3>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Add category"
                />
                <button onClick={handleCategoryAdd}>Add Category</button>
                <ul>
                    {categories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3>Letters</h3>
                <input
                    type="text"
                    value={newLetter}
                    onChange={(e) => setNewLetter(e.target.value)}
                    maxLength={1}
                    placeholder="Add letter"
                />
                <button onClick={handleLetterAdd}>Add Letter</button>
                <ul>
                    {letters.map((letter, index) => (
                        <li key={index}>{letter}</li>
                    ))}
                </ul>
            </div>

            <button onClick={handleSubmit}>Start Game</button>
        </div>
    );
};

export default GameStep1;
