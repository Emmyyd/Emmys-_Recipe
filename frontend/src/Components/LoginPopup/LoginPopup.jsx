import React, { useState, useContext } from 'react'
import './LoginPopup.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const LoginPopup = ({ setShowLogin }) => {

  const { url, setToken } = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [loading, setLoading] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(data => ({ ...data, [name]: value }))
  }

  const onLogin = async (event) => {
    event.preventDefault()

    if (!agreeTerms) {
      toast.error("Please agree to terms & privacy policy")
      return
    }

    setLoading(true)

    try {
      if (currState === "Login") {
        const response = await axios.post(`${url}/api/user/login`, {
          email: data.email,
          password: data.password
        })

        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          setToken(response.data.token)
          setData({ name: "", email: "", password: "" })
          setAgreeTerms(false)
          setShowLogin(false)
          toast.success("Login successful!")
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(`${url}/api/user/register`, {
          name: data.name,
          email: data.email,
          password: data.password
        })

        if (response.data.success) {
          localStorage.setItem("token", response.data.token)
          setToken(response.data.token)
          setData({ name: "", email: "", password: "" })
          setAgreeTerms(false)
          setShowLogin(false)
          toast.success("Account created successfully!")
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      toast.error("Error: " + (error.response?.data?.message || error.message))
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-popup'>
      <div className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <span onClick={() => setShowLogin(false)}>✕</span>
        </div>
        <form className='login-popup-inputs' onSubmit={onLogin}>
          {currState === "Sign Up" && (
            <input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Password' required />
          <button type='submit' disabled={loading}>
            {loading ? "Loading..." : (currState === "Login" ? "Login" : "Create Account")}
          </button>
        </form>
        <div className='login-popup-condition'>
          <input
            type='checkbox'
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
          ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </div>
    </div>
  )
}

export default LoginPopup