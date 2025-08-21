import React, { useState, useEffect } from "react";
import { PlusCircle, Home, BarChart2, Table, Settings } from "lucide-react";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [entries, setEntries] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Load saved entries on mount
  useEffect(() => {
    const saved = localStorage.getItem("petrolEntries");
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save entries whenever they change
  useEffect(() => {
    localStorage.setItem("petrolEntries", JSON.stringify(entries));
  }, [entries]);

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle form submission
  const handleAddEntry = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = {
      date: formData.get("date"),
      odometer: parseFloat(formData.get("odometer")),
      fueledPrice: parseFloat(formData.get("fueledPrice")),
      petrolPrice: parseFloat(formData.get("petrolPrice")),
    };
    setEntries([...entries, newEntry]);
    setShowForm(false);
    e.target.reset();
  };

  // Export data as JSON file
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(entries, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `petrol-entries-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          if (window.confirm("Merge with existing data? Click Cancel to replace.")) {
            setEntries([...entries, ...imported]);
          } else {
            setEntries(imported);
          }
        } else {
          alert("Invalid file format");
        }
      } catch {
        alert("Error reading file");
      }
    };
    reader.readAsText(file);
  };

  // Clear all data
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all entries?")) {
      setEntries([]);
    }
  };

  // Pages
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Metrics</h1>
            {/* Example metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">Distance: --</div>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">Mileage: --</div>
            </div>
          </div>
        );
      case "charts":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold">Charts</h1>
            <p>Charts coming soon...</p>
          </div>
        );
      case "entries":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Entries</h1>
            <table className="w-full border">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Odometer</th>
                  <th>Fueled</th>
                  <th>Petrol Price</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    <td>{entry.odometer}</td>
                    <td>{entry.fueledPrice}</td>
                    <td>{entry.petrolPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "settings":
        return (
          <div className="p-4 space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            {/* Theme Toggle */}
            <div>
              <h2 className="font-semibold mb-2">Theme</h2>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>

            {/* Export Data */}
            <div>
              <button
                onClick={handleExport}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Export Data
              </button>
            </div>

            {/* Import Data */}
            <div>
              <input
                type="file"
                accept="application/json"
                onChange={handleImport}
                className="hidden"
                id="importFile"
              />
              <label
                htmlFor="importFile"
                className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
              >
                Import Data
              </label>
            </div>

            {/* Clear All Data */}
            <div>
              <button
                onClick={handleClear}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Clear All Data
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white">
      {/* Main content */}
      <div className="flex-1">{renderPage()}</div>

      {/* Floating Form Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="fixed bottom-16 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white rounded-full p-4 shadow-lg"
      >
        <PlusCircle size={28} />
      </button>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleAddEntry}
            className="bg-white dark:bg-gray-800 p-6 rounded shadow-md space-y-4 w-80"
          >
            <input type="date" name="date" className="w-full p-2 border rounded" required />
            <input type="number" name="odometer" placeholder="Odometer" className="w-full p-2 border rounded" required />
            <input type="number" step="0.01" name="fueledPrice" placeholder="Fueled Price" className="w-full p-2 border rounded" required />
            <input type="number" step="0.01" name="petrolPrice" placeholder="Petrol Price" className="w-full p-2 border rounded" required />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Save</button>
          </form>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 flex justify-around py-2 border-t">
        <button onClick={() => setActivePage("home")}><Home /></button>
        <button onClick={() => setActivePage("charts")}><BarChart2 /></button>
        <button onClick={() => setActivePage("entries")}><Table /></button>
        <button onClick={() => setActivePage("settings")}><Settings /></button>
      </div>
    </div>
  );
}
