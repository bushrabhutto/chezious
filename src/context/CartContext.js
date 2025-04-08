"use client";

import { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = state.cart.map(item =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.price,
      };
    }

    case "REMOVE_FROM_CART": {
      const updatedCart = state.cart.filter(item => item.id !== action.payload.id);
      return {
        ...state,
        cart: updatedCart,
        totalItems: state.totalItems - action.payload.quantity,
        totalPrice: state.totalPrice - action.payload.price * action.payload.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedCart = state.cart.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );

      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        cart: updatedCart,
        totalItems,
        totalPrice,
      };
    }

    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to use Cart Context
export const useCart = () => useContext(CartContext);
