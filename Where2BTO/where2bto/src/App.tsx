import { Sidebar } from "./components/Sidebar";
import { LocationList } from "./components/LocationList";
import { MapView } from "./components/MapView";

function App() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="p-4 border-b bg-white shadow-sm">
          <h1 className="text-2xl font-bold text-gray-800">
            Urban MicroPlanner
          </h1>
        </header>
        <div className="flex-1 flex gap-4 p-4 bg-gray-100">
          {/* Left: Location List */}
          <div className="w-80 overflow-y-auto">
            <LocationList />
          </div>
          
          {/* Right: Map */}
          <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
            <MapView />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
