import './Navbar.css'

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button 
          className="menu-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          
        </button>
        <h2 className="logo">Emmy's Recipe Admin</h2>
      </div>
      <div className="navbar-right">
        <button className="logout-btn">Logout</button>
      </div>
    </nav>
  )
}