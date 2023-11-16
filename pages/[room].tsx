import GameRoom from '@/components/GameRoom';
import JoinForm from '@/components/JoinForm';
import PlayerSheet from '@/components/PlayerSheet';
import WaitingRoom from '@/components/WaitingRoom';
import { testCharacter } from '@/utils/testutils';
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client';

let socket: Socket

function Room() {
    const router = useRouter();
    const { room, name } = router.query;
    const [name2, setName2] = useState<string>('');
    const [path, setPath] = useState<string>(' ');
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            socketInitializer(name as string);
            initialized.current = true;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    const socketInitializer = async (_name: string) => {
        try {
            await fetch("/api/socket?option=connection");
            socket = io();

            socket.on('connect', () => {
                if (_name != undefined) joinRoom(room as string, _name);
            });

            socket.on('start-game', () => {
                setPath('play-room');
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
    };

    switch (path) {
        case "wait":
            return (
                <WaitingRoom />
            );
        case "play-room":
            return (
                <PlayerSheet character={testCharacter} />
            );
        default:
            return (
                <div className='h-screen w-screen'>
                    <section>
                        <p>Welcome {name} to the room {room}</p>
                        {name == undefined && (
                            <JoinForm type="room" btnFunction={joinRoom} room={room as string} />
                        )}
                    </section>
                </div>
            );
    }
}

export default Room