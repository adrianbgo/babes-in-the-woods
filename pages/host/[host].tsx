import { Player } from '@/types/Player';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const HostPage = () => {
    const router = useRouter();
    const { host } = router.query;
    console.info('host: ', host);
    const [players, setPlayers] = useState<Player[]>([]);
    let socket = io();

    useEffect(() => {
        socketInitializer();
    }, [host]);

    const socketInitializer = async () => {
        try {
            await fetch("/api/socket?option=connection");
            socket.on("connect", () => {
                console.log('connected');
            });

            socket.on('get-new-player', (msg) => {
                setPlayers((old: Player[]) => {
                    socket.emit('send-players', {
                        room: host,
                        msg: [...old.map((el) => el.name), msg.name],
                    });
                    socket.emit('send-chat', {
                        room: host,
                        msg: `${msg.name} has joined the room`,
                        name: 'newPlayer'
                    })

                    return [...old, { name: msg.name, id: msg.id }]
                })
            })
        } finally {
            socket.emit('join-room', host);
        }
    };
    return (
        <>
            <p>
                Host: {host}
            </p>
            {players.map((e, idx) => {
                return (
                    <div key={idx}>
                        <p>{e.name}</p>
                    </div>
                )
            })}
        </>
    )
}

export default HostPage