import React from 'react'
import './jaylen.css'

const player = () => {
  return (
    <div style={{marginTop : 20}}>
      <div className='grid'>
        <div className='player-stats'>
          <div className='flex-container' style={{gap: 40}}>
            <img src="https://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3917376.png&w=350&h=254" style={{height: "auto", width: "50%", padding: 5, marginBottom
              :25
            }}/>
            <h2>Jaylen Brown</h2>
          </div>
          <div className='flex-container' style={{marginLeft: "1.2em", marginRight: "1.2em", fontSize: 22, marginTop: 15}}>
            <div>
              <p style={{textDecoration: "underline"}}><b>PTS</b></p>
              <p><b>20.8</b></p>
            </div>
            <div>
              <p style={{textDecoration: "underline"}}><b>REB</b></p>
              <p><b>5.4</b></p>
            </div>
            <div>
              <p style={{textDecoration: "underline"}}><b>AST</b></p>
              <p><b>5.0</b></p>
            </div>
          </div>
          <div style={{marginLeft: 95, marginTop: 20}}>
            <h2>Finals MVP</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default player
