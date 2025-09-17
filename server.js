// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Replace the connection string with your provided URI
const MONGO_URI = "mongodb+srv://coderafroj:Afroj%4020%2325%40@cluster0.6cqkjq8.mongodb.net/feeDB?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(".")); // Serve files from current directory

// Define Fee Schema and Model
const feeSchema = new mongoose.Schema({
  receipt: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  roll: { type: String, required: true },
  course: { type: String, required: true },
  batch: { type: String, required: true },
  total: { type: Number, required: true },
  remaining: { type: Number, required: true },
}, { timestamps: true });

const Fee = mongoose.model("Fee", feeSchema);

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// RESTful API endpoints

// Public endpoint: Get fee record by receipt number
app.get("/api/fees/:receipt", async (req, res) => {
  try {
    const fee = await Fee.findOne({ receipt: req.params.receipt });
    if (!fee) return res.status(404).json({ error: "No record found" });
    res.json(fee);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Admin endpoints

// GET all fee records
app.get("/api/fees", async (req, res) => {
  try {
    const fees = await Fee.find().sort({ createdAt: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// POST create a new fee record
app.post("/api/fees", async (req, res) => {
  try {
    const { receipt, name, roll, course, batch, total, remaining } = req.body;
    const fee = new Fee({ receipt, name, roll, course, batch, total, remaining });
    await fee.save();
    res.status(201).json(fee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a fee record (find by MongoDB _id)
app.put("/api/fees/:id", async (req, res) => {
  try {
    const updatedFee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFee) return res.status(404).json({ error: "Record not found" });
    res.json(updatedFee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a fee record (by _id)
app.delete("/api/fees/:id", async (req, res) => {
  try {
    const deletedFee = await Fee.findByIdAndDelete(req.params.id);
    if (!deletedFee) return res.status(404).json({ error: "Record not found" });
    res.json({ message: "Record deleted", fee: deletedFee });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Analytics Schema
const analyticsSchema = new mongoose.Schema({
  event: String,
  timestamp: Date,
  session_id: String,
  user_id: String,
  page_url: String,
  parameters: mongoose.Schema.Types.Mixed
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

// Heatmap Schema
const heatmapSchema = new mongoose.Schema({
  session_id: String,
  user_id: String,
  page_url: String,
  mouseMovements: [{ x: Number, y: Number, timestamp: Date }],
  clicks: [{ x: Number, y: Number, element: String, timestamp: Date }],
  scrollEvents: [{ scrollY: Number, scrollPercent: Number, timestamp: Date }]
}, { timestamps: true });

const Heatmap = mongoose.model("Heatmap", heatmapSchema);

// Analytics endpoints
app.post("/api/analytics", async (req, res) => {
  try {
    const analytics = new Analytics(req.body);
    await analytics.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/analytics/batch", async (req, res) => {
  try {
    const { interactions } = req.body;
    await Analytics.insertMany(interactions);
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/heatmap", async (req, res) => {
  try {
    const heatmap = new Heatmap(req.body);
    await heatmap.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Analytics dashboard endpoint (admin only)
app.get("/api/analytics/dashboard", async (req, res) => {
  try {
    const totalEvents = await Analytics.countDocuments();
    const uniqueUsers = await Analytics.distinct('user_id').length;
    const topEvents = await Analytics.aggregate([
      { $group: { _id: "$event", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    res.json({
      totalEvents,
      uniqueUsers,
      topEvents
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Lead management endpoint
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Analytics.aggregate([
      { $match: { event: "form_submission" } },
      { $group: { 
        _id: "$user_id", 
        lastActivity: { $max: "$timestamp" },
        totalInteractions: { $sum: 1 },
        course: { $last: "$parameters.course" }
      }},
      { $sort: { lastActivity: -1 } }
    ]);
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 Analytics API available at /api/analytics`);
  console.log(`💾 Database: ${MONGO_URI.includes('localhost') ? 'Local' : 'Cloud'} MongoDB`);
});
