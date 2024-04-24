import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../../Hooks/authHook'
import useCart from '../../Hooks/cartHook'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Checkout() {
    const [view,setView] = useState("address")
    const [payMode,setPayMode] = useState("cod")

    const { contextToken }= useAuth()
   
    const [coupon,setCoupon] = useState('')
    const [cartData,setCartData] = useState('')

    const navigate = useNavigate()
    

    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: ""
    })


        //read cart
        let readCart = async () => {
            await axios.get(`/api/cart/all`)
                .then(res => {
                        let ca = res.data.carts.find(item => item.user._id == contextToken.currentUser._id)
                        console.log(`single cart =`, ca)
                        setCartData(ca)
                        setUser({
                            name: ca.user.name,
                            email: ca.user.email,
                            mobile: ca.user.mobile,
                            address: ca.user.address
                        })
                }).catch(err => toast.error(err.message))
        }

        const InitCart = useCallback(() => {
            readCart()
        },[cartData])
    
        useEffect(() => {
            InitCart()
        },[InitCart])

    const toggle = (val) => {
        setView(val)
    }

    useEffect(() => {
        setUser(contextToken.currentUser? contextToken.currentUser : {
            name: "",
            email: "",
            mobile: "",
            address: "",
        })
    },[contextToken])


    const readInput = (e) => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
    }

    // address handler
    const addressHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`/api/user/update/${contextToken.currentUser._id}`, {
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                address: user.address,
            })
                .then(res => {
                    toast.success(res.data.msg)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

    // place order
    const placeOrder = async () => {
        try {
            if(window.confirm(`Are you sure to place order?`)) {
                let data = {
                    cart: cartData,
                    user: contextToken.currentUser
                }
                await axios.post(`/api/order/add`, data)
                    .then(res => {
                        toast.success(res.data.msg)
                        deleteCart(cartData._id)
                    }).catch(err => toast.error(err.response.data.msg))
            }
        }catch(err) {
            toast.error(err.message)
        }
    }

    const deleteCart = async (id) => {
        try {
            await axios.delete(`/api/cart/delete/${id}`)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate("/dashboard/user")
                }).catch(err => toast.error(err.response.data.msg))
        }catch(err) {
            toast.error(err.message)
        }
    }


  return (
    <div className='container mt-5 p-3'>
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="card">
                    <div className="card-body">
                         <ul className="nav align-items-center justify-content-evenly">
                            <li className="nav-item">
                                <button onClick={() => toggle("address")} className={view === "address" ? "nav-link active": "nav-link"}>
                                    <h3>1</h3>
                                    <p className="text-light">Shipping Address</p>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => toggle("payment")} className={view === "payment" ? "nav-link active": "nav-link"}>
                                    <h3>2</h3>
                                    <p className="text-light">Payment</p>
                                </button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => toggle("review")} className={view === "review" ? "nav-link active": "nav-link"}>
                                    <h3>3</h3>
                                    <p className="text-light">Review & Submit</p>
                                </button>
                            </li>
                         </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-4 mb-3">
            <div className="col-md-6  col-lg-8 col-sm-12">
                {
                    view === "address" ? (
                        <div className="card">
                        <div className="card-header">
                            <h3 className="text-theme">Shipping Address</h3>
                        </div>
                        <div className="card-body">
                            <form autoComplete="off" onSubmit={addressHandler}>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" value={user.name} onChange={readInput} id="name" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" value={user.email} onChange={readInput} id="email" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="number" name="mobile" value={user.mobile} onChange={readInput} id="mobile" className="form-control" required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="address">Address</label>
                                    <textarea name="address" id="address" value={user.address} onChange={readInput} cols="30" rows="5" className="form-control" required></textarea>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="Submit" className="btn btn-dark" />
                                </div>
                            </form>
                        </div>
                    </div>
                    ) : null
                }
                {
                    view === "payment" ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-theme">Payment</h3>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-pills">
                                    <li className="nav-item">
                                        <button onClick={() => setPayMode("cod")} className={ payMode === "cod" ? "nav-link active": "nav-link"}>Cash On Delivery</button>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={() => setPayMode("online")} className={ payMode === "online" ? "nav-link active": "nav-link"}>Online</button>
                                    </li>
                                </ul>
                            </div>
                    </div>
                    ) : null
                }
                {
                    view === "review" ? (
                        <div className="card">
                            <div className="card-header">
                                <h3 className="text-theme">Review</h3>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <strong>Name</strong>
                                                <span className="text-success"> { contextToken?.currentUser.name } </span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Email</strong>
                                                <span className="text-success"> { contextToken?.currentUser.email } </span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Mobile</strong>
                                                <span className="text-success"> { contextToken?.currentUser.mobile } </span>
                                            </li>
                                            <li className="list-group-item">
                                                <strong>Address</strong>
                                                <span className="text-success"> { contextToken?.currentUser.address } </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul className="list-group">
                                            <li className="list-group-item">
                                                <strong>Payment Mode</strong>
                                                <span className="text-success"> { payMode === "cod"? "Cash On Delivery" : payMode } </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                    </div>
                    ) : null
                }
            </div>

            <div className="col-md-6 col-lg-4 col-sm-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="text-theme">Cart Details</h4>
                    </div>
                    <div className="card-body">

                 {
                        cartData?.products?.length === 0 ? null : (
                            <div className="card w-100 border-0 ms-0">
                                <div className="card-header border-0">
                                <h5 className="card-title text-theme">Cart-Total</h5>
                                </div>
                                <div className="card-body">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        <div className="d-flex justify-content-between">
                                            <strong className="text-secondary">Coupon: </strong>
                                            {
                                                coupon ? <strong className="float-end text-secondary"> { coupon } </strong> : 
                                                    ''
                                            }
                                        </div>
                                    </li>
                                    <li className="list-group">
                                        <div className="form-group mt-3 mb-2">
                                        <label className="text-secondary">Enter Coupon Code Here</label>
                                                    <div className="input-group">
                                                        <input type="text"  name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} id="coupon" className="form-control" required  />
                                                        <button className="btn btn-success">
                                                            <i className="bi bi-plus-circle"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                    </li>
        
                                    <li className="list-group">
                                        <div>
                                            <strong className="text-secondary">SubTotal</strong>
                                                <strong className="float-end text-success"> &#8377; { cartData?.total ? cartData?.total.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Shipping</strong>
                                                <strong className="float-end text-success"> &#8377; { cartData?.shipping ? cartData?.shipping.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Tax (CGST+SGST) </strong>
                                                <strong className="float-end text-success"> &#8377; { cartData?.tax ? cartData?.tax.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Discount </strong>
                                                <strong className="float-end text-danger"> &#8377; { cartData?.discount ? cartData?.discount.toFixed(2): 0 } </strong>
                                        </div>
                                        <hr />
                                        <div>
                                            <strong className="text-theme">Total</strong>
                                                <strong className="float-end text-theme"> &#8377; { cartData?.final ? cartData?.final.toFixed(2): 0 } </strong>
                                        </div>
                                    </li>
                                </ul>
                                </div>
                                <div className="card-footer">
                                    {
                                        view === "review" ?  <button onClick={() => placeOrder()} className="btn btn-dark float-end">Place Order</button>: null
                                    }
                                </div>
                            </div>
                        )
                 }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
