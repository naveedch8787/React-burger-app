import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalProvider';
import { UserContext } from '../context/UserProvider';
import CheckoutModal from '../components/CheckoutModal';
import OrdersForm from '../components/OrdersForm';
import Burger from '../components/Burger';

const LETTUCE = 0.50;
const BACON = 0.70;
const CHEESE = 0.40;
const MEAT = 1.30;

const Home = () => {
  const initialPrice = 3.00;
  const navigator = useNavigate();
  const data = useContext(GlobalContext);
  const user = useContext(UserContext);
  const [price, setPrice] = useState(initialPrice);
  const [letteceCount, setLetteceCount] = useState(0);
  const [meatCount, setmeatCount] = useState(0);
  const [baconCount, setbaconCount] = useState(0);
  const [cheeseCount, setcheeseCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [formToogle, setFormToogle] = useState(false);

  useEffect(() => {
    setPrice(initialPrice);
    setLetteceCount(0);
    setbaconCount(0);
    setcheeseCount(0);
    setmeatCount(0);
    data.setDefaultQuantity();
  }, [])

  useEffect(() => {
    setPrice(initialPrice + (letteceCount * LETTUCE) + (meatCount * MEAT) + (cheeseCount * CHEESE) + (baconCount * BACON));
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
    });

    data.setOrders(k);
    navigator('/order');
  };


  const handleIngredients = (name, cost, count) => {
    switch(name){
      case'Lettuce':
        setLetteceCount(pre => pre + count);
        break;
      case'Bacon':
        setbaconCount(pre => pre + count);
        break;
      case'Cheese':
        setcheeseCount(pre => pre + count);
        break;
      case'Meat':
        setmeatCount(pre => pre + count);
        break;
    }
    cost > 0 ? data.setQuantity(name, 1) : data.setQuantity(name, -1);
  }


  const handleOpen = () => {
    setOpen(false);
    setFormToogle(true);
  }

  const orders = () => {
    if (!(data.user.ingredients.every((item) => item.quantity === 0))) {
      setOpen(pre => { return !pre })
    }
  }
  return (
    <>
      <Burger formToogle={formToogle} lettuce={letteceCount} meat={meatCount} bacon={baconCount} cheese={cheeseCount} />
      {formToogle && <OrdersForm callback={handleFormSubmit} />}
      {!formToogle && <div className='w-full bg-yellow-600 '>
        <div className="flex justify-center">
          <div className="price text-lg pt-2">
            <h1>Current Price = <strong>{(price).toFixed(2)}$</strong></h1>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          {
            data?.user?.ingredients?.map((res, i) => {
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
          {user.user ? <div className="flex justify-center my-5">
            <button
              onClick={orders}
              type="button"
              className={
                data.user.ingredients.every((item) => item.quantity === 0) ? "cursor-not-allowed bg-slate-400 border-1 px-20 py-5" :
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
