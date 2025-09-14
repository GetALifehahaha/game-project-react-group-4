import React, { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const Scoreboard = (props) => {
    const { winnerInfo } = props
    const [scoreboardHistory, setScoreboardHistory] = useState([]);

    const handleSetScoreboardHistory = () => {
        setScoreboardHistory(sh => [...sh, winnerInfo])
    }
    const listScoreboard = scoreboardHistory.map((scoreResult, index) => 
    <h1 key={index} className='px-2 py-1 rounded-lg mb-2 font-bold text-black text-left'>
        {scoreResult.winner}
    </h1>)

    useEffect(() => {
        handleSetScoreboardHistory()
    }, [winnerInfo])

  return (

    <>
      <motion.div
      initial={{
        translateX: '5vw',
        opacity: 0
      }}
      animate={{
        translateX: 0,
        opacity: 1
      }}
      exit={{
        translateX: '5vw',
        opacity: 0
      }}
      transition={{
        duration: .2,
        ease: 'anticipate'
      }} 
      className='text-white right-0 p-4 w-[20vw] h-full bg-white'>
        <h3 className='text-black font-semibold text-xl text-center pb-4'>Scoreboard</h3>
        <h5 className='text-gray-400 font-semibold pb-4'>Winners</h5>
        <div className='overflow-auto h-[80vh] bg-gray-100 py-4 px-1 rounded-sm shadow-sm'>
          {listScoreboard}
        </div>
      </motion.div>
    </>
  )
}

export default Scoreboard
