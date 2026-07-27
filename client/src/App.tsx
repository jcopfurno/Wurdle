import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import Game from './components/game/Game'
import Homepage from './components/homepage/Homepage'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  return (
    <>
      <div className="App">
            <BrowserRouter>
              <Sidebar/>
              <Routes>]
                <Route path="/" element={<Homepage />} />
                <Route path="/game/:rows/:columns" element={<Game />} />
              </Routes>
            </BrowserRouter>
      </div>
    </>
  )
}

export default App
