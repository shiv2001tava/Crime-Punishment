import React, { useState, useEffect, useContext } from 'react'
import { test1, test2, test3, avatar } from '../assets'
import { Radio } from '@nextui-org/react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/context/useContext'

const AdminDashboard = () => {
  const { setIsAuth, isAuth } = useContext(UserContext)
  const [allUsers, setAllUsers] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  function userId() {
    axios
      .get('/profile')
      .then(({ data }) => {
        setUser(data)
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  userId()
  console.log(user)

  const logout = async (e) => {
    e.preventDefault()

    axios.get('/logout').then(({ data }) => {
      console.log(data.message)
      setIsAuth(false)
      console.log(isAuth)
      navigate('/')
    })
  }

  useEffect(() => {
    if (user) {
      axios.get(`/getalluser`).then(({ data }) => {
        setAllUsers(data)
      })
    }
  }, [user])

  console.log(allUsers)

  return (
    <section className='w-full overflow-hidden h-screen'>
      <div className='flex flex-col gap-3 items-center justify-start mt-20 w-full h-screen'>
        <div className='flex flex-col items-center bg-white border-2 rounded-md p-7 overflow-hidden w-11/12 gap-3'>
          <div>
            <p className='text-4xl font-bold'>Admin DashBoard</p>
          </div>
          {allUsers.map((user, index) => (
            <div
              key={index}
              className='flex items-center justify-between gap-4 bg-slate-700 mt-4 p-2 rounded-3xl border-2'
            >
              <div className='flex items-center justify-center'>
                <div className='flex items-center p-4 ml-4'>
                  <p className='text-2xl text-white semi-bold'>Name</p>
                </div>
                <div className='flex items-center p-4 ml-4'>
                  <p className='text-2xl text-white font-medium'>{user.name}</p>
                </div>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white semi-bold'>Attention</p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white font-medium'>
                  {user.attentionScore}/20
                </p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white semi-bold'>Curiosity</p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white font-medium'>
                  {user.curiosityScore}/12
                </p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white semi-bold'>Empathy</p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white font-medium'>
                  {user.empathyScore}/6
                </p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white semi-bold'>WorkEthics</p>
              </div>
              <div className='flex items-center p-4 ml-4'>
                <p className='text-2xl text-white font-normal'>
                  {user.workEthicScore}/7
                </p>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button onClick={logout}>
            <div className='bg-red-700 p-3 gap-3 flex items-center justify-center border-2 rounded-md cursor-pointer w-[400px]'>
              <p className='font-bold text-5xl p-4 text-white'>Logout</p>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboard
