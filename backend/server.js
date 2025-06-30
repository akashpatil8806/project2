const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const rentRoutes = require("./routes/rent");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const tenantRoutes = require("./routes/Teants");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
// this is the used for connection rent page backend
app.use("/api", rentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/Tenants", tenantRoutes);
// app.use('/api/dashboard', dashboardRoutes);

app.post("/signUp", (req, res) => {
  const { fullName, email, password } = req.body;

  const sql = "INSERT INTO users (fullName, email, password) VALUES (?, ?, ?)";
  db.query(sql, [fullName, email, password], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).json({ message: "Error saving user" });
    } else {
      res.status(200).json({ message: "User registered successfully" });
    }
  });
});

// this is the tenets save the code
// Get all tenants
app.get("/Tenants", (req, res) => {
  db.query("SELECT * FROM tenants", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(result);
  });
});

// app.post("/Tenants", (req, res) => {
//   const { name, flat, phone, move_in } = req.body;
//   const sql =
//     "INSERT INTO tenants (name,flat,phone,move_in) VALUES (?, ?, ?,?)";
//   db.query(sql, [name, flat, phone, move_in], (err, result) => {
//     if (err) {
//       console.error("Error inserting user:", err);
//       res.status(500).json({ message: "Error saving user" });
//     } else {
//       res.status(200).json({ message: "User registered successfully" });
//     }
//   });
// });

// // PUT /Tenants/:id - Update a tenant
// app.put("/Tenants/:id", (req, res) => {
//   const tenants = loadTenants();
//   const id = parseInt(req.params.id); // Ensure ID is numeric

//   const index = tenants.findIndex((t) => t.id === id);

//   if (index !== -1) {
//     tenants[index] = { ...req.body, id }; // Make sure ID is not overwritten
//     saveTenants(tenants);
//     res.json(tenants[index]);
//   } else {
//     res.status(404).json({ error: "Tenant not found" });
//   }
// });

// // this is are used for the delete the data
// // Delete a tenant
// app.delete("/Tenants/:id", (req, res) => {
//   const tenants = loadTenants();

//   // Important fix: convert both IDs to string
//   const filtered = tenants.filter(
//     (t) => t.id.toString() !== req.params.id.toString()
//   );

//   if (filtered.length === tenants.length) {
//     return res.status(404).json({ error: "Tenant not found" });
//   }

//   saveTenants(filtered);
//   console.log("Deleted tenant ID:", req.params.id); // debug log
//   res.status(204).end();
// });

// ✅ Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      if (result.length > 0) {
        res.send({ success: true });
      } else {
        res.send({ success: false });
      }
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
