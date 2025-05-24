// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // Get Dashboard Summary
// router.get('/', (req, res) => {
//   const dashboardData = {};

//   const queries = [
//     {
//       label: 'totalApartments',
//       sql: 'SELECT COUNT(*) as total FROM apartments',
//     },
//     {
//       label: 'totalTenants',
//       sql: 'SELECT COUNT(*) as total FROM tenants',
//     },
//     {
//       label: 'pendingRents',
//       sql: "SELECT COUNT(*) as total FROM rent WHERE status = 'Unpaid'",
//     },
//     {
//       label: 'openMaintenance',
//       sql: "SELECT COUNT(*) as total FROM maintenance WHERE status = 'Unpaid'",
//     },
//   ];

//   let completed = 0;

//   queries.forEach(({ label, sql }) => {
//     db.query(sql, (err, result) => {
//       if (err) {
//         console.error(`❌ Error fetching ${label}:`, err);
//         return res.status(500).json({ error: `Failed to get ${label}` });
//       }

//       dashboardData[label] = result[0].total;
//       completed++;

//       if (completed === queries.length) {
//         res.status(200).json(dashboardData);
//       }
//     });
//   });
// });

// module.exports = router;
