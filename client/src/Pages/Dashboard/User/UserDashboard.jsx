import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useAuth } from '../../../Hooks/authHook'

function UserDashboard() {
  const [order,setOrder] = useState(false)
  const { contextToken } = useAuth()

  const readOrder = async () => {
    await axios.get(`/api/order/all`)
      .then(res => {
        setOrder(res.data.orders)
      }).catch(err => toast.error(err.response.data.msg))
  }

  useEffect(() => {
    readOrder()
  },[])

  return (
    <div className='container'>
        <div className="row">
          <div className="col-md-12">
                <h4>Orders</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
              <div className="table table-responsive">
                  <table className="table table-bordered table-striped table-responsive">
                      <thead className='text-center'>
                        <tr>
                            <th>OrderIndex</th>
                            <th>Products</th>
                            <th>Final</th>
                            <th>OrderStatus</th>
                            <th>PaymentStatus</th>
                            <th>DeliveryStatus</th>
                            <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody className="align-items-center justify-content-center">
                            {
                                order && order.map((item,index) => {
                                  return (
                                      <tr className="text-center" key={index}>
                                          <td> { index + 1 } </td>
                                          <td> 
                                                <ul className="list-group">
                                                    {
                                                        item?.cart && item?.cart?.products.map((item,index) => {
                                                          return (
                                                              <li className="list-group-item" key={index}>
                                                                  <div className="img">
                                                                  <img src={`/uploads/${item?.image}`} alt="" width={50} height={50} className="img-fluid" />
                                                                   <strong> {item?.title} </strong>
                                                                  </div>
                                                                  <span className="text-success float-end">
                                                                    &#8377; { item?.price }
                                                                  </span>
                                                              </li>
                                                          )
                                                        })
                                                    }
                                                </ul>
                                            </td>
                                          <td>
                                          <span className="text-success">
                                                                    &#8377; { item?.cart?.final }
                                                                  </span>
                                          </td>
                                          <td>
                                              <strong>
                                                 { item?.orderStatus }
                                              </strong>
                                          </td>
                                          <td>
                                            <strong>
                                                 { item?.paymentStatus }
                                              </strong>     
                                          </td>
                                          <td>
                                            <strong>
                                                 { item?.deliveryStatus }
                                              </strong>   
                                          </td>
                                          <td>
                                               <button className="btn btn-sm btn-danger">
                                                    <i className="bi bi-x-circle"></i>
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
    </div>
  )
}

export default UserDashboard