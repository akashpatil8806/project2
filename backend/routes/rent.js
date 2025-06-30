const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/submit-rent", (req, res) => {
  const { tenantName, apartmentNo, month, rentAmount, paymentMode, status } =
    req.body;

  const sql = `INSERT INTO rent_payments 
    (tenant_name, apartment_no, month, rent_amount, payment_mode, status) 
    VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [tenantName, apartmentNo, month, rentAmount, paymentMode, status],
    (err, result) => {
      if (err) {
        console.error("Error inserting rent data:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Rent data saved successfully" });
    }
  );
});
// GET route to fetch all rent payments
router.get("/get-rents", (req, res) => {
  const sql = "SELECT * FROM rent_payments";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching rent data:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
