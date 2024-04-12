import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function NewProduct() {
    const [title,setTitle] = useState('')
    const [desc,setDesc] = useState('')
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState(0)

    // all categories
    const [categories,setCategories] =  useState([])

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
    },[])

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let data = {
                title,
                desc,
                category,
                price
            }
            console.log(`product =`,data)
        } catch (error) {
            toast.error(error.message)
        }
    }
    

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12">
                <h6 className="display-6 text-theme">New Product</h6>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" required />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="desc">Description</label>
                    <textarea name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" cols="30" rows="5" className="form-control" required></textarea>
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
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} id="price" className="form-control" required />
                </div>
                
                <div className="form-group mt-2">
                    <button onClick={submitHandler} className="btn btn-success">Add Product</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NewProduct