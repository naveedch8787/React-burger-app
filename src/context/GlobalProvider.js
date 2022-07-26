import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types';
const initialState = {
  ingredients: [
    { name: 'Lettuce', price: 0.50, quantity: 0 },
    { name: 'Bacon', price: 0.70, quantity: 0 },
    { name: 'Cheese', price: 0.40, quantity: 0 },
    { name: 'Meat', price: 1.30, quantity: 0 }],
  orders: [],
}

export const GlobalContext = createContext(initialState);

export default function GlobalProvider({ children }) {

  GlobalProvider.propTypes = {
    children: PropTypes.any,
  };

  const [user, setUser] = useState(initialState);

  const setQuantity = (name, count) => {
    const updatedQuantity = user.ingredients.map(res => {
      if (res.name === name) {
        res.quantity += count;
        return res;
      }
      return res;
    });
    setUser((pre) => ({ ...pre, ingredients: updatedQuantity }))
  }

  const setDefaultQuantity = () => {
    const updated = user.ingredients.map(res => {
      res.quantity = 0;
      return res;
    });
    setUser((pre) => ({ ...pre, ingredients: updated }))
  }

  const setOrders = (obj) => {
    setUser((pre) => ({ ...pre, orders: [obj, ...user.orders] }));
  }

  return (
    <GlobalContext.Provider value={{ user, setQuantity, setOrders, setDefaultQuantity }}>
      {children}
    </GlobalContext.Provider>
  )
}
