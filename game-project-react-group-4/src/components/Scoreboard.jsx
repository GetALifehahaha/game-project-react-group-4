import React, { useEffect, useState, useRef } from 'react'

const Scoreboard = (props) => {
    const { winnerInfo } = props
    const [scoreboardHistory, setScoreboardHistory] = useState([
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
      {winner: "Lannour"},
    ]);
    const [isOpen, setIsOpen] = useState(false);

    const handleSetScoreboardHistory = () => {
        setScoreboardHistory(sh => [...sh, winnerInfo])
    }

    const handleSetIsOpen = () => {
      setIsOpen(!isOpen);
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
      <button className='text-black font-semibold absolute left-0 m-2 p-2 bg-white rounded-xl cursor-pointer' onClick={handleSetIsOpen}>SCOREBOARD</button>
      { isOpen && 
      <div className='text-white absolute right-0 p-4 w-[20vw] h-full bg-white '>
        <h3 className='text-black font-semibold text-2xl text-center'>Scoreboard</h3>
        <h5 className='text-gray-600 font-semibold'>Winners</h5>
        <div className='overflow-auto h-[80vh] bg-white p-2 shadow-md'>
          {listScoreboard}
        </div>
      </div>
      }
    </>
  )
}

export default Scoreboard
