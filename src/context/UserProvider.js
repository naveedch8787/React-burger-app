import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';

const initialState = null;
export const UserContext = createContext(initialState);
export default function UserProvider({ children }) {
  UserProvider.propTypes = {
    children: PropTypes.any,
  };

  const [user, setUser] = useState(null);

  const logIn = (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem('user', user.email);
    }
  }
  const logOut = () => {
    setUser(null);
    localStorage.clear();
  }

  return (
    <UserContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </UserContext.Provider>
  )
}

