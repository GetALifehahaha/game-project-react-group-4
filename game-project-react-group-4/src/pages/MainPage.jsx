import React, { useState, useEffect } from 'react'
import Player from '../components/Player'
import Scoreboard from '../components/Scoreboard';
import { motion } from 'motion/react'

const MainPage = () => {

  const [isPlaying, setIsPlaying] = useState(true);
  const [isShowingWinner, setIsShowingWinner] = useState(false);

  // set a state variables for player 1 and player 2
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const attackDamage = 5;
  const [player1AttackCount, setPlayer1AttackCount] = useState(1);
  const [player2AttackCount, setPlayer2AttackCount] = useState(1);

  const [winnerInfo, setWinnerInfo] = useState({});
  const [scoreboardIsOpen, setScoreboardIsOpen] = useState(false);
  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  

  // a list of dictionaries

  const players = [

    // this is a dictionary or object in JavaScript for player 1
    // this contains the player name, key control, and the score which uses the state variables 
    {
      name: player1Name,
      control: "KeyW",
      attack: "KeyS",
      attackCount: player1AttackCount,
      setAttackCount: setPlayer1AttackCount,
      score: player1Score,
      setScore: setPlayer1Score
    },
    {
      name: player2Name,
      control: "ArrowUp",
      attack: "ArrowDown",
      attackCount: player2AttackCount,
      setAttackCount: setPlayer2AttackCount,
      score: player2Score,
      setScore: setPlayer2Score
    },
  ];


  // map function for displaying the scoreboard.
  // design the scoreboard here
  const listScoreboard = players.map((player, index) => 
    <div key={index} className={`text-white ${index===0 ? 'bg-nintendo-blue-500' : 'bg-nintendo-red-1'} flex-1 p-8 flex flex-col justify-center items-center gap-2`}>
      <h3 className='text-2xl'>SCORE</h3>
      <h1 className={`text-black font-bold text-4xl p-5 w-30 py-12 text-center bg-white border-8 border-black rounded-xl shadow-sm shadow-black`}>
        {player.score}
      </h1>
    </div>)

  // an rng in gaining points
  const pointRNG = () => {
    const points = [1, 1, 1, 1, 1, 2, 2, 3]
    return points[Math.floor(Math.random() * points.length)]
  }

  // a use effect function
  // this use effect will run when the app is rendered
  useEffect(() => {
    const handleAddScore = (event) => { // a function that handles score changes
      
      if (!isPlaying || settingsIsOpen) {
        return;
      }

      players.forEach((player, index) => {
        const opponentIndex = index === 1 ? 0 : 1;

        if (player.control == event.code) {
          player.setScore(s => s + pointRNG())
        }

        if (player.attack == event.code && player.attackCount != 0) {
          players[opponentIndex].setScore(s => s - 5)
          player.setAttackCount(0)
        }
      })
    }   

    
    window.addEventListener("keyup", handleAddScore); // add an event listener to listen to key presses

    // a garbage collector that will prevent duplicate listeners
    // each rerender adds an event listener
    // and since each button press rerenders,
    // we need to remove the previous event listeners
    return () => {
        window.removeEventListener("keyup", handleAddScore);
    }
  }, [isPlaying, settingsIsOpen, player1AttackCount, player2AttackCount]);

  // check for winners
  useEffect(() => {
    for (const player of players) { // iterate thru the list of players
      // if the score of disctionary in the list
      // render the name of the dictionary in the list
      // uhmmm sorry im bad english speak
      if (player.score >= 10) {

        // send the information to the Scoreboard component
        setWinnerInfo({
          winner: player.name,
        })

        handleShowWinner();
        setIsPlaying(false);
      }
    }
  }, [player1Score, player2Score])

  const resetGame = () => {
    setIsPlaying(true);
    players.forEach(player => {
      player.setScore(0);
      player.setAttackCount(1);
    })
  }

  const handleShowWinner = () => {
    setIsShowingWinner(true);

    setTimeout(() => {
      setIsShowingWinner(false);
    }, 3000);
  }

  const handleSetPlayer1Name = (event) => {
    setPlayer1Name(event.target.value)
  }
  
  const handleSetPlayer2Name = (event) => {
    setPlayer2Name(event.target.value)
  }

  const handleSetScoreboardIsOpen = () => {
    setScoreboardIsOpen(!scoreboardIsOpen);
  }

  const handleSetSettingsIsOpen = () => {
    setSettingsIsOpen(!settingsIsOpen);
  }
    // the renders in VDOM
  return (
    <div className='w-full flex flex-col items-center'>
      {settingsIsOpen && 
        <div className='text-white absolute left-0 p-4 w-[20vw] h-full bg-white'>
          <h1 className='text-black font-semibold text-xl text-center pb-4'>Settings</h1>

          <div className='py-4 px-1 bg-gray-100 rounded-sm shadow-md flex flex-col gap-2'>
            <h1 className='text-gray-400 pb-2'>Name</h1>
            <label for='player1Name' className='text-sm text-black'>Set Player 1 Name</label>
            <input type="text" id='player1Name' placeholder='Input player 1 name' 
              className='border-b-2 border-gray-800 pb-2 w-full text-sm placeholder-gray-400 px-2 text-black outline-none focus:border-nintendo-blue-500'
              onChange={(e) => handleSetPlayer1Name(e)}/>
            <label for='player1Name' className='text-sm text-black'>Set Player 2 Name</label>
            <input type="text" id='player2Name' placeholder='Input player 2 name' 
              className='border-b-2 border-gray-800 pb-2 w-full text-sm placeholder-gray-400 px-2 text-black outline-none focus:border-nintendo-blue-500'
              onChange={(e) => handleSetPlayer2Name(e)}
            />
          </div>
        </div>
      }
      {scoreboardIsOpen && 
        <Scoreboard winnerInfo={winnerInfo}/>
      }

      {isShowingWinner && 
      <motion.div
      animate={{
        translateY: 20
      }}
      exit={{
        translateY: 0
      }}
      className='absolute top-10 flex flex-col px-40 py-2 bg-stone-950 rounded-xl items-center'>
        <h5 className='font-semibold text-gray-700'>
          Winner: 
        </h5>
        <h2 className='font-bold text-green-400 text-4xl'>
          {winnerInfo.winner}
        </h2>
      </motion.div>}

      <div className='bg-black w-full p-4 flex justify-evenly items-center'>
        <button onClick={resetGame} className='bg-nintendo-red-5 text-white font-semibold p-4 rounded-xl cursor-pointer w-[20vw]'>RESET</button>
        <button className='text-black font-semibold p-4 bg-white rounded-xl cursor-pointer w-[20vw]' onClick={handleSetScoreboardIsOpen}>SCOREBOARD</button>
      </div>

      <div className='flex flex-row bg-white w-full justify-between mx-auto'>
        {listScoreboard}
      </div>

      <div className={`flex flex-row justify-between w-full`}>
        <Player playerName={players[0].name} playerControl={"W"} attackControl={"S"} playerNo={1}/>
        <Player playerName={players[1].name} playerControl={"Up"} attackControl={"Down"} playerNo={2}/>
      </div>

      <div className='h-auto w-full bg-black p-2 flex justify-center items-center'>
        <button 
        className='py-1 px-4 bg-white text-black text-sm rounded-2xl cursor-pointer'
        onClick={handleSetSettingsIsOpen}
        >Settings</button>
      </div>
    </div>
  )
}

export default MainPage
