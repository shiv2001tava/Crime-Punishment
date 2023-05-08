import React, { useState, useEffect, useContext } from 'react'
import { backdrop, scene19 } from '../assets'
import { Radio } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../components/context/useContext'
import { useNavigate } from 'react-router-dom'

const Result = () => {
  const [userData, setUserData] = useState(null)
  const { user, setIsAuth, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/user/${user.id}`)
        setUserData(response.data)
        console.log(userData + 'user data')
      } catch (error) {
        console.log(error)
      }
    }

    fetchUserData()
  }, [user.id])

  const logout = async (e) => {
    e.preventDefault()

    setUser(null)
    console.log(user)
    localStorage.removeItem('userData')
    setIsAuth(false)
    navigate('/')
    // redirect to login page or do any other necessary actions
  }

  return (
    <section className=' w-full overflow-hidden h-screen'>
      <div className='flex flex-col items-center justify-center w-full h-screen '>
        <div className='flex flex-col items-center bg-white border-2 rounded-md p-4 overflow-hidden w-4/5'>
          <div>
            <p className='text-4xl font-bold'>Your Result</p>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center p-4'>
              <p className='text-2xl font-bold'>Attention</p>
            </div>
            <div className='flex items-center p-4 ml-4'>
              <p className='text-2xl font-bold'>
                {userData?.attentionScore || 0}/20
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center p-4'>
              <p className='text-2xl font-bold'>Curiosity</p>
            </div>
            <div className='flex items-center p-4 ml-4'>
              <p className='text-2xl font-bold'>
                {userData?.curiosityScore || 0}/12
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center p-4'>
              <p className='text-2xl font-bold'>Empathy</p>
            </div>
            <div className='flex items-center p-4 ml-4'>
              <p className='text-2xl font-bold'>
                {userData?.empathyScore || 0}/6
              </p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center p-4'>
              <p className='text-2xl font-bold'>WorkEthics</p>
            </div>
            <div className='flex items-center p-4 ml-4'>
              <p className='text-2xl font-bold'>
                {userData?.workEthicScore || 0}/7
              </p>
            </div>
          </div>

          <button onClick={logout}>
            <div className='flex items-center justify-center bg-green-700 p-3 border-2 rounded-md cursor-pointer w-[400px]'>
              <p className='font-bold text-5xl p-4 text-white'>Play Again</p>
            </div>
          </button>
        </div>
      </div>
      {/* */}
    </section>
  )
}

export default Result
