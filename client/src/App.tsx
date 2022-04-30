import React, {useEffect, useState} from 'react';
import './App.scss';
import socket from "./instances/socket";
import {Link, Route, Routes, useNavigate} from 'react-router-dom';

function App() {
    const [lobbyCodes, setLobbyCodes] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('get_token', (token: string) => {
            localStorage.setItem('token', token);
        });

        socket.on('lobby_created', (code: any) => {
            navigate(`/lobby/${code}`);
        });

        socket.on('refresh_lobbies', (codes: any) => {
            console.log('Refresh Lobbies');
            setLobbyCodes(codes);
        })

    }, []);

    return (

        <div className="App center">
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/join'} element={<JoinLobby/>}/>
                <Route path={'/lobbies/create'} element={<CreateLobby/>}/>
                {
                    lobbyCodes.map((code: any) => {
                        return <Route key={code} path={`/lobby/${code}`} element={<Lobby code={code}/>}/>
                    })
                }
            </Routes>
        </div>

    );
}

interface LobbyProps {
    code: string;
}

interface Player {
    money: number;
}

function Lobby({code}: LobbyProps) {
    const [player, setPlayer] = useState<Player>({money: 0});

    useEffect(() => {
        socket.off('refresh_player').on('refresh_player', (player: any) => {
            setPlayer(player);
        });
        socket.emit('refresh_player', code);
    }, []);

    return (
        <div>
            <span>{code}</span>
            <span>{player.money}</span>
        </div>
    );
}

function Home() {
    return (
        <div className={'center'}>
            <Link to={'/lobbies/create'} className={'roundButton'}>Create Lobby</Link>
            <Link to={'/join'} className={'roundButton noMargin'}>Join Lobby</Link>
        </div>
    );
}

function CreateLobby() {
    const [username, setUsername] = useState('');

    const createLobby = () => {
        socket.emit('create_lobby', username);
    };

    return (
        <div className={'center'}>
            <h1>Create Lobby</h1>
            <input type={'text'} placeholder={'Your Name'} value={username}
                   onChange={e => setUsername(e.target.value)}/>
            <button onClick={createLobby}>Create Lobby</button>
            <Link to={'/'}>Back</Link>
        </div>
    );
}

function JoinLobby() {
    const [username, setUsername] = useState('');

    return (
        <div className={'center'}>
            <h1>Join Lobby</h1>
            <input type={'text'} placeholder={'Your Name'} value={username}
                   onChange={e => setUsername(e.target.value)}/>
            <input type={'text'} placeholder={'Lobby Code'}/>
            <button>Join</button>
            <Link to={'/'}>Back</Link>
            <span className={'error'}></span>
        </div>
    );
}

export default App;
