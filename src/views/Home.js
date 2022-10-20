import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from '../context/GlobalProvider'
import { UserContext } from '../context/UserProvider'
import CheckoutModal from '../components/CheckoutModal'
import OrdersForm from '../components/OrdersForm'
import Burger from '../components/Burger'

import {
  BURGER_BUN_PRICE, LETTUCE, MEAT, CHEESE, BACON, lettuce, bacon, meat, cheese,
} from '../utils/Constants'

const Home = () => {
  const [price, setPrice] = useState(BURGER_BUN_PRICE)
  const [letteceCount, setLetteceCount] = useState(0)
  const [meatCount, setmeatCount] = useState(0)
  const [baconCount, setbaconCount] = useState(0)
  const [cheeseCount, setcheeseCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [formToogle, setFormToogle] = useState(false)

  const navigator = useNavigate()

  const { user, setDefaultQuantity, setOrders, setQuantity } = useContext(GlobalContext)
  const { user: loginUser } = useContext(UserContext)

  useEffect(() => {
    setDefaultQuantity()
  }, [])

  useEffect(() => {
    setPrice(BURGER_BUN_PRICE +
      (letteceCount * LETTUCE) +
      (meatCount * MEAT) +
      (cheeseCount * CHEESE) +
      (baconCount * BACON))
  }, [letteceCount, meatCount, cheeseCount, baconCount])

  const handleFormSubmit = (k) => {
    k = Object.assign(k, {
      ingredients: {
        lettuce: letteceCount,
        bacon: baconCount,
        cheese: cheeseCount,
        meat: meatCount
      },
      calculatedPrice: price.toFixed(2)
    })
    setOrders(k)
    navigator('/order')
  }

  const handleIngredients = (name, cost, count) => {
    switch(name){
      case lettuce:
        setLetteceCount(pre => pre + count)
        break
      case bacon:
        setbaconCount(pre => pre + count)
        break
      case cheese:
        setcheeseCount(pre => pre + count)
        break
      case meat:
        setmeatCount(pre => pre + count)
        break
    }
    cost > 0 ? setQuantity(name, 1) : setQuantity(name, -1)
  }

  const handleOpen = () => {
    setOpen(false)
    setFormToogle(true)
  }

  const orders = () => {
    if (!(user.ingredients.every((item) => item.quantity === 0))) {
      setOpen(pre => { return !pre })
    }
  }
  return (
    <>
      <Burger
        formToogle={formToogle}
        lettuce={letteceCount}
        meat={meatCount}
        bacon={baconCount}
        cheese={cheeseCount}
      />
      {formToogle && <OrdersForm callback={handleFormSubmit} />}
      {!formToogle && <div className='w-full bg-yellow-600 '>
        <div className="flex justify-center">
          <div className="price text-lg pt-2">
            <h1>Current Price = <strong>{(price).toFixed(2)}$</strong></h1>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          {
            user?.ingredients?.map((res, i) => {
              return (
                <div key={i}>
                  <div className=' flex justify-center mt-2' >
                    <h2 className='w-[5rem]'><strong>{res.name}</strong> </h2>
                    <button
                      onClick={() => {
                        if (res.quantity > 0) {
                          handleIngredients(res.name, -res.price, -1)
                        }
                      }}
                      className={res.quantity > 0 ?
                        'mx-4 px-5 py-1 border-2 border-stone-400 bg-stone-400 hover:bg-stone-500 hover:border-stone-500' :
                        'cursor-not-allowed mx-4 px-5 py-1 border-2 border-stone-400 bg-stone-300'}>Less</button>
                    <button
                      onClick={() => handleIngredients(res.name, res.price, 1)}
                      className='text-white mx-4 px-5 py-1 border-2 border-yellow-700 bg-yellow-800 hover:bg-yellow-900'>More</button>
                  </div>
                </div>
              )
            })
          }
          {loginUser? <div className="flex justify-center my-5">
            <button
              onClick={orders}
              type="button"
              className={
                user.ingredients.every((item) => item.quantity === 0) ? "cursor-not-allowed bg-slate-400 border-1 px-20 py-5" :
                  "bg-slate-400 border-1 px-20 py-5"} >
              Order Now
            </button>
          </div> : <div className="flex justify-center my-5">
            <button onClick={() => { navigator('/login') }} className='cursor-not-allowed bg-slate-400 border-1 px-[4.5rem] py-4'>SIGN UP TO ORDER</button>
          </div>}
        </div>
      </div>}
      {open && <CheckoutModal totalPrice={price} callback={handleOpen} />}
    </>
  )
}

export default Home
