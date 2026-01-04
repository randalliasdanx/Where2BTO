import { observer } from "mobx-react-lite";
import { mapStore } from "../stores/MapStore";
import { LocationType } from "../types/location";

export const LocationList = observer(() => {
  const locations = mapStore.visibleLocations;

  const formatLocationType = (type: LocationType) => {
    const split = type.split("-");
    return split
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (locations.length === 0) {
    return <div>No visible locations</div>;
  }

  return (
    <div>
      <h3>Locations: ({locations.length})</h3>
      {locations.map((loc) => (
        <div
          key={loc.id}
          className="border rounded-lg p-4 mb-3 bg-white hover:shadow-md transition"
        >
          <h4 className="font-semibold">{loc.name}</h4>
          <p className="text-sm text-gray-600">
            {formatLocationType(loc.type)}
          </p>
          <button onClick={() => mapStore.selectLocation(loc.id)}>
            Select
          </button>
        </div>
      ))}
    </div>
  );
});
