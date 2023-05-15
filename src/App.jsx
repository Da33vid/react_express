import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Home'
import Tamagotchi from './Tamagotchi'
import Game from './Game'
function App() {
  const [count, setCount] = useState(0)
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tamagotchi" element={<Tamagotchi />} />
        <Route path='/Game' element={<Game/>} />
      </Routes>
    
    </BrowserRouter>
    
    )
}

export default App
