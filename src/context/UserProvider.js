import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from './GlobalProvider';

const initialState = null;


export const UserContext = createContext(initialState);


export default function UserProvider({children}) {
  UserProvider.propTypes = {
    children: PropTypes.any,
  };

  const [User, setUser] = useState(null);
  const navigation = useNavigate();
  const active = useContext(GlobalContext);

  const logIn = (user) => {
    if (user) {
      // const exist = User?.map(res=>{
      //   return res.email===user.email && res.password===user.password;
      // })
      // console.log(exist);
      setUser(user.email);
      localStorage.setItem('user',user.email);
      active.setActive(1);
      navigation('/')
    }
    else {
      navigation('/');
    }
  }

  const logOut = () => {
    setUser(null);
    localStorage.clear();
    navigation('/');
  }

  const register = (data) => {
    console.log(data)
    if(User){
      const check = User?.map(res=>{
        return res.email===data.email;
      });
      console.log(check)
      if(check){
        return 0;
      }
      else{
        setUser({...User,email:data.email,password:data.password})
      }
    }
    else{
      let k = {
        email:data.email,
        password:data.password
      }
      setUser({k})
    }
    console.log(User)
  }

  return (
    <UserContext.Provider value={{User,logIn,logOut,register}}>
      {children}
    </UserContext.Provider>
  )
}

