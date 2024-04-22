import React, { useEffect, useState } from 'react'
import { useAuth } from '../../Hooks/authHook'
import useCart from '../../Hooks/cartHook'
import { NavLink } from 'react-router-dom'

export default function Checkout() {
    const [view,setView] = useState("address")
    const { contextToken }= useAuth()
    const { cart, total, tax,discount,final,shipping  } = useCart()
    const [coupon,setCoupon] = useState('')


    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: "",
        address: "",
        landmark: ""
    })

    const toggle = (val) => {
        setView(val)
    }

    useEffect(() => {
        setUser(contextToken.currentUser? contextToken.currentUser : {
            name: "",
            email: "",
            mobile: "",
            address: "",
            landmark: ""
        })
    },[])


    const readInput = (e) => {
        const { name, value } = e.target
        setUser({...user, [name]: value})
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
                            <form autoComplete="off">
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
                        cart.length === 0 ? null : (
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
                                                <strong className="float-end text-success"> &#8377; { total ? total.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Shipping</strong>
                                                <strong className="float-end text-success"> &#8377; { shipping ? shipping.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Tax (CGST+SGST) </strong>
                                                <strong className="float-end text-success"> &#8377; { tax ? tax.toFixed(2): 0 } </strong>
                                        </div>
                                        <div>
                                            <strong className="text-secondary">Discount </strong>
                                                <strong className="float-end text-danger"> &#8377; { discount ? discount.toFixed(2): 0 } </strong>
                                        </div>
                                        <hr />
                                        <div>
                                            <strong className="text-theme">Total</strong>
                                                <strong className="float-end text-theme"> &#8377; { final ? final.toFixed(2): 0 } </strong>
                                        </div>
                                    </li>
                                </ul>
                                </div>
                                <div className="card-footer">
                                    {
                                        view === "review" ?  <button className="btn btn-dark float-end">Place Order</button>: null
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