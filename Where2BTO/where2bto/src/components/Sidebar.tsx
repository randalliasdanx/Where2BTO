import { observer } from "mobx-react-lite";
import { mapStore } from "../stores/MapStore";
import { LocationType } from "../types/location";

const formatLayerName = (type: string) => {
  return type
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const Sidebar = observer(() => {
  return (
    <aside className="w-64 h-screen border-r border-gray-200 bg-gray-50 p-6">
      {/* ↑ Explained below */}

      <h2 className="text-xl font-bold text-gray-800 mb-6">
        {/* ↑ Explained below */}
        Layers
      </h2>

      {mapStore.layerConfigs.map((layer) => (
        <div key={layer.type} className="flex items-center gap-3 mb-4">
          {/* ↑ Explained below */}

          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: layer.color }}
          />
          {/* ↑ Color indicator */}

          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => mapStore.toggleLayerVisibility(layer.type)}
            className="w-4 h-4 cursor-pointer"
          />

          <label className="text-gray-700 cursor-pointer flex-1">
            {/* ↑ Explained below */}
            {formatLayerName(layer.type)}
          </label>
        </div>
      ))}
    </aside>
  );
});
