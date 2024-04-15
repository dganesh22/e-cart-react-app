import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'


function ProductsHome() {
    const [products,setProducts] = useState([])

    const readProducts = async () => {
      try {
        await axios.get(`/api/product/all`)
        .then(res => {
           setProducts(res.data.products)
         }).catch(err => toast.error(err.response.data.msg))
      } catch (err) {
        toast.error(err.message)
      }
    }

    useEffect(() => {
      readProducts()
    },[])
  return (
    <div className="container">
        <div className="row">
            {
               products && products.map((item,index) => {
                return (
                  <div className="col-md-4 col-lg-3 col-sm-6" key={index}>
                     <NavLink to={`/product/${item._id}`} className="no-link">
                     <div className="card">
                        <img src={item?.image ? `/uploads/${item?.image}` : ''} alt="no pic" className="card-image-top" height={'300'} />
                        <div className="card-body">
                          <h5 className="card-title">{item.title}</h5>
                          <p className="card-text"> &#8377; {item.price}</p>
                        </div>
                      </div>
                     </NavLink>
                  </div>
                )
               })
            }
        </div>
    </div>
  )
}

export default ProductsHome