import React, { useState } from 'react';
import GameStep3 from './pages/GameStep3';
import GameStep2 from './pages/GameStep2';
import GameStep1 from './pages/GameStep1';
import { Player } from './types/Player.ts';

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [letters, setLetters] = useState<string[]>([]);
    const [gameStep, setGameStep] = useState(1);

    const handleGameStart = (
        numPlayers: number,
        selectedCategories: string[],
        selectedLetters: string[],
        playerNames: string[]
    ) => {
        const initializedPlayers = Array.from({ length: numPlayers }, (_, index) => ({
            name: playerNames[index] || `Player ${index + 1}`,
            pickedLetters: selectedLetters,
            pickedCategories: selectedCategories,
            grid: Array(selectedCategories.length)
                .fill(null)
                .map(() => Array(selectedLetters.length).fill('')),
        }));

        setPlayers(initializedPlayers);
        setCategories(selectedCategories);
        setLetters(selectedLetters);
        setGameStep(2);
    };

    const endGame = () => {
        setGameStep(3);
    };

    const handleSubmit = () => {
        setGameStep(3);
    };

    return (
        <div>
            {gameStep === 1 && (
                <GameStep1
                    onStartGame={handleGameStart}
                    setCategories={setCategories}
                    setLetters={setLetters}
                />
            )}

            {gameStep === 2 && (
                <GameStep2
                    players={players}
                    onGameEnd={endGame}
                    categories={categories}
                    letters={letters}
                    setPlayers={setPlayers}
                    onSubmit={handleSubmit}
                />
            )}

            {gameStep === 3 && <GameStep3 players={players} />}
        </div>
    );
};

export default App;
