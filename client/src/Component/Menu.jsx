import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../Hooks/authHook'
import { toast } from 'react-toastify'
import axios from 'axios'
import useCart from '../Hooks/cartHook'

function Menu() {
    const { contextToken, setToken,setCurrentUser,setLogin } = useAuth()
    const navigate = useNavigate()

    const {cart, removeFromCart, increment,decrement } = useCart()

    const logout = async () => {
        if(window.confirm(`Are you sure to logout?`)) {
           await axios.get(`/api/auth/logout`)
            .then(res => {
                toast.success(res.data.msg)
                navigate(`/login`)
                setToken(false)
                setCurrentUser(false)
                setLogin(false)
                localStorage.removeItem("token")
            }).catch(err => toast.error(err.response.data.msg))
        } else {
            toast.warning("logout terminated")
        }
    }

  return (
    <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-theme fixed-top">
              <div className="container">
                   <div className='d-flex align-items-center'>
                        <button className="btn btn-secondary" data-bs-target="#menu" data-bs-toggle="offcanvas">
                            <i className="bi bi-list"></i>
                        </button>
                        <NavLink to={`/`} className="navbar-brand ms-3">MERN-Project</NavLink>
                   </div>

                  <span className="link" data-bs-target="#cart" data-bs-toggle="offcanvas">
                      <i className="bi bi-cart text-light"></i>
                  </span>
              </div>
          </nav>
      {/* offcanvas menu */}
          <div className="offcanvas offcanvas-start" tabIndex={'-1'} id='menu'>
              <div className="offcanvas-header">
                  <h6 className="text-dark display-6 offcanvas-title">MERN-Project</h6>
                  <button data-bs-dismiss="offcanvas" className="btn-close"/>
              </div>
              <div className="offcanvas-body">
                  {
                     contextToken?.token ?  <p className="text-dark"> Hi, { contextToken?.currentUser.name } </p>: null
                  }
                  <div className="list-group text-center mt-2 mb-2">
                      <NavLink to={`/`} className="list-group-item">Home</NavLink>
                      <NavLink to={`/about`} className="list-group-item">About</NavLink>
                      <NavLink to={`/contact`} className="list-group-item">Contact</NavLink>
                  </div>
                 {
                    contextToken?.token && contextToken?.login ? (
                        <div className="list-group text-center mt-2">
                            <NavLink to={`/dashboard/${contextToken?.currentUser.role}`} className="list-group-item">Dashboard</NavLink>
                            <button onClick={logout} className="btn btn-danger mt-2">Logout</button>
                        </div>
                    ) : (
                        <div className="list-group text-center mt-2">
                            <NavLink to={`/login`} className="list-group-item">Login</NavLink>
                            <NavLink to={`/register`} className="list-group-item">Register</NavLink>
                        </div>
                    )
                 }
              </div>
          </div>

           {/* cart offcanvas menu */}
           <div className="offcanvas offcanvas-end" tabIndex={'-1'} id='cart'>
              <div className="offcanvas-header">
                  <h6 className="text-dark offcanvas-title"> <i className="bi bi-cart"></i> Your Cart</h6>
                  <button data-bs-dismiss="offcanvas" className="btn-close"/>
              </div>
              <div className="offcanvas-body">
                 <ul className="list-group border-0">
                     {
                        (cart.length === 0) ? 
                                <li className="list-group-item border-0 d-flex justify-content-between align-items-center">
                                    <span className="text-dark">Cart is empty</span>
                                    <span className="text-dark"> &#8377;0</span>
                                </li>
                        : null
                     }
                     {
                        cart && cart.map((item,index) => {
                            return (
                                <li className="list-group-item d-flex" key={index}>
                                    <div className="img">
                                        <img src={`/uploads/${item?.image}`} alt={item.name} width={60} height={60} />
                                    </div>
                                     <div className="w-100">
                                        <span className="float-end text-danger link" onClick={() => removeFromCart(item._id)} > 
                                        <i className="bi bi-trash"></i> </span>
                                        <div>
                                            <h6 className="mb-1">{item?.title}</h6>
                                            <small> &#8377; {item?.price}</small>
                                        </div>
                                        <small className="text-muted float-end">Quantity:  
                                            <span className='ms-3'>
                                                <i onClick={()=> decrement(item)} className="bi bi-dash-circle link text-danger"></i>
                                                <strong> {item?.quantity ||  1} </strong>
                                                <i onClick={()=> increment(item)} className="bi bi-plus-circle text-success link"></i>
                                            </span>
                                         </small>
                                     </div>
                                </li>
                            )
                        })
                     }
                 </ul>
              </div>
          </div>
    </header>
  )
}

export default Menu