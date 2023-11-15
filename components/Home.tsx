import { useRouter } from 'next/router'
import React from 'react'
import JoinForm from './JoinForm';

interface IHome {
    path: (path: string) => void;
}

const Home: React.FC<IHome> = ({ path }) => {

    const router = useRouter();

    const handleJoinRoom = (room: string, name: string, option: string) => {
        switch (option) {
            case "join":
                router.push(`${room}?name=${name}`)
                break;
            case "create":
                path("create-room");
                break;
        }
    }

    return (
        <div className='bg-[#E5E5E5] min-h-screen py-64 flex-1 flex flex-col justify-center items-center'>
            <JoinForm type="home" btnFunction={handleJoinRoom} />
        </div>
    )
}

export default Home