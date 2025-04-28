import AssetOverview from "./components/AssetOverview";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow mb-6">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Wealth Full Stack Task</div>
        </div>
      </nav>

      <AssetOverview />
    </div>
  );
}

export default App;
