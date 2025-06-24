import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tenants.css";
import { useNavigate } from "react-router-dom";

const Tenants = () => {
  const [tenants, setTenants] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    id: null,
    name: "",
    flat: "",
    phone: "",
    move_in: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Tenants");
      setTenants(res.data);
    } catch (err) {
      console.error("Error fetching tenants:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    console.log("Submitting form:", form); // ✅

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/Tenants/${form.id}`, form);
      } else {
        await axios.post("http://localhost:5000/Tenants", form);
      }

      alert(isEditing ? "Updated!" : "Added!");
      setForm({ id: null, name: "", flat: "", phone: "", move_in: "" });
      setIsEditing(false);
      fetchTenants();
    } catch (err) {
      console.error("Submit error:", err); // ✅ log the exact error
      alert("Submit failed. Check console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (tenant) => {
    setForm(tenant);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this tenant?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/Tenants/${id}`);
      fetchTenants();
      alert("Tenant deleted successfully!");
    } catch (err) {
      console.error("Error deleting tenant:", err);
    }
  };

  const filteredTenants = search
    ? tenants.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.flat.toLowerCase().includes(search.toLowerCase())
      )
    : tenants;

  return (
    <div className="tenants-container">
      <button
        className="dashboard-button"
        onClick={() => navigate("/DashBoard")}
      >
        Go to Dashboard
      </button>

      <h1 className="tenants-title">Tenants Management</h1>

      <form onSubmit={handleSubmit} className="tenant-form">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Flat No"
          value={form.flat}
          onChange={(e) => setForm({ ...form, flat: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d{0,10}$/.test(val)) {
              setForm({ ...form, phone: val });
            }
          }}
          required
        />
        <input
          type="date"
          value={form.move_in}
          onChange={(e) => setForm({ ...form, move_in: e.target.value })}
          required
        />
        <button type="submit" className="add-button" disabled={isSubmitting}>
          {isEditing ? "Update" : "Add"}
        </button>
      </form>

      <input
        type="text"
        placeholder="Search by name or flat number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="tenants-search"
      />

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
                <td>{new Date(tenant.move_in).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(tenant)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tenant.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No tenants found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tenants;
