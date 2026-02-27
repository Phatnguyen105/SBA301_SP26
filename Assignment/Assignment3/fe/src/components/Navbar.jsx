import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isStaff, isCustomer } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">🏨 FU Mini Hotel</Link>
      <ul className="navbar-nav">
        <li><NavLink to="/">Rooms</NavLink></li>

        {isStaff && (
          <>
            <li><NavLink to="/staff/customers">Customers</NavLink></li>
            <li><NavLink to="/staff/rooms">Manage Rooms</NavLink></li>
            <li><NavLink to="/staff/room-types">Room Types</NavLink></li>
            <li><NavLink to="/staff/bookings">Bookings</NavLink></li>
          </>
        )}

        {isCustomer && (
          <>
            <li><NavLink to="/customer/book">Book Room</NavLink></li>
            <li><NavLink to="/customer/history">My Bookings</NavLink></li>
            <li><NavLink to="/customer/profile">Profile</NavLink></li>
          </>
        )}

        {user ? (
          <>
            <li style={{ color: '#c5cae9', fontSize: '0.85rem' }}>
              {user.email} ({user.role})
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}
