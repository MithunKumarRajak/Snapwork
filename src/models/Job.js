// src/models/Job.js
import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  payRate: { type: Number, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
