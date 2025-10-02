import { useState } from "react";

export default function EventsList({ events }) {
  const [filter, setFilter] = useState("");

  // 🔹 Apply filter
  const filteredEvents = filter
    ? events.filter((event) => event.type === filter)
    : events;

  return (
    <div className="p-4">
      {/* 🔹 Filter Section */}
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-lg font-medium">What event are you looking for?</span>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-2 p-2 border rounded-lg shadow-sm"
        >
          <option value="">All</option>
          <option value="concert">Concerts</option>
          <option value="sports">Sports</option>
          <option value="conferences">Conferences</option>
          <option value="festivals">Festivals</option>
          <option value="seminar">Seminars</option>
          <option value="movie">Movies</option>
          <option value="expos">Expos</option>
          <option value="observances">Observances</option>
          <option value="community">Community</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* 🔹 Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {filteredEvents.map((event, index) => {
          const hasCoordinates =
            event.location?.coordinates &&
            event.location.coordinates.length === 2;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 h-72 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-600">
                  {event.description || "No details"}
                </p>

                {/* ✅ Show human-readable location */}
                {event.location?.name ? (
                  <p className="text-sm text-gray-500 mt-1">
                    📍 {event.location.name}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500 mt-1">📍 Location TBA</p>
                )}

                {/* ✅ Show coordinates if available */}
                {hasCoordinates && (
                  <p className="text-xs text-gray-400 mt-1">
                    Lat: {event.location.coordinates[1]}, Lng: {event.location.coordinates[0]}
                  </p>
                )}

                {/* ✅ Google Maps link styled as text */}
                {hasCoordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${event.location.coordinates[1]},${event.location.coordinates[0]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    🌍 View on Google Maps
                  </a>
                )}

                {/* ✅ Date */}
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-between gap-2 mt-3">
                <button className="bg-green-500 text-white px-3 py-1 rounded-xl">
                  🎟 Book
                </button>
                <button className="bg-yellow-400 text-black px-3 py-1 rounded-xl">
                  ⭐ Bookmark
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
