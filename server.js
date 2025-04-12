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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
