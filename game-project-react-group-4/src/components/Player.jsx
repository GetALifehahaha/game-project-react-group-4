import React, { useState, useEffect } from 'react'
import { backInOut, motion } from 'motion/react'

const Player = (props) => {
    const { playerName, playerControl, attackControl, playerNo } = props

    // design the player cards
    return (
        <motion.div 
        className={`flex flex-col items-center gap-4 flex-1 h-[50vh] ${playerNo === 1 ? 'bg-nintendo-blue-500' : 'bg-nintendo-red-1'}`}>
            <h5 className={`text-3xl w-[30%] text-center p-2 rounded-sm border-4 border-black
                ${playerNo === 1 ? 'bg-zinc-800 text-white' : 'bg-white text-black'}`}>{playerName}</h5>

            <div className='bg-nintendo-gray flex justify-center items-center p-6 shadow-md rounded-md mt-auto mb-20'>
                <button className='bg-zinc-800 aspect-square p-6'>
                    <h4 className='bg-nintendo-blue-550 text-white aspect-square flex justify-center items-center rounded-full h-15 w-15'>{playerControl}</h4>
                </button>
                <div className='flex flex-col flex-1 aspect-square gap-0.5 bg-zinc-800 px-2 h-full'>
                    <div className='bg-nintendo-gray rounded-sm flex-1 h-100'></div>
                    <div className='bg-nintendo-gray rounded-sm flex-1 h-100'></div>
                    <div className='bg-nintendo-gray flex-1 h-100 rounded-xs flex my-1 justify-evenly items-center'>
                        <div className='bg-nintendo-red-3 w-4 h-1'></div>
                        <div className='bg-nintendo-red-3 w-4 h-1'></div>
                    </div>
                    <div className='bg-nintendo-gray rounded-sm flex-1 h-100'></div>
                    <div className='bg-nintendo-gray rounded-sm flex-1 h-100'></div>
                </div>
                <button className='bg-zinc-800 aspect-square p-6'>
                    <h4 className='text-sm bg-nintendo-red-2 text-white aspect-square flex justify-center items-center rounded-full h-15 w-15'>{attackControl}</h4>
                </button>
            </div>
        </motion.div>
    );
}

export default Player
