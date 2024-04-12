import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { toast } from "react-toastify"
import { useAuth } from '../../Hooks/authHook'

function ProductDetails() {
    const [product,setProduct] = useState(false)
    const { contextToken } = useAuth()

    const params = useParams() // to read router params

    const readProduct = async () => {
        await axios.get(`/api/product/single/${params.id}`)
            .then(res => {
                setProduct(res.data.product)
            }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readProduct()
    },[])
  return (
    <div className='container'>
        <div className="row">
                <div className="col-md-4 col-lg-4 col-sm-6">
                    <div className="card">
                        <img src={ product?.image ?  product?.image?.path : `${process.env.PUBLIC_HOME}/${product?.image?.name}` } alt="no pic" className="card-img-top" />
                    </div>
                </div>
                <div className="col-md-8 col-lg-8 col-sm-6">
                    <div className="card border-0">
                        <div className="card-body border-0">
                            <h3 className="display-3 text-theme"> { product?.title } </h3>
                            <h5 className="text-success float-end"> &#8377; {product?.price } </h5>

                            <div className="card mt-5">
                                <div className="card-body">
                                    <h4 className="text-theme">Description</h4>
                                    <hr/>
                                    <p className="text-secondary"> { product?.desc } </p>
                                </div>
                            </div>

                           {
                            contextToken?.currentUser?.role === "superadmin" ? null :  <button className="btn btn-success mt-5">Add To Cart</button>
                           }
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default ProductDetails