import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, cartItems, food_list, url } = useContext(StoreContext)
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 5000

  const placeOrder = async (event) => {
    event.preventDefault()

    let orderItems = []
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + deliveryFee
    }

    try {
      const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
      if (response.data.success) {
        window.location.replace(response.data.session_url)
      } else {
        alert("Error placing order. Please try again.")
      }
    } catch (error) {
      console.log(error)
      alert("Something went wrong. Please try again.")
    }
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <h2 className='title'>Delivery Information</h2>
        <div className='multi-fields'>
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type='text' placeholder='First name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type='text' placeholder='Last name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Email address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type='text' placeholder='Street address' required />
        <div className='multi-fields'>
          <input name='city' onChange={onChangeHandler} value={data.city} type='text' placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type='text' placeholder='State' required />
        </div>
        <div className='multi-fields'>
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type='text' placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type='text' placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type='tel' placeholder='Phone number' required />
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div className='cart-total-details'>
            <p>Subtotal</p>
            <p>₦{getTotalCartAmount().toLocaleString()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <p>Delivery Fee</p>
            <p>₦{deliveryFee.toLocaleString()}</p>
          </div>
          <hr />
          <div className='cart-total-details'>
            <b>Total</b>
            <b>₦{(getTotalCartAmount() + deliveryFee).toLocaleString()}</b>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder