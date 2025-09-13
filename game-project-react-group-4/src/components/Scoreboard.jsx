import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'motion/react'

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
      <div 
      className='text-white absolute right-0 p-4 w-[20vw] h-full bg-white'>
        <h3 className='text-black font-semibold text-xl text-center pb-4'>Scoreboard</h3>
        <h5 className='text-gray-400 font-semibold pb-4'>Winners</h5>
        <div className='overflow-auto h-[80vh] bg-gray-100 py-4 px-1 rounded-sm shadow-sm'>
          {listScoreboard}
        </div>
      </div>
    </>
  )
}

export default Scoreboard
