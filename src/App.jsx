import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Jaylen from './Components/Player/jaylen'
import Luka from './Components/Player/luka'

const App = () => {

  const current_theme = localStorage.getItem('current_theme')
  const [theme, setTheme] = useState(current_theme? current_theme : 'light');

  useEffect(()=>{
    localStorage.setItem('current_theme', theme)
  },[theme])

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
      <h2 style={{color: "gray", marginLeft: "5.5em", marginTop: 30, textDecoration: "underline"}}>TOP PLAYERS</h2>
      <Jaylen className='section'/>
      <Luka/>
    </div>
  )

}


export default App

