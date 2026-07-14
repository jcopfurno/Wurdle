import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Game from './components/game/Game'
import Homepage from './components/homepage/Homepage'
import SignIn from './components/signin/SignIn'
import SignUp from './components/signup/SignUp'

function App() {
  return (
    <>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navigate to="/wurdle" />} />
          <Route path="/wurdle" element={<Homepage />} />
          <Route path="/wurdle/game/:rows/:columns" element={<Game />} />
          <Route path="/wurdle/signin" element={<SignIn />} />
          <Route path="/wurdle/signup" element={<SignUp />} />
        </Routes>

      </div>
    </>
  )
}

export default App
