import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './styles/global.css'
import Game from './components/game/Game'
import Homepage from './components/homepage/Homepage'
import Sidebar from './components/sidebar/Sidebar'

function App() {
  console.log(import.meta.env.BASE_URL)

  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <div className="App">
          <Sidebar/>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/game/:rows/:columns" element={<Game />} />
            </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
