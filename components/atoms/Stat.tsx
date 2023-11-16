import React from 'react'

interface IStat {
    name: string,
    value: number
}

const Stat: React.FC<IStat> = ({ name, value }) => {
    return (
        <div className='w-[8rem] h-[10rem]'>
            <svg width="100%" height="100%" className='float-left -z-50'>
                <circle cx="50%" cy="50%" r="20%" stroke="black" fill="transparent" stroke-width="2" />
                <line x1="28%" y1="50%" x2="72%" y2="50%" stroke="black" stroke-width="2" />
                <line x1="5%" y1="30%" x2="32%" y2="40%" stroke="black" stroke-width="2" />
                <line x1="5%" y1="70%" x2="32%" y2="60%" stroke="black" stroke-width="2" />
                <line x1="5%" y1="30%" x2="5%" y2="70%" stroke="black" stroke-width="2" />
                <line x1="95%" y1="70%" x2="68%" y2="60%" stroke="black" stroke-width="2" />
                <line x1="95%" y1="30%" x2="68%" y2="40%" stroke="black" stroke-width="2" />
                <line x1="95%" y1="70%" x2="95%" y2="30%" stroke="black" stroke-width="2" />
            </svg>
            <div className='fixed z-50 text-[0.6rem] w-[8rem] h-[10rem]'>
                <p className='text-center mt-[3.9rem]'>{name}</p>
                <p className='text-center mt-[.5rem]'>{value}</p>
            </div>
        </div>
    )
}

export default Stat