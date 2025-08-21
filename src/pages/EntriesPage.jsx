export default function EntriesPage({ entries }) {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Entries</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Odometer</th>
            <th className="p-2 border">Fuel</th>
            <th className="p-2 border">Price</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">No entries yet</td>
            </tr>
          )}
          {entries.map((e, i) => (
            <tr key={i}>
              <td className="p-2 border">{e.date}</td>
              <td className="p-2 border">{e.odometer}</td>
              <td className="p-2 border">{e.fuel}</td>
              <td className="p-2 border">{e.petrolPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
