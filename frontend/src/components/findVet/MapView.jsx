import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { selectNearbyVets } from "../../store/slices/VetSearchSlice";
import { getCurrentLocation } from "../../utils/geoLocation";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const SHADOW = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

// Red = clinics, Blue = you
const vetIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: SHADOW,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: SHADOW,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Moves the map to a new center when it changes
const Recenter = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], 13);
  }, [lat, lng, map]);
  return null;
};

const MapView = ({ loading }) => {
  const vets = useSelector(selectNearbyVets) || [];
  const [userPos, setUserPos] = useState(null);
  const [locError, setLocError] = useState(null);

  // Get the user's live location
  useEffect(() => {
    getCurrentLocation()
      .then((loc) => setUserPos({ lat: loc.latitude, lng: loc.longitude }))
      .catch(() => setLocError("Allow location access to see your position"));
  }, []);

  // Clinics with valid coordinates, [lat, lng] for Leaflet
  const clinics = vets.filter((v) => v.location?.coordinates?.length === 2);

  // Center: user's location first, then the nearest clinic, then a neutral fallback
  let center = null;
  if (userPos) {
    center = userPos;
  } else if (clinics.length > 0) {
    const [lng, lat] = clinics[0].location.coordinates; // vets come sorted by distance
    center = { lat, lng };
  }

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-200 rounded-xl flex items-center justify-center">
        <p className="text-gray-600">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
      {locError && <p className="text-sm text-red-600 px-4 pt-3">{locError}</p>}

      <MapContainer
        center={center ? [center.lat, center.lng] : [28.4595, 77.0266]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {center && <Recenter lat={center.lat} lng={center.lng} />}

        {userPos && (
          <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
            <Popup>
              <p className="font-semibold text-gray-900 text-center">You are here</p>
            </Popup>
          </Marker>
        )}

        {clinics.map((vet) => (
          <Marker
            key={vet._id}
            position={[vet.location.coordinates[1], vet.location.coordinates[0]]}
            icon={vetIcon}
          >
            <Popup>
              <div className="text-center min-w-[200px]">
                <div className="w-full h-24 rounded mb-2 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {vet.clinicPhotos?.length > 0 ? (
                    <img src={vet.clinicPhotos[0]} alt={vet.clinicName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-sm text-gray-400">No photo</span>
                  )}
                </div>
                <p className="font-semibold text-gray-900">{vet.clinicName || "Clinic"}</p>
                {vet.user?.name && <p className="text-sm text-gray-600">Dr. {vet.user.name}</p>}
                {vet.specializations?.length > 0 && (
                  <p className="text-sm text-gray-600">{vet.specializations.join(", ")}</p>
                )}
                <p className="text-sm mt-1">⭐ {(vet.rating ?? 0).toFixed(1)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;