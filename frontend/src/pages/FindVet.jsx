import React, { useState, useEffect } from "react";
import VetSearch from "../components/FindVet/VetSearch";
import MapView from "../components/FindVet/MapView";
import VetList from "../components/FindVet/VetList";
import { getNearbyVets, searchVets, getAllVets } from "../api/vetAPI";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCurrentLocation } from "../utils/geoLocation";

const FindVet = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState("distance");
  const [minRating, setMinRating] = useState(0);
  const [viewType, setViewType] = useState("grid");

  // Get user's location on mount
   useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = async () => {
  try {
    const location = await getCurrentLocation();
    console.log("📍 User Location:", location);
    
    // ✅ CORRECT - Extract values
    setUserLocation({
      lat: location.latitude,
      lng: location.longitude,
    });
    
    // ✅ CORRECT - Pass individual values
    fetchNearbyVets(
      location.latitude,      // Not location!
      location.longitude,     // Not location!
      50000
    );
    toast.success("Location enabled");
  } catch (error) {
    console.error("❌ Location error:", error);
    toast.error("Enable location to find nearby vets");
    fetchAllVets();
  }
};

 const fetchNearbyVets = async (latitude, longitude) => {
  try {
    setLoading(true);
    
    // ✅ CORRECT - Pass individual parameters
    const response = await getNearbyVets(latitude, longitude, 50000);
    
    console.log("🏥 Nearby vets response:", response);
    
    let vetsData = response.vets || [];

    vetsData = vetsData.filter((v) => (v.rating || 0) >= minRating);

    if (sortBy === "rating") {
      vetsData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setVets(vetsData);
    setError(null);
  } catch (err) {
    console.error("Error fetching vets:", err);
    setError("Failed to load vets");
    toast.error("Failed to find nearby vets");
  } finally {
    setLoading(false);
  }
};

  const fetchAllVets = async () => {
    try {
      setLoading(true);
      const response = await getAllVets();
      setVets(response.data || []);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching all vets:", err);
      setError("Failed to load vets");
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      if (userLocation) {
        fetchNearbyVets(userLocation.lat, userLocation.lng);
      } else {
        fetchAllVets();
      }
      return;
    }

    try {
      setLoading(true);
      const response = await searchVets(searchTerm);
      setVets(response.data || []);
      setError(null);
      setLoading(false);
      toast.success(`Found ${response.data?.length || 0} vets`);
    } catch (err) {
      console.error("Error searching vets:", err);
      setError("Search failed");
      setLoading(false);
      toast.error("Search failed");
    }
  };

  const handleFilter = ({ sortBy: newSortBy, minRating: newMinRating }) => {
    setSortBy(newSortBy);
    setMinRating(newMinRating);

    let filteredVets = vets.filter((v) => (v.rating || 0) >= newMinRating);

    if (newSortBy === "rating") {
      filteredVets.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (newSortBy === "experience") {
      filteredVets.sort(
        (a, b) => (b.yearsOfExperience || 0) - (a.yearsOfExperience || 0)
      );
    } else if (newSortBy === "name") {
      filteredVets.sort((a, b) => a.name.localeCompare(b.name));
    }

    setVets(filteredVets);
    toast.success("Filters applied");
  };

  return (
    <DashboardLayout>

    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find a Veterinarian</h1>
          <p className="text-gray-600">
            Search and connect with trusted veterinarians near you
          </p>
        </div>

        <VetSearch onSearch={handleSearch} onFilter={handleFilter} loading={loading} />

        <div className="flex gap-2 justify-end">
          <button
            onClick={() => setViewType("grid")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              viewType === "grid"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-700 border-2 border-gray-200"
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setViewType("map")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              viewType === "map"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 border-2 border-gray-200"
                }`}
                >
            Map View
          </button>
        </div>

        {viewType === "map" && (
          <MapView vets={vets} userLocation={userLocation} loading={loading} />
        )}

        <VetList vets={vets} loading={loading} error={error} />
      </div>
    </div>
            </DashboardLayout>
  );
};

export default FindVet;