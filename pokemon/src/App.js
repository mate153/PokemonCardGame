import './App.css'
import Main from './components/Main'
import React, { useState, useEffect, useRef } from 'react'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [musicModifier, setmusicMofidier] = useState(true)
  const audio = useRef(new Audio(process.env.PUBLIC_URL + "/music/menuMusic.mp3"));
  
  useEffect(() => {
    if(musicModifier === true) {
      audio.current.loop = true;
      audio.current.volume = 0.4;
      audio.current.play();
    } else {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
  }, [gameStarted, musicModifier])

  const startGame = () => {
    setGameStarted(true)
  }

  const audioModifier = (bool) => {
    setmusicMofidier(bool)
  }

  return (
    <>
      <div className="App">
          {gameStarted === false ?
            <div className='starGameBox'><span onClick={startGame}>START GAME</span></div>
            :
            <Main refText="mainMenu" audioModifier={audioModifier}/>
          }
      </div>
    </>
  );
}

export default App;
