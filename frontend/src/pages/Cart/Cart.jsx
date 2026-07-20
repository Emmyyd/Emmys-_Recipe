import React, { useContext, useEffect } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const { cartItems, food_list, addToCart, removeFromCart, url } = useContext(StoreContext)
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const getTotalCartAmount = () => {
    let total = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) {
          total += itemInfo.price * cartItems[item]
        }
      }
    }
    return total
  }

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 5000

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            const imageUrl = item.image.startsWith('http') || item.image.startsWith('/') 
              ? item.image 
              : `${url}/images/${item.image}`

            return (
              <div key={item._id}>
                <div className='cart-items-title cart-items-item'>
                  <img src={imageUrl} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₦{item.price.toLocaleString()}</p>
                  <div className='cart-item-counter'>
                    <span onClick={() => removeFromCart(item._id)}>-</span>
                    <p>{cartItems[item._id]}</p>
                    <span onClick={() => addToCart(item._id)}>+</span>
                  </div>
                  <p>₦{(item.price * cartItems[item._id]).toLocaleString()}</p>
                  <span className='cross' onClick={() => removeFromCart(item._id)}>✕</span>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>

      <div className='cart-bottom'>
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
          <button onClick={() => navigate('/order')}>
            Proceed To Checkout
          </button>
        </div>

        <div className='cart-promocode'>
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type='text' placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart