import React from 'react'
import './luka.css'

const luka = () => {
  return (
    <div style={{marginTop : 45}}>
      <div className='grid'>
        <div className='player-statss'>
          <div className='flex-containers' style={{gap: 40}}>
            <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png" style={{height: "auto", width: "45%", padding: 5, marginBottom
              :23, marginLeft: 17.5
            }}/>
            <h2>Luka Dončić</h2>
          </div>
          <div className='flex-containers' style={{marginLeft: "1.2em", marginRight: "1.2em", fontSize: 22, marginTop: 15}}>
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
        </div>
      </div>
    </div>
  )
}

export default luka
