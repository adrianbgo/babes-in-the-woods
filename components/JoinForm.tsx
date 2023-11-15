import React, { useState } from 'react'

interface IJoinRoom {
    type: "room" | "home" | "host";
    btnFunction: (arg1: string, arg2: string, arg3: string) => void;
    roomAvailability?: boolean;
    room?: string;
}

const JoinForm: React.FC<IJoinRoom> = ({ type, btnFunction, roomAvailability, room }) => {

    const [room2, setRoom2] = useState<string>('');
    const [name2, setName2] = useState<string>('');

    switch (type) {
        case "room":
            return (
                <>
                    <label className="mb-10">Your name</label>
                    <input
                        autoComplete='off'
                        className='px-3 mb-10 bg-[#E5E5E5] w-[300px] h-[50px] rounded-[15px] text-[20px] border-[#262b29] border-[2px] border-solid'
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        name="room"
                        type="text"
                    />
                    <button
                        className='text-[#e5e5e5] border-none rounded-[15px] w-[300px] h-[50px] text-[18px] mt-[10px] hover:bg-[#fe7f2d] hover:cursor-pointer bg-[#619b8a]'
                        onClick={() => btnFunction(room as string, name2, "")}
                    >
                        Enter
                    </button>
                </>
            )
            break;
        case "home":
            return (
                <>
                    <label className="mb-10">Room ID</label>
                    <input
                        autoComplete='off'
                        value={room}
                        onChange={(e) => setRoom2(e.target.value)}
                        name="room"
                        type="text"
                        className='px-3 mb-10 bg-[#E5E5E5] w-[300px] h-[50px] rounded-[15px] text-[20px] border-[#262b29] border-[2px] border-solid'
                    />
                    <label className="mb-10">Your name</label>
                    <input
                        autoComplete='off'
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                        name="room"
                        type="text"
                        className='px-3 mb-10 bg-[#E5E5E5] w-[300px] h-[50px] rounded-[15px] text-[20px] border-[#262b29] border-[2px] border-solid'
                    />
                    <button
                        className='text-[#e5e5e5] border-none rounded-[15px] w-[300px] h-[50px] text-[18px] mt-[10px] hover:bg-[#fe7f2d] hover:cursor-pointer bg-[#619b8a]'
                        onClick={() => btnFunction(room2, name2, "join")}
                    >Join Room</button>
                    {/* TODO: Fix this spacer so it's not hard coded */}
                    <span className="text-[40px] text-[rgb(35,61,77,0.3)] mb-[14px]"> ............ </span>
                    <button
                        className='text-[#e5e5e5] border-none rounded-[15px] w-[300px] h-[50px] text-[18px] mt-[10px] hover:bg-[#fe7f2d] hover:cursor-pointer bg-[rgb(35,61,77)]'
                        onClick={() => btnFunction(room2, name2, "create")}
                    >Create Room</button>
                </>
            )
            break;
        case "host":
            return (
                <>
                    <label className="mb-10">Room ID</label>
                    <input
                        autoComplete='off'
                        value={room}
                        onChange={(e) => setRoom2(e.target.value)}
                        name="room"
                        type="text"
                        className='px-3 mb-10 bg-[#E5E5E5] w-[300px] h-[50px] rounded-[15px] text-[20px] border-[#262b29] border-[2px] border-solid'
                    />
                    {roomAvailability && <p className='text-red-500'>Room is already taken</p>}
                    <button
                        className='text-[#e5e5e5] border-none rounded-[15px] w-[300px] h-[50px] text-[18px] mt-[10px] hover:bg-[#fe7f2d] hover:cursor-pointer bg-[#619b8a]'
                        onClick={() => btnFunction(room2, "", "")}
                    >Create Room</button>
                </>
            )
    }
}

export default JoinForm