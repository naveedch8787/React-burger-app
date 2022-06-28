/* eslint-disable react/prop-types */
import React, { useState } from 'react'

export default function OrderForm(props) {

  const [dropdownValue, setDropdownValue] = useState('Fastest');
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let address = {
      street: e.target.elements.street.value,
      zip: e.target.elements.zip.value,
      country: e.target.elements.country.value
    }

    let k = {
      name: e.target.elements.name.value,
      email: e.target.elements.email.value,
      address: address,
      delivery: dropdownValue,
    }
    props.callback(k);
  };
  return (
    <div className='flex justify-center content-center my-20'>

      <div className='border-2 border-gray-200 shadow-lg w-[35rem] h-fit'>
        <div className='flex justify-center pt-5'>
          <h1><strong>Enter your Contact Data</strong></h1>
        </div>

        <div className="w-[90%] mt-5 ">
          <form onSubmit={handleFormSubmit}>
            <div className=''>
              <input
                className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                type='text'
                id='name'
                placeholder='Full Name'
                required
              />

            </div>
            <div className=''>
              <input
                className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                type='text'
                id='street'
                placeholder='Street'
                required
              />

            </div>
            <div className=''>
              <input
                className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                type='zip'
                id='zip'
                placeholder='Zipcode'
                required
              />
            </div>
            <div className=''>
              <input
                className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                type='text'
                id='country'
                placeholder='Country'
                required
              />
            </div>
            <div className=''>
              <input
                className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full'
                type='email'
                id='email'
                placeholder='Email-Address'
                required
              />
            </div>
            <div className="">
              <select className='p-[1px] pl-2 m-5 border-gray-300 border-2 w-full' value={dropdownValue} onChange={handleDropdownChange}>
                <option value="Fastest">Fastest</option>
                <option value="Cheapest">Cheapest</option>
              </select>
            </div>
            <div className="flex flex-col justify-center mt-2 mb-5">
              <button tyoe="submit" className="text-green-400"><strong>Order</strong></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
