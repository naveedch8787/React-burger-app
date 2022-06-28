import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalProvider'

export default function Order() {

  const data = useContext(GlobalContext);
  console.log(data)
  useEffect(()=>{
    setTimeout(() => {
      data.setActive(2);
     }, 0);

  },[])
  // console.log(data.User.data.map((res)=> console.log(res)));

  return (
    <>
      {data?.User?.data?.orders?.map((res, i) => {
        return (

            <div key={i} className='xxs:mx-[64px] lg:mx-[192px] my-10 border-[1px] shadow-lg h-fit border-gray-300 rounded-sm'>
              <div className="w-full bg-white p-5">
                <div className="flex md:flex-row xxs:flex-col ">
                  <h2 className='self-center'>Ingredients: &nbsp;&nbsp;</h2>
                  <button className="xxs:mb-5 xs:mb-0 cursor-text mx-2 px-3 py-2 border-[1px] border-gray-300" disabled="disabled"> Beacon({res.ingredients.bacon })</button>
                  <button className="xxs:mb-5 xs:mb-0 cursor-text mx-2 px-3 py-2 border-[1px] border-gray-300" disabled="disabled"> Cheese({res.ingredients.cheese })</button>
                  <button className="xxs:mb-5 xs:mb-0 cursor-text mx-2 px-3 py-2 border-[1px] border-gray-300" disabled="disabled"> Lettuce({res.ingredients.lettuce })</button>
                  <button className="xxs:mb-5 xs:mb-0 cursor-text mx-2 px-3 py-2 border-[1px] border-gray-300" disabled="disabled"> Meat({res.ingredients.meat })</button>
                </div>
                <div className='flex flex-1 py-3'>
                  Price: &nbsp;&nbsp;<strong>USD {res.calculatedPrice}$</strong>
                </div>
              </div>
            </div >
        )
      })}

    </>
  )
}

