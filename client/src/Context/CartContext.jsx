import React, { createContext, useCallback , useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from '../Hooks/authHook'

export const CartContext = createContext()

function CartProvider(props) {
    const { currentUser } = useAuth()
    const [cart,setCart] = useState([])

    // increment quantity
    const increment = useCallback((product) =>{
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart[index].quantity++
        setCart(newCart)
    },[cart])

    // decrement quantity
    const decrement = useCallback((product) =>{
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart[index].quantity--
        setCart(newCart)
    },[cart])

    // add to cart
    const addToCart = useCallback((product) => {
        const newCart = [...cart]
        let data = {...product, quantity: 1}
        newCart.push(data)
        setCart(newCart)
        toast.success('product added to cart successfully')
    },[cart])

    // remove from cart
    const removeFromCart = useCallback((product) => {
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart.splice(index,1)
        setCart(newCart)
        toast.success('product removed from cart successfully')
    },[cart])

     // new cart details in cart collection
     const addNewCart = async () => {
        try {
            await axios.post(`/api/cart/add`,{cart})
                .then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg));
        } catch (err) {
            toast.error(err.message)
        }
    }

    // update cart details in cart collection
    const updateCart = async () => {
        try {
            await axios.patch(`/api/cart/update/${currentUser._id}`,{cart})
                .then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg));
        } catch (err) {
            toast.error(err.message)
        }
    }


  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increment, decrement }}>
        {
            props.children
        }
    </CartContext.Provider>
  )
}

export default CartProvider