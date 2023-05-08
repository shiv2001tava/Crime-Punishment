import React, {useState, useEffect} from 'react'
import { backdrop } from '../assets'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import  {toast} from "react-hot-toast";



const Register = () => {
    const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })
    const registerUser = async (e) => {
        console.log('1')
        e.preventDefault()
        const { name, email, password } = data
        try {
          const { data } = await axios.post('/register', {
            name,
            email,
            password,
          })
          if (data.error) {
            toast.error(data.error)
          } else {
            setData({})
            toast.success('registeration successfull ,  Welcome !!!!')
            navigate('/login')
          }
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div  className="w-full h-screen bg-cover flex items-center justify-center" style={{ backgroundImage: `url(${backdrop})` }}>
    <div className='flex flex-col items-center justify-center'>
    <form className='w-full bg-slate-50 border-2 rounded-md' onSubmit={registerUser}>
       <div className='flex flex-col items-center justify-center p-4' >
       <div className='flex items-center justify-center gap-3 p-2'>
         <label  className='ml-3 text-xl font-bold ' >Name</label>
         <input
           className='bg-transparent p-2 border-2 rounded-md'
           
            type='text'
            placeholder='enter your name...'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
         />
         </div>
        <div className='flex items-center justify-center gap-3 p-2'>
        <label className='-ml-3 text-xl font-bold' >Email </label>
         <input
           
           type='text'
           className='bg-transparent p-2 border-2 rounded-md'
           placeholder='enter your name...'
           value={data.email}
           onChange={(e) => setData({ ...data, email: e.target.value })}
         />
        </div >
         
        <div className='flex items-center justify-center gap-3 p-2'>
         <label  className='ml-3 text-xl font-bold ' >Password </label>
         <input
           className='bg-transparent p-2 border-2 rounded-md'
           type='password'
           placeholder='enter your password...'
           value={data.password}
           onChange={(e) => setData({ ...data, password: e.target.value })}
         />
         </div>
       </div>
      <div className='flex items-center justify-center gap-3 p-2'>
      <button className='bg-slate-600 border-2 rounded-md p-2'  type='submit'>
         Submit
       </button>
      </div>

      

     </form>
    </div>
 </div>
  )
}

export default Register
