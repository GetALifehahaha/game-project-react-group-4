import React, { useState, useEffect } from 'react'
import Player from '../components/Player'

const MainPage = () => {

  const [isPlaying, setIsPlaying] = useState(true);

  // set a state variables for player 1 and player 2
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const attackDamage = 5;
  const [player1AttackCount, setPlayer1AttackCount] = useState(1);
  const [player2AttackCount, setPlayer2AttackCount] = useState(1);

  // a list of dictionaries

  const players = [

    // this is a dictionary or object in JavaScript for player 1
    // this contains the player name, key control, and the score which uses the state variables 
    {
      name: "Lannour",
      control: "KeyW",
      attack: "KeyS",
      attackCount: player1AttackCount,
      score: player1Score,
    },
    {
      name: "Sencio",
      control: "ArrowUp",
      attack: "ArrowDown",
      attackCount: player2AttackCount,
      score: player2Score,
    },
  ];


  // map function for displaying the scoreboard.
  // design the scoreboard here
  const listScoreboard = players.map((player, index) => 
    <div key={index} className='text-white'>
      {player.name} Score: {player.score}
      </div>)

  // an rng in gaining points
  const pointRNG = () => {
    const points = [1, 1, 1, 1, 1, 2, 2, 3]
    return points[Math.floor(Math.random() * points.length)]
  }

  // a use effect function
  // this use effect will run when the app is rendered
  useEffect(() => {
    console.log(player1AttackCount)
    // a function that handles score changes
    const handleAddScore = (event) => {
      // if there's already a winner, no one is getting points anymore
      if (!isPlaying) {
        return;
      }

      // if the player 1 hits his key (default=W)
        if (event.code === players[0].control) {
          console.log(isPlaying)
          // the setState will add his score by one
          setPlayer1Score(s => s + pointRNG());
        }
        // similar logic (default key=Arrow Up)
        if (event.code === players[1].control) {
          setPlayer2Score(s => s + pointRNG());
        }

        if (event.code === players[0].attack && players[0].attackCount !== 0){
          setPlayer2Score(s => s - attackDamage);
          setPlayer1AttackCount(atk => atk - 1)
        }
        if (event.code === players[1].attack && players[1].attackCount !== 0) {
          setPlayer1Score(s => s - attackDamage);
          setPlayer2AttackCount(atk => atk - 1)
        }
    }   

    // add an event listener to listen to key presses
    window.addEventListener("keyup", handleAddScore);

    // a garbage collector that will prevent duplicate listeners
    // each rerender adds an event listener
    // and since each button press rerenders,
    // we need to remove the previous event listeners
    return () => {
        window.removeEventListener("keyup", handleAddScore);
    }
  }, [isPlaying, player1AttackCount, player2AttackCount]);

  // check for winners
  useEffect(() => {
    // iterate thru the list of players
    for (const player of players) {
      // if the score of disctionary in the list
      // render the name of the dictionary in the list
      // uhmmm sorry im bad english speak
      if (player.score === 10) {
        console.log(player.name + " won!")
        setIsPlaying(false);
      }
    }
  }, [player1Score, player2Score])

  // the renders in VDOM
  return (
    <div className='w-full'>
      {listScoreboard}

      <div className='flex flex-row justify-between text-2xl font-bold text-white'>
        <Player playerName={players[0].name} playerControl={players[0].control}/>
        <Player playerName={players[1].name} playerControl={players[1].control}/>
      </div>
    </div>
  )
}

export default MainPage
