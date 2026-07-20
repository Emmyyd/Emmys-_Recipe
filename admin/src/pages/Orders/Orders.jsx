import React, { useEffect, useState } from 'react'
import './Orders.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const url = "http://localhost:4000"

const Orders = () => {
  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list")
      if (response.data.success) {
        setOrders(response.data.data)
      } else {
        toast.error("Error fetching orders")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error fetching orders")
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status: event.target.value
      })
      if (response.data.success) {
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
      toast.error("Error updating status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='orders'>
      <h2>Orders</h2>
      <div className='orders-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <div className='order-top'>
              <div className='order-icon'>🍽️</div>
              <p className='order-items'>
                {order.items.map((item, i) => (
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                ))}
              </p>
              <p className='order-item-count'>Items: {order.items.length}</p>
            </div>

            <div className='order-details'>
              <p className='order-name'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>{order.address.street},</p>
              <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p className='order-phone'>{order.address.phone}</p>
            </div>

            <div className='order-bottom'>
              <p className='order-amount'>₦{order.amount.toLocaleString()}</p>
              <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders