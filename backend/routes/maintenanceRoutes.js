// backend/routes/maintenanceRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Your db connection

router.post('/', (req, res) => {
  const { tenantName, apartmentNo, month, maintenanceAmount, status } = req.body;

  const sql = `
    INSERT INTO maintenance (tenantName, apartmentNo, month, maintenanceAmount, status)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [tenantName, apartmentNo, month, maintenanceAmount, status], (err, result) => {
    if (err) {
      console.error('❌ Error inserting maintenance:', err);
      return res.status(500).send('Failed to insert maintenance data');
    }
    res.status(200).send('✅ Maintenance data saved successfully');
  });
});

module.exports = router;
