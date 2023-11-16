import { Chat } from '@/types/Chat';
import { Player } from '@/types/Player';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'

let socket: Socket;

const Host = () => {
    const router = useRouter();
    const { host } = router.query;
    const [chat, setChat] = useState<Chat[]>([]);
    const [players, setPlayers] = useState<Player[]>([]);
    const [path, setPath] = useState<string>('wait');

    useEffect(() => {
        socketInitializer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [host]);

    const socketInitializer = async () => {
        try {
            await fetch("/api/socket?option=connection");

            socket = io();

            socket.on('connect', () => {
                console.log('connected');
            })

            socket.on('get-chat', (msg) => {
                setChat([...chat, msg]);
            })

            socket.on("get-new-player", (msg) => {
                setPlayers((old) => {
                    socket.emit("send-players", {
                        room: host,
                        msg: [...old.map((el) => el.name), msg.name],
                    });
                    socket.emit("send-chat", {
                        room: host,
                        name: "newPlayer",
                        msg: `${msg.name} has entered the room.`,
                    });
                    return [...old, { name: msg.name, id: msg.id }];
                });
            });
        } finally {
            socket.emit('join-room', host);
        }
    }

    const startGame = () => {
        setPath('play-room');
        socket.emit('send-start', host);
    }

    switch (path) {
        case "wait":
            return (
                <>
                    <p>
                        Room: {host}
                    </p>
                    {players.map((e, idx) => {
                        return (
                            <div key={idx}>
                                <p>{e.name}</p>
                            </div>
                        )
                    })}
                    <button onClick={startGame}>Start Game</button>
                </>
            )
    }
}

export default Host