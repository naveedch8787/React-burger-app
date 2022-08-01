/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-one-expression-per-line */
import { useContext } from 'react'
import { GlobalContext } from '../context/GlobalProvider'

const Order = () => {
  const data = useContext(GlobalContext)

  return (
    <div>
      {data?.user?.orders?.map((res, i) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className='order-box'>
            <div className='w-full bg-white p-5'>
              <div className='flex md:flex-row xxs:flex-col '>
                <h2 className='self-center'>Ingredients: &nbsp;&nbsp;</h2>
                <button
                  className='ingredient-button'
                  disabled='disabled'
                >
                  Beacon({res.ingredients.bacon})
                </button>
                <button
                  className='ingredient-button'
                  disabled='disabled'
                >
                  Cheese({res.ingredients.cheese})
                </button>
                <button
                  className='ingredient-button'
                  disabled='disabled'
                >
                  Lettuce({res.ingredients.lettuce})
                </button>
                <button
                  className='ingredient-button'
                  disabled='disabled'
                >
                  Meat({res.ingredients.meat})
                </button>
              </div>

              <div className='flex flex-1 py-3'>
                Price: &nbsp;&nbsp;
                <strong>USD {parseInt((res.calculatedPrice), 10).toFixed(2)}$</strong>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Order
