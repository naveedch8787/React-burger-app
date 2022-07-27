import { useContext, useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom";

import Home from './views/Home';
import Header from "./layout/Header";
import LoginPage from "./views/Login";
import Order from "./views/Order";
import { UserContext } from './context/UserProvider';


const Index = () => {
  const user = useContext(UserContext);
  useEffect(() => {
    user.logIn(localStorage.getItem('user'));
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user.user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/order" element={user.user ? <Order /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default Index
