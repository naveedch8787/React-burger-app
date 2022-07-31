import { createContext, useState } from 'react'

const initialState = null

export const UserContext = createContext(initialState)

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const logIn = (user) => {
    if (user) {
      setUser(user)
      localStorage.setItem('user', user.email)
    }
  }

  const logOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
