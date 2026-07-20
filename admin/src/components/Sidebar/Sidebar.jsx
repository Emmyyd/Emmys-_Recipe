import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'


const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? 'open' : 'closed'}`}>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <span>➕</span>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
          <span>📋</span>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/order' className="sidebar-option">
          <span>📦</span>
          <p>Orders</p>
        </NavLink>
      </div>
    </aside>
  )
}

export default Sidebar