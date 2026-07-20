import React, { useState } from 'react'
import './Add.css'
import { toast } from 'react-toastify'

const Add = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev => ({ ...prev, [name]: value }))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', Number(data.price))
    formData.append('category', data.category)
    formData.append('image', image)

    try {
      const response = await fetch('http://localhost:4000/api/food/add', {
        method: 'POST',
        body: formData
      })
      const result = await response.json()

      if (result.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salads"
        })
        setImage(false)
        toast.success("Food Added Successfully")
      } else {
        toast.error("Error adding food")
      }
    } catch (error) {
      console.log(error)
      toast.error("Error adding food")
    }
  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className='add-img-upload flex-col'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <div className="upload-box">
              {image ? (
                <img src={URL.createObjectURL(image)} alt="" className="preview-img" />
              ) : (
                <>
                  <span>📤</span>
                  <p>Upload</p>
                </>
              )}
            </div>
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>

        <div className='add-product-name flex-col'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
        </div>

        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='write content here' required></textarea>
        </div>

        <div className='add-category-price'>
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Salads">Salads</option>
              <option value="Rolls&Wraps">Rolls&Wraps</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Grills">Grills</option>
              <option value="Smoothie">Smoothie</option>
              <option value="Drinks">Drinks</option>
            </select>
          </div>

          <div className='add-price flex-col'>
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='5000' required />
          </div>
        </div>

        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add