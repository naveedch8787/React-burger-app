/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider';
const LoginPage = (props) => {

  const [toogle, setToogle] = useState(false);
  const user = useContext(UserContext);
  const [exist,setExist] = useState(false);
  const [register,setRegister] = useState(false);

  useEffect(() => {

  }, [toogle]);

  const toogleSetter = () => {

    setToogle(value => {
      return !value;
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let email = e.target.elements.email?.value;
    let password = e.target.elements.password?.value;
    user.logIn({email: email,password: password});
    // if(toogle){
    //   user.logIn(k);
    //   setRegister(true);
    //   setTimeout(() => {
    //     setRegister(false);
    //   }, 2000);
    // }
    // else{
    //   if(!user.register(k)){
    //     setExist(pre => !pre);
    //   }
    // }
  };

  return (
    <>
      <div className='flex justify-center content-center my-20'>
        <div className='border-2 border-gray-200 shadow-lg w-[32rem] h-[280px]'>
          <div className="flex justify-center w-full mt-10 ">
            {/* {register && <h2> User Register Successfully</h2>}
            {exist && <h2> User already exists</h2>} */}
            <form onSubmit={handleFormSubmit}>
              <div className=''>
                <input
                  className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                  type='email'
                  id='email'
                  placeholder='Email-Address'
                  required
                />
              </div>
              <div className=''>
                <input
                  className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                  type='password'
                  id='password'
                  placeholder='Password'
                  required
                />
              </div>
              <div className="flex flex-col justify-center mt-2">
                <button className="text-green-400"><strong>Submit</strong></button>
                {toogle && <button onClick={toogleSetter} className="m-5 text-yellow-900"><strong>SIGN IN</strong></button>}
                {!toogle && <button onClick={toogleSetter} className="m-5 text-yellow-900"><strong>REGISTER</strong></button>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default LoginPage
