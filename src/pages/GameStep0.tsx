import React, { useState } from 'react';

type GameStep0Props = {
    onLogin: (name: string) => void;
};

const GameStep0: React.FC<GameStep0Props> = ({ onLogin }) => {
    const [name, setName] = useState(''); // Track input value for player name

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name) {
            onLogin(name);  // Pass the name to the parent
        } else {
            alert("Please enter a name!");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter your name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Player name"
                    />
                </label>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default GameStep0;
