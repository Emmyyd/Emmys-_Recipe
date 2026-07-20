import React from 'react'
import './AppDownload.css'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br /> Emmy's Recipe App</p>
      <div className='app-download-platforms'>
        <a href='#'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg' alt='Google Play' />
        </a>
        <a href='#'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg' alt='App Store' />
        </a>
      </div>
    </div>
  )
}

export default AppDownload