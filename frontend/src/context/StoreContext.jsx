import { createContext, useState, useEffect } from "react"
import axios from "axios"
import { food_list as defaultFoodList } from "../assets/data"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems')
    return saved ? JSON.parse(saved) : {}
  })
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [food_list, setFoodList] = useState(defaultFoodList)
  const url = "http://localhost:4000"

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`)
      if (response.data.success && response.data.data.length > 0) {
        // Combine backend items with default items
        setFoodList([...response.data.data, ...defaultFoodList])
      }
    } catch (error) {
      console.log("Backend unavailable, using default items")
      // Falls back to defaultFoodList automatically
    }
  }

  useEffect(() => {
    fetchFoodList()
  }, [])

  const addToCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }))
    if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }))
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item)
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item]
        }
      }
    }
    return totalAmount
  }

  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider