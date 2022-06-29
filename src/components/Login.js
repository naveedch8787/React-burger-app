import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserProvider';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigator = useNavigate();
  const [toogle, setToogle] = useState(false);
  const user =  useContext(UserContext);
  const [existingUser,setExistingUser] = useState(false);
  const toogleSetter = () => {
    setToogle(value => {
      return !value;
    });
    setExistingUser(false);
  }

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }

  function validatePassword(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (value.length < 8) {
      error = 'Minimum Password length must be 8 characters ';
    }
    return error;
  }

  return (
    <>
      <div className='flex justify-center content-center my-20'>
        <div className='border-2 border-gray-200 shadow-lg w-[35rem] h-fit'>
          <div className='flex justify-center pt-5'>
            <h1><strong>Enter your Contact Data</strong></h1>
          </div>
          {existingUser && <div className='flex justify-center pt-5'>
            <h1><strong>User already exists</strong></h1>
          </div>}
          <div className="w-[90%] mt-5 ">
            <Formik initialValues={{
              email: '',
              password: '',
            }}
              onSubmit={
                 (values) => {
                  if(toogle){
                    user.logIn(values);
                    navigator('/')
                  } else {
                    setExistingUser(true);
                  }
                }}>
              {({ errors, touched }) => (
                <Form>
                  <Field
                    validate={validateEmail}
                    onClick={() => validateEmail('email')}
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full "
                  />
                  {errors.email && touched.email && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.email}</small>}

                  <Field
                    validate={validatePassword}
                    onClick={() => validatePassword('password')}
                    className="p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full "
                    id="password" name="password" placeholder="Password" type="password" />
                  {errors.password && touched.password && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.password}</small>}

                  <div className="flex flex-col justify-center mt-2">
                    <button type={toogle?"submit":""} className="text-green-400"><strong>Submit</strong></button>
                    {toogle && <button onClick={toogleSetter} className="m-5 text-yellow-900"><strong>SIGN IN</strong></button>}
                    {!toogle && <button onClick={toogleSetter} className="m-5 text-yellow-900"><strong>REGISTER</strong></button>}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
