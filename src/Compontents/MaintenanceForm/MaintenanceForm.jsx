import React, { useState } from 'react';
import './MaintenanceForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const MaintenanceForm = () => {
   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantName: '',
    apartmentNo: '',
    month: '',
    maintenanceAmount: '',
    status: 'Paid',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/maintenance', formData);

    if (response.status === 200) {
      setMessage(response.data); // ✅ Maintenance data saved successfully
    }
  } catch (error) {
    console.error('Error submitting rent:', error);
    setMessage('❌ Failed to submit maintenance data.');
  }

  // Reset form
  setFormData({
    tenantName: '',
    apartmentNo: '',
    month: '',
    maintenanceAmount: '',
    status: 'Paid',
  });
};


  return (
    <div className="maintenance-container">
      <button className="dashboard-button" onClick={() => navigate('/DashBoard')}>Go to Dashboard</button>

      <h2>🛠️ Maintenance Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="tenantName"
          value={formData.tenantName}
          onChange={handleChange}
          placeholder="Tenant Name"
          required
        />
        <input
          type="text"
          name="apartmentNo"
          value={formData.apartmentNo}
          onChange={handleChange}
          placeholder="Apartment No"
          required
        />
        <input
          type="text"
          name="month"
          value={formData.month}
          onChange={handleChange}
          placeholder="Month (e.g. April)"
          required
        />
        <input
          type="number"
          name="maintenanceAmount"
          value={formData.maintenanceAmount}
          onChange={handleChange}
          placeholder="Maintenance Amount"
          required
        />
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MaintenanceForm;
