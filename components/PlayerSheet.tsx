import { Character } from '@/types/Character'
import React from 'react'
import Stat from './atoms/Stat'

interface IPlayerSheet {
    character: Character
}

const PlayerSheet: React.FC<IPlayerSheet> = ({ character }) => {
    return (
        <div className='uppercase w-screen h-screen grid-cols-3 grid grid-rows-6'>
            <div></div>
            <div className='grid grid-cols-4'>
                <p className='col-span-4'>name: {character.basics.name}</p>
                <p className='col-span-1'>age: {character.basics.age}</p>
                <p className='col-span-3'>look: {character.basics.look}</p>
            </div>
            <div className='flex'>
                <Stat name='steam' value={character.stats.steam} />
                <Stat name='noodle' value={character.stats.noodle} />
                <Stat name='mush' value={character.stats.mush} />
            </div>
            <div className='row-span-5'>
                Special Moves
            </div>
            <div>
                Harm: {character.harm}
            </div>
            <div>
                Items: {character.items}
            </div>
            <div>
                Hope: {character.hope}
            </div>
            <div className='row-span-2'>
                Friends: {character.friends}
            </div>
            <div>
                Fear: {character.fear}
            </div>
            <div>
                Wishes: {character.wishes}
            </div>
            <div>
                XP: {character.xp}
            </div>
            <div className="row-span-1 col-span-3">
                Questions: {character.questions}
            </div>
        </div>
    )
}

export default PlayerSheet