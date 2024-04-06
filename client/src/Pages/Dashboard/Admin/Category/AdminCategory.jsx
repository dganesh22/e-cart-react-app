import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function AdminCategory() {
   const [categories,setCategories] = useState([])
   const [isEdit,setIsEdit] = useState("new") // new category = new , edit category = edit

   // state => new ,edit
   const [category,setCategory] = useState({
        name: "",
        desc: ""
   })

   // read input 
   const readInput = (e) => {
    const { name,value } = e.target
    setCategory({...category, [name]:value })
   }

   // submit hanlder
   const submitHandler = async (e) => {
    e.preventDefault()
    try {
        if(isEdit === "new") {
            await axios.post(`/api/category/add`,category)
                .then(res => {
                    toast.success(res.data.msg)
                    window.location.reload()
                }).catch(err => toast.error(err.response.data.msg))
        } else if (isEdit === "edit") {
            await axios.patch(`/api/category/update/${category._id}`,category)
            .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
        }
    } catch (err) {
        toast.error(err.message)
    }
   }

   const toggleEdit =async (val, id='') => {
      if(isEdit === "new") {
        setIsEdit(val)
      } else if (isEdit === "edit") {
            setIsEdit(val)
            await axios.get(`/api/category/single/${id}`)
            .then(res => {
                console.log(`single =`, res.data)
                setCategory(res.data.category)
            }).catch(err => toast.error(err.response.data.msg))
      }
   }

   // read categories
   const readCategories = async () => {
      await axios.get(`/api/category/all`)
        .then(res => {
            setCategories(res.data.categories)
        }).catch(err => toast.error(err.response.data.msg))
   }

   useEffect(() => {
      readCategories()
   },[])

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <div className="table table-responsive">
                    <table className="table table-bordered table-striped table-hovered">
                        <thead>
                            <tr>
                                <th colSpan={'3'}>
                                    <button onClick={() => toggleEdit("new")} className="btn btn-dark float-end" data-bs-toggle="modal" data-bs-target="#createCategory">
                                        <i className="bi bi-plus-circle"></i> Add Category
                                    </button>
                                </th>
                            </tr>
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((item,index) => {
                                  return (
                                    <tr className='text-center' key={index}>
                                        <td> {item.name} </td>
                                        <td> { item.desc } </td>
                                        <td> 
                                            <button onClick={() => toggleEdit('edit', item._id)} data-bs-toggle="modal" data-bs-target="#createCategory" className="btn btn-sm btn-info" title="edit">
                                                <i className="bi bi-pencil"></i>  
                                            </button>  
                                            <button className="btn btn-sm btn-danger" title="Delete">
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
        </div>

        {/* create category modal */}
          <div className="modal fade" tabIndex={'-1'} id='createCategory'>
                <div className="modal-dialog">
                    <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="text-center text-theme modal-title">
                                    { isEdit === "edit" ? "Edit Category" : "New Category"}
                                </h3>
                                <button className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <form autoComplete="off" onSubmit={submitHandler}>
                                    <div className="form-group mt-2">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" value={category.name} onChange={readInput} id="name" className="form-control" required />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="desc">Description</label>
                                        <textarea name="desc" value={category.desc} onChange={readInput} id="desc"  cols="30" rows="6" className="form-control" required></textarea>
                                    </div>
                                    <div className="form-group mt-2">
                                        <button className={ isEdit === "edit" ? "btn btn-warning btn-sm": "btn btn-success btn-sm"}>
                                            { isEdit === "edit" ? "Update Category" : "Add Category"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer"></div>
                    </div>
                </div>
          </div>
          {/* end modal */}
    </div>
  )
}

export default AdminCategory