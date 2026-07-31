import React from "react";
import VetCard from "./VetCard";

const VetList = ({ vets, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow p-4 animate-pulse"
          >
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!vets || vets.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-12 text-center">
        <p className="text-gray-600 text-lg">No vets found. Try adjusting your filters!</p>
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