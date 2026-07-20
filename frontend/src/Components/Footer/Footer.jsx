import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
          <p className='footer-logo'>Emmy's Recipe</p>
          <p className='footer-desc'>Best cooks and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes.</p>
          <div className='footer-social-icons'>
            <p>📘</p>
            <p>🐦</p>
            <p>📸</p>
          </div>
        </div>
        <div className='footer-content-centre'>
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+234 812 345 6p89</li>
            <li>emmysrecipe@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2026 © Emmy's Recipe - All Rights Reserved.</p>
    </div>
  )
}

export default Footer