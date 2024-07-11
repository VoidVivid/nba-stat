import React from 'react'
import './player.css'

const player = () => {
  return (
    <div className='card'>
      <div className='grid'>
        <div className='player-stats'>
          <div className='flex-container'>
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254" className='big-forehead'/>
            <h2>Jaylen Brown</h2>
          </div>
          <div className='flex-containers'>
            <div className='PTS'>
                <p><b>PTS</b></p>
                <p><b>20.8</b></p>
            </div>
            <div className='REB'>
                <p><b>REB</b></p>
                <p><b>5.4</b></p>
            </div>
            <div className='AST'>
                <p><b>AST</b></p>
                <p><b>5.0</b></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default player
