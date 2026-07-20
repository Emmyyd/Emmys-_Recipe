import React, { useState } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <div className='about-section' id='about'>
        <h2>About Emmy's Recipe</h2>
        <p>We believe great food brings people together. Emmy's Recipe was born out of a passion for authentic, home-style cooking delivered fast and fresh to your door.</p>
        <div className='about-cards'>
          <div className='about-card'>
            <span>🍽️</span>
            <h3>Fresh Ingredients</h3>
            <p>Every dish is prepared with the freshest locally sourced ingredients.</p>
          </div>
          <div className='about-card'>
            <span>⚡</span>
            <h3>Fast Delivery</h3>
            <p>Hot tasty food delivered to your doorstep in 60 minutes or less.</p>
          </div>
          <div className='about-card'>
            <span>❤️</span>
            <h3>Made With Love</h3>
            <p>Our chefs pour passion into every meal, just like home cooking.</p>
          </div>
        </div>
      </div>
      <AppDownload />
    </div>
  )
}

export default Home