import { useEffect, useState } from "react";
import MapView from "../components/MapView";
import EventsList from "../components/EventsList";

export default function Home() {
  const [activeTab, setActiveTab] = useState("map");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://local-events-app.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="h-screen w-screen bg-cover bg-center flex flex-col overflow-hidden bg-white-100">
      
      {/* 🔹 logo and Slider Tabs */}
      <div className="flex mt-2 mb-2 h-[10vh]">
        {/* Logo on the left */}
        <img
          src="/logo1.png"   // <-- place your logo in public/logo.png
          alt="App Logo"
          className="ml-1 h-12 w-auto object-contain cursor-pointer"
          onClick={() => setActiveTab("map")} // optional: click logo to go to map

        />

        <div className="ml-[30%] items-center bg-white/40 relative flex w-64 bg-gray-200 rounded-full p-1 shadow-inner">
          {/* Sliding background */}
          <div
            className={`ml-1 absolute top-1 bottom-1 w-1/2 rounded-full bg-[#1E90FF] transition-transform duration-300 ease-in-out ${
              activeTab === "map" ? "translate-x-0" : "translate-x-full"
            }`}
          ></div>

          {/* Tabs */}
          <button
            className={`ml-4 flex-1 text-center z-10 font-semibold transition-colors duration-300 ${
              activeTab === "map" ? "text-white" : "text-[#FF6B35]"
            }`}
            onClick={() => setActiveTab("map")}
          >
              Home
          </button>
          <button
            className={`ml-4 flex-1 text-center z-10 font-semibold transition-colors duration-300 ${
              activeTab === "events" ? "text-white" : "text-[#FF6B35]"
            }`}
            onClick={() => setActiveTab("events")}
          >
              Events
          </button>
        </div>
      </div>

      {/* 🔹 Page Switcher */}
      <div className="w-screen m-0 p-0 overflow-y-auto scrollbar-hide">
        {activeTab === "map" ? (
          <MapView events={events} />
        ) : (
          <EventsList events={events} />
        )}
      </div>
    </div>
  );
}
