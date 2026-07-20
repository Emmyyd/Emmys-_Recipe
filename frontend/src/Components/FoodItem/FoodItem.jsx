import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext)

  // If image is just a filename (backend), prepend the full URL
  const imageUrl = image.startsWith('http') || image.startsWith('/') 
    ? image 
    : `${url}/images/${image}`

  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img className='food-item-image' src={imageUrl} alt={name} />
        <div className='food-item-counter'>
          {!cartItems[id]
            ? <span className='food-item-add-btn' onClick={() => addToCart(id)}>+</span>
            : <div className='food-item-counter-controls'>
                <span onClick={() => removeFromCart(id)}>-</span>
                <p>{cartItems[id]}</p>
                <span onClick={() => addToCart(id)}>+</span>
              </div>
          }
        </div>
      </div>
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>₦{price.toLocaleString()}</p>
      </div>
    </div>
  )
}

export default FoodItem