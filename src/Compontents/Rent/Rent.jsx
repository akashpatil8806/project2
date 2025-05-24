// import React, { useState } from 'react';
// import './Rent.css';
// import axios from "axios"
// import { useNavigate } from 'react-router-dom';

// const RentForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     tenantName: '',
//     apartmentNo: '',
//     month: '',
//     rentAmount: '',
//     paymentMode: 'Cash',
//     status: 'Paid',
//   });

//   const [message, setMessage] = useState('');
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post('http://localhost:5000/api/submit-rent', formData);
//     setMessage(res.data.message);
//     // Optionally, clear form
//     setFormData({
//       tenantName: '',
//       apartmentNo: '',
//       month: '',
//       rentAmount: '',
//       paymentMode: 'Cash',
//       status: 'Paid',
//     });
//   } catch (error) {
//     console.error('Error submitting rent:', error);
//     setMessage('Error submitting rent');
//   }
// };

//   return (
//     <div className="rent-form-container">
//             <button className="dashboard-button" onClick={() => navigate('/DashBoard')}>Go to Dashboard</button>

//       <h2>Rent Payment</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="tenantName"
//           placeholder="Tenant Name"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="apartmentNo"
//           placeholder="Apartment No"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="month"
//           placeholder="Month (e.g. April)"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="rentAmount"
//           placeholder="Rent Amount"
//           onChange={handleChange}
//           required
//         />
//         <select name="paymentMode" onChange={handleChange} required>
//           <option value="Cash">Cash</option>
//           <option value="UPI">UPI</option>
//           <option value="Card">Card</option>
//         </select>
//         <select name="status" onChange={handleChange} required>
//           <option value="Paid">Paid</option>
//           <option value="Unpaid">Unpaid</option>
//         </select>
//         <button type="submit">Submit Rent</button>
//       </form>
//       {message && <p className="success-message">{message}</p>}
//     </div>
//   );
// };

// export default RentForm;


// this is the new code for the show data in the table format ok

import React, { useState, useEffect } from 'react';
import './Rent.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const RentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tenantName: '',
    apartmentNo: '',
    month: '',
    rentAmount: '',
    paymentMode: 'Cash',
    status: 'Paid',
  });

  const [message, setMessage] = useState('');
  const [rentData, setRentData] = useState([]); // state to hold all rent entries

  // Fetch rent data from backend
  const fetchRentData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/get-rents');
      setRentData(res.data);
    } catch (error) {
      console.error('Error fetching rent data:', error);
    }
  };

  useEffect(() => {
    fetchRentData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/submit-rent', formData);
      setMessage(res.data.message);
      setFormData({
        tenantName: '',
        apartmentNo: '',
        month: '',
        rentAmount: '',
        paymentMode: 'Cash',
        status: 'Paid',
      });
      fetchRentData(); // Refresh data after submission
    } catch (error) {
      console.error('Error submitting rent:', error);
      setMessage('Error submitting rent');
    }
  };

  return (
  <div className="rent-page">
    <button className="dashboard-button" onClick={() => navigate('/DashBoard')}>
      Go to Dashboard
    </button>

    <h2>Rent Management</h2>

    <div className="rent-wrapper">
      {/* Left: Rent Form */}
      <div className="rent-form">
        <h3>Submit Rent</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="tenantName" placeholder="Tenant Name" value={formData.tenantName} onChange={handleChange} required />
          <input type="text" name="apartmentNo" placeholder="Apartment No" value={formData.apartmentNo} onChange={handleChange} required />
          <input type="text" name="month" placeholder="Month (e.g. April)" value={formData.month} onChange={handleChange} required />
          <input type="number" name="rentAmount" placeholder="Rent Amount" value={formData.rentAmount} onChange={handleChange} required />
          <select name="paymentMode" value={formData.paymentMode} onChange={handleChange} required>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
          </select>
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <button type="submit">Submit</button>
        </form>
        {message && <p className="success-message">{message}</p>}
      </div>

      {/* Right: Table */}
      <div className="rent-table-container">
        <h3>Rent Records</h3>
        <table className="rent-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tenant Name</th>
              <th>Apartment</th>
              <th>Month</th>
              <th>Amount</th>
              <th>Mode</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {rentData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.tenant_name}</td>
                <td>{entry.apartment_no}</td>
                <td>{entry.month}</td>
                <td>{entry.rent_amount}</td>
                <td>{entry.payment_mode}</td>
                <td>{entry.status}</td>
                <td>{new Date(entry.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);


};

export default RentForm;

