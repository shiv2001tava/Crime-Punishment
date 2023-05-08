import React, { useState, useEffect, useContext } from 'react'
import { scene3 } from '../assets'
import { Radio } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/context/useContext'
import axios from 'axios'

const Problem3 = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(false)
  const images = [scene3]
  // const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  

  console.log(user)

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

  useEffect(() => {
    // set a timeout to change the image every 5 seconds
    const timeoutId = setTimeout(() => {
      if (imageIndex === images.length - 1) {
        // if the current image is the last image, set the index back to 0 to loop through the images again
        setImageIndex(images.length - 1)
      } else {
        setImageIndex(imageIndex + 1)
      }
    }, 5000)

    // clear the timeout when the component unmounts or the image index changes
    return () => clearTimeout(timeoutId)
  }, [imageIndex, images])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowQuestion(true)
    }, 5000) // 5000 milliseconds = 5 seconds

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const handleOptionChange = async (value) => {
    setSelectedOption(value)
    try {
      if (value === 'love') 
      {
        const response = await axios.patch('/curiosity/' + user.id, {
          curiosityScore: 3,
        })
        const response1 = await axios.patch('/workEthic/' + user.id, {
          workEthicScore: 2,
        })
        navigate('/problem4')
      }
      if (value === 'hate') {
        const response = await axios.patch('/curiosity/' + user.id, {
          curiosityScore: 1,
        })
        const response1 = await axios.patch('/workEthic/' + user.id, {
          workEthicScore: 1,
        })
        navigate('/problem4')
      }
      if (value === 'lust') {
        const response1 = await axios.patch('/workEthic/' + user.id, {
          workEthicScore: 1,
        })
        navigate('/problem4')
      }
      if (value === 'crush') {
        navigate('/problem4')
      }
    } catch (error) {
      console.error(error)
      // Handle error here, e.g. display error message to user
    }
  }

  return (
    <section className='max-w-7xl p-6 w-full overflow-hidden h-screen'>
      <div className='grid grid-cols-10 gap-7'>
        <div className='col-span-7 '>
          <div className='flex flex-col   w-full mt-1 h-full'>
            {imageIndex < images.length && ( // check if the current image index is less than the length of the images array
              <div className='w-full h-4/6 p-4 text-[#e2e8f0] border-2 overflow-hidden bg-[#111827]  border-gray-200  rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400'>
                <img src={images[imageIndex]} alt='' className='w-full' />
              </div>
            )}
            {showQuestion ? (
              <div className='flex p-2 items-center w-full justify-center h-12 mt-4 border-2  bg-[#111827]  rounded-md'>
                <div className='flex-none items-center justify-center'>
                  <p className='text-[#e2e8f0]'>What to do now ?</p>
                </div>
              </div>
            ) : (
              <div className='flex p-2 items-center w-full justify-center h-12 mt-4 border-2  bg-[#111827]  rounded-md'>
                <div className='flex-none items-center justify-center'>
                  <p className='text-[#e2e8f0]'>
                    ------------------------------------------------------------------------------------------------
                  </p>
                </div>
              </div>
            )}

            <div className='grid grid-cols-10 gap-3 rounded-md text-white mt-4 bg-[#7694d5] border-2 overflow-hidden w-full p-3'>
              {showQuestion ? (
                <>
                  <div className='col-span-5'>
                    <Radio.Group
                      className='text-white'
                      value={selectedOption}
                      onChange={handleOptionChange}
                      defaultValue='love'
                    >
                      <Radio
                        value='love'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'>
                          Take fast,expensive taxi
                        </p>
                      </Radio>
                      <Radio
                        value='hate'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'>
                          Wait for cheaper Auto
                        </p>
                      </Radio>
                    </Radio.Group>
                  </div>
                  <div className='col-span-5'>
                    <Radio.Group
                      className='text-white'
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <Radio
                        value='lust'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'>
                          Walk to the station
                        </p>
                      </Radio>
                      <Radio value='crush' color='success' labelColor='success'>
                        <p className='text-white text-xl ml-3 font-semibold'>
                          Ignore the call and keep strolling
                        </p>
                      </Radio>
                    </Radio.Group>
                  </div>
                </>
              ) : (
                <>
                  <div className='col-span-5'>
                    <Radio.Group
                      className='text-white'
                      value={selectedOption}
                      onChange={handleOptionChange}
                      defaultValue=''
                    >
                      <Radio
                        value='love'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'></p>
                      </Radio>
                      <Radio
                        value='hate'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'></p>
                      </Radio>
                    </Radio.Group>
                  </div>
                  <div className='col-span-5'>
                    <Radio.Group
                      className='text-white'
                      value={selectedOption}
                      onChange={handleOptionChange}
                    >
                      <Radio
                        value='lust'
                        style={{ color: 'green' }}
                        color='success'
                        labelColor='success'
                      >
                        <p className='text-white text-xl ml-3 font-semibold'></p>
                      </Radio>
                      <Radio value='crush' color='success' labelColor='success'>
                        <p className='text-white text-xl ml-3 font-semibold'></p>
                      </Radio>
                    </Radio.Group>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className='col-span-3  '>
          <div className=' flex flex-col justify-start items-start mt-12  h-full  w-full '></div>
        </div>
      </div>

      {/* */}
    </section>
  )
}

export default Problem3
