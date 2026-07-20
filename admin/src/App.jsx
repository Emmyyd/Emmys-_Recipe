import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Orders'
import { ToastContainer,  } from 'react-toastify';
  

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr/>
      <div className='app-content'>
        <Sidebar open={sidebarOpen} />
        <main className="main-content">
          <Routes>
            <Route path="/add" element={<Add/>} />
            <Route path="/list" element={<List/>} />
            <Route path="/order" element={<Order/>} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App