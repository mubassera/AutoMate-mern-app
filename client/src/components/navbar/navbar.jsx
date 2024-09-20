import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { logoutUser } from "../../Api/auth";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error);
      alert(error.toString());
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isAdmin = userData ? userData.isAdmin : false;

  return (
    <div className="navbar">
      <div className="navLogo">
        <h2>Automate</h2>
      </div>

      <ul className="navMenu">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/book-now"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Book Now
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/parts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Parts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About Us
          </NavLink>
        </li>

        {/* Dropdown for History */}
        <li className="dropdown" onClick={toggleDropdown}>
          <span className="dropdown-toggle">Purchase & Booking History</span>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <NavLink
                  to="/OrderHistory"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Order History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service-history"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Service History
                </NavLink>
              </li>
            </ul>
          )}
        </li>

        {isAdmin && (
          <li>
            <NavLink
              to="/admin-page"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Admin
            </NavLink>
          </li>
        )}

        <li>
          <NavLink
            to="/"
            onClick={handleLogout}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
