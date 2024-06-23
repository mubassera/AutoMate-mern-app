import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navLogo'>
        <h2>LOGO</h2>
        <p>Automate</p>
      </div>

      <ul className='navMenu'>
        <li>
          <NavLink to="/home" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/book-now" className={({ isActive }) => (isActive ? 'active' : '')}>Book Now</NavLink>
        </li>
        <li>
          <NavLink to="/parts" className={({ isActive }) => (isActive ? 'active' : '')}>Parts</NavLink>
        </li>
        <li>
          <NavLink to="/about-us" className={({ isActive }) => (isActive ? 'active' : '')}>About Us</NavLink>
        </li>
        <li>
          <NavLink to="/history" className={({ isActive }) => (isActive ? 'active' : '')}>Purchase & Booking History</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
