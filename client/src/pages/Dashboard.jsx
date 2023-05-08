import React, { useContext , useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { backdrop,play } from '../assets'
import { UserContext } from '../components/context/useContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const { setIsAuth, isAuth } = useContext(UserContext)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  // const { user } = useContext(UserContext)
  function userId() {
    axios.get('/profile')
      .then(({ data }) => {
        setUser(data)
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  userId()

 


  // const logout = async (e) => {
  //   e.preventDefault()

  //   axios.get('/logout').then(({ data }) => {
  //     console.log(data.message)
  //     setIsAuth(false)
  //     console.log(isAuth)
  //     navigate('/')
  //   })
  // }
  const logout = async (e) => {
    e.preventDefault()
   
    
    setUser(null);
    console.log(user)
    localStorage.removeItem('userData')
    setIsAuth(false)
    navigate('/')
    // redirect to login page or do any other necessary actions
  }

  useEffect(()=> {
    logout()
  },[user])



  
  return (
    <div
      className='w-full h-screen bg-cover flex-col gap-3 flex items-center justify-center'
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <Link to='/home'>
        <div className='bg-green-700 p-3 flex items-center justify-center border-2 rounded-md cursor-pointer w-[400px]'>
          <p className='font-bold text-5xl p-4 text-white'>PLAY</p>
        </div>
      </Link>
      {isAuth && (
        <button onClick={logout}>
          <div className='bg-red-700 p-3 flex items-center justify-center border-2 rounded-md cursor-pointer w-[400px]'>
            <p className='font-bold text-5xl p-4 text-white'>Logout</p>
          </div>
        </button>
      )}
    </div>
  )
}

export default Dashboard
