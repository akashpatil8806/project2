import React, { useEffect, useState } from 'react';
import './DashBoard.css';
import SideBar from "./../../Compontents/SideBar/SideBar";
import axios from 'axios';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  const [dashboardData, setDashboardData] = useState({
    totalApartments: 0,
    totalTenants: 0,
    pendingRents: 0,
    openMaintenance: 0,
  });

  useEffect(() => {
   const name = localStorage.getItem('userName');
  if (name) {
    setUserName(name);
    axios.get(`http://localhost:5000/api/users/${name}`)
      .then(res => {
        // set more profile data here
        console.log(res.data); // or setUserProfile(res.data)
      })
      .catch(err => console.error('Error fetching user profile', err));
  }
    // Fetch dashboard data
    axios.get('http://localhost:5000/api/dashboard')
      .then(res => setDashboardData(res.data))
      .catch(err => console.error(' Error fetching dashboard data:', err));
  }, []);

  return (
    <div className="dashboard-container">
      <SideBar />
      <div className="dashboard-content">
        <div className="profile-section">
          <p>👋 Welcome, <strong>{userName}</strong></p>
        </div>
        <h1>Apartment Management Dashboard</h1>
        <div className="cards">
          <div className="card">🏠 Total Apartments: {dashboardData.totalApartments}</div>
          <div className="card">👨‍👩‍👧‍👦 Tenants: {dashboardData.totalTenants}</div>
          <div className="card">🧾 Pending Rents: {dashboardData.pendingRents}</div>
          <div className="card">🛠️ Open Maintenance: {dashboardData.openMaintenance}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
