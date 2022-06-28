

import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';


const initialState = {
  data: {
    ingredients: [
      { name: 'Lettuce', price: 0.50, quantity: 0 },
      { name: 'Bacon', price: 0.70, quantity: 0 },
      { name: 'Cheese', price: 0.40, quantity: 0 },
      { name: 'Meat', price: 1.30, quantity: 0 }],
    totalPrice: 3.00,
    orders: [],
    Active: 1
  }
}

export const GlobalContext = createContext(initialState);


export default function GlobalProvider({ children }) {
  GlobalProvider.propTypes = {
    children: PropTypes.any,
  };

  const [User, setUser] = useState(initialState);

  const setActive = (value) => {
    setUser({ data: { ...User.data, Active: value } });
  }

  const setQuantity = (name, count) => {

    const updatedQuantity = User.data.ingredients.map(res => {
      if (res.name === name) {
        res.quantity += count;
        return res;
      }
      return res;
    });

    setUser({ data: { ...User.data, ingredients: updatedQuantity } })
  }

  const setDefaultQuantity = () => {

    const updated = User.data.ingredients.map(res => {
      res.quantity = 0;
      return res;
    });
    setUser({ data: { ...User.data, ingredients: updated } })
  }

  const setOrders = (obj) => {
    if (obj) {
      setUser({ data: { ...User.data, orders: [...User.data.orders, obj] } });
    }
  }

  const getActive = () => {
    return User.data.Active;
  }

  return (
    <GlobalContext.Provider value={{ User, setActive, setQuantity, setOrders, setDefaultQuantity, getActive }}>
      {children}
    </GlobalContext.Provider>
  )
}
