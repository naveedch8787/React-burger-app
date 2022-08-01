import { Formik, Field, Form } from 'formik'

function validateEmail(value) {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

function validatefullName(value) {
  let error
  if (!value) {
    error = 'Required'
  } else if (value === 'admin') {
    error = 'Nice try!'
  }
  return error
}

function validateZipCode(value) {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value)) {
    error = 'Invalid Zipcode'
  }
  return error
}

function validateStreet(value) {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

function validateCountry(value) {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

const OrdersForm = ({ callback }) => {
  return (
    <div className='flex justify-center content-center my-20'>
      <div className='border-2 border-gray-200 shadow-lg w-[35rem] h-fit'>
        <div className='flex justify-center pt-5'>
          <h1><strong>Enter your Contact Data</strong></h1>
        </div>
        <div className='w-[90%] mt-5 '>
          <Formik
            initialValues={{
              fullName: '',
              street: '',
              zipCode: '',
              country: '',
              email: '',
              dropDown: 'Fastest',
            }}
            onSubmit={
              (values) => {
                callback(values)
              }
            }
          >
            {({ errors, touched }) => (
              <Form>

                <Field
                  validate={validatefullName}
                  onClick={() => validatefullName('fullName')}
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full'
                  id='fullName'
                  name='fullName'
                  placeholder='Full Name'
                />
                {errors.fullName && touched.fullName && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.fullName}</small>}

                <Field
                  validate={validateStreet}
                  onClick={() => validateStreet('street')}
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full '
                  id='street'
                  name='street'
                  placeholder='Street'
                />
                {errors.street && touched.street && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.street}</small>}

                <Field
                  validate={validateZipCode}
                  onClick={() => validateZipCode('zipCode')}
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full '
                  id='zipCode'
                  name='zipCode'
                  placeholder='Zip Code'
                />
                {errors.zipCode && touched.zipCode && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.zipCode}</small>}

                <Field
                  validate={validateCountry}
                  onClick={() => validateCountry('country')}
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full '
                  id='country'
                  name='country'
                  placeholder='Country'
                />
                {errors.country && touched.country && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.country}</small>}

                <Field
                  validate={validateEmail}
                  onClick={() => validateEmail('email')}
                  id='email'
                  name='email'
                  placeholder='Email'
                  type='email'
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full '
                />
                {errors.email && touched.email && <small className='pb-2 flex justify-center text-center text-red-600'>{errors.email}</small>}

                <Field
                  className='p-[1px] pl-2 mx-5 my-2 border-gray-300 border-2 w-full '
                  as='select'
                  name='dropDown'
                  id='dropDown'
                >
                  <option value='Fastest'>Fastest</option>
                  <option value='Cheapest'>Cheapest</option>
                </Field>

                <div className='flex flex-col justify-center mt-2 mb-5'>
                  <button type='submit' className='text-green-400'><strong>Order</strong></button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default OrdersForm
