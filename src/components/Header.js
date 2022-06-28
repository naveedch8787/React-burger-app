/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { UserContext } from '../context/UserProvider';
const imgUrl = "https://react-builder-burger.firebaseapp.com/static/media/burger-logo.b8503d26.png";
export default function Header() {

  const user = useContext(UserContext);
  const page = useContext(GlobalContext);
  return (
    <div className=' top-0 h-14 bg-yellow-900 flex sticky justify-between'>
      <div className=''>
        <div className='pl-1 pt-2 ml-10 mt-1 bg-white h-12 w-[3.75rem] text-center rounded-md align-middle'>
          <img className='block' src={imgUrl} alt="" height="50" width="50" />
        </div>
      </div>
      <div className="">
        <ul className={user.User ? "pl-5 grid grid-cols-3" : "pl-5 grid grid-cols-2"}>
          <li
            onClick={() => page.setActive(1)}
            className={page.getActive() === 1 ? " xxs:pt-[0.4rem] xs:pt-[0.5rem] sm:pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" :
              "xxs:pt-[0.4rem] xs:pt-[0.5rem] sm:pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white " to="/">Build Burger</Link>
          </li>
          {user.User &&
            <li
              onClick={() => page.setActive(2)}
              className={page.getActive() === 2 ? "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" : "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
              <Link className="text-white" to="/order">Orders</Link>
            </li>
          }
          {!user.User && <li
            onClick={() => page.setActive(3)}
            className={page.getActive() === 3 ?
              "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700":
              "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white" to="/login">Login</Link>
          </li>}
          {user.User && <li
            onClick={() => {
              page.setActive(1);user.logOut()}}
            className={page.getActive() === 3 ?
            "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" :
            "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white" to="/login">Logout</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}




