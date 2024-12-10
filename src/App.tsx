import React, { useState } from 'react';
import GameStep1 from "./pages/GameStep1.tsx";
import GameStep2 from "./pages/GameStep2.tsx";
import GameStep3 from "./pages/GameStep3.tsx";
import GameStep0 from "./pages/GameStep0.tsx"; // Import GameStep0
import { Player } from './types/Player';

const App: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [letters, setLetters] = useState<string[]>([]);
    const [gameStep, setGameStep] = useState(0);  // Track current game step
    const [playerNames, setPlayerNames] = useState<string[]>([]);  // Array to hold player names

    // Function to handle the player login
    const handleLogin = (name: string) => {
        setPlayerNames([name]); // Set the player name as a single-element array
        setGameStep(1); // Move to the next game step (GameStep1)
    };

    // Function to start the game with selected settings
    const handleGameStart = (numPlayers: number, selectedCategories: string[], selectedLetters: string[], playerNames: string[]) => {
        const initializedPlayers: Player[] = Array.from({ length: numPlayers }, (_, index) => ({
            name: playerNames[index] || `Player ${index + 1}`,
            pickedLetters: [],
            pickedCategories: [],
            grid: Array(selectedCategories.length).fill(null).map(() => Array(selectedLetters.length).fill('')),
        }));

        setPlayers(initializedPlayers);
        setCategories(selectedCategories);
        setLetters(selectedLetters);
        setGameStep(2); // Move to GameStep2 (gameplay step)
    };

    // Function to update player names
    const updatePlayerNames = (updatedNames: string[]) => {
        setPlayerNames(updatedNames);
    };

    return (
        <div>
            {gameStep === 0 && <GameStep0 onLogin={handleLogin} />}  {/* Display login screen */}

            {gameStep === 1 && (
                <GameStep1
                    onStartGame={handleGameStart}
                    setCategories={setCategories}
                    setLetters={setLetters}
                    playerNames={playerNames}  // Pass playerNames to GameStep1
                    updatePlayerNames={updatePlayerNames}  // Pass the function to update playerNames
                />
            )}

            {gameStep === 2 && <GameStep2 players={players} onGameEnd={() => {}} categories={categories} letters={letters} setPlayers={setPlayers} onSubmit={() => {}} />}
            {gameStep === 3 && <GameStep3 players={players} />}
        </div>
    );
};

export default App;
