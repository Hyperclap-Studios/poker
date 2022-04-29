import logo from './logo.svg';
import './App.scss';
import {useEffect, useState} from "react";
import { io } from 'socket.io-client';


function App() {
    const [players, setPlayers] = useState([]);
    const [gameState, setGameState] = useState('lobby');

    const addPlayer = (name) => {
        setPlayers([...players, {name, id: players.length}]);
    };

    useEffect(() => {

    }, []);



    const Screen = () => {
        switch (gameState) {
            case 'lobby':
                return <Lobby players={players} addPlayer={addPlayer} />;
            case 'game':
                return '';
            default:
                return <div>Error</div>
        }
    };

    return (
        <div className="App">
            <Screen />
        </div>
    );
}

function Lobby({players, addPlayer}) {
    const [name, setName] = useState('');

    return (
        <div>
            <h1>Players</h1>
            <div className={'players'}>
                {
                    players.map(player => <div key={player.id}>{player.name}</div>)
                }
            </div>
            <input type={'text'} value={name} onChange={e => setName(e.currentTarget.value)} /><br />
            <button onClick={() => addPlayer(name)} className={'roundButton'}>Add Player</button>
        </div>
    );
}

export default App;
