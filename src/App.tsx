import React, { useState } from 'react';
import GameStep3 from './pages/GameStep3';
import GameStep2 from './pages/GameStep2';
import GameStep1 from './pages/GameStep1';
import GameStep0 from './pages/GameStep0'; // Import GameStep0
import { Player } from './types/Player.ts';

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [letters, setLetters] = useState<string[]>([]);
    const [gameStep, setGameStep] = useState(0); // Start from GameStep0
    const [playerNames, setPlayerNames] = useState<string[]>([]); // Store the player names

    const handleGameStart = (
        numPlayers: number,
        selectedCategories: string[],
        selectedLetters: string[],
        playerNames: string[] // This should now correctly take the player names
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
        setGameStep(1);
    };

    const handleLogin = (name: string) => {
        setPlayerNames([name]); // Store the player name in the array
        setGameStep(1); // Move to the next game step (GameStep1)
    };

    const endGame = () => {
        setGameStep(3);
    };

    const handleSubmit = () => {
        setGameStep(3);
    };

    return (
        <div>
            {gameStep === 0 && <GameStep0 onLogin={handleLogin} />} {/* Show GameStep0 */}

            {gameStep === 1 && (
                <GameStep1
                    onStartGame={handleGameStart}
                    setCategories={setCategories}
                    setLetters={setLetters}
                    playerNames={playerNames} // Pass playerNames to GameStep1
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
