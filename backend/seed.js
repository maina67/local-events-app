const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("./models/Events");

dotenv.config();

const events = [
  {
    title: "Local Concert",
    type: "concert",
    date: new Date("2025-09-25"),
    description: "Live music in the park 🎸",
    imageUrl: "https://placehold.co/300x200?text=Concert",
    location: {
      name: "Uhuru Park, Nairobi", // ✅ Human-readable name
      type: "Point",
      coordinates: [36.8219, -1.2921],
    },
  },
  {
    title: "Movie Night",
    type: "movie",
    date: new Date("2025-09-28"),
    description: "Outdoor screening of a popular film 🎬",
    imageUrl: "https://placehold.co/300x200?text=Movie",
    location: {
      name: "Westgate Mall, Westlands",
      type: "Point",
      coordinates: [36.8044, -1.2681],
    },
  },
  {
    title: "Tech Seminar",
    type: "seminar",
    date: new Date("2025-10-01"),
    description: "AI trends in 2025 💻",
    imageUrl: "https://placehold.co/300x200?text=Seminar",
    location: {
      name: "Nairobi CBD",
      type: "Point",
      coordinates: [36.8172, -1.2833],
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Event.deleteMany(); // Clear old data
    await Event.insertMany(events);
    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
