
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/GlobalProvider';
import { UserContext } from '../context/UserProvider';
import { useNavigate } from 'react-router-dom';
import OrderForm from './form/OrderForm';
import CheckoutModal from './modals/CheckoutModal';

export default function Home() {

  const navigator = useNavigate();
  const data = useContext(GlobalContext);
  const user = useContext(UserContext);
  const [addIngredientPrice, setAddIngredientPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [formToogle, setFormToogle] = useState(false);
  useEffect(() => {
    setOpen(false);
    setFormToogle(false);
    setAddIngredientPrice(0);
    data.setDefaultQuantity();
  }, [])

  const handleFormSubmit = (k) => {
    let ing = {
      ingredients: {
        lettuce: data.User.data.ingredients[0].quantity,
        bacon: data.User.data.ingredients[1].quantity,
        cheese: data.User.data.ingredients[2].quantity,
        meat: data.User.data.ingredients[3].quantity
      },
      calculatedPrice: 3 + addIngredientPrice
    }
    k = Object.assign(k, ing);
    data.setOrders(k);
    data.User.data.Active = 2;
    navigator('/order');
    setAddIngredientPrice(0);
  };

  const handleIngredients = (name, price) => {
    setAddIngredientPrice(pre => pre + price);
    price > 0 ? data.setQuantity(name, 1) : data.setQuantity(name, -1);
  }

  const handleOpen = () => {
    setOpen(false);
    setFormToogle(true);
  }

  const orders = () => {
    if(!(data.User.data.ingredients.every((item)=>item.quantity===0))){
      setOpen(pre => { return !pre })
    }
      // if (!(data.User.data.ingredients[0].quantity === 0 &&
      //   data.User.data.ingredients[1].quantity === 0 &&
      //   data.User.data.ingredients[2].quantity === 0 &&
      //   data.User.data.ingredients[3].quantity === 0
      // )) {
      //   setOpen(pre => { return !pre })
      // }

  }
  return (
    <>
      <div className=' h-fit min-h-[70vh]'>
        <div className="flex justify-center content-center h-fit py-[50px]">
          <div className='h-full w-[512px]'>
            {formToogle && <div className="flex flex-col justify-center text-center mt-2 text-3xl">
              <h1><strong>We hope it tastes well!</strong></h1>
            </div>}
            <div className="mt-5 upper bg-gradient-to-r from-orange-500 to-orange-400 rounded-t-[16rem] border-2 h-20 w-full"></div>
            {
              data.User.data.ingredients.every((item)=>item.quantity===0) &&
              <div className="mid flex flex-col justify-center text-center mt-2 text-lg">
                <h2><strong>No ingredients Added</strong></h2>
              </div>
            }
            {
              new Array(data.User.data.ingredients[0].quantity).fill(0).map((Lettuce, i) => {
                return (
                  <div key={i} className='mt-2 Lettuce w-[100%] bg-gradient-to-r from-green-400 to-green-600 h-8 rounded-2xl'></div>
                )
              })
            }
            {
              new Array(data.User.data.ingredients[1].quantity).fill(0).map((Bacon, i) => {
                return (
                  <div key={i} className='mt-2 Bacon w-full bg-orange-800 h-4 '></div>
                )
              })
            }
            {
              new Array(data.User.data.ingredients[2].quantity).fill(0).map((Cheese, i) => {
                return (
                  <div key={i} className='mt-2 Cheese w-[100%] bg-gradient-to-r from-yellow-300 to-yellow-500 h-5 rounded-2xl'></div>
                )
              })
            }
            {
              new Array(data.User.data.ingredients[3].quantity).fill(0).map((Meat, i) => {
                return (
                  <div key={i} className='mt-2 Meat w-[100%] bg-gradient-to-r from-amber-800 to-amber-900 h-12 rounded-md'></div>
                )
              })
            }
            <div className="lower mt-2 upper bg-gradient-to-r from-orange-500 to-orange-400 rounded-b-[2rem] border-2 h-20 w-full"></div>
          </div>
        </div>
      </div>

      {/* form  */}
      {formToogle && <OrderForm callback={handleFormSubmit} />}

      {!formToogle && <div className='w-full bg-yellow-600 '>
        <div className="flex justify-center">
          <div className="price text-lg pt-2">
            <h1>Current Price = <strong>{(3.00 + addIngredientPrice).toFixed(2)}$</strong></h1>
          </div>
        </div>
        <div className="ingredients mt-4 flex flex-col items-center">
          {
            data?.User?.data?.ingredients.map((res, i) => {
              return (
                <div key={i}>
                  <div className=' flex justify-center mt-2' >
                    <h2 className='w-[5rem]'><strong>{res.name}</strong> </h2>
                    <button
                      onClick={() => {
                        if (res.quantity > 0) {
                          handleIngredients(res.name, -res.price)
                        }
                      }}
                      className={res.quantity > 0 ?
                        'mx-4 px-5 py-1 border-2 border-stone-400 bg-stone-400 hover:bg-stone-500 hover:border-stone-500' :
                        'cursor-not-allowed mx-4 px-5 py-1 border-2 border-stone-400 bg-stone-300'}>Less</button>
                    <button
                      onClick={() => handleIngredients(res.name, res.price)}
                      className='text-white mx-4 px-5 py-1 border-2 border-yellow-700 bg-yellow-800 hover:bg-yellow-900'>More</button>
                  </div>
                </div>
              )
            })
          }

          {user.User ? <div className="flex justify-center my-5">
            <button
              onClick={orders}
              type="button"
              className={
                data.User.data.ingredients.every((item)=>item.quantity===0)? "cursor-not-allowed bg-slate-400 border-1 px-20 py-5" :
                  "bg-slate-400 border-1 px-20 py-5"} >
              Order Now
            </button>
          </div> : <div className="flex justify-center my-5">
            <button onClick={() => { navigator('/login') }} className='cursor-not-allowed bg-slate-400 border-1 px-[4.5rem] py-4'>SIGN UP TO ORDER</button>
          </div>}
        </div>
      </div>}

      {/* modal */}
      {open && <CheckoutModal totalPrice={addIngredientPrice} callback={handleOpen} />}
    </>
  )
}
