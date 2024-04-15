import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


function AdminUsers() {
  const [users, setUsers] = useState([])


  const readInit = async () => {
    await axios.get(`/api/user/all`)
     .then(res => {
        setUsers(res.data.users)
      })
     .catch(err => {
      toast.error(err.response.data.msg)
      })
  }

  useEffect(() => {
    readInit()
  }, [])

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12">
              <div className="table table-responsive">
                  <table className="table table-striped table-bordered table-hovered">
                      <thead>
                          <tr className='text-center'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Role</th>
                            <th>Actions</th>
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
                                      <td></td>
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

export default AdminUsers