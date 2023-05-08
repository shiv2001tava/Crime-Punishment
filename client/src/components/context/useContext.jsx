import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuth, setIsAuth] = useState(false)
  const [userData, setUserData] = useState(null)
  const [id, setId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [allUsers, setAllUsers] = useState(null)

  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data)

        setId(data.id)
      })
    }
  }, [])

  useEffect(() => {
    if (user && loading) {
      axios.get(`/user/${user.id}`).then(({ data }) => {
        setUserData(data)
        setLoading(false)
      })
    }
  }, [user, loading])

  function getUser() {
    axios.get(`/user/${user.id}`).then(({ data }) => {
      setUserData(data)
    })
  }

  useEffect(() => {
    if (user) {
      axios.get(`/getalluser`).then(({ data }) => {
        setAllUsers(data)
      })
    }
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        setUserData,
        userData,
        setId,
        id,
        getUser,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
