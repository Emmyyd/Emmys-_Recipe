import React, { useState, useContext } from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home")
  const [isOpen, setIsOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()
  const { cartItems, token, setToken } = useContext(StoreContext)

  const getTotalCartCount = () => {
    let total = 0
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        total += cartItems[item]
      }
    }
    return total
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    setShowProfileMenu(false)
    navigate('/')
  }

  const scrollTo = (id, menuName) => {
    setMenu(menuName)
    setIsOpen(false)
    if (id === 'top') {
      navigate('/')
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  return (
    <div className='navbar'>
      <p className='navbar-logo' onClick={() => scrollTo('top', 'home')}>
        Emmy's Recipe
      </p>

      <ul className='navbar-menu'>
        <li onClick={() => scrollTo('top', 'home')} className={menu === "home" ? "active" : ""}>Home</li>
        <li onClick={() => scrollTo('explore-menu', 'menu')} className={menu === "menu" ? "active" : ""}>Menu</li>
        <li onClick={() => scrollTo('about', 'about')} className={menu === "about" ? "active" : ""}>About</li>
        <li onClick={() => scrollTo('footer', 'contact')} className={menu === "contact" ? "active" : ""}>Contact</li>
      </ul>

      <div className='navbar-right'>
        
        <div className='navbar-basket' onClick={() => navigate('/cart')}>
          <span className='navbar-basket-icon'>🛒</span>
          {getTotalCartCount() > 0 && (
            <span className='cart-count'>{getTotalCartCount()}</span>
          )}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className='navbar-profile' onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <span>👤</span>
            {showProfileMenu && (
              <ul className='navbar-profile-dropdown'>
                <li onClick={() => { setShowProfileMenu(false); navigate('/myorders') }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  <span>Orders</span>
                </li>
                <hr />
                <li onClick={logout}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Logout</span>
                </li>
              </ul>
            )}
          </div>
        )}

        <div className='hamburger' onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {isOpen && (
        <div className='mobile-menu'>
          <ul>
            <li onClick={() => scrollTo('top', 'home')}>Home</li>
            <li onClick={() => scrollTo('explore-menu', 'menu')}>Menu</li>
            <li onClick={() => scrollTo('about', 'about')}>About</li>
            <li onClick={() => scrollTo('footer', 'contact')}>Contact</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar