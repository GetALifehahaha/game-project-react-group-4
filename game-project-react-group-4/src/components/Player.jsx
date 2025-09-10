import React, { useState, useEffect } from 'react'

const Player = (props) => {
    const { playerName, playerControl, onWin, attackSibling} = props

    const [score, setScore ] = useState(0);

    useEffect(() => {
        const handleAddScore = (event) => {
            if (event.code === playerControl || event.code === attackSibling) {
                setScore((s) => {
                    if (s == 10) {
                        return s;
                    }

                    if (event.code === playerControl) {
                        return s + 1;
                    } else if (event.code === attackSibling){
                        return s - 1;
                    }
                });
            }
        }   

        window.addEventListener("keyup", handleAddScore);

        return () => {
            window.removeEventListener("keyup", handleAddScore);
        }
    }, [playerControl]);

    useEffect(() => {
        if (score === 10) {
            onWin(playerName)
        }
    }, [score]);

    
    

    return (
        <div>
            <h1>{score}</h1> {/* scoreboard goes here */}
            <h5>{playerName}</h5>
        </div>
    );
}

export default Player
