// // pages/Tenants.jsx
// import React, { useEffect,useState } from 'react';
// import axios from 'axios';
// import './Tenants.css';
// import { useNavigate } from 'react-router-dom';

// const Tenants = () => {
//   const [tenants, setTenants] = useState([]);
//   const [search, setSearch] = useState('');
//   const [form, setForm] = useState({ id: null, name: '', flat: '', phone: '', move_in: '' });
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

// useEffect(() => {
  
//     fetchTenants();
//   }, []);
// const fetchTenants = async () => {
//   try {
//     const res = await axios.get('http://localhost:5000/Tenants');
//     setTenants(res.data);
//     console.log( setTenants(res.data));
    
//   } catch (err) {
//     console.error('Error fetching tenants:', err);

//   }
// };


  

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     if (isEditing) {
//       await axios.put(`http://localhost:5000/Tenants/${form.id}`, form);
//     } else {
//       await axios.post('http://localhost:5000/Tenants', form);
//     }

//     setForm({ id: null, name: '', flat: '', phone: '', move_in: '' });
//     setIsEditing(false);
    
//   } catch (err) {
//     alert("Error submitting form:", err);
//   }
// };


//   const handleEdit = (tenant) => {
//     setForm(tenant);
//     setIsEditing(true);
//   };

//   const handleDelete = async (id) => {
//   try {
//     await axios.delete(`http://localhost:5000/Tenants/${id}`);
//     fetchTenants(); // Refresh table after delete
//   } catch (err) {
//     console.error('Error deleting tenant:', err);
//   }
// };


//   const filteredTenants = search
//   ? tenants.filter(t =>
//       t.name.toLowerCase().includes(search.toLowerCase()) ||
//       t.flat.toLowerCase().includes(search.toLowerCase())
//     )
//   : tenants;


//   return (
//     <div className="tenants-container">
//       <button className="dashboard-button" onClick={() => navigate('/DashBoard')}>Go to Dashboard</button>
//       <h1 className="tenants-title">Tenants Management</h1>

//       <form onSubmit={handleSubmit} className="tenant-form">
//         <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//         <input type="text" placeholder="Flat No" value={form.flat} onChange={e => setForm({ ...form, flat: e.target.value })} required />
//         <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
//         <input type="date" value={form.move_in} onChange={e => setForm({ ...form, move_in: e.target.value })} required />
//         <button type="submit" className="add-button">{isEditing ? 'Update' : 'Add'}</button>
//       </form>

//       <input type="text" placeholder="Search by name or flat number" value={search} onChange={(e) => setSearch(e.target.value)} className="tenants-search" />

//       <table className="tenants-table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Flat No</th>
//             <th>Phone</th>
//             <th>Move-in Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTenants.length > 0 ? (
//             filteredTenants.map((tenant) => (
//               <tr key={tenant.id}>
//                 <td>{tenant.name}</td>
//                 <td>{tenant.flat}</td>
//                 <td>{tenant.phone}</td>
//                 <td>{tenant.move_in}</td>
//                 <td>
//                   <button onClick={() => handleEdit(tenant)} className="edit-button">Edit</button>
//                   <button onClick={() => handleDelete(tenant.id)} className="delete-button">Delete</button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr><td colSpan="5">No tenants found.</td></tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tenants;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Tenants.css';
import { useNavigate } from 'react-router-dom';

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ id: null, name: '', flat: '', phone: '', move_in: '' });
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch tenants when component mounts
  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/Tenants');
      setTenants(res.data);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/Tenants/${form.id}`, form);
      } else {
        await axios.post('http://localhost:5000/Tenants', form);
      }

      setForm({ id: null, name: '', flat: '', phone: '', move_in: '' });
      setIsEditing(false);
      fetchTenants(); // ✅ Refresh tenant list after submit
    } catch (err) {
      alert("Error submitting form:", err);
    }
  };

  const handleEdit = (tenant) => {
    setForm(tenant);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Tenants/${id}`);
      fetchTenants(); // ✅ Refresh tenant list after delete
    } catch (err) {
      console.error('Error deleting tenant:', err);
    }
  };

  const filteredTenants = search
    ? tenants.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.flat.toLowerCase().includes(search.toLowerCase())
      )
    : tenants;

  return (
    <div className="tenants-container">
      <button className="dashboard-button" onClick={() => navigate('/DashBoard')}>Go to Dashboard</button>
      <h1 className="tenants-title">Tenants Management</h1>

      <form onSubmit={handleSubmit} className="tenant-form">
        <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="text" placeholder="Flat No" value={form.flat} onChange={e => setForm({ ...form, flat: e.target.value })} required />
        <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        <input type="date" value={form.move_in} onChange={e => setForm({ ...form, move_in: e.target.value })} required />
        <button type="submit" className="add-button">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <input type="text" placeholder="Search by name or flat number" value={search} onChange={(e) => setSearch(e.target.value)} className="tenants-search" />

      <table className="tenants-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Flat No</th>
            <th>Phone</th>
            <th>Move-in Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTenants.length > 0 ? (
            filteredTenants.map((tenant) => (
              <tr key={tenant.id}>
                <td>{tenant.name}</td>
                <td>{tenant.flat}</td>
                <td>{tenant.phone}</td>
                <td>{tenant.move_in}</td>
                <td>
                  <button onClick={() => handleEdit(tenant)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(tenant.id)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No tenants found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tenants;
