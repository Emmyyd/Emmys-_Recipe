import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const MyOrders = () => {
  const { url, token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } })
      if (response.data.success) {
        setOrders(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrders()
    }
  }, [token])

  const getStatusClass = (status) => {
    if (status === "Delivered") return "status-delivered"
    if (status === "Out for delivery") return "status-out"
    return "status-processing"
  }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>

      {orders.length === 0 && (
        <p className='no-orders'>You haven't placed any orders yet.</p>
      )}

      <div className='container'>
        {orders.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <div className='order-icon'>🍽️</div>
            <p className='order-items'>
              {order.items.map((item, i) => (
                i === order.items.length - 1
                  ? `${item.name} x ${item.quantity}`
                  : `${item.name} x ${item.quantity}, `
              ))}
            </p>
            <p>₦{order.amount.toLocaleString()}</p>
            <p>Items: {order.items.length}</p>
            <p className={getStatusClass(order.status)}>
              <span>&#x25cf;</span> <b>{order.status}</b>
            </p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyOrders