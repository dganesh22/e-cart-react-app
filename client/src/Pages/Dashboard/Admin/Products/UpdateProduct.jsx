import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'

function UpdateProduct() {
    const [title,setTitle] = useState('')
    const [image,setImage] = useState('')
    const [desc,setDesc] = useState('')
    const [price,setPrice] = useState(0)
    const [SKU,setSKU] = useState('')
    const [category,setCategory] = useState('')
    const [discount,setDiscount] = useState(0.0)
    const [tax,setTax] = useState(0.0)

    const [loading,setLoading] = useState(false)

    const [categories,setCategories] =  useState([])

    const params = useParams()
    const navigate = useNavigate()

    // read single product info
    const readInit = async () => {
        await axios.get(`/api/product/single/${params.id}`)
            .then(res => {
                setTitle(res.data.product.title)
                setDesc(res.data.product.desc)
                setPrice(res.data.product.price)
                setCategory(res.data.product.category)
                setImage(res.data.product.image)
                setDiscount(res.data.product.discount)
                setSKU(res.data.product.SKU)
                setTax(res.data.product.tax)
            }).catch(err => toast.error(err.response.data.msg))
    }


    // read all categories
    const readAllCat = async () => {
       try {
        await axios.get(`/api/category/all`)
        .then(res => {
            setCategories(res.data.categories)
        }).catch(err => toast.error(err.response.data.msg))
       } catch (err) {
            toast.error(err.message)
       }
    }

    useEffect(() => {
        readAllCat()
        readInit()
    },[])
    
    // to uploadin image to server
    const imageHandler = async (e) => {
        e.preventDefault()
        try {
            let file = e.target.files[0]
            console.log(`file data=`, file)

            let formData = new FormData()
            formData.append('thumbnail', file)

            setLoading(true)
             await axios.post(`/api/file/upload/?product=${params.id}`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
             })
                .then(res => {
                    setLoading(false)
                    toast.success(res.data.msg)
                    setImage(res.data.file)
                    window.location.reload()
                }).catch(err => {
                    toast.error(err.response.data.msg)
                    setLoading(false)
                })

        }catch(err) {
            toast.error(err.message)
        }
    }

    //delete image
    const deleteImage = async (e) => {
        e.preventDefault()
        try {
            if(window.confirm(`Are you sure to delete an image?`)) {
                await axios.delete(`/api/file/delete?product=${params.id}`)
               .then(res => {
                    toast.success(res.data.msg)
                    setImage('')
                }).catch(err => {
                    toast.error(err.response.data.msg)
                })
            }
        }catch(err) {
            toast.error(err.message)
        }
    }

    // update the data
    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let data  = {
                title,
                desc,
                category,
                price,
                SKU,
                discount,
                image,
                tax
            }

             await axios.patch(`/api/product/update/${params.id}`,data)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/dashboard/superadmin/products`)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <h6 className="display-6 text-theme">Update Product</h6>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="">Product Image</label>
                    <br />
                   {
                        image === "" ? (
                            <label htmlFor="image">
                                {
                                    loading ? (
                                        <div className="spinner-border text-theme" style={{ width: '4rem',height: '4rem'}} role={'status'}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ): (
                                        <input type="file" name="image" onChange={imageHandler} id="image" className="form-control" required />
                                    )
                                }
                             </label>
                        ) : (
                            <div className="card position-relative">
                                <button onClick={deleteImage} className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle">
                                    <i className="bi bi-x-circle"></i>
                                </button>
                                <img src={image ? `/uploads/${image}` : ''} alt="no pic" className="card-img-top" style={{ width:'45%'}} />
                            </div>
                        )
                   }
                </div>
             
            </div>
            <div className="col-md-6">
                <div className="form-group mt-2">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" cols="30" rows="5" className="form-control" required></textarea>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} id="price" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="SKU">SKU</label>
                    <input type="text" name="SKU" value={SKU} onChange={(e) => setSKU(e.target.value)} id="SKU" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="category">Category</label>
                    <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} id="category" className="form-select">
                        <option value="null">Choose Product Category</option>
                        {
                            categories && categories.map((item,index) => {
                                return (
                                    <option value={item.name} key={index}> {item.name} </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="discount">Discount</label>
                    <input type="number" name="discount" value={discount} onChange={(e) => setDiscount(e.target.value)} id="discount" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="tax">Tax</label>
                    <input type="number" name="tax" value={tax} onChange={(e) => setTax(e.target.value)} id="tax" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <button onClick={submitHandler} className="btn btn-success">Update Product</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateProduct