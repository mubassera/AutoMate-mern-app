import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import necessary components
import "./AdminPage.css";
import { AdminSidebar } from "../AdminSidebar/AdminSidebar";

// Register components needed for Pie chart
ChartJS.register(ArcElement, Tooltip, Legend);

export const AdminPage = () => {
  const [vehicleData, setVehicleData] = useState({ car: 0, bike: 0 });

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/admin/vehicle-type-count"
        );
        setVehicleData(data);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const chartData = {
    labels: ["Car", "Bike"],
    datasets: [
      {
        label: "Vehicle Type",
        data: [vehicleData.car, vehicleData.bike],
        backgroundColor: ["#3498db", "#e74c3c"],
        hoverBackgroundColor: ["#2980b9", "#c0392b"],
      },
    ],
  };

  return (
    <div className="admin-page">
      <AdminSidebar />
      <div className="admin-content">
        <h1>Dashboard</h1>
        <div style={{ width: "400px", height: "400px" }}>
          <Pie data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
