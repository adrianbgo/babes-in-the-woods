import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import JoinForm from './JoinForm';

const CreateHost = () => {

    const router = useRouter();

    const [isRoom, setIsRoom] = useState<boolean>(false);

    const redirectHost = async (room: string, _: string, __: string) => {
        const res = await fetch(`/api/socket?option=room&room=${room}`);
        console.log(await res);
        const posts = await res.json();
        if (!posts.thereIs) {
            router.push(
                `host/${room}`
            );
        } else {
            setIsRoom(true);
        }
    }

    return (
        <section className="bg-[#e5e5e5] min-h-screen py-64 flex-1 flex flex-col justify-center items-center">
            <Head>
                <title>BITW - Create Room</title>
            </Head>
            <JoinForm
                type="host"
                btnFunction={redirectHost}
                roomAvailability={isRoom}
            />
        </section>
    )
}

export default CreateHost