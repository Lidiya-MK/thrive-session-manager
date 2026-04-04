const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    trainee: { type: mongoose.Schema.Types.ObjectId, ref: "Trainee", required: true },
    status: { type: String, enum: ["scheduled", "completed", "cancelled"], default: "scheduled" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Session", sessionSchema);