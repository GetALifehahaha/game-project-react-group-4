import React, { useState, useEffect } from 'react'

const Player = (props) => {
    const { playerName, playerControl } = props

    // design the player cards
    return (
        <div>
            <h5>{playerName}</h5>
            <h4>{playerControl}</h4>
        </div>
    );
}

export default Player
