const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.json({ message: "Thrive Session Manager API is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// what we did earlier
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');


// dotenv.config();
// connectDB();
// const authRoutes = require("./routes/authRoutes");

// const app = express();
//app.use("/api/auth", authRoutes);

// app.use(cors());
// app.use(express.json());


// app.get("/", (req, res) => {
//   res.json({ message: "Thrive Session Manager API is running" });
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

