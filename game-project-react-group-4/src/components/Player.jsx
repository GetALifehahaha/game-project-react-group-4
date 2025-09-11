import React, { useState, useEffect } from 'react'
import { backInOut, motion } from 'motion/react'

const Player = (props) => {
    const { playerName, playerControl } = props


    // design the player cards
    return (
        <motion.div 
        initial = {{
            translateY: -20
        }}
        animate = {{
            translateY: 0
        }}
        whileHover={{
            scale: 1.1
        }}
        transition={{
            duration: .2,
            ease: backInOut,
        }}
        className='flex flex-col items-center gap-2 px-20 py-40 bg-stone-950 rounded-2xl'>
            <h4 className='text-sm text-gray-400'>Player</h4>
            <h5>{playerName}</h5>
            <motion.h4 
            className='p-10 bg-zinc-800 rounded-2xl'>{playerControl}</motion.h4>
        </motion.div>
    );
}

export default Player
