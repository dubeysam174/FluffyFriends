import React from "react";
import { useSelector } from "react-redux";
import { selectNearbyVets } from "../../store/slices/VetSearchSlice";
import VetCard from "./VetCard";

const VetList = ({ loading, error }) => {
  const vets = useSelector(selectNearbyVets) || [];

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading vets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (vets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No vets found. Try a different search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vets.map((vet) => (
        <VetCard key={vet._id} vet={vet} />
      ))}
    </div>
  );
};

export default VetList;