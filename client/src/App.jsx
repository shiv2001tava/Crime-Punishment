import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { background, play } from './assets'
import {
  Home,
  Dashboard,
  Login,
  Register,
  Problem2,
  Problem3,
  Problem4,
  Problem5,
  Problem6,
  Problem7,
  Problem8,
  Problem9,
  Problem11,
  Problem12,
  Problem16,
  Problem17,
  Problem17a,
  Deadend2,
  LoginA,
  AdminDashboard,
} from './pages'
import { UserContext } from './components/context/useContext'
import axios from 'axios'
import { useContext } from 'react'
import Navbar from './components/Navbar'
import Problem10 from './pages/Problem10'
import Problem13 from './pages/Problem13'
import Problem14 from './pages/Problem14'
import Problem15 from './pages/Problem15'
import Problem16a from './pages/Problem16a'
import Problem16b from './pages/Problem16b'
import Deadend1 from './pages/Deadend1'
import Problem17b from './pages/Problem17b'
import Static1 from './pages/Static1'
import Static2 from './pages/Static2'
import Static3 from './pages/Static3'
import Result from './pages/Result'
import { useEffect, useState, useRef } from 'react'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  const { isAuth, setIsAuth } = useContext(UserContext)
  const [isPlaying, setIsPlaying] = useState(false)

  const audioRef = useRef(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5 // set volume to 50%
      audioRef.current.play().catch((error) => {
        console.log('Failed to autoplay audio:', error)
      })
      audioRef.current.loop = true
      console.log('Playing audio')
    }
  }, [isAuth])

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying)
  }
  console.log(isAuth)
  return (
    <>
      <BrowserRouter>
        {!isAuth ? (
          <Routes>
            <Route>
              <Route path='/' element={<Navbar />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/loginA' element={<LoginA />} />
            </Route>
          </Routes>
        ) : (
          <main
            className='  w-full  h-screen bg-cover '
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className='hidden'>
              {/* <button onClick={handleTogglePlay}>{isPlaying ? 'Pause Music' : 'Play Music'}</button> */}
              <audio ref={audioRef} src={play} loop />
            </div>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/problem2' element={<Problem2 />} />
              <Route path='/problem3' element={<Problem3 />} />
              <Route path='/problem4' element={<Problem4 />} />
              <Route path='/problem5' element={<Problem5 />} />
              <Route path='/problem6' element={<Problem6 />} />
              <Route path='/problem7' element={<Problem7 />} />
              <Route path='/problem8' element={<Problem8 />} />
              <Route path='/problem9' element={<Problem9 />} />
              <Route path='/problem10' element={<Problem10 />} />
              <Route path='/problem11' element={<Problem11 />} />
              <Route path='/problem12' element={<Problem12 />} />
              <Route path='/problem13' element={<Problem13 />} />
              <Route path='/problem14' element={<Problem14 />} />
              <Route path='/problem15' element={<Problem15 />} />
              <Route path='/problem16' element={<Problem16 />} />
              <Route path='/problem16a' element={<Problem16a />} />
              <Route path='/problem16b' element={<Problem16b />} />
              <Route path='/problem17' element={<Problem17 />} />
              <Route path='/problem17a' element={<Problem17a />} />
              <Route path='/problem17b' element={<Problem17b />} />
              <Route path='/deadend1' element={<Deadend1 />} />
              <Route path='/deadend2' element={<Deadend2 />} />
              <Route path='/static1' element={<Static1 />} />
              <Route path='/static2' element={<Static2 />} />
              <Route path='/static3' element={<Static3 />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/result' element={<Result />} />

              <Route path='/admin' element={<AdminDashboard />} />
            </Routes>
          </main>
        )}

        {/* <Footer/> */}
      </BrowserRouter>
    </>
  )
}

export default App
