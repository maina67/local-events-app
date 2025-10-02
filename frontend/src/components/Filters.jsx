export default function Filters() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {["concert", "sports", "festivals", "conferences", "other"].map((type) => (
        <button
          key={type}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-xl text-sm capitalize"
        >
          {type}
        </button>
      ))}
    </div>
  );
}
