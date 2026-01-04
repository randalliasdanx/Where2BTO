import { useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import L from "leaflet";
import { mapStore } from "../stores/MapStore";

function createColoredIcon(color: string): L.DivIcon {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export const MapView = observer(() => {
  const mapRef = useRef<L.Map | null>(null); // store leaflet map instance
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([1.3521, 103.8198], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update markers when visible locations change (using MobX reaction)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Function to update markers
    const updateMarkers = () => {
      // Remove old markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Add new markers for visible locations
      mapStore.visibleLocations.forEach((location) => {
        const layerConfig = mapStore.layerConfigs.find(
          (config) => config.type === location.type
        );
        const color = layerConfig?.color || "#999";

        const marker = L.marker(
          [location.geometry.coordinates[1], location.geometry.coordinates[0]],
          { icon: createColoredIcon(color) }
        );

        marker.bindPopup(`<b>${location.name}</b><br>${location.type}`);

        marker.on("click", () => {
          mapStore.selectLocation(location.id);
        });

        marker.addTo(map);
        markersRef.current.push(marker);
      });
    };

    // Initial markers
    updateMarkers();

    // Set up MobX reaction to watch for changes
    const dispose = reaction(
      () => mapStore.visibleLocations.slice(), // Track the array
      () => updateMarkers() // Run when it changes
    );

    // Cleanup
    return () => {
      dispose(); // Stop watching
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full"
      style={{ minHeight: "500px", height: "100%" }}
    />
  );
});
