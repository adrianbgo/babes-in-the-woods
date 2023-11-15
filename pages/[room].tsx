import GameRoom from '@/components/GameRoom';
import JoinForm from '@/components/JoinForm';
import WaitingRoom from '@/components/WaitingRoom';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client';

const Room = () => {
    const router = useRouter();
    const { room, name } = router.query;
    const [name2, setName2] = useState<string>('');
    const [path, setPath] = useState<string>(' ');

    useEffect(() => {
        socketInitializer(name as string);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name])
    let socket = io();

    const socketInitializer = async (name: string) => {
        try {
            console.log('here 1');
            await fetch("/api/socket?option=connection");
            socket = io();
            socket.on('connect', () => {
                if (name != undefined) joinRoom(room as string, name);
            })
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    const joinRoom = (room: string, name: string) => {
        socket.emit('join-room', room);
        socket.emit('send-to-host', { room, name, id: socket.id });
        setName2(name);
        setPath('wait');
    }

    switch (path) {
        case "wait":
            return (
                <WaitingRoom />
            )
        case "play-room":
            return (
                <GameRoom />
            )
        default:
            return (
                <>
                    <section>
                        <p>Welcome {name} to the room {room}</p>
                        {name == undefined && (
                            <JoinForm type="room" btnFunction={joinRoom} room={room as string} />
                        )}
                    </section>
                </>
            )
    }
}

export default Room