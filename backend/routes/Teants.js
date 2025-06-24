const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all tenants
router.get("/", (req, res) => {
  db.query("SELECT * FROM tenants", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
});

// ADD a tenant
router.post("/", (req, res) => {
  const { name, flat, phone, move_in } = req.body;
  const sql =
    "INSERT INTO tenants (name, flat, phone, move_in) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, flat, phone, move_in], (err, result) => {
    if (err) return res.status(500).json({ error: "Error saving tenant" });
    res.status(200).json({ message: "Tenant added successfully" });
  });
});

// UPDATE a tenant
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, flat, phone, move_in } = req.body;

  console.log("Updating ID:", id, req.body); // ✅ log input

  const sql =
    "UPDATE tenants SET name = ?, flat = ?, phone = ?, move_in = ? WHERE id = ?";
  db.query(sql, [name, flat, phone, move_in, id], (err) => {
    if (err) {
      console.error("Error updating tenant:", err); // ✅ show SQL error
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Tenant updated successfully" });
  });
});

// DELETE a tenant
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tenants WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting tenant" });
    res.json({ message: "Tenant deleted successfully" });
  });
});

module.exports = router;
