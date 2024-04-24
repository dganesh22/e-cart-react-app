import React, { createContext, useCallback , useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from '../Hooks/authHook'

export const CartContext = createContext()

function CartProvider(props) {
    const { contextToken } = useAuth()
    const [cart,setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    const [shipping,setShipping]= useState(localStorage.getItem("shipping")?Number(localStorage.getItem("shipping")):0)
    const [tax,setTax] = useState(0)
    const [discount,setDiscount] = useState(localStorage.getItem("discount")? Number(localStorage.getItem("discount")):0)
    const [final,setFinal] = useState(localStorage.getItem("final")? Number(localStorage.getItem("final")):0);

    // item total amount 
    const [total, setTotal] = useState(localStorage.getItem("total")? Number(localStorage.getItem("total")):0);




    useEffect(() => {
        let totalAmount = cart.reduce((acc,item) => {
            return acc + item.price * item.quantity
        }, 0)
        setTotal(totalAmount)
        localStorage.setItem('total', totalAmount)
    },[cart])

    useEffect(() => {
        let sh = cart.reduce((acc,item) => {
            return(( acc + item.price * item.quantity) * (3/100))
        }, 0)
        setShipping(sh)
        localStorage.setItem('shipping', sh)
    },[cart,shipping])

    useEffect(() => {
        let ds = cart.reduce((acc,item) => {
            return(( acc + item.price * item.quantity) * (item.discount/100))
        }, 0)
        setDiscount(ds)
        localStorage.setItem('discount', ds)
    },[cart,discount])

    useEffect(() => {
        let ta = cart.reduce((acc,item) => {
            return(( acc + item.price * item.quantity) * (item.tax/100))
        }, 0)
        setTax(ta)
        localStorage.setItem('tax', ta)
    },[cart,tax])

    useEffect(() => {
        let finalTotal = (total + tax + shipping) - discount 
        setFinal(finalTotal)
        localStorage.setItem('final', finalTotal)
    },[final,total,tax,shipping,discount])

    // store cart data in localstorage
    const storeData = (data) => {
        localStorage.setItem("cart",JSON.stringify(data))
    }

    // increment quantity
    const increment = useCallback((product) =>{
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart[index].quantity++
        setCart(newCart)
        storeData(newCart)
    },[cart])

    // decrement quantity
    const decrement = useCallback((product) =>{
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
       if (newCart[index].quantity <= 1) {
           newCart.splice(index,1)
           setCart(newCart)
           storeData(newCart)
       } else {
        newCart[index].quantity--
        setCart(newCart)
        storeData(newCart)
       }
    },[cart])

    // add to cart
    const addToCart = useCallback((product) => {
        const newCart = [...cart]
        let data = {...product, quantity: 1}
         // check if the item already exists in the cart
            let cartItem = newCart.find(item => item._id === product._id)
            if(cartItem) {
                toast.warning(`Prodduct already exists in cart`)
            } else {
                newCart.push(data)
                setCart(newCart)
                storeData(newCart)
                toast.success(`Product added to cart`)
            }
    },[cart])

    // remove from cart
    const removeFromCart = useCallback((product) => {
        const newCart = [...cart]
        const index = newCart.findIndex(item => item._id === product._id)
        newCart.splice(index,1)
        setCart(newCart)
        storeData(newCart)
        toast.success('product removed from cart successfully')
    },[cart])

     // new cart details in cart collection
     const addNewCart = async () => {
        try {
            await axios.post(`/api/cart/add`,{products:cart, total, discount, shipping, tax, final})
                .then(res => {
                    toast.success(res.data.msg)
                    window.location.reload()
                }).catch(err => toast.error(err.response.data.msg));
        } catch (err) {
            toast.error(err.message)
        }
    }

    // update cart details in cart collection
    const updateCart = async (id, data) => {
        try {
            await axios.patch(`/api/cart/update/${id}`,data)
                .then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg));
        } catch (err) {
            toast.error(err.message)
        }
    }

    const storeCart = async () => {
        try {
            let res = await axios.get(`/api/cart/all`)
            let extCart = res.data.carts.find((item) => item.user._id == contextToken.currentUser._id)
            
                if(!extCart) {
                    addNewCart({ 
                        products: cart,
                        shipping,
                        tax,
                        discount,
                        final,
                        total
                    })
                    clearStorage()
                } else {
                    updateCart(extCart._id, {
                        products: cart,
                        shipping,
                        tax,
                        discount,
                        final,
                        total
                    })
                    clearStorage()
                }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const clearStorage = () => {
        localStorage.removeItem("cart")
        localStorage.removeItem("tax")
        localStorage.removeItem("shipping")
        localStorage.removeItem("discount")
        localStorage.removeItem("total")
        localStorage.removeItem("final")
    }


  return (
    <CartContext.Provider value={{ cart, total,tax,discount,final,shipping, addToCart, removeFromCart, increment, decrement, storeCart, setCart, setDiscount, setTotal, setFinal, setTax, setShipping }}>
        {
            props.children
        }
    </CartContext.Provider>
  )
}

export default CartProvider