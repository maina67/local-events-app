import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useState, useEffect } from "react";

export default function MapView({ events }) {
  const highlightedEvents = events.slice(0, 4);

  // 🔹 Carousel images
  const images = ["/event2.jpg", "/event1.jpg", "/event3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-screen min-h-screen overflow-y-auto">
      {/* 🔹 Carousel strip */}
      <div className="relative w-full h-[35vh] overflow-hidden">
        <img
          src={images[currentImage]}
          alt="Event highlight"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-5xl font-bold mb-4 text-[#1E90FF]">Looking for events?</h2>

        {/* Typewriter effect */}
        <p className="typewriter text-[#FF6B35]">
          You are welcome to explore
        </p>
      </div>

      {/* 🔹 Map + Sidebar */}
      <div className="flex gap-4 p-4">
        {/* Map (2/3) */}
        <div className="w-2/3 h-[70vh] mt-6">
          <MapContainer
            center={[-1.2921, 36.8219]} // Nairobi default
            zoom={12}
            className="bg-white/40 h-full w-full rounded-xl shadow-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {events
              .filter(
                (event) =>
                  event.location?.coordinates &&
                  event.location.coordinates.length === 2
              )
              .map((event, index) => (
                <Marker
                  key={index}
                  position={[
                    event.location.coordinates[1], // latitude
                    event.location.coordinates[0], // longitude
                  ]}
                  icon={new L.Icon({
                    iconUrl:
                      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
                    shadowUrl:
                      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41],
                  })}
                >
                  <Popup>
                    <h2 className="font-bold">{event.title}</h2>
                    <p>{event.description || "No description available"}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      📍 {event.location?.name || "Location TBA"}
                    </p>
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>

        {/* Sidebar */}
        <div className="w-1/3 h-[80vh] overflow-y-auto p-2 space-y-4">
          {highlightedEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white/40 backdrop-blur-md rounded-xl shadow-md p-4"
            >
              <h2 className="font-bold text-lg">{event.title}</h2>
              <p className="text-sm text-gray-700">
                {event.description || "No description available"}
              </p>
              <p className="text-xs text-gray-500 mt-2">{event.date}</p>
            </div>
          ))}
        </div>
      </div>


      {/* 🔹 Section One */}
      <div className="flex gap-4 p-8 items-center">
        {/* Left Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src="/showcase.jpg"
            alt="Event showcase"
            className="w-3/4 h-64 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Text */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2 text-[#1E90FF]">Discover Amazing Experiences</h2>
          <p className="text-gray-700">
            Our platform connects you with the best local events happening near you.
            Whether it’s music, art, food, or culture, you’ll always find something
            exciting. Stay updated with curated highlights and personalized
            recommendations. Never miss out on an event that matters to you.
          </p>
        </div>
      </div>

      {/* 🔹 Section Two */}
      <div className="flex gap-4 p-8 items-center">
        {/* Left Text */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-2 text-[#1E90FF]">About Us</h2>
          <p className="text-gray-700">
            This app is designed to make event discovery simple and fun. We believe
            that experiences bring people together and create lasting memories. By
            providing real-time updates, interactive maps, and curated event lists,
            we help you find the best events in your city. Our goal is to make sure
            you never miss an opportunity to connect, explore, and enjoy life.
          </p>
        </div>

        {/* Right Image */}
        <div className="w-1/2 flex justify-center">
          <img
            src="/about.jpg"
            alt="About us illustration"
            className="w-3/4 h-64 object-cover rounded-xl shadow-md"
          />
        </div>
      </div>

    </div>
  );
}
