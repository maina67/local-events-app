import axios from "axios";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Events.js";

dotenv.config();

// 🔹 Map PredictHQ categories to allowed Event schema types
function mapCategory(cat) {
  const allowedTypes = [
    "concert",
    "seminar",
    "sports",
    "movie",
    "expos",
    "festivals",
    "conferences",
    "observances",
    "community",
  ];
  return allowedTypes.includes(cat) ? cat : "other"; // default unknown categories to "other"
}

// 🔹 Fetch events from PredictHQ
async function fetchPredictHQEvents() {
  try {
    const res = await axios.get("https://api.predicthq.com/v1/events/", {
      headers: { Authorization: `Bearer ${process.env.PREDICTHQ_TOKEN}` },
      params: {
        within: "50km@-1.2921,36.8219", // Nairobi lat/lng
        active: true,
        limit: 50 // fetch more events
      },
    });

    // Map events into your Event model format
    const events = res.data.results.map(evt => ({
      title: evt.title,
      type: mapCategory(evt.category), // <-- mapped here
      date: evt.start,
      description: evt.description || "",
      imageUrl: "", // PredictHQ doesn't provide images
      location: {
        name: evt.location ? `Lat: ${evt.location[0]}, Lng: ${evt.location[1]}` : "Unknown",
        type: "Point",
        coordinates: evt.location ? [evt.location[1], evt.location[0]] : [0, 0], // [lng, lat]
      },
    }));

    return events;

  } catch (error) {
    console.error("❌ Error fetching PredictHQ events:", error.message);
    return [];
  }
}

// 🔹 Fetch and store events in MongoDB
async function fetchAndStoreEvents() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const events = await fetchPredictHQEvents();

    if (events.length === 0) {
      console.log("⚠️ No events fetched.");
      process.exit();
    }

    // Optional: Avoid duplicates by checking title+date
    for (const evt of events) {
      const exists = await Event.findOne({ title: evt.title, date: evt.date });
      if (!exists) await Event.create(evt);
    }

    console.log(`🌱 Inserted ${events.length} external events!`);
    process.exit();
  } catch (error) {
    console.error("❌ Error storing events:", error.message);
    process.exit(1);
  }
}

// 🔹 Run the fetch & store process
fetchAndStoreEvents();
