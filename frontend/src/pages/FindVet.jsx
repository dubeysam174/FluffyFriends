import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VetSearch from "../components/FindVet/VetSearch";
import MapView from "../components/FindVet/MapView";
import VetList from "../components/FindVet/VetList";
import { getNearbyVets, searchVets, getAllVets } from "../api/vetAPI";
import toast from "react-hot-toast";
import DashboardLayout from "../components/layout/DashboardLayout";
import { getCurrentLocation } from "../utils/geoLocation";
import { 
  selectNearbyVets, 
  selectVetSearchLoading,
  setNearbyVets,
  setLoading 
} from '../store/slices/VetSearchSlice'

const FindVet = () => {
    const cachedVets = useSelector(selectNearbyVets);  // ✅ From Redux
  const reduxLoading = useSelector(selectVetSearchLoading);
  const dispatch=useDispatch();
  const [vets, setVets] = useState(cachedVets);
  const [loading, setLoading] = useState(reduxLoading);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [sortBy, setSortBy] = useState("distance");
  const [minRating, setMinRating] = useState(0);
  const [viewType, setViewType] = useState("grid");

  // Get user's location on mount
  useEffect(() => {
    if (!cachedVets || cachedVets.length === 0) {
      getUserLocation();
    } else {
      setVets(cachedVets);
    }
  }, [cachedVets]);


 const getUserLocation = async () => {
    try {
      const location = await getCurrentLocation();
      console.log("📍 User Location:", location);
      
      setUserLocation({
        lat: location.latitude,
        lng: location.longitude,
      });
      
      fetchNearbyVets(location.latitude, location.longitude, 50000);
      toast.success("Location enabled");
    } catch (error) {
      console.error("❌ Location error:", error);
      toast.error("Enable location to find nearby vets");
      fetchAllVets();
    }
  };

  const fetchNearbyVets = async (latitude, longitude, distance = 50000) => {
    try {
      setLoading(true);
      const response = await getNearbyVets(latitude, longitude, distance);
      
      console.log("🏥 Nearby vets response:", response);
      
      let vetsData = response.vets || [];
      vetsData = vetsData.filter((v) => (v.rating || 0) >= minRating);

      if (sortBy === "rating") {
        vetsData.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }

      setVets(vetsData);
      
      // ✅ CACHE in Redux
      dispatch(setNearbyVets({
        vets: vetsData,
        location: { latitude, longitude }
      }));
      
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
      const vetsData = response.data || [];
      setVets(vetsData);
      
      // ✅ CACHE in Redux
      dispatch(setNearbyVets({
        vets: vetsData,
        location: null
      }));
      
      setError(null);
    } catch (err) {
      console.error("Error fetching all vets:", err);
      setError("Failed to load vets");
    } finally {
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
      const vetsData = response.data || [];
      setVets(vetsData);
      
      // ✅ CACHE search results in Redux
      dispatch(setNearbyVets({
        vets: vetsData,
        location: null
      }));
      
      setError(null);
      toast.success(`Found ${vetsData.length} vets`);
    } catch (err) {
      console.error("Error searching vets:", err);
      setError("Search failed");
      toast.error("Search failed");
    } finally {
      setLoading(false);
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

  // ✅ Manual refresh button
  const handleRefresh = () => {
    if (userLocation) {
      fetchNearbyVets(userLocation.lat, userLocation.lng);
    } else {
      fetchAllVets();
    }
  };

  if (loading && vets.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">Loading vets...</div>
      </DashboardLayout>
    );
  }
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