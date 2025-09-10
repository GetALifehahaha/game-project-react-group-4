import React, { useState } from 'react'
import Player from '../components/Player'

const MainPage = () => {
  const [winMessage, setWinMessage] = useState("");
  const [hasWinner, setHasWinner] = useState(false);

  const handleSetWinMessage = (text) => {
    if (!hasWinner) {
      setWinMessage("The winner is: " + text);
      setHasWinner(true);
    }
  }

  return (
    <div className='w-full'>
      <h1 className='text-green-400 text-3xl text-center font-bold'>
        {winMessage}
      </h1>

      <div className='flex flex-row justify-between text-2xl font-bold text-white'>
        <Player playerName="Player 1" playerControl="KeyW" attackSibling="ArrowDown" onWin={handleSetWinMessage}/>
        <Player playerName="Player 2" playerControl="ArrowUp" attackSibling="KeyS" onWin={handleSetWinMessage}/>
      </div>
    </div>
  )
}

export default MainPage
