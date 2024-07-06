// src/components/AdminPage/AdminPage.jsx
import React from 'react';
import './AdminPage.css';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';

export const AdminPage = () => {
  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Dashboard</h1>
        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default AdminPage;