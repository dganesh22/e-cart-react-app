import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

function AdminHome() {
    const [products,setProducts] = useState([])
    const [categories,setCategories] = useState([])
    const [users,setUsers] = useState([])
    const [orders,setOrders] = useState([])

    const readAllProducts = async () => {
        await axios.get(`/api/product/all`)
       .then(res => {
            setProducts(res.data.products)
        })
       .catch(err => {
            toast.error(err.message)
        })
    }

    const readAllUsers = async () => {
        await axios.get(`/api/user/all`)
       .then(res => {
        setUsers(res.data.users)
       })
       .catch(err => toast.error(err.response.data.msg))
    }

    const readAllOrders = async () => {
        await axios.get(`/api/order/all`)
       .then(res => {
        setOrders(res.data.orders)
       })
       .catch(err => toast.error(err.response.data.msg))
    }

    const readAllCategories = async () => {
        await axios.get(`/api/category/all`)
       .then(res => {
        setCategories(res.data.categories)
       })
       .catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readAllProducts()
        readAllUsers()
        readAllOrders()
        readAllCategories()
    },[])

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-4 col-sm-6 col-lg-3 mt-2 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h3>Users</h3>
                        <h1> { users?.length} </h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-3 mt-2 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h3>Products</h3>
                        <h1> { products?.length} </h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-3 mt-2 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h3>Categories</h3>
                        <h1> { categories?.length} </h1>
                    </div>
                </div>
            </div>
            <div className="col-md-4 col-sm-6 col-lg-3 mt-2 mb-2">
                <div className="card">
                    <div className="card-body">
                        <h3>Orders</h3>
                        <h1> { orders?.length} </h1>
                    </div>
                </div>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col-md-6 col-sm-12 col-lg-6">
                <div className="table table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users && users.map((item,index) => {
                                    return (
                                      <tr key={index} className='text-center'>
                                          <td> {item.name} </td>
                                          <td> {item.email} </td>
                                          <td> { item.mobile } </td>
                                          <td> { item.role } </td>
                                          <td>
                                            <button className="btn btn-sm btn-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                          </td>
                                      </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6">
                <div className="table table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Discount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products && products.map((item,index) => {
                                    return (
                                      <tr key={index} className='text-center'>
                                          <td> {item.title} </td>
                                          <td>
                                            <img src={item?.image ? `/uploads/${item.image}` : ''} alt="no product" className="img-fluid rounded" style={{ width: '50px', height: '50px'}} />    
                                        </td>
                                          <td> { item.price } </td>
                                          <td> { item.discount } </td>
                                      </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminHome