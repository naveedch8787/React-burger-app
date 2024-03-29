import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { UserContext } from '../context/UserProvider'

import { imgUrl } from '../utils/Constants'

const Header = () => {
  const [active, setActive] = useState(1)

  const navigator = useNavigate()

  const { user, logOut } = useContext(UserContext)

  const logingOut = () => {
    setActive(1)
    logOut()
    navigator('/')
  }

  return (
    <div className=' top-0 h-14 bg-yellow-900 flex sticky justify-between'>
      <div className=''>
        <div className='pl-1 pt-2 ml-10 mt-1 bg-white h-12 w-[3.75rem] text-center rounded-md align-middle'>
          <img className='block' src={imgUrl} alt="" height="50" width="50" />
        </div>
      </div>
      <div>
        <ul className={user ? "pl-5 grid grid-cols-3" : "pl-5 grid grid-cols-2"}>
          <li
            onClick={() => setActive(1)}
            className={active === 1 ? " xxs:pt-[0.4rem] xs:pt-[0.5rem] sm:pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" :
              "xxs:pt-[0.4rem] xs:pt-[0.5rem] sm:pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white " to="/">Build Burger</Link>
          </li>
          {user &&
            <li
              onClick={() => setActive(2)}
              className={active === 2 ? "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" : "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
              <Link className="text-white" to="/order">Orders</Link>
            </li>
          }
          {!user && <li
            onClick={() => setActive(3)}
            className={active === 3 ?
              "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" :
              "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white" to="/login">Login</Link>
          </li>}
          {user && <li
            onClick={logingOut}
            className={active === 3 ?
              "pt-[1.75rem] px-2 border-b-4 border-b-teal-700 bg-yellow-700" :
              "pt-[1.75rem] px-2 hover:border-b-4 hover:border-b-teal-700 hover:bg-yellow-700"}>
            <Link className="text-white" to="/login">Logout</Link>
          </li>}
        </ul>
      </div>
    </div>
  )
}

export default Header
