import React, { useState } from 'react';

type GameStep0Props = {
    onLogin: (name: string) => void;
};

const GameStep0: React.FC<GameStep0Props> = ({ onLogin }) => {
    const [name, setName] = useState('');

    const handleLogin = () => {
        if (name.trim() !== '') {
            onLogin(name);
        } else {
            alert("Please enter a name.");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <label>
                Enter your name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                />
            </label>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default GameStep0;
