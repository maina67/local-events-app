import express from "express";
import Event from "../models/Events.js";

const router = express.Router();

// ➕ Add New Event
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📋 Get All Events (with optional filtering)
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    const events = await Event.find(filter);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
