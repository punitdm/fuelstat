export default function HomePage({ entries }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Metrics</h1>
      {/* Placeholder: We’ll calculate real metrics in Phase 2 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded">Distance: {entries.length > 0 ? "TODO" : "0"}</div>
        <div className="bg-blue-100 p-4 rounded">Mileage: {entries.length > 0 ? "TODO" : "0"}</div>
        <div className="bg-blue-100 p-4 rounded">Odometer: {entries.length > 0 ? "TODO" : "0"}</div>
        <div className="bg-blue-100 p-4 rounded">Fuel Ups: {entries.length}</div>
      </div>
    </div>
  );
}
