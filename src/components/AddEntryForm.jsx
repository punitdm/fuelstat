import { useState } from "react";

export default function AddEntryForm({ onSave, onCancel }) {
  const [date, setDate] = useState("");
  const [odometer, setOdometer] = useState("");
  const [fuel, setFuel] = useState("");
  const [petrolPrice, setPetrolPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !odometer || !fuel || !petrolPrice) return;

    const entry = {
      date,
      odometer: parseFloat(odometer),
      fuel: parseFloat(fuel),
      petrolPrice: parseFloat(petrolPrice)
    };

    onSave(entry);
    setDate("");
    setOdometer("");
    setFuel("");
    setPetrolPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-lg font-bold">Add New Entry</h2>

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" placeholder="Odometer" value={odometer} onChange={(e) => setOdometer(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" step="0.01" placeholder="Fuel (Liters)" value={fuel} onChange={(e) => setFuel(e.target.value)} className="w-full border p-2 rounded" />
      <input type="number" step="0.01" placeholder="Petrol Price" value={petrolPrice} onChange={(e) => setPetrolPrice(e.target.value)} className="w-full border p-2 rounded" />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
      </div>
    </form>
  );
}
