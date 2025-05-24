import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const apiEndpoint = "https://crudcrud.com/api/YOUR_ID/members";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(apiEndpoint);
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiEndpoint}/${id}`);
          toast.success("Member deleted successfully");
          fetchMembers(); // Refresh the list
        } catch (error) {
          toast.error("Error deleting member");
        }
      }
    });
  };

  const columns = [
    { name: "ID", selector: (row) => row._id },
    { name: "Member Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.Email },
    { name: "Age", selector: (row) => row.age },
    { name: "Parent ID", selector: (row) => row.parent_id },
    {
      name: "Action",
      cell: (row) => (
        <button onClick={() => handleDelete(row._id)} className="btn btn-danger">
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h1>Members List</h1>
      <DataTable
        columns={columns}
        data={members}
        pagination
        highlightOnHover
        responsive
      />
      {/* <toast.Container /> */}
    </div>
  );
};

export default MembersTable;
