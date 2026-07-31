import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapView = ({ vets, userLocation, loading }) => {
  // Default location (center of map)
  const center = userLocation || { lat: 28.7041, lng: 77.1025 }; // Delhi, India

  // Custom vet marker icon
  const vetIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // User location marker icon
  const userIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* USER LOCATION */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <p className="font-semibold text-gray-900">Your Location</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* VET LOCATIONS */}
        {vets?.map((vet) => (
          <Marker
            key={vet._id}
            position={[vet.location.coordinates[1], vet.location.coordinates[0]]}
            icon={vetIcon}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <img
                  src={vet.image || "https://via.placeholder.com/200"}
                  alt={vet.name}
                  className="w-full h-24 object-cover rounded mb-2"
                />
                <p className="font-semibold text-gray-900">Dr. {vet.name}</p>
                <p className="text-sm text-gray-600">{vet.specialization}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-semibold">{vet.rating || 4.8}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;