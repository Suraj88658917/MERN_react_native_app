const express = require("express");
const router = express.Router();
const Agent = require("../models/Agent");
const auth = require("../middleware/auth"); // ✅ Add this import

// Add new agent
router.post("/", auth, async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const agentExists = await Agent.findOne({ email });
    if (agentExists) return res.status(400).json({ message: "Agent already exists" });

    const newAgent = new Agent({ name, email, mobile, password });
    await newAgent.save();
    res.status(201).json(newAgent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all agents
router.get("/", auth, async (req, res) => { // ✅ optional protected GET
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
