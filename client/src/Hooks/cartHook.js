import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

function useCart() {
  return useContext(CartContext)
}

export default useCart