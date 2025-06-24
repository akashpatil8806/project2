import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>AMS</h2>
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tenants">Tenants</Link>
        <Link to="/Rent">Rent</Link>
        {/* <Link to ="/RentData">RentRecords</Link> */}
        <Link to="/MaintenanceForm">Maintenance</Link>
        <Link to="/Login">Logout</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
