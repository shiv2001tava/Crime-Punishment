import React, { useContext } from 'react'
import { backdrop } from '../assets'
import { Link } from 'react-router-dom'
import { UserContext } from './context/useContext'


const Navbar = () => {

  const {user} = useContext(UserContext)
  console.log(user)
  
  return (
    <div
      className='w-full flex-col gap-3 h-screen bg-cover flex items-center justify-center'
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      <Link to='/login'>
        <div className='bg-green-700 p-3 border-2 rounded-md cursor-pointer'>
          <p className='font-bold text-5xl text-white'>
            Login to Treasure Hunt
          </p>
        </div>
      </Link>
      <Link to='/loginA'>
        <div className='bg-green-700 p-3 border-2 rounded-md cursor-pointer'>
          <p className='font-bold text-5xl text-white'>Login as Admin</p>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
