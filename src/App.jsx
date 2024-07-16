import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Player from './Components/Player/player'

const App = () => {

  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme? current_theme : 'light');

  useEffect(()=>{
    localStorage.setItem('current_theme', theme)
  },[theme])

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <Player className='section'/>
    </div>
  )

}


export default App

