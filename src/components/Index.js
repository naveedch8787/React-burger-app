/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Home from './Home';
import Header from "./Header";
import LoginPage from "./Login";
import Order from "./Order";
import { UserContext } from '../context/UserProvider';


export default function Index() {
  const user = useContext(UserContext);
  useEffect(() => {
    user.logIn(localStorage.getItem('user'));
  }, []);
  return (
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={!user.User?<LoginPage />:<Navigate to="/" />}></Route>
          <Route path="/order" element={user.User ? <Order /> : <Navigate to="/" />}></Route>
        </Routes>
      </div>
  )
}