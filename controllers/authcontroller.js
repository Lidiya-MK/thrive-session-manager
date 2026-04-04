const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mentor = require("../models/Mentor");
//const Trainee = require("../models/Trainee");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
};

exports.registerMentor = async (req, res) => {
  const { name, email, password, expertise } = req.body;
  try {
    const existing = await Mentor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Mentor already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const mentor = await Mentor.create({ name, email, password: hashed, expertise });
    const token = createToken({ id: mentor._id, role: "mentor" });

    res.status(201).json({ mentor: { id: mentor._id, name: mentor.name, email: mentor.email }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginMentor = async (req, res) => {
  const { email, password } = req.body;
  try {
    const mentor = await Mentor.findOne({ email });
    if (!mentor) return res.status(400).json({ message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, mentor.password);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken({ id: mentor._id, role: "mentor" });
    res.json({ mentor: { id: mentor._id, name: mentor.name, email: mentor.email }, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// do a register trainee and login trainee in the same way as mentor but with Trainee model and role "trainee" in the token payload.
