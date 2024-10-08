import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sideBarLogo">
        <NavLink to="/home" className="logo-link">
          <h1 className="name">AutoMate</h1>
        </NavLink>
      </div>
      <div className="underline"></div>
      <ul>
        <li>
          <NavLink to="/admin-page" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
        </li>
        <div className="underline"></div>
        <li>
          <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
            All Users
          </NavLink>
        </li>
        <div className="underline"></div>
        <li>
          <NavLink to="/adminParts" className={({ isActive }) => (isActive ? "active" : "")}>
            Parts
          </NavLink>
        </li>
        <div className="underline"></div>
        <li>
          <NavLink to="/AdminOrderManagement" className={({ isActive }) => (isActive ? "active" : "")}>
            Order Management
          </NavLink>
        </li>
        <div className="underline"></div>
        <li>
          <NavLink to="/admin/service-request-management" className={({ isActive }) => (isActive ? "active" : "")}>
            Admin Service Request Management
          </NavLink>
        </li>
        <div className="underline"></div>
        <li>
          <NavLink to="/admin/service-management" className={({ isActive }) => (isActive ? "active" : "")}>
            Admin Service Management
          </NavLink>
        </li>
        <div className="underline"></div>
      </ul>
    </div>
  );
};
